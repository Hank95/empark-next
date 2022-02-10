import { useRouter } from "next/router";
import React from "react";
import useAuth from "./authContext";

export function withPublic(Component: JSX.IntrinsicAttributes) {
  return function WithPublic(props: JSX.IntrinsicAttributes) {
    const auth = useAuth();
    const router = useRouter();

    if (auth.currentUser) {
      router.replace("/");
      return <h1>Loading...</h1>;
    }
    return <Component auth={auth} {...props} />;
  };
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth();
    const router = useRouter();

    if (!auth.user) {
      router.replace("/login");
      return <h1>Loading...</h1>;
    }
    return <Component auth={auth} {...props} />;
  };
}
