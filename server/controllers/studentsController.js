import supabase from "../supabase.js";
export async function getAllStudents(req, res) {
  try {
    let { data, error } = await supabase.from("students").select("*");
    res.status(200).json({ status: "success", results: data.length, data });
  } catch (err) {
    console.log(err);
  }
}

export async function getStudent(req, res) {
  try {
    let { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("mail", req.params.mail);
    res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
  }
}

export async function getGrades(req, res) {
  try {
    const { mail } = req.body;

    // Query grades along with event details using a join
    let { data, error } = await supabase
      .from("grades")
      .select("*")
      .eq("mail", mail);

    // Handle potential errors
    if (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }

    // const eventIds = data.map((grade) => grade["event-id"]);
    // console.log(eventIds);

    // Respond with the grades and event details
    res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}
