import { serverPort } from "../helpers/backendApi";

export async function signIn({ email, password }) {
  try {
    let body;
    if (email.includes("@stu")) {
      body = { email, password, role: "student" };
    } else {
      body = { email, password, role: "faculty" };
    }
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

export async function logout() {
  const res = await fetch(`${serverPort}/logout`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  console.log(data);
  return data;
}
