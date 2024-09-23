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
