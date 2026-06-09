import {
  appendStatusHistory,
  getStatusTimestampUpdates,
} from "@backend/lib/order-history";
import { connectMongo } from "@backend/lib/mongodb";
import { ContactInquiryModel } from "@backend/models/ContactInquiry";
import { NewsletterSubscriptionModel } from "@backend/models/NewsletterSubscription";
import { OrderModel, ORDER_STATUSES, type OrderStatus } from "@backend/models/Order";
import { UserModel } from "@backend/models/User";
import { WarrantyRegistrationModel } from "@backend/models/WarrantyRegistration";
import { toOrderDetails } from "@backend/services/order.mapper";
import { canTransitionTo } from "@/constants/order-status-transitions";

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildSearchFilter(
  fields: string[],
  query?: string,
): Record<string, unknown> | undefined {
  if (!query?.trim()) return undefined;
  const pattern = new RegExp(escapeRegex(query.trim()), "i");
  return { $or: fields.map((field) => ({ [field]: pattern })) };
}

export async function listOrders(input: {
  page: number;
  limit: number;
  status?: string;
  email?: string;
  orderNumber?: string;
}) {
  await connectMongo();

  const filter: Record<string, unknown> = {};
  if (input.status) {
    if (!ORDER_STATUSES.includes(input.status as OrderStatus)) {
      return { ok: false as const, error: "Invalid status filter", status: 400 };
    }
    filter.status = input.status;
  }
  if (input.email) {
    filter.customerEmail = new RegExp(
      input.email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i",
    );
  }
  if (input.orderNumber) filter.orderNumber = input.orderNumber;

  const skip = (input.page - 1) * input.limit;
  const [items, total] = await Promise.all([
    OrderModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(input.limit)
      .lean(),
    OrderModel.countDocuments(filter),
  ]);

  return {
    ok: true as const,
    page: input.page,
    limit: input.limit,
    total,
    orders: items.map((o) => ({
      id: o._id.toString(),
      orderNumber: o.orderNumber,
      status: o.status,
      amountPaise: o.amountPaise,
      subtotalPaise: o.subtotalPaise,
      discountPaise: o.discountPaise,
      shippingPaise: o.shippingPaise,
      currency: o.currency,
      paymentMethod: o.paymentMethod,
      couponCode: o.couponCode ?? null,
      discountPercent: o.discountPercent ?? 0,
      createdAt: o.createdAt,
      customerName: `${o.customerFirstName} ${o.customerLastName}`.trim(),
      customerEmail: o.customerEmail,
      customerPhone: o.customerPhone,
      shippingCity: o.shippingCity,
      shippingState: o.shippingState,
      shippingPincode: o.shippingPincode,
      userId: o.userId ? String(o.userId) : null,
      itemCount: o.items?.length ?? 0,
      items: o.items?.map(
        (item: {
          name: string;
          variantTitle: string;
          quantity: number;
          unitPricePaise: number;
        }) => ({
          name: item.name,
          variantTitle: item.variantTitle,
          quantity: item.quantity,
          unitPricePaise: item.unitPricePaise,
        }),
      ),
    })),
  };
}

export async function getAdminStats() {
  await connectMongo();

  const [
    total,
    pendingPayment,
    processing,
    shipped,
    delivered,
    cancelled,
    revenue,
    inquiries,
    newsletter,
    warranty,
    users,
    admins,
  ] = await Promise.all([
    OrderModel.countDocuments(),
    OrderModel.countDocuments({ status: "pending_payment" }),
    OrderModel.countDocuments({ status: { $in: ["paid", "processing"] } }),
    OrderModel.countDocuments({ status: "shipped" }),
    OrderModel.countDocuments({ status: "delivered" }),
    OrderModel.countDocuments({ status: { $in: ["cancelled", "failed"] } }),
    OrderModel.aggregate<{ total: number }>([
      {
        $match: {
          status: { $nin: ["failed", "cancelled", "pending_payment"] },
        },
      },
      { $group: { _id: null, total: { $sum: "$amountPaise" } } },
    ]),
    ContactInquiryModel.countDocuments(),
    NewsletterSubscriptionModel.countDocuments(),
    WarrantyRegistrationModel.countDocuments(),
    UserModel.countDocuments(),
    UserModel.countDocuments({ role: "admin" }),
  ]);

  return {
    total,
    pendingPayment,
    processing,
    shipped,
    delivered,
    cancelled,
    revenuePaise: revenue[0]?.total ?? 0,
    inquiries,
    newsletter,
    warranty,
    users,
    admins,
  };
}

function formatDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function buildDayRange(days: number): string[] {
  const keys: string[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    keys.push(formatDateKey(d));
  }
  return keys;
}

export async function getAdminAnalytics(days = 14) {
  await connectMongo();
  const range = buildDayRange(days);
  const since = new Date(range[0]);
  since.setHours(0, 0, 0, 0);

  const orders = await OrderModel.find({ createdAt: { $gte: since } })
    .select("createdAt amountPaise status")
    .lean();

  const byDay = new Map<string, { orders: number; revenuePaise: number }>();
  for (const key of range) {
    byDay.set(key, { orders: 0, revenuePaise: 0 });
  }

  for (const order of orders) {
    const key = formatDateKey(new Date(order.createdAt));
    const bucket = byDay.get(key);
    if (!bucket) continue;
    bucket.orders += 1;
    if (!["failed", "cancelled", "pending_payment"].includes(order.status)) {
      bucket.revenuePaise += order.amountPaise;
    }
  }

  const series = range.map((date) => {
    const bucket = byDay.get(date)!;
    return { date, orders: bucket.orders, revenuePaise: bucket.revenuePaise };
  });

  return {
    days,
    series,
    totals: {
      orders: series.reduce((sum, day) => sum + day.orders, 0),
      revenuePaise: series.reduce((sum, day) => sum + day.revenuePaise, 0),
    },
  };
}

export async function getAdminDashboard() {
  await connectMongo();

  const [stats, analytics, recentOrders, recentInquiries, recentWarranty] =
    await Promise.all([
      getAdminStats(),
      getAdminAnalytics(14),
      OrderModel.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("orderNumber status amountPaise customerEmail createdAt")
        .lean(),
      ContactInquiryModel.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email phone subject message createdAt")
        .lean(),
      WarrantyRegistrationModel.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email productName orderId createdAt")
        .lean(),
    ]);

  return {
    stats,
    analytics,
    recent: {
      orders: recentOrders.map((o) => ({
        id: o._id.toString(),
        orderNumber: o.orderNumber,
        status: o.status,
        amountPaise: o.amountPaise,
        customerEmail: o.customerEmail,
        createdAt: o.createdAt,
      })),
      inquiries: recentInquiries.map((i) => ({
        id: i._id.toString(),
        name: i.name,
        email: i.email,
        phone: i.phone ?? null,
        subject: i.subject ?? null,
        message: i.message,
        createdAt: i.createdAt,
      })),
      warranty: recentWarranty.map((w) => ({
        id: w._id.toString(),
        name: w.name,
        email: w.email,
        productName: w.productName,
        orderId: w.orderId,
        createdAt: w.createdAt,
      })),
    },
  };
}

export async function listContactInquiries(input: {
  page: number;
  limit: number;
  search?: string;
}) {
  await connectMongo();

  const filter =
    buildSearchFilter(["name", "email", "subject", "message"], input.search) ?? {};
  const skip = (input.page - 1) * input.limit;

  const [items, total] = await Promise.all([
    ContactInquiryModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(input.limit)
      .lean(),
    ContactInquiryModel.countDocuments(filter),
  ]);

  return {
    ok: true as const,
    page: input.page,
    limit: input.limit,
    total,
    inquiries: items.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      email: item.email,
      phone: item.phone ?? null,
      subject: item.subject ?? null,
      message: item.message,
      createdAt: item.createdAt,
    })),
  };
}

export async function listNewsletterSubscribers(input: {
  page: number;
  limit: number;
  search?: string;
}) {
  await connectMongo();

  const filter = buildSearchFilter(["email"], input.search) ?? {};
  const skip = (input.page - 1) * input.limit;

  const [items, total] = await Promise.all([
    NewsletterSubscriptionModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(input.limit)
      .lean(),
    NewsletterSubscriptionModel.countDocuments(filter),
  ]);

  return {
    ok: true as const,
    page: input.page,
    limit: input.limit,
    total,
    subscribers: items.map((item) => ({
      id: item._id.toString(),
      email: item.email,
      createdAt: item.createdAt,
    })),
  };
}

export async function deleteNewsletterSubscriber(id: string) {
  await connectMongo();
  const deleted = await NewsletterSubscriptionModel.findByIdAndDelete(id);
  if (!deleted) return { ok: false as const, error: "Not found", status: 404 };
  return { ok: true as const };
}

export async function listWarrantyRegistrations(input: {
  page: number;
  limit: number;
  search?: string;
}) {
  await connectMongo();

  const filter =
    buildSearchFilter(
      ["name", "email", "phone", "productName", "orderId"],
      input.search,
    ) ?? {};
  const skip = (input.page - 1) * input.limit;

  const [items, total] = await Promise.all([
    WarrantyRegistrationModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(input.limit)
      .lean(),
    WarrantyRegistrationModel.countDocuments(filter),
  ]);

  return {
    ok: true as const,
    page: input.page,
    limit: input.limit,
    total,
    registrations: items.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      email: item.email,
      phone: item.phone,
      productName: item.productName,
      orderId: item.orderId,
      purchaseDate: item.purchaseDate,
      createdAt: item.createdAt,
    })),
  };
}

export async function listUsers(input: {
  page: number;
  limit: number;
  search?: string;
  role?: string;
}) {
  await connectMongo();

  const filter: Record<string, unknown> = {};
  const searchFilter = buildSearchFilter(["name", "email"], input.search);
  if (searchFilter) Object.assign(filter, searchFilter);
  if (input.role === "admin" || input.role === "user") {
    filter.role = input.role;
  }

  const skip = (input.page - 1) * input.limit;
  const [items, total] = await Promise.all([
    UserModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(input.limit)
      .select("name email phone role emailVerified createdAt")
      .lean(),
    UserModel.countDocuments(filter),
  ]);

  const userIds = items.map((item) => item._id);
  const orderCounts = userIds.length
    ? await OrderModel.aggregate<{ _id: unknown; count: number }>([
        { $match: { userId: { $in: userIds } } },
        { $group: { _id: "$userId", count: { $sum: 1 } } },
      ])
    : [];
  const orderCountMap = new Map(
    orderCounts.map((entry) => [String(entry._id), entry.count]),
  );

  return {
    ok: true as const,
    page: input.page,
    limit: input.limit,
    total,
    users: items.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      email: item.email,
      phone: item.phone ?? null,
      role: item.role,
      emailVerified: item.emailVerified,
      orderCount: orderCountMap.get(item._id.toString()) ?? 0,
      createdAt: item.createdAt,
    })),
  };
}

export async function updateUserRoleById(
  id: string,
  role: "user" | "admin",
  actingAdminId: string,
) {
  if (role !== "user" && role !== "admin") {
    return { ok: false as const, error: "Invalid role", status: 400 };
  }

  await connectMongo();
  const user = await UserModel.findById(id);
  if (!user) return { ok: false as const, error: "Not found", status: 404 };

  if (user._id.toString() === actingAdminId && role !== "admin") {
    return {
      ok: false as const,
      error: "You cannot remove your own admin access",
      status: 400,
    };
  }

  if (user.role === "admin" && role === "user") {
    const adminCount = await UserModel.countDocuments({ role: "admin" });
    if (adminCount <= 1) {
      return {
        ok: false as const,
        error: "At least one admin is required",
        status: 400,
      };
    }
  }

  user.role = role;
  await user.save();

  return {
    ok: true as const,
    id: user._id.toString(),
    role: user.role,
  };
}

export async function getOrderByIdForAdmin(id: string) {
  await connectMongo();
  const doc = await OrderModel.findById(id).lean();
  if (!doc) return { ok: false as const, error: "Not found", status: 404 };
  return { ok: true as const, order: toOrderDetails(doc as never) };
}

export async function updateOrderStatusById(id: string, status: string) {
  if (!ORDER_STATUSES.includes(status as OrderStatus)) {
    return { ok: false as const, error: "Invalid status", status: 400 };
  }

  await connectMongo();
  const existing = await OrderModel.findById(id);
  if (!existing) return { ok: false as const, error: "Not found", status: 404 };

  if (!canTransitionTo(existing.status, status)) {
    return {
      ok: false as const,
      error: `Cannot change status from "${existing.status}" to "${status}"`,
      status: 400,
    };
  }

  existing.status = status as OrderStatus;
  existing.statusHistory = appendStatusHistory(
    existing.statusHistory,
    status as OrderStatus,
    "Updated by admin",
  );
  Object.assign(existing, getStatusTimestampUpdates(status as OrderStatus));
  await existing.save();
  const order = existing.toObject();

  return {
    ok: true as const,
    id: order._id.toString(),
    orderNumber: order.orderNumber,
    status: order.status,
  };
}
