import { useEffect, useState } from "react";
import validateEmail from "../../helpers/emailValidate";
import useMembers from "./useMembers";
import { useQueryClient } from "@tanstack/react-query";
import MemberInput from "../../ui/MemberInput";
import EmptyComponent from "../../ui/EmptyComponent";
import { useUser } from "../authentication/signin/useUser";
import useTeamInformation from "./useTeamInformation";
import toast from "react-hot-toast";

function ModalAddStudents({ setShowModal }) {
  const queryClient = useQueryClient();
  const [remainingMembers, setRemainingMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const { updateMembers, isLoading } = useMembers();
  const group = queryClient.getQueryData(["team"]);

  const { data, isPending } = useUser();
  const user = data?.user;

  const { data: team, isPending: isPending2 } = useTeamInformation({ user });

  useEffect(() => {
    let remainingLen = 4 - group?.data?.length;
    console.log(remainingLen, 4 - remainingMembers.length);
    setRemainingMembers(Array.from({ length: remainingLen }, () => 0));
  }, [group?.data?.length, remainingMembers.length]);
  console.log();

  function handleSubmit(e) {
    e.preventDefault();

    let membersToSubmit = members.filter((member) => member);
    console.log(membersToSubmit, remainingMembers);
    if (membersToSubmit.length !== remainingMembers.length) {
      console.log("INVALID EMAILS");
      return;
    }

    // Use reduce to create a single object from the members array
    membersToSubmit = membersToSubmit.reduce((acc, mail, i) => {
      acc[`member${4 - remainingMembers.length + i}`] = mail; // Create dynamic keys
      return acc;
    }, {}); // Start with an empty object

    console.log(membersToSubmit);
    updateMembers({ group: group.group.group_name, ...membersToSubmit });
    setShowModal("");
  }

  return (
    <div className="add-students">
      <form className="add-students-form" onSubmit={handleSubmit}>
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            setShowModal("");
          }}
        >
          &times;
        </button>
        {!team?.data?.length ? (
          <EmptyComponent msg={"❗Initialize a Group First❗"} size={32} />
        ) : !remainingMembers.length ? (
          <EmptyComponent
            msg={"❗Group is full. Unable to add more members❗"}
            size={32}
          />
        ) : (
          <>
            <h3>STUDENTS DETAILS</h3>
            <div className="centered-input">
              <label htmlFor="teamName">TEAM NAME</label>
              <input
                type="text"
                name="teamName"
                id="teamName"
                placeholder="TEAM NAME"
                value={group?.group?.group_name}
                disabled={true}
              />
            </div>
            {remainingMembers.map((_, i) => (
              <MemberInput
                key={i}
                number={4 - remainingMembers.length + i}
                remainingMembers={remainingMembers}
                members={members}
                setMembers={setMembers}
              />
            ))}
            <button type="submit" className="btn-black" disabled={isLoading}>
              {isLoading ? "SENDING..." : "SEND"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default ModalAddStudents;
