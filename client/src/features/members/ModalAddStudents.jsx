import { useEffect, useState } from "react";
import validateEmail from "../../helpers/emailValidate";
import useMembers from "./useMembers";
import { useQueryClient } from "@tanstack/react-query";
import MemberInput from "../../ui/MemberInput";
import EmptyComponent from "../../ui/EmptyComponent";

function ModalAddStudents({ setShowModal }) {
  const queryClient = useQueryClient();
  // const [team, setTeam] = useState("");
  const [remainingMembers, setRemainingMembers] = useState([]);
  // const [member1, setMember1] = useState("");
  // const [member2, setMember2] = useState("");
  // const [member3, setMember3] = useState("");
  const [members, setMembers] = useState([]);
  const { updateMembers, isLoading } = useMembers();
  const group = queryClient.getQueryData(["team"]);

  useEffect(() => {
    let remainingLen = 4 - group?.data?.length;
    setRemainingMembers(Array.from({ length: remainingLen }, () => 0));
  }, [group?.data?.length]);
  console.log();

  function handleSubmit(e) {
    e.preventDefault();

    let membersToSubmit = members.filter((member) => member !== "");
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
        {!remainingMembers.length ? (
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
                number={i + remainingMembers.length}
                remainingMembers={remainingMembers}
                members={members}
                setMembers={setMembers}
              />
            ))}
            {/* <div className="full-length-input">
          <label htmlFor="member1">PARTICIPANT 1</label>
          <input
          type="text"
          name="member1"
          id="member1"
          placeholder="PARTICIPANT 1 MAIL ID"
          value={member1}
          onChange={(e) => setMember1(e.target.value)}
          />
          </div>
          <div className="full-length-input">
          <label htmlFor="member2">PARTICIPANT 2</label>
          <input
          type="text"
          name="member2"
          id="member2"
          placeholder="PARTICIPANT 2 MAIL ID"
          value={member2}
          onChange={(e) => setMember2(e.target.value)}
          />
          </div>
          <div className="full-length-input">
          <label htmlFor="member3">PARTICIPANT 3</label>
          <input
          type="text"
          name="member3"
          id="member3"
          placeholder="PARTICIPANT 3 MAIL ID"
          value={member3}
          onChange={(e) => setMember3(e.target.value)}
          />
          </div> */}
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
