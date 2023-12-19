import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/Api/AuthContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const AuthHoc = (WrappedComponent) => {
  const AuthHoc = (props) => {
    const { token, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      setTimeout(() => {

        // Si el token no está presente y no está cargando, redirige al login

        if (!token && !loading) {
          router.push("/");
        }
      }, 800);

    }, [token, loading, router]);

    // Si el token no está presente y no está cargando, muestra un mensaje de carga

    if (!token || loading) {
      return <LoadingSpinner />;
    }

    // Renderiza el componente envuelto si el token está presente

    return <WrappedComponent {...props} />;
  };

  // Asigna un nombre al componente para evitar el warning

  AuthHoc.displayName = `AuthHoc(${getDisplayName(WrappedComponent)})`;

  return AuthHoc;
};

// Función para obtener el nombre de un componente envuelto

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}