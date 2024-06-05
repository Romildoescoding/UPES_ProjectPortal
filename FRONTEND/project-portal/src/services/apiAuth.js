import { serverPort } from "../helpers/backendApi";

export async function signIn({ email, password }) {
  try {
    const body = { email, password };
    const res = await fetch(`${serverPort}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getUser() {
  const res = await fetch(`${serverPort}/authenticate`, {
    method: "GET",
    credentials: "include", // Include credentials (cookies)
  });
  const data = await res.json();
  console.log(data);
  return data;
}
