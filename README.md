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

### Clone the Template

Start by cloning this repository:

```zsh
# Clone this project onto your machine
$ git clone https://github.com/siitapp/slack-automation-sample

# Change into the project directory
$ cd slack-automation-sample
```

## Running Your Project Locally

While building your app, you can see your changes appear in your workspace in
real-time with `slack run`. You'll know an app is the development version if the
name has the string `(local)` appended.

```zsh
# Run app locally
$ slack run

Connected, awaiting events
```

To stop running locally, press `<CTRL> + C` to end the process.

Don't forget to add your Siit API key in a `.env` file (see `.env.sample`).

Customize the logic to your need (e.g if you want to add custom form values to your request).

## Deploying Your App

Once development is complete, deploy the app to Slack infrastructure using
`slack deploy`:

```zsh
$ slack deploy
```

Don't forget that you need the Siit API key in the env: `slack env add SIIT_API_KEY <your_api_key>` !

## Resources

To learn more about developing automations on Slack, visit the following:

- [Automation Overview](https://api.slack.com/automation)
- [CLI Quick Reference](https://api.slack.com/automation/cli/quick-reference)
- [Samples and Templates](https://api.slack.com/automation/samples)
