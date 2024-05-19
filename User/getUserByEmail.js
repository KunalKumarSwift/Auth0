// getUserByEmail.js
const axios = require("axios");
const { getManagementApiToken } = require("../Utils/auth0Utils");
const config = require("../Config/config");

async function getUserByEmail(email) {
  try {
    const token = await getManagementApiToken();

    const response = await axios.get(
      `https://${config.auth0.domain}/api/v2/users-by-email`,
      {
        params: { email: email },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.length === 0) {
      throw new Error("User not found");
    }

    return response.data[0]; // Assuming the first user in the response is the intended one
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Could not fetch user by email");
  }
}

module.exports = getUserByEmail;
