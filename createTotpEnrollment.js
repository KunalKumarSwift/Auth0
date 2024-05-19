// createTotpEnrollment.js
const axios = require("axios");
const { getManagementApiToken } = require("./Utils/auth0Utils");
const config = require("./Config/config");

async function createTotpEnrollment(userId) {
  try {
    const token = await getManagementApiToken();

    const response = await axios.post(
      `https://${config.auth0.domain}/api/v2/users/${userId}/authentication-methods`,
      {
        type: "totp",
        // Random 32 secret
        totp_secret: "3SLSWZPQQBB7WBRYDAQZ5J77W5D7I6GU",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating TOTP enrollment:", error);
    throw new Error("Could not create TOTP enrollment");
  }
}

module.exports = createTotpEnrollment;
