import supabase from "../supabase.js";
export async function getEvents(req, res) {
  console.log("GET EVENTS");
  try {
    let { data, error } = await supabase.from("events").select("*");
    console.log(data);
    if (error)
      res
        .status(401)
        .json({ status: "fail", message: "Failed to fetch the events" });
    res.status(200).json({ status: "success", results: data?.length, data });
  } catch (err) {
    console.log(err);
  }
}

export async function createEvent(req, res) {
  console.log("CREATE-EVENT");
  try {
    console.log(req.body);
    const {
      eventName,
      eventStartDate,
      eventEndDate,
      eventDescription,
      eventType,
      eventBranch,
    } = req.body;

    const { data: newEvent, error } = await supabase
      .from("events")
      .insert([
        {
          name: eventName,
          startDate: eventStartDate,
          endDate: eventEndDate,
          description: eventDescription,
          type: eventType,
          branch: eventBranch,
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
  console.log("DELETE-EVENT");

  try {
    console.log(req.body);
    const { eventId } = req.body;

    const { error } = await supabase.from("events").delete().eq("id", eventId);

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

export async function updateEvent(req, res) {
  console.log("UPDATE-EVENT");
  try {
    console.log(req.body);
    const {
      eventId,
      eventName,
      eventStartDate,
      eventEndDate,
      eventDescription,
      eventType,
      eventBranch,
    } = req.body;

    // Perform the update operation
    const { data: updatedEvent, error } = await supabase
      .from("events")
      .update({
        name: eventName,
        startDate: eventStartDate,
        endDate: eventEndDate,
        description: eventDescription,
        type: eventType,
        branch: eventBranch,
      })
      .eq("id", eventId)
      .select("*");

    if (error) {
      res.status(400).json({ status: "fail", message: error.message });
      console.log(error);
    } else {
      res.status(200).json({ status: "success", updatedEvent });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err.message });
  }
}
