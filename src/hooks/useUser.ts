import useSWR from "swr";
import { getUser } from "lib/userApi";
import { authRoutes } from "../data/Routes";

const useUser = () => {
  const { data, mutate, error } = useSWR(authRoutes.user, getUser, {
    refreshInterval: 300000, // 5 Minutes
    shouldRetryOnError: false,
  });

  const loading = !data && !error;
  const loggedIn = !error && data;

  return {
    loading,
    loggedIn,
    user: data,
    mutate,
  };
};

export default useUser;
