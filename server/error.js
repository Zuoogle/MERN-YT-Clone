export const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  error.message = message;
  return err;
}