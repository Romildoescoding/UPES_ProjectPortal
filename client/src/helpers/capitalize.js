export default function capitalize(str) {
  if (typeof str !== "string" || str.length === 0) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Example usage:
console.log(capitalize("hello world")); // Output: "Hello world"
