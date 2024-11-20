import React, { useEffect, useState } from "react";
// import emailjs from "@emailjs/browser";
import useGroup from "./useGroup";
import validateEmail from "../../helpers/emailValidate";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateMembers from "./useMembers";
import EmptyComponent from "../../ui/EmptyComponent";
import toast from "react-hot-toast";

function ModalGroupInitiation({ setShowModal }) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const inGroup = queryClient.getQueryData(["team"]);
  const { initializeGroup, isPending } = useGroup();
  const { updateMembers, isPending: isPending2 } = useUpdateMembers();
  const [group, setGroup] = useState("");
  const [leader, setLeader] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!group || !leader) return toast.error("All Fields are required");

    if (!validateEmail(leader)) {
      return toast.error("Invalid email");
    }

    const lowercaseLeader = leader.toLowerCase();

    initializeGroup({
      group,
      leader: lowercaseLeader,
    });

    if (lowercaseLeader !== user?.user?.mail) {
      console.log("LEADER IS NOT EQUAL TO THE USER");
      updateMembers({ group, member1: user?.user?.mail });
    }
    console.log("LEADER IS EQUAL TO THE USER");

    setShowModal("");
    setGroup("");
    setLeader("");
  }

  return (
    <div className="add-students">
      <button
        className="btn-close"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(false);
        }}
      >
        &times;
      </button>
      <form className="add-students-form" onSubmit={handleSubmit}>
        {inGroup?.data?.length ? (
          <EmptyComponent msg={"❗You are already in a group❗"} size={32} />
        ) : (
          <>
            <h3>GROUP INITIATION</h3>
            <div className="full-length-input">
              <label htmlFor="group">GROUP NAME</label>
              <input
                type="text"
                name="group"
                id="group"
                placeholder="GROUP NAME"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              />
            </div>
            <h3>TEAM LEADER DETAILS</h3>
            <div className="full-length-input">
              <label htmlFor="leader">MAIL</label>
              <input
                type="text"
                name="leader"
                id="leader"
                placeholder="LEADER MAIL"
                value={leader}
                onChange={(e) => setLeader(e.target.value)}
              />
            </div>
            <button type="submit" className="view-report" disabled={isPending}>
              {isPending || isPending2 ? "CREATING GROUP..." : "CREATE GROUP"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default ModalGroupInitiation;
