import { cloneElement, useEffect, useState } from "react";

function MemberInput({ number, members, setMembers, remainingMembers }) {
  const [member, setMember] = useState(members[number - 1] || ""); // Initialize with current value if exists

  const handleInputChange = (e) => {
    const updatedMember = e.target.value;
    setMember(updatedMember); // Update local state

    // Update the members array at the specific index
    setMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      console.log(number);
      updatedMembers[number] = updatedMember;
      return updatedMembers;
    });
  };
  return (
    <div className="full-length-input">
      <label htmlFor="member1">MEMBER {number}</label>
      <input
        type="text"
        name={`member${number}`}
        id={`member${number}`}
        placeholder={`MEMBER ${number} MAIL`}
        value={member}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default MemberInput;
