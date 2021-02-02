import { handleResponse } from "../helpers/handle-response";
import { authHeader } from "../helpers/auth-header";

const getAll = () => {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch("/users", requestOptions).then(
    handleResponse
  );
};

const getById = id => {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`/users/${id}`, requestOptions).then(
    handleResponse
  );
};

export const userService = {
  getAll,
  getById
};
