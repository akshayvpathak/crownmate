import { WHATSAPP_URL } from "@/constants/assets";
import { cn } from "@/lib/utils";

type WhatsAppLinkProps = React.ComponentPropsWithoutRef<"a">;

/** Native anchor — opens WhatsApp app reliably on mobile (avoid Next.js Link for wa.me). */
export function WhatsAppLink({ className, children, ...props }: WhatsAppLinkProps) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
      {...props}
    >
      {children}
    </a>
  );
}
