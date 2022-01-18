import { google } from "googleapis";
import config from "../config.json";

const client = new google.auth.OAuth2({
    clientId: config.oauth.clientId,
    clientSecret: config.oauth.clientSecret,
});

client.setCredentials({
    refresh_token: config.oauth.refreshToken,
});

export default client;