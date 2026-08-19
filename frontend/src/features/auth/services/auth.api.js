import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  const responce = await axios.post(
    "http://localhost:3000/api/auth/register",
    {
      username,
      email,
      password,
    },
    {
      withCredentials: true,
    },
  );
  return responce.data;
}

export async function login({ email, password }) {
  const responce = await axios.post(
    "http://localhost:3000/api/auth/login",
    {
      email,
      password,
    },
    {
      withCredentials: true,
    },
  );
  return responce.data;
}

export async function logout() {
  try {
    const responce = await api.get("/api/auth/logout");
    return responce.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getme() {
  try {
    const responce = await api.get("/api/auth/get-me");
    return responce.data;
  } catch (err) {
    console.log(err);
  }
}
