import { JSX } from "react";
import { getToast } from "../services/toasts.service";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  // Add your authentication logic here
  return localStorage.getItem("token") !== null;
};
export default function CanAccessAuth({ children }: { children: JSX.Element }) {
  if (isAuthenticated()) getToast("error", "user is already logged in");
  return !isAuthenticated() ? children : <Navigate to="/" />;
}
