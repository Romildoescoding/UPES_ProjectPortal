import { serverPort } from "../../client/src/helpers/backendApi.js";
import supabase from "../supabase.js";

export async function getProjects(req, res) {
  console.log("GETPROJECTS");
  try {
    console.log(req.query);
    let query = supabase.from("projects").select("*");

    //PENDING
    const { mentor, panel, isMentorAccepted, isPanelNull } = req.query;
    if (mentor) {
      query = query
        .eq("mentor", mentor)
        .eq("is_mentor_accepted", isMentorAccepted);
    }
    if (isPanelNull && isPanelNull !== "undefined") {
      console.log("isPanelRun");
      query = query.or("panel_member1.is.null,panel_member2.is.null");
    }

    if (panel && panel !== "undefined") {
      console.log("Panel run");
      query = query.or(`panel_member1.eq.${panel},panel_member2.eq.${panel}`);
    }

    let { data, error } = await query;

    if (error) {
      console.log(error);
    }
    res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err });
  }
}

//POST /projects/group
export async function getProjectByGroup(req, res) {
  console.log("GET_PROJECTS_BY_GROUP_NAME");
  try {
    const { group_name } = req.body;
    let { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("group_name", group_name);

    if (error) {
      res.status(400).json({ status: "fail", message: err.message });
      console.log(error);
    }
    console.log(data);
    res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err });
  }
}

//TAKES IN MAIL OF THE FACULTY AS AN INPUT

//MAIL CONFIRMATION PENDING MAYBE FRONTEND MIGHT BE OKAY FOR THIS ONE.
export async function setMentor(req, res) {
  console.log("SETMENTOR");

  try {
    let { faculty, group } = req.body;
    console.log(req.body);
    //CHECK IF THE FACULTY EVEN EXISTS OR NOT
    let { data: faculties } = await supabase
      .from("faculty")
      .select("name")
      .eq("mail", faculty);

    if (!faculties.length)
      res
        .status(404)
        .json({ status: "fail", message: "Faculty does not exist" });

    const { data } = await supabase
      .from("projects")
      .update({ mentor: faculties[0].name })
      .eq("group_name", group)
      .select("*");

    res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: err });
  }
}

//TAKES IN THE MAIL OF THE PANELISTS AS ARRAY FOR INPUT ALONG WITH THE GROUP NAME
export async function setPanelMembers(req, res) {
  console.log("SETPANELS");
  console.log(req.body);
  try {
    let { panelists, group } = req.body;

    //CHECK IF THE FACULTY EVEN EXISTS OR NOT
    //CHECK FOR PANEL MEMBER1
    let { data: panel1 } = await supabase
      .from("faculty")
      .select("name")
      .eq("mail", panelists[0]);

    if (!panel1.length)
      res.status(404).json({
        status: "fail",
        message: `Faculty ${panelists[0]} does not exist`,
      });

    //CHECK FOR PANEL MEMBER2
    let { data: panel2 } = await supabase
      .from("faculty")
      .select("name")
      .eq("mail", panelists[1]);

    if (!panel2.length)
      res.status(404).json({
        status: "fail",
        message: `Faculty ${panelists[1]} does not exist`,
      });

    //IF BOTH THE FACULTY EXISTS, THEN UPDATE THEM...

    const { data } = await supabase
      .from("projects")
      .update({
        panel_member1: panel1[0].name,
        panel_member2: panel2[0].name,
      })
      .eq("group_name", group)
      .select("*");

    res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: err });
  }
}

// Function to decode base64 to buffer (HELPER)
function decodeBase64(base64Str) {
  // Remove the data URL scheme if present
  const base64Data = base64Str.replace(/^data:.+;base64,/, "");
  return Buffer.from(base64Data, "base64");
}

// Function to extract file extension from base64 string
function getFileExtension(base64Str) {
  const matches = base64Str.match(/^data:(.*);base64,/);
  if (matches && matches[1]) {
    const mimeType = matches[1];
    const mimeTypes = {
      "application/pdf": "pdf",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        "pptx",
      // Add other mime types as needed
    };
    return mimeTypes[mimeType] || "bin"; // Default to 'bin' for unknown types
  }
  return "bin"; // Default to 'bin' if mime type is not found
}

