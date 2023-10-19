// components/ProtectedRoute.js
import { useEffect } from "react";
import { obtenerToken } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  // const router = useRouter();
  const token = obtenerToken();

  useEffect(() => {
    if (!token) {
      // router.push("/"); // Redirige a la página de inicio de sesión si no hay token.
      window.location.href = "/";
    }
  }, [token]);

  if (!token) {
    return null; // Puedes mostrar un mensaje de carga o algo similar mientras rediriges.
  }

  return children;
};

export default ProtectedRoute;
