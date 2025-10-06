"use client";

import * as React from "react";
import { cn } from "./utils";

function Avatar({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function AvatarImage({
  src,
  alt,
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback };