import useUser from "../../hooks/useUser";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loading from "../UI/Loading.jsx";

function ProtectedPage({ children }) {
  const { loading, loggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && loggedIn) {
      router.replace("/");
    }
  }, [loggedIn, loading, router]);

  if (loading || loggedIn) {
    return (
      <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
        <Loading />
      </div>
    );
  }

  return children;
}

export default ProtectedPage;
