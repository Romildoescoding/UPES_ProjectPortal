export async function getEvents(req, res) {
  try {
    let { data, error } = await supabase.from("events").select("*");
    res.status(200).json({ status: "success", results: data.length, data });
  } catch (err) {
    console.log(err);
  }
}
export async function createEvent(req, res) {
  console.log("CREATEGROUP");
  try {
    console.log(req.body);
    const { eventName, eventDate, eventDescription } = req.body;

    const { data: newEvent, error } = await supabase
      .from("events")
      .insert([
        { name: eventName, date: eventDate, description: eventDescription },
      ])
      .select("*");

    if (error) {
      res.status(400).json({ status: "fail", message: error.message });
      console.log(error);
    } else res.status(200).json({ status: "success", newEvent });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err });
  }
}
