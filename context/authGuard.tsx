import { useAuth } from "./authContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      //auth is initialized and there is no user
      if (!currentUser) {
        // remember the page that currentUser tried to access
        router.push("/signin");
      }
    }
  }, [loading, router, currentUser]);

  /* show loading indicator while the auth provider is still loading */
  if (loading) {
    return <h1>Application Loading</h1>;
  }

  // if auth initialized with a valid currentUser show protected page
  if (!loading && currentUser) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
