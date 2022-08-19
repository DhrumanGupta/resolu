import useUser from "../../hooks/useUser";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loading from "../UI/Loading.jsx";

function ProtectedPage({ children }) {
  const { loading, loggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log(loggedIn);
    if (!loading && !loggedIn) {
      router.replace("/");
    }
  }, [loggedIn, loading, router]);

  if (loading || !loggedIn) {
    return <Loading />;
  }

  return children;
}

export default ProtectedPage;
