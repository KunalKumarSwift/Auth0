// createEnrollmentTicket.js
const axios = require("axios");
const { getManagementApiToken } = require("./Utils/auth0Utils");
const config = require("./Config/config");

async function createEnrollmentTicket(userId) {
  try {
    const token = await getManagementApiToken();

    const response = await axios.post(
      `https://${config.auth0.domain}/api/v2/tickets/email-verification`,
      {
        user_id: userId,
        result_url: "https://yourapp.com/post-verification", // Replace with your actual URL
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.ticket;
  } catch (error) {
    console.error("Error creating enrollment ticket:", error);
    throw new Error("Could not create enrollment ticket");
  }
}

module.exports = createEnrollmentTicket;
