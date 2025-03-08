import { JSX, useEffect, useState } from "react";
import { getToast } from "../services/toasts.service";
import authService from "../services/auth.service";

function FallbackAuthGuard({
  children,
  fallbackChildren,
}: {
  children: JSX.Element;
  fallbackChildren: JSX.Element;
}) {
  const [result, setResult] = useState(
    authService.getAccessToken() ? true : false
  );

  useEffect(() => {
    if (result) {
      authService
        .isAuthenticated()
        .then((response) => {
          setResult(response);
        })
        .catch((_err) => {
          setResult(false);
          getToast("error", _err.message);
        });
    }

    authService.isUserAuthenticated$.subscribe((value: boolean) => {
      setResult(value);
    });
  }, []);

  if (!result) {
    authService.logout();
  }
  return result ? children : fallbackChildren;
}

export default FallbackAuthGuard;
