import { useAuth } from "@/Api/AuthContext";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";

export default function ToastComponent() {
  const { notification, clearNotification } = useAuth();

  useEffect(() => {
    if (notification) {
      if (notification.type === "success") {
        toast.success(notification.message);
      } else if (notification.type === "error") {
        toast.error(notification.message);
      }
      clearNotification();
    }
  }, [notification, clearNotification]);

  return (
    <div>
      <Toaster richColors closeButton />
    </div>
  );
}