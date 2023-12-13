import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/Api/AuthContext";

const AuthHoc = (WrappedComponent) => {
  const AuthHoc = (props) => {
    const { token, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Si el token no está presente, redirige al login
      if (!token && !loading) {
        router.push('/login');
      }
    }, [token, loading, router]);

    // Si el token no está presente, podrías mostrar un mensaje de carga o redirigir al login
    if (!token || loading) {
      return <p>Cargando...</p>;
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
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default AuthHoc;