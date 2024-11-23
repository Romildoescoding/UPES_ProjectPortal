import { serverPort } from "../helpers/backendApi";

export async function signIn({ email, password }) {
  try {
    let body = { mail: email, password };
    const res = await fetch(
      `${serverPort}/api/v1/auth/login/${
        email.includes("@stu") ? "student" : "faculty"
      }`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    if (data.token) {
      // Store the token in localStorage (or sessionStorage)
      localStorage.setItem("authToken", data.token);
    }
    return data;
  } catch (err) {
    // console.log(err.message);
  }
}

export async function getUser() {
  const token = localStorage.getItem("authToken");
  const res = await fetch(`${serverPort}/api/v1/auth/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Include token in the header
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  // console.log(data);
  return data;
}

export async function logout() {
  const res = await fetch(`${serverPort}/logout`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  // console.log(data);
  return data;
}

export async function resetPassword({ email, password, token }) {
  try {
    const body = { mail: email, password, token };
    const res = await fetch(`${serverPort}/api/v1/auth/login/resetPassword`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Error while password reset");
    const data = await res.json();
    return data;
  } catch (err) {
    // console.log(err.message);
    throw new Error(err.message);
  }
}

export async function resetPasswordConfirm({ mail }) {
  try {
    const res = await fetch(`${serverPort}/api/v1/auth/login/resetPassword`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mail }),
    });
    if (!res.ok) throw new Error("Error while requesting password reset");
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    // console.log(err.message);
    throw new Error(err.message);
  }
}
