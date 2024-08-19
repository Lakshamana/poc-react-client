# PocReactClient

## Description

## Software Requirements
- [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (v22.0.0 was used)
- A working MongoDB or Docker and Docker Compose installations
- A terminal emulator

## Installation

Open a terminal and head to the project root. Then run the following commands:

```bash
$ cp .env.example .env  # and fill the environment variables
$ npm install

$ npm run dev
# or
$ yarn dev
# or
$ pnpm dev
# or
$ bun dev
```

### Environment Variables
Edit your env variables in the `.env` file. The following variables are available:

- NEXT_PUBLIC_API_URL: URL for the DuckDuckGoer server-side project, run the server and point this variable to the server URL.
Use `/api` as the base endpoint.

Example: `NEXT_PUBLIC_API_URL=http://localhost:3001/api`

Obs: `NEXT_PUBLIC_` is a Next.js convention to make the variable available on the client-side. Do not remove it!

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
