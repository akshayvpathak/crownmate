import { promises as fs } from "fs";
import path from "path";
import type { CheckoutOrder } from "@/types";

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");

async function readOrders(): Promise<CheckoutOrder[]> {
  try {
    const raw = await fs.readFile(ORDERS_FILE, "utf-8");
    return JSON.parse(raw) as CheckoutOrder[];
  } catch {
    return [];
  }
}

async function writeOrders(orders: CheckoutOrder[]): Promise<void> {
  await fs.mkdir(path.dirname(ORDERS_FILE), { recursive: true });
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

export async function saveOrder(order: CheckoutOrder): Promise<void> {
  const orders = await readOrders();
  orders.unshift(order);
  await writeOrders(orders.slice(0, 500));
}

export async function findOrder(
  orderId: string,
  email: string,
): Promise<CheckoutOrder | null> {
  const orders = await readOrders();
  const match = orders.find(
    (o) =>
      o.orderId.toLowerCase() === orderId.toLowerCase() &&
      o.customer.email.toLowerCase() === email.toLowerCase(),
  );
  return match ?? null;
}
