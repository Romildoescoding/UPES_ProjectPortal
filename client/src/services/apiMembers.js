import { serverPort } from "../helpers/backendApi";

//UPDATED
export async function initializeGroup(group) {
  // try {
  const res = await fetch(`${serverPort}/api/v1/groups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(group),
  });
  const data = await res.json();

  //THIS LINE IS NECESSARY FOR ONERROR
  if (res.status !== 200) throw new Error(data.message);
  return data;
  // } catch (err) {
  // console.log(err);
  //THROW THE ERROR SO THAT USEMUTATION CAN CATCH IT
  // throw err;
  // }
}

//Request Mentorship from the faculty
export async function requestMentorship(faculty) {
  console.log(faculty);
  try {
    const res = await fetch(`${serverPort}/api/v1/projects`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faculty),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

//UPDATED
export async function getTeam({ user, group_name }) {
  let requestURL;
  if (user) {
    requestURL = `${serverPort}/api/v1/groups/members?student=${user.mail}`;
  }

  if (group_name) {
    requestURL = `${serverPort}/api/v1/groups/members?group_name=${group_name}`;
  }

  try {
    const res = await fetch(requestURL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getGroupDetails(group) {
  try {
    const res = await fetch(`${serverPort}/api/v1/groups?group=${group}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//UPDATING...
export async function updateMembers(group) {
  console.log(group);
  // try {
  const res = await fetch(`${serverPort}/api/v1/groups`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(group),
  });
  const data = await res.json();
  if (res.status !== 200)
    throw new Error("Group Members already in another group");
  console.log(data);
  return data;
  // } catch (err) {
  // console.log(err);
  // throw err;
  // }
}

export async function getProjectByGroup(group_name) {
  console.log(group_name);
  try {
    const res = await fetch(`${serverPort}/api/v1/projects/group`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(group_name),
    });
    const data = res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getRequests({
  name,
  isMentor,
  isMentorAccepted,
  isPanelNull,
}) {
  try {
    console.log(name, isMentor, isMentorAccepted);
    const isMentorAcceptedParam = isMentorAccepted === "true" ? true : false;

    console.log(isMentorAcceptedParam);
    // let apiEndPoint;
    // if(isMentor){
    //   apiEndPoint = `${serverPort}/api/v1/projects?`
    // }
    let apiEndPoint = `${serverPort}/api/v1/projects?${
      isMentor ? "mentor" : "panel"
    }=${name}&isMentorAccepted=${isMentorAcceptedParam}&isPanelNull=${isPanelNull}`;
    const res = await fetch(apiEndPoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function handleRequests(request) {
  const { group_name, isMentorAccepted } = request;
  try {
    const res = await fetch(`${serverPort}/api/v1/projects/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group_name, isMentorAccepted }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

//ADD THIS TO HELPERS
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

//{ title, group_name, report, tech }
export async function uploadProject(formData) {
  const title = formData.get("title");
  const technologies = formData.get("tech");
  const group_name = formData.get("group");
  const report = formData.get("report");
  const fileType = report.type;
  console.log(fileType);
  console.log({ title, technologies, group_name, report });

  try {
    const reportBase64 = await convertFileToBase64(report);

    const payload = {
      title,
      technologies,
      group_name,
      report: reportBase64, // Send the base64 encoded file
    };

    console.log(payload);

    const res = await fetch(`${serverPort}/api/v1/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

//{ title, group_name, report, tech }
export async function updateProject({ formData, oldFilePath }) {
  const title = formData.get("title");
  const technologies = formData.get("tech");
  const group_name = formData.get("group");
  const report = formData.get("report");
  const fileType = report.type;
  console.log(fileType);
  console.log({ title, technologies, group_name, report });

  try {
    const reportBase64 = await convertFileToBase64(report);

    const payload = {
      title,
      technologies,
      group_name,
      isUpdating: true,
      oldFilePath,
      report: reportBase64, // Send the base64 encoded file
    };

    console.log(payload);

    const res = await fetch(`${serverPort}/api/v1/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllFaculties() {
  try {
    const res = await fetch(`${serverPort}/api/v1/faculty`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function setPanelMembers(updatedData) {
  console.log(updatedData);
  try {
    const res = await fetch(`${serverPort}/api/v1/projects`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

// EVENTS
export async function createEvent(event) {
  const res = await fetch(`${serverPort}/api/v1/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  const data = await res.json();

  //THIS LINE IS NECESSARY FOR ONERROR
  if (res.status !== 200) throw new Error(data.message);
  return data;
}

export async function getEvents() {
  const res = await fetch(`${serverPort}/api/v1/events`);
  const data = await res.json();

  //THIS LINE IS NECESSARY FOR ONERROR
  if (res.status !== 200) throw new Error(data.message);
  console.log(data);
  return data;
}
