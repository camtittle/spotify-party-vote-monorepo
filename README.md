# spotify-party-vote-monorepo

A project to allow party guests to vote for the next song to play on the host's Spotify.

## Tools

I've been trying out a few things in this project, such as:

* Organising as a monorepo utilising Yarn 2 workspaces and Typescript references. The workspaces live in `./packages`.
* Using DynamoDB Local in a docker container for automated integration testing
* Using Inversify.js for dependency injection

## Running Tests

### Integration tests

From the `/packages/api` directory, run:

* `yarn dynamodb-local:start` to run the DynamoDB local emulator
* `yarn test:integration` from a separate command window to run the tests

## Build

Run `yarn install` in the root directory.

To build the API run

```
yarn workspace @spotify-party-vote/api build
```

## Deploy

From `infra` directory:

```
terraform apply -auto-approve
```
