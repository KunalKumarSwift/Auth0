const axios = require("axios").default;
const config = require("../Config/config");

async function authenticateForToken() {
  const options = {
    method: "POST",
    url: `https://${config.auth0.domain}/oauth/token`,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "password",
      username: "kunaldhiman.pu@gmail.com",
      password: "Scotiatest@123",
      client_id: `${config.auth0.clientId}`,
      client_secret: `${config.auth0.clientSecret}`,
      //audience: `${config.auth0.audience}`,
      scope: "openid profile enroll",
    }),
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response.status == 403 && error.response.data) {
      const mfaToken = error.response.data.mfa_token;
      return mfaToken;
    } else {
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
}

module.exports = authenticateForToken;
