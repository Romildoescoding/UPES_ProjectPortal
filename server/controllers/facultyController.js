import supabase from "../supabase.js";

// let { data: faculty, error } = await supabase
// .from('faculty')
// .select("*")

// // Filters
// .eq('column', 'Equal to')
// .gt('column', 'Greater than')
// .lt('column', 'Less than')
// .gte('column', 'Greater than or equal to')
// .lte('column', 'Less than or equal to')
// .like('column', '%CaseSensitive%')
// .ilike('column', '%CaseInsensitive%')
// .is('column', null)
// .in('column', ['Array', 'Values'])
// .neq('column', 'Not equal to')

// // Arrays
// .contains('array_column', ['array', 'contains'])
// .containedBy('array_column', ['contained', 'by'])

export async function getAllFaculties(req, res) {
  try {
    let { data, error } = await supabase.from("faculty").select("*");
    res.status(200).json({ status: "success", results: data.length, data });
  } catch (err) {
    console.log(err);
  }
}

export async function getFaculty(req, res) {
  try {
    let { data, error } = await supabase
      .from("faculty")
      .select("*")
      .eq("mail", req.params.mail);
    res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
  }
}
