# Siit Slack automation template

This is a template used to build out a single, workflow-less function. To learn
more, read the tutorial on creating
[custom functions for Workflow Builder](https://api.slack.com/tutorials/tracks/wfb-function).

Note that a dedicated [Siit API endpoint](https://developer.siit.io/api-reference/request/creates-a-request-directly-using-slack-informations) has been created for handling communication with Slack automations.

You *need* a Siit API key to interact. Please refer to the documentation available at https://developer.siit.io.

---

## Setup

Before getting started, first make sure you have a development workspace where
you have permission to install apps. **Please note that the features in this
project require that the workspace be part of
[a Slack paid plan](https://slack.com/pricing).**

### Install the Slack CLI

To use this template, you need to install and configure the Slack CLI.
Step-by-step instructions can be found in our
[Quickstart Guide](https://api.slack.com/automation/quickstart).

Note: on Mac using homebrew you can just run `brew install slack-cli`.

### Clone the Template

Start by cloning this repository:

```zsh
# Clone this project onto your machine
$ slack-cli create siit-automation-sample -t siitapp/slack-automation-sample

# Change into the project directory
$ cd siit-automation-sample
```

## Running Your Project Locally

While building your app, you can see your changes appear in your workspace in
real-time with `slack run`. You'll know an app is the development version if the
name has the string `(local)` appended.

```zsh
# Run app locally
$ slack-cli run

Connected, awaiting events
```

To stop running locally, press `<CTRL> + C` to end the process.

Don't forget to add your Siit API key in a `.env` file (see `.env.sample`).

Customize the logic to your need (e.g if you want to add custom form values to your request).

## Deploying Your App

Once development is complete, deploy the app to Slack infrastructure using
`slack-cli deploy`:

```zsh
$ slack-cli deploy
```

Don't forget that you need the Siit API key in the env:
```zsh
$ slack-cli env add SIIT_API_KEY <your_api_key>
```

From that point you can use the function as a step in the workflow builder, howver you might want to make that step visible to other members of your workspace ([see doc](https://api.slack.com/automation/functions/custom#distribute)).


Example to give access to everyone in the workspace:
```zsh
slack-cli function distribute --name  <callback_id_of_your_function> --everyone --grant
```

Where in this sample your would replace `<callback_id_of_your_function>` by `submit_siit_request`.

## Resources

To learn more about developing automations on Slack, visit the following:

- [Automation Overview](https://api.slack.com/automation)
- [CLI Quick Reference](https://api.slack.com/automation/cli/quick-reference)
- [Samples and Templates](https://api.slack.com/automation/samples)
