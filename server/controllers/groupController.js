import supabase from "../supabase.js";

export async function getAllGroups(req, res) {
  console.log("GETALLMEMBERS");
  let { group, student } = req.query;
  console.log(group, student);

  //INCASE THE USER NEED THE GROUP DATA BASED OFF OF A GROUP NAME
  if (group) {
    let { data } = await supabase
      .from("groups")
      .select("*")
      .eq("group_name", group);
    res.status(200).json({ status: "success", data });
    return;
  }

  //INCASE THE USER NEED THE GROUP DATA BASED OFF OF A GROUP LEADER
  if (student) {
    const { data } = await supabase
      .from("groups")
      .select("*")
      .or(
        `leader.eq.${student},member1.eq.${student},member2.eq.${student},member3.eq.${student}`
      );

    res.status(200).json({ status: "success", data: data[0] });
    return;
  }
  try {
    let { data: groups } = await supabase.from("groups").select("*");
    res
      .status(200)
      .json({ status: "success", results: groups.length, data: groups });
  } catch (err) {
    console.log(err);
    res.status(401).json({ status: "fail", message: err });
  }
}

export async function createGroup(req, res) {
  console.log("CREATEGROUP");
  try {
    console.log(req.body);
    const { group, leader } = req.body;

    const { data: newGroup, error } = await supabase
      .from("groups")
      .insert([{ group_name: group, leader: leader }])
      .select("*");

    if (error) console.log(error);
    res.status(200).json({ status: "success", newGroup });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err });
  }
}

export async function updateMembers(req, res) {
  console.log("UPDATEMEMBERS");
  try {
    const { group, member1, member2, member3 } = req.body;
    // Build the update object dynamically
    const updateData = {};
    if (member1) updateData.member1 = member1;
    if (member2) updateData.member2 = member2;
    if (member3) updateData.member3 = member3;
    // if (member4) updateData.member4 = member4;
    // if (member5) updateData.member5 = member5;

    // Only proceed with update if there's something to update
    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ status: "fail", message: "No valid fields to update" });
    }

    const { data: updatedGroup, error } = await supabase
      .from("groups")
      .update(updateData)
      .eq("group_name", group)
      .select("*");

    if (error) console.log(error);
    res.status(200).json({ status: "success", updatedGroup });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err });
  }
}

export async function getMembersInfo(req, res) {
  console.log("GETMEMBERSINFO");
  try {
    let { student, group_name } = req.query; // Extract student email from query

    // Fetch group data where the student is either a leader or member
    let query = supabase.from("groups").select("*");
    if (student) {
      query = query.or(
        `leader.eq.${student},member1.eq.${student},member2.eq.${student},member3.eq.${student}`
      );
    }

    if (group_name) {
      query = query.eq("group_name", group_name);
    }
    const { data: groupData, error } = await query;

    if (error) {
      return res.status(500).json({
        status: "fail",
        message: "Error while fetching group data",
      });
    }

    // Check if any group data was found
    if (!groupData || !groupData.length) {
      return res.status(200).json({
        status: "fail",
        message: "Group not found",
        data: [],
      });
    }

    // Extract members from the group data
    const group = groupData[0]; // Assuming there is only one group
    const members = [
      group.leader,
      group.member1,
      group.member2,
      group.member3,
    ].filter((email) => email !== null); // Filter out null values

    // Fetch details of each member
    const memberDetails = await Promise.all(
      members.map(async (member) => {
        const { data: studentData, error } = await supabase
          .from("students")
          .select("name, mail, contact")
          .eq("mail", member)
          .single(); // Fetch single student data

        if (error) {
          console.log(`Error fetching data for member ${member}:`, error);
          return null;
        }

        return {
          ...studentData,
          position: member === group.leader ? "leader" : "member",
        };
      })
    );

    // Filter out any null values in case of errors during fetching member data
    const filteredMemberDetails = memberDetails.filter(
      (member) => member !== null
    );

    res.status(200).json({
      status: "success",
      group,
      data: filteredMemberDetails,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
}
