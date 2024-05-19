// index.js
const express = require("express");
const createEnrollmentTicket = require("./createEnrollmentTicket");
const createTotpEnrollment = require("./createTotpEnrollment");
const getUserByEmail = require("./User/getUserByEmail");
const getEnrollmentURI = require("./MFA/enrollmentURI");
const authenticateForToken = require("./MFA/authenticateForToken");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/enroll-totp", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send("userId is required");
  }

  try {
    const enrollment = await createTotpEnrollment(userId);
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/create-enrollment-ticket", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send("userId is required");
  }

  try {
    const ticket = await createEnrollmentTicket(userId);
    res.status(200).json({ ticket });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/user-by-email", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  try {
    const user = await getUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/mfaToken", async (req, res) => {
  try {
    const mfaTokenData = await authenticateForToken();
    const enrollment = await getEnrollmentURI(mfaTokenData);
    res.json(enrollment);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
