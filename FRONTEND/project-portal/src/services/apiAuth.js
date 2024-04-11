import { serverPort } from "../helpers/backendApi";

export async function signIn({ email, password }) {
  try {
    const body = { email, password };
    const res = await fetch(`${serverPort}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
