import { DefineType, Schema } from "deno-slack-sdk/mod.ts";

// https://api.slack.com/automation/types
export const SiitRequestType = DefineType({
  title: "A type representing the Request",
  name: 'request_object',
  type: Schema.types.object,
  properties: {
    title: {
      type: Schema.types.string,
    },
    description: {
      type: Schema.types.string,
    },
    admin_permalink_url: {
     type: Schema.types.string
    },
  },
  required: ["title", "admin_permalink_url"],
})
