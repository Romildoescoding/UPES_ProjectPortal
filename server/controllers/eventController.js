import supabase from "../supabase.js";
export async function getEvents(req, res) {
  console.log("GET EVENTS");
  try {
    let { data, error } = await supabase.from("events").select("*");
    console.log(data);
    res.status(200).json({ status: "success", results: data.length, data });
  } catch (err) {
    console.log(err);
  }
}

export async function createEvent(req, res) {
  console.log("CREATEGROUP");
  try {
    console.log(req.body);
    const { eventName, eventDate, eventDescription, eventType } = req.body;

    const { data: newEvent, error } = await supabase
      .from("events")
      .insert([
        {
          name: eventName,
          date: eventDate,
          description: eventDescription,
          type: eventType,
        },
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

export async function deleteEvent(req, res) {
  console.log("DELETEEVENT");

  try {
    console.log(req.body);
    const { eventName } = req.body;

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("name", eventName);

    if (error) {
      console.error(error);
      return res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }

    // Success case
    return res.status(200).json({
      status: "success",
      message: "Event deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "fail",
      message: "Server error",
    });
  }
}
