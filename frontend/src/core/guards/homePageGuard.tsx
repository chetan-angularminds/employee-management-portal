import { JSX, useEffect, useState } from "react";
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
    const subscription = authService.isUserAuthenticated$.subscribe((value: boolean) => {
      setResult(value);
    });

    return () => subscription.unsubscribe();
  }, [result]);

  return (<>
    {result && children}
    {!result && fallbackChildren}
    </>
  );
}

export default FallbackAuthGuard;
