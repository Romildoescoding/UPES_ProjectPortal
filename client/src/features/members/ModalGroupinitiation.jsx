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
  const { initializeGroup, isPending, isSuccess, isError } = useGroup();
  const { updateMembers, isPending: isPending2 } = useUpdateMembers();
  const [group, setGroup] = useState("");
  const [leader, setLeader] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (group === "" || !validateEmail(leader)) {
      console.log("INVALID EMAIL OR TEAM NAME");
      return;
    }

    initializeGroup({
      group,
      leader,
    });

    if (leader !== user?.user?.mail) {
      updateMembers({ group, member1: user?.user?.mail });
    }

    setShowModal("");
    setGroup("");
    setLeader("");
  }

  // useEffect to handle success and error for group initiation
  // useEffect(() => {
  //   console.log(isSuccess, isError);
  //   if (isSuccess) {
  //     toast.success("Group Initiated Successfully");
  //     queryClient.invalidateQueries(["team"]);
  //   }

  //   if (isError) {
  //     toast.error("Group Initiation Failed");
  //   }
  // }, [isSuccess, isError, queryClient]);

  return (
    <div className="add-students">
      <form className="add-students-form" onSubmit={handleSubmit}>
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(false);
          }}
        >
          &times;
        </button>
        {inGroup?.data?.length ? (
          <EmptyComponent msg={"❗You are already in a group❗"} size={32} />
        ) : (
          <>
            <h3>GROUP INITIATION</h3>
            <div className="centered-input">
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
            <div className="full-length-names">
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
            <button type="submit" className="btn-colored" disabled={isPending}>
              {isPending || isPending2 ? "CREATING GROUP..." : "CREATE GROUP"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default ModalGroupInitiation;
