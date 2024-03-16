import { Manifest } from "deno-slack-sdk/mod.ts";
import { SubmitRequest } from "./functions/submit_request.ts";
import { SiitRequestType } from './types.ts';

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "Siit",
  description: "An example of interacting with Siit API using Slack automations",
  icon: "assets/siit_logo.png",
  functions: [SubmitRequest],
  outgoingDomains: ['api.siit.io'],
  types: [],
  botScopes: [],
});
