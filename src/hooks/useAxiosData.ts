import { useState } from "react";
import PropTypes from "prop-types";

type Data<T> = {
  loading: boolean;
  error: boolean;
  data: T | undefined;
};

type Method = (args: any) => void;

const useAxiosData = <T>() => {
  const [data, setData] = useState<Data<T>>({
    loading: false,
    data: undefined,
    error: false,
  });

  const makeRequest: Method = (request) => {
    setData({
      loading: true,
      data: undefined,
      error: false,
    });

    request
      .then((resp: any) => {
        setData({
          loading: false,
          data: resp.data,
          error: false,
        });
      })
      .catch((error: any) => {
        const obj = {
          loading: false,
          data: undefined,
          error,
        };

        setData(obj);
      });
  };

  return [data, makeRequest] as const;
};

export default useAxiosData;
