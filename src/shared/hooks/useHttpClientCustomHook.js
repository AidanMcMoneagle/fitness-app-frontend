import { useState } from "react";

const useHttpClientCustomHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // send request is configurable. Wrap in useCallback to ensure that the function never gets recreated when the component that uses the hook re renders.
  const sendRequest = async (
    url,
    method = "GET",
    body = null,
    headers = {}
  ) => {
    setIsLoading(true);

    let responseData;
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
      });

      responseData = await response.json();

      // fetch will return a response if the response contains
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw error;
    }
    return responseData;
  };

  // will return this aswell so the componenets that use the hook can clear the error.
  const clearError = () => {
    setError(null);
  };

  // return the error state and isLoading state and sendRequest Function.
  return { error, isLoading, sendRequest, clearError };
};

export default useHttpClientCustomHook;
