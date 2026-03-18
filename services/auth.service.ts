import api from "./api";

export async function loginUser(email: string, password: string) {
  const res = await api.post("/users/login", {
    email,
    password,
  });

  return res.data;
}

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  const res = await api.post("/users/register", {
    username,
    email,
    password,
  });

  return res.data;
}
