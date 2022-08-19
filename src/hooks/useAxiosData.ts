import { useState } from "react";
import PropTypes from "prop-types";

type Data = {
  loading: boolean;
  error: boolean;
  data: any;
};

type Method = (args: any) => void;

const useAxiosData = () => {
  const [data, setData] = useState<Data>({
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