//title
//group_name
//technologies
export async function createProject(req, res) {
  console.log("CREATEPROJECTS");

  try {
    // Log body and files to see the data received
    const { title, technologies, group_name, report, isUpdating, oldFilePath } =
      req.body;
    if (report) {
      // Decode the base64 file
      const reportBuffer = decodeBase64(report);

      // Extract file extension
      const fileExtension = getFileExtension(report);
      const fileName = `${Math.random()}-report.${fileExtension}`;

      // Construct the file path
      const filePath = `${process.env.SUPABASE_URL}/storage/v1/object/public/reports/${fileName}`;
      console.log(filePath, fileName);

      // IF THE USER IS UPLDATING THE PROJECT DETAILS WHEN HE HAS ALREADY UPLOADED THOSE DETAILS PREVIOUSLY
      if (isUpdating && group_name) {
        // Update the existing project based on group_name
        const { data: updateData, error: updateError } = await supabase
          .from("projects")
          .update({
            group_name,
            technologies,
            title,
            report: filePath,
          })
          .eq("group_name", group_name) // Update based on group_name
          .select()
          .single();

        if (updateError) {
          console.error(updateError);
          return res.status(404).json({ status: "fail", message: updateError });
        }

        // Upload the decoded file to Supabase storage
        const { error: uploadError } = await supabase.storage
          .from("reports")
          .upload(fileName, reportBuffer);

        if (uploadError) {
          console.error(uploadError);
          return res.status(500).json({ message: "Failed to upload report" });
        }

        // Extract the file name from the old URL
        if (oldFilePath) {
          const oldFileName = oldFilePath.split("/").pop();

          // Delete the previous file from the storage bucket
          const { error: deleteError } = await supabase.storage
            .from("reports")
            .remove([oldFileName]);

          if (deleteError) {
            console.error("Error deleting the old file:", deleteError);
            return res
              .status(500)
              .json({ message: "Failed to delete old report" });
          }

          console.log(`Deleted old file: ${oldFileName}`);
        }

        return res.status(200).json({ status: "success", data: updateData });
      } else {
        // IF THE USER IS UPLOADING THE PROJECT DETAILS THE FIRST TIME AND IS NOT REQUIRED
        // TO UPLOAD THE PROJECT REPORT BUT STILL UPLOADS THE PROJECT
        const { data, error } = await supabase
          .from("projects")
          .insert([
            {
              group_name,
              technologies,
              title,
              report: filePath,
            },
          ])
          .select()
          .single();

        if (error) {
          console.error(error);
          return res.status(404).json({ status: "fail", message: error });
        }

        // Upload the decoded file to Supabase storage
        const { error: uploadError } = await supabase.storage
          .from("reports")
          .upload(fileName, reportBuffer);

        if (uploadError) {
          console.error(uploadError);
          return res.status(500).json({ message: "Failed to upload report" });
        }

        // Success response
        return res.status(200).json({ status: "success", data });
      }
    } else {
      // IF THE USER IS UPLOADING THE PROJECT DETAILS THE FIRST TIME AND IS NOT REQUIRED
      // TO UPLOAD THE PROJECT REPORT
      const { data, error } = await supabase
        .from("projects")
        .insert([
          {
            group_name,
            technologies,
            title,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error(error);
        return res.status(404).json({ status: "fail", message: error });
      }

      // Success response
      return res.status(200).json({ status: "success", data });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
}

export async function handleRequest(req, res) {
  console.log("HANDLEREQUEST");
  try {
    const { isMentorAccepted, group_name } = req.body;

    if (isMentorAccepted === false) {
      const { data, error } = await supabase
        .from("projects")
        .update({ mentor: null })
        .eq("group_name", group_name)
        .select("*");
    } else {
      const { data, error } = await supabase
        .from("projects")
        .update({ is_mentor_accepted: isMentorAccepted })
        .eq("group_name", group_name)
        .select("*");
    }
    if (error) {
      console.log(error);
      res.status(400).json({ status: "fail", message: error });
    }

    res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: err });
  }
}
