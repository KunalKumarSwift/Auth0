const config = require("../Config/config");
const axios = require("axios");

const AudienceType = {
  MANAGEMENT_API: "management_api",
  MFA_API: "mfa_api",
};

async function getManagementApiToken(
  audienceType = AudienceType.MANAGEMENT_API
) {
  try {
    let audience;
    switch (audienceType) {
      case AudienceType.MANAGEMENT_API:
        audience = config.auth0.audience;
        break;
      case AudienceType.MFA_API:
        audience = `https://${config.auth0.domain}/mfa/`;
        break;
      default:
        throw new Error("Invalid audience type");
    }

    const response = await axios.post(
      `https://${config.auth0.domain}/oauth/token`,
      {
        client_id: config.auth0.clientId,
        client_secret: config.auth0.clientSecret,
        audience: audience,
        grant_type: "client_credentials",
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting management API token:", error);
    throw new Error("Could not get management API token");
  }
}

module.exports = {
  getManagementApiToken,
  AudienceType,
};
