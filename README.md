# spotify-party-vote-monorepo

A project to allow party guests to vote for the next song to play on the host's Spotify.

## Tools

Following tools are required:

* Yarn 2

The project is organised as a monorepo utilising Yarn workspaces and Typescript references. The separate packages live in `./packages`.

Inversify is used for dependecy injection in the API functions.

## Build

Run `yarn install` in the root directory. To build an individidual package:

* Change to its directory (e.g. `./packages/api`)
* Run `yarn run build`

## Deploy

TODO

## Database structure

Primary k