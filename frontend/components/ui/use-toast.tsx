// components/ui/use-toast.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Toast,
  ToastAction,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast";

// Define the shape of a toast
type ToastProps = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: React.ReactNode;
  duration?: number;
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  // Function to trigger a new toast
  const toast = ({
    title,
    description,
    variant = "default",
    action,
    duration = 5000,
  }: ToastProps) => {
    const newToast = { title, description, variant, action, duration };
    setToasts((prev) => [...prev, newToast]);

    // Automatically remove the toast after the duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t !== newToast));
    }, duration);
  };

  // Render toasts
  useEffect(() => {
    // This effect ensures toasts are rendered on the client
  }, [toasts]);

  // Return the toast function and the toasts to render
  return {
    toast,
    Toasts: () => (
      <>
        {toasts.map((t, index) => (
          <Toast key={index} variant={t.variant} duration={t.duration}>
            <ToastTitle>{t.title}</ToastTitle>
            {t.description && (
              <ToastDescription>{t.description}</ToastDescription>
            )}
            {t.action && <ToastAction asChild>{t.action}</ToastAction>}
          </Toast>
        ))}
      </>
    ),
  };
}
