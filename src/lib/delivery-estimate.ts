function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDay(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleDateString("en-IN", { month: "short" });
  return `${month} ${day}${getOrdinal(day)}`;
}

function formatRange(start: Date, end: Date): string {
  const sameMonth =
    start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    const month = start.toLocaleDateString("en-IN", { month: "short" });
    return `${month} ${start.getDate()}${getOrdinal(start.getDate())} – ${end.getDate()}${getOrdinal(end.getDate())}`;
  }
  return `${formatDay(start)} – ${formatDay(end)}`;
}

function getOrdinal(day: number): string {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function getDeliveryEstimate() {
  const today = new Date();
  const ordered = formatDay(today);
  const readyStart = addDays(today, 1);
  const readyEnd = addDays(today, 2);
  const deliverStart = addDays(today, 4);
  const deliverEnd = addDays(today, 7);

  return {
    ordered,
    ready: formatRange(readyStart, readyEnd),
    delivered: formatRange(deliverStart, deliverEnd),
  };
}
