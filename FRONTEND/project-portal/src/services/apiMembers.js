import { serverPort } from "../helpers/backendApi";

export async function addTeam(team) {
  try {
    const res = await fetch(`${serverPort}/addTeam`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(team),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
