"use client";

import { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import { useAuth } from "@/Api/AuthContext";
import { AuthHoc } from "@/Api/AuthHoc";

function Dashboard() {
  const { handleLogout, notification, clearNotification } = useAuth();

  //Toast para logueo de usuario

  useEffect(() => {
    if (notification) {
      if (notification.type === 'success') {
        toast.success(notification.message);
      }
      clearNotification();
    }
  }, [notification, clearNotification]);

  return (
    <>
      <div className="w-screen h-[85vh] bg-gray-800">
        <div className="flex gap-6 flex-col w-48">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
          <Toaster position="bottom-right" richColors closeButton />
      </div>
    </>
  );
}

export default AuthHoc(Dashboard);