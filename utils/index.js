export const makeResponse = (responseBody = null, success, message = "") => {
  return {
    success,
    result: responseBody,
    message:
      !message && success
        ? "Success"
        : !message && !message
        ? "Failed"
        : message,
  };
};
