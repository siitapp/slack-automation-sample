import { DefineFunction, Schema, SlackFunction, DefineType } from "deno-slack-sdk/mod.ts";

interface SiitRequestType {
  title: string;
  description?: string;
  admin_permalink_url: string;
}

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in workflows.
 * https://api.slack.com/automation/functions/custom
 */
// https://api.slack.com/automation/types
export const SubmitRequest = DefineFunction({
  callback_id: "submit_siit_request",
  title: "Siit - Submit Request",
  description: "Create a Siit request from a submitted form",
  source_file: "functions/submit_request.ts",
  input_parameters: {
    properties: {
      title: {
        type: Schema.types.string,
        description: "The title of the Request",
        minLength: 3,
        maxLength: 255,
      },
      description: {
        type: Schema.types.string,
        maxLength: 5000,
        description: "Optionnal description of the Request",
      },
      requester: {
        type: Schema.slack.types.user_id,
        description: "The person who submits the request",
      },
      channel: {
        type: Schema.slack.types.channel_id,
        description: "Optionnal Slack channel (or use message_link directly)",
      },
      message_link: {
        type: Schema.types.string,
        description: "Optionnal Slack Message link, use this if you want to start a public request by referencing a message",
      },
      // Objects cannot be used as input for now so we define two field per custom input
      // https://api.slack.com/automation/types#object
      // Please not that custom forms without label are ignored so mark them are required
      // if you plan on using the answer
      custom_form_input_1_label: {
        type: Schema.types.string,
      },
      custom_form_input_1_answer: {
        type: Schema.types.string,
      },
    },
    required: ["title", "requester"],
  },
  output_parameters: {
    properties: {
      title: {
        type: Schema.types.string,
      },
      admin_permalink_url: {
        type: Schema.types.string
      },
    },
    required: ["title", "admin_permalink_url"],
  },
});

/**
 * SlackFunction takes in two arguments: the CustomFunction
 * definition (see above), as well as a function that contains
 * handler logic that's run when the function is executed.
 * https://api.slack.com/automation/functions/custom
 */
export default SlackFunction(
  SubmitRequest,
  async ({ inputs, client, env }) => {
    const {
      title,
      description,
      requester,
      channel,
      message_link,
      custom_form_input_1_label,
      custom_form_input_1_answer,
    } = inputs;
    // we have to manually build the custom forms, insert as many items as you need
    const custom_form_inputs = [
      { label: custom_form_input_1_label, value: custom_form_input_1_answer }
    ]
    const requestParams = {
      title,
      description,
      custom_form_inputs,
      slack_user_id: requester,
      slack_channel_id: channel,
      slack_message_link: message_link,
    }

    const headers = {
      Authorization: `Bearer ${env.SIIT_API_KEY}`,
      "Content-Type": "application/json",
    };
    try {
      const endpoint = "https://api.siit.io/v1/requests/slack";
      const response = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify(requestParams) });
      if (!response.ok) {
        // In the case where the API responded with non 2xx status
        const body = await response.text();
        const error = `Failed to call an API (status: ${response.status}, body: ${body})`;
        return { error };
      }
      let json = await response.json();
      let result : SiitRequestType = json.result;

      return { outputs: { title: result.title, admin_permalink_url: result.admin_permalink_url } };
    } catch (err) {
      const error = `Failed to call API due to ${err}`;
      return { error };
    }
  },
);
