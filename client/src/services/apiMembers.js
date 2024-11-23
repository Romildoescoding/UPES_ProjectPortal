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
  // console.log(faculty);
  try {
    const res = await fetch(`${serverPort}/api/v1/projects`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faculty),
    });
    const data = await res.json();
    if (res.status !== 200) throw new Error(data.message);
    return data;
  } catch (err) {
    // console.log(err);
    throw new Error(err.message);
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
    // console.log(err);
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
    // console.log(err);
  }
}

export async function getPanelGroups(panel) {
  // console.log(panel);
  try {
    const res = await fetch(`${serverPort}/api/v1/projects/group`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(panel),
    });
    const data = res.json();
    return data;
  } catch (err) {
    // console.log(err);
  }
}

export async function getAllProjects({ mail, isPanelNotNull = false }) {
  try {
    const res = await fetch(
      `${serverPort}/api/v1/projects/group?mail=${mail}&isPanelNotNull=${isPanelNotNull}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = res.json();
    return data;
  } catch (err) {
    // console.log(err);
  }
}

export async function updateGrades(updateData) {
  //DATA HAS TO BE LIKE mail, grades, eventId and type
  // console.log(updateData);
  try {
    const res = await fetch(`${serverPort}/api/v1/projects/group`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    const data = res.json();
    return data;
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
}

//UPDATING...
export async function updateMembers(group) {
  // console.log(group);
  // try {
  const res = await fetch(`${serverPort}/api/v1/groups`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(group),
  });
  const data = await res.json();
  if (res.status !== 200) throw new Error(data.message);
  // console.log(data);
  return data;
  // } catch (err) {
  // console.log(err);
  // throw err;
  // }
}

export async function getProjectByGroup(group_name) {
  try {
    const res = await fetch(`${serverPort}/api/v1/projects/group`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(group_name),
    });
    const data = res.json();
    return data;
  } catch (err) {
    // console.log(err);
  }
}

export async function getProjectByUser(user) {
  // console.log(user);
  // name: user,
  try {
    const res = await fetch(
      `${serverPort}/api/v1/projects/group/${user.name}`,
      {
        method: "GET",
      }
    );
    const data = res.json();
    return data;
  } catch (err) {
    // console.log(err);
  }
}

export async function getRequests({
  name,
  isMentor,
  isMentorAccepted,
  isPanelNull,
  mail,
}) {
  try {
    // console.log(name, isMentor, isMentorAccepted);
    const isMentorAcceptedParam = isMentorAccepted === "true" ? true : false;

    // console.log(isMentorAcceptedParam);
    // let apiEndPoint;
    // if(isMentor){
    //   apiEndPoint = `${serverPort}/api/v1/projects?`
    // }
    let apiEndPoint = `${serverPort}/api/v1/projects?${
      isMentor ? "mentor" : "panel"
    }=${name}&isMentorAccepted=${isMentorAcceptedParam}&isPanelNull=${isPanelNull}&mail=${mail}`;
    const res = await fetch(apiEndPoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    // console.log(err);
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
    // console.log(err);
    throw new Error(err);
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
  const projectType = formData.get("type");
  const branch = formData.get("branch");
  const report = formData.get("report");
  // console.log({ title, technologies, group_name, report });

  let payload = {
    title,
    technologies,
    group_name,
    projectType,
    branch,
  };

  try {
    //IF THERE IS REPORT, THEN PROCEED THE PPTX TO base64 conversion
    if (report) {
      //VALIDATE THAT ONLY PPTS ARE ALLOWED
      const fileType = report?.type;
      console.log(fileType);
      if (
        fileType !==
        "application/vnd.openxmlformats-officedocument.presentationml.presentation" // For .pptx
      ) {
        throw new Error("Only PPTX files are allowed");
      }

      const reportBase64 = await convertFileToBase64(report);

      payload = {
        title,
        technologies,
        group_name,
        projectType,
        branch,
        report: reportBase64, // Send the base64 encoded file
      };

      // console.log(payload);
    }

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
    throw new Error(err);
  }
}

//{ title, group_name, report, tech }
export async function updateProject({ formData, oldFilePath }) {
  const title = formData.get("title");
  const technologies = formData.get("tech");
  const group_name = formData.get("group");
  const projectType = formData.get("type");
  const report = formData.get("report");
  const fileType = report.type;
  // console.log(fileType);
  // console.log({ title, technologies, projectType, group_name, report });

  try {
    const fileType = report?.type;
    // console.log(fileType);
    if (
      fileType !==
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" // For .pptx
    ) {
      throw new Error("Only PPTX files are allowed");
    }
    const reportBase64 = await convertFileToBase64(report);

    const payload = {
      title,
      projectType,
      technologies,
      group_name,
      isUpdating: true,
      oldFilePath,
      report: reportBase64, // Send the base64 encoded file
    };

    // console.log(payload);

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
    // console.log(err);
    throw new Error(err);
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
    // console.log(err);
    throw new Error(err);
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
    // console.log(err);
    throw new Error(err);
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

export async function updateEvent(event) {
  const res = await fetch(`${serverPort}/api/v1/events`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  const data = await res.json();

  //THIS LINE IS NECESSARY FOR ONERROR
  if (res.status !== 200) throw new Error(data.message);
  return data;
}

// EVENTS
export async function deleteEvent(event) {
  const res = await fetch(`${serverPort}/api/v1/events`, {
    method: "DELETE",
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
  // console.log(data);
  return data;
}

//remote variables
export async function getRemoteVariables({ branch, type, mail }) {
  const res = await fetch(
    `${serverPort}/api/v1/auth/variables?branch=${branch}&type=${type}&mail=${mail}`
  );
  const data = await res.json();

  //THIS LINE IS NECESSARY FOR ONERROR
  // console.log(data);
  return data;
}

export async function toggleRemoteVariables(variable) {
  const res = await fetch(`${serverPort}/api/v1/auth/variables`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(variable),
  });
  const data = await res.json();

  //THIS LINE IS NECESSARY FOR ONERROR
  if (res.status !== 200) throw new Error(data.message);
  return data;
}

export async function getGrades(mail) {
  const res = await fetch(`${serverPort}/api/v1/students/grades`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mail),
  });
  const data = await res.json();

  //THIS LINE IS NECESSARY FOR ONERROR
  // console.log(data);
  return data;
}

export async function getFacultyBranch(mail) {
  const res = await fetch(`${serverPort}/api/v1/faculty`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mail),
  });
  const data = await res.json();

  //THIS LINE IS NECESSARY FOR ONERROR
  // console.log(data);
  return data;
}
