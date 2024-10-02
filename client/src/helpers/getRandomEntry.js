export default function getRandomEntry(arr, facultyName = "") {
  console.log(arr);
  arr = arr?.filter((ele) => ele.name !== facultyName);
  const randomIndex = Math.floor(Math.random() * arr.length);
  console.log(arr?.[randomIndex]);
  return arr?.[randomIndex];
}
