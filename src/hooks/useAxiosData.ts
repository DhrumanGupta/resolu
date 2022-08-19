import { useState } from "react";
import PropTypes from "prop-types";

const useAxiosData = () => {
  const [data, setData] = useState({
    loading: false,
    data: undefined,
    error: false,
  });

  const makeRequest = (request: Promise<any>) => {
    setData({
      loading: true,
      data: undefined,
      error: false,
    });

    request
      .then((resp) => {
        setData({
          loading: false,
          data: resp.data,
          error: false,
        });
      })
      .catch((error) => {
        const obj = {
          loading: false,
          data: undefined,
          error,
        };

        setData(obj);
      });
  };

  return [data, makeRequest];
};

export default useAxiosData;
