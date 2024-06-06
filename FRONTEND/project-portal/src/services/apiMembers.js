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

export async function requestMentorship(faculty) {
  try {
    const res = await fetch(`${serverPort}/requestMentorship`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faculty),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getTeam(username) {
  // // const username = "Romil";
  // console.log("USERNAME passsed to getTEAM is:=> ");
  // console.log(username);
  try {
    const res = await fetch(`${serverPort}/getTeam`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(username),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
