const axios = require("axios").default;
const config = require("../Config/config");

async function getEnrollmentURI(mfaToken) {
  const options = {
    method: "POST",
    url: `https://${config.auth0.domain}/mfa/associate`,
    headers: {
      authorization: `Bearer ${mfaToken}`,
      "content-type": "application/json",
    },
    data: {
      authenticator_types: ["oob"],
      oob_channels: ["auth0"],
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
      console.error("Error Response Status:", error.response.status);
      console.error("Error Response Headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error Request Data:", error.request);
    } else {
      console.error("Error Message:", error.message);
    }
    console.error("Error Config:", error.config);
    console.error("Error obtaining token:", error);
    throw error;
  }
}

module.exports = getEnrollmentURI;
