import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string;
  fallbackAlt?: string;
}

export function OptimizedImage({ src, alt, className, ...props }: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      className={cn("object-cover", className)}
      loading={props.priority ? undefined : "lazy"}
      {...props}
    />
  );
}
