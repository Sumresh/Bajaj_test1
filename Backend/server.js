// // const mongoose = require("mongoose");

// // mongoose.connect("mongodb://localhost:27017/bfhl", {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });

// // const db = mongoose.connection;
// // db.on("error", console.error.bind(console, "connection error:"));
// // db.once("open", () => {
// //   console.log("Connected to MongoDB");
// // });

// // // Define a schema and model (optional)
// // const requestSchema = new mongoose.Schema({
// //   data: Array,
// //   response: Object,
// //   created_at: { type: Date, default: Date.now },
// // });

// // const RequestLog = mongoose.model("RequestLog", requestSchema);

// // // Save request log (optional)
// // app.post("/bfhl", (req, res) => {
// //   const data = req.body.data || [];
// //   const numbers = data.filter((item) => !isNaN(item));
// //   const alphabets = data.filter((item) => isNaN(item));
// //   const highestAlphabet = alphabets.reduce(
// //     (a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b),
// //     ""
// //   );

// //   const response = {
// //     is_success: true,
// //     user_id: "john_doe_17091999",
// //     email: "your_college_email@example.com",
// //     roll_number: "YourRollNumber",
// //     numbers: numbers,
// //     alphabets: alphabets,
// //     highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
// //   };

// //   // Save to MongoDB (optional)
// //   const log = new RequestLog({ data, response });
// //   log.save().then(() => console.log("Request logged"));

// //   res.status(200).json(response);
// // });

// const express = require("express");
// const mongoose = require("mongoose");

// // Initialize Express app
// const app = express();
// const port = 3001; // You can change this to any port you prefer

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/bfhl", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// // Define a schema and model
// const requestSchema = new mongoose.Schema({
//   data: Array,
//   response: Object,
//   created_at: { type: Date, default: Date.now },
// });

// const RequestLog = mongoose.model("RequestLog", requestSchema);

// // Define a POST route
// app.post("/bfhl", (req, res) => {
//   const data = Array.isArray(req.body.data) ? req.body.data : [];
//   //   const data = req.body.data || [];
//   const numbers = data.filter((item) => !isNaN(item));
//   const alphabets = data.filter((item) => isNaN(item));
//   const highestAlphabet = alphabets.reduce(
//     (a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b),
//     ""
//   );

//   const response = {
//     is_success: true,
//     user_id: "john_doe_17091999",
//     email: "your_college_email@example.com",
//     roll_number: "YourRollNumber",
//     numbers: numbers,
//     alphabets: alphabets,
//     highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
//   };

//   // Save to MongoDB
//   const log = new RequestLog({ data, response });
//   log.save().then(() => console.log("Request logged"));

//   res.status(200).json(response);
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors"); // Import cors

// // Initialize Express app
// const app = express();
// const port = 3001; // You can change this to any port you prefer

// // Middleware to parse JSON bodies and enable CORS
// app.use(express.json());
// app.use(cors()); // Enable CORS

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/bfhl", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// // Define a schema and model
// const requestSchema = new mongoose.Schema({
//   data: Array,
//   response: Object,
//   created_at: { type: Date, default: Date.now },
// });

// const RequestLog = mongoose.model("RequestLog", requestSchema);

// // Define a POST route
// app.post("/bfhl", (req, res) => {
//   const data = req.body.data || [];
//   const numbers = data.filter((item) => !isNaN(item));
//   const alphabets = data.filter((item) => isNaN(item));
//   const highestAlphabet = alphabets.reduce(
//     (a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b),
//     ""
//   );

//   const response = {
//     is_success: true,
//     user_id: "john_doe_17091999",
//     email: "your_college_email@example.com",
//     roll_number: "YourRollNumber",
//     numbers: numbers,
//     alphabets: alphabets,
//     highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
//   };

//   // Save to MongoDB
//   const log = new RequestLog({ data, response });
//   log.save().then(() => console.log("Request logged"));

//   res.status(200).json(response);
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require("express");
const cors = require("cors");

// Initialize Express app
const app = express();
const port = 3001; // You can change this to any port you prefer

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors()); // Enable CORS

// Define a POST route
app.post("/bfhl", (req, res) => {
  const data = req.body.data || [];
  if (!Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, message: "Invalid data format" });
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highestAlphabet = alphabets.reduce(
    (a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b),
    ""
  );

  const response = {
    is_success: true,
    user_id: "john_doe_17091999",
    email: "your_college_email@example.com",
    roll_number: "YourRollNumber",
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
  };

  res.status(200).json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
