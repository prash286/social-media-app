import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUser from "../features/authentication/useUser";
import Loader from "./Loader";

export default function ProtectedRoutes({
  children,
}: {
  children: JSX.Element;
}) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [navigate, isAuthenticated, isLoading]);

  if (isLoading) return <Loader />;

  if (isAuthenticated) return children;
}
