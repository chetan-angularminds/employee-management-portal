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
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const subscription = authService.isUserAuthenticated$.subscribe(
      (value: boolean) => {
        setResult(value);
      }
    );
    const isLoadingSubscription = authService.isLoading$.subscribe(
      (value: boolean) => {
        setisLoading(value);
      }
    );

    return () => {
      subscription.unsubscribe();
      isLoadingSubscription.unsubscribe();
    };
  }, [result]);

  return <>{!isLoading && (result ? children : fallbackChildren)}</>;
}

export default FallbackAuthGuard;
