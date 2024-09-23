// import dotenv from "dotenv";
// dotenv.config({ path: "./config.env" });

import app from "./index.js"; // Import your app after loading env variables

const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
