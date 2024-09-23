export default function extractMails(groupData) {
  const emails = [
    groupData?.leader,
    groupData?.member1,
    groupData?.member2,
    groupData?.member3,
    groupData?.member4,
    groupData?.member5,
  ].filter((email) => email !== null); // Filter out null values

  return emails;
}
