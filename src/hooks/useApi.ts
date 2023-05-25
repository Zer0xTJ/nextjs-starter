/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

type Props = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
};

const useApi = <ResponseType>(props: Props) => {
  const [respData, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [sent, setSent] = React.useState<boolean>(false);

  const makeRequest = async (payload: any) => {
    try {
      setLoading(true);
      const response = await fetch(props.url, {
        method: props.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setData(data);
      setLoading(false);
      setSent(true);
    } catch (error) {
      setError(error);
      setLoading(false);
      setSent(true);
    }
  };

  return { respData: respData as ResponseType, error, loading, makeRequest, sent };
};

export default useApi;
