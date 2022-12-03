require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./db/mongoose_connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//? Routes

// * APC
const member = require("./routes/member");
const sponsor = require("./routes/sponsor");
const sponsorByRef = require("./routes/sponsorByRef");
const agentBySponsorCode = require("./routes/agentBySponsorCode");
const pdfloader = require("./routes/pdf");
//! Agent
const agent = require("./routes/agent");
const agentSort = require("./routes/agentSort");
const agentByState = require("./routes/agentByState");
const agentByNin = require("./routes/agentByNin");
const agentByEmail = require("./routes/agentByEmail");
const agentsAll = require("./routes/agentAll");
// const mailer = require("./routes/mailer");

//! Remove Nodemon from Dependency when data is avaliable
//! Leave Nodemon in Dev-Dependency
//! Run npm i
//! Delete Comment

const port = process.env.PORT || 3007;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`Success - Server is runnuing on port: ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

app.get("/", (req, res) => {
  res.send("Reached Election Data API");
});
//? Middleware
app.use(express.json());
app.use(express.static("./public"));
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  next();
});

//? Routes

//! APC
app.use("/api/v1/agent", agent);
app.use("/api/v1/agents_by_state", agentByState);
app.use("/api/v1/member", member);
app.use("/api/v1/pdfloader", pdfloader);
app.use("/api/v1/agent_by_nin", agentByNin);
app.use("/api/v1/agent_by_email", agentByEmail);
app.use("/api/v1/sponsor", sponsor);
app.use("/api/v1/sponsor_code", agentBySponsorCode);
app.use("/api/v1/sponsor_by_ref", sponsorByRef);
app.use("/api/v1/agent_sort", agentSort);

// app.use("/api/v1/ ", agentsAll);
// app.use("/api/v1/mailer", mailer);

//? Error Managers
app.use(notFound);
app.use(errorHandlerMiddleware);

// http://localhost:3000/api/staterep/add
