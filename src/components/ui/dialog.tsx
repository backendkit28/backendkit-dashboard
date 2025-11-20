"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

const Dialog = ({ open, onOpenChange, children }: any) => {
  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => onOpenChange(false)}>
      {children}
    </div>
  ) : null;
};

const DialogTrigger = ({ children, asChild, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const DialogContent = ({ children, className }: any) => (
  <div className={cn("bg-white rounded-lg p-6 max-w-md w-full", className)} onClick={(e) => e.stopPropagation()}>
    {children}
  </div>
);

const DialogHeader = ({ children }: any) => <div className="mb-4">{children}</div>;
const DialogTitle = ({ children }: any) => <h2 className="text-lg font-semibold">{children}</h2>;

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle };