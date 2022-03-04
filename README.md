# fake-template

## Third Party API Fakes

Third party APIs are simulated in testing and staging environments using "fakes". Fakes mimic the functionality of the third party API and internal state management without needing any physical devices. Fakes also...

- Enable reliable local testing
- Enable staging environments for customers
- Allow us to directly compare API responses and look for discrepenacies, reducing maintenance burden

You can read more about the difference between [fakes, mocks and stubs in this StackOverflow post](https://stackoverflow.com/a/346440/559475).

## Implementing a Fake

The fake will be automatically published to Github Packages as an NPM module, using npm-semantic-release.

This template uses the following:

- NextJS for API routes structure
- esbuild-runner (for tests)
- tsup (for building to library)

The fakes should
implement the following interfaces...

- Start an one or more http servers on a provided port
- Create or manipulate internal state (without using API directly) to configure test fixtures
  - e.g. Create a user, create an api key, create a sample device
- Save and load internal state

## Fake Checklist

- [ ] Insomnia Export JSON File in `research/insomnia_config.json`
- [ ] Android APK Original File in `research/base.apk`
- [ ] Android APK with [apk-mitm](https://github.com/shroudedcode/apk-mitm) run on it in `research/base-mitm.apk`
- [ ] Has README with instructions on how it works, links to relevant third party documentation or blogs. Lists features.
- [ ] Implements minimal set of endpoints needed to poll devices and perform actions
- [ ] Published to Github Packages as `@seamapi/fake-name`
- [ ] Import Sample DB data into [seam-connect's sample-scenarios folder](https://github.com/seamapi/seam-connect/tree/main/lib/sandbox/sample-scenarios)
- [ ] Fill in package name at `lib/logger.ts` and `pages/api/health.ts`

## Fake API Usage

```ts
import fakeAcme from "@seamapi/fake-acme"

const acme = await fakeAcme.create()

await acme.startServer({ port: 1234 })

// The "database" object should exist on every API and be serializable to JSON, however the methods on the
// database may vary depending on the provider. Make sure to document this in the fake README
await acme.database.addUser({
  email: "hello@example.com",
  role: "admin",
  teamName: "testteam",
})

// These methods should always be available
const serializedDb = await acme.toJSON()
await acme.loadJSON(serializedDb)

// update() will make sure any time-related changes to the database happen
await acme.update() // or acme.update(Date.now())

await acme.stopServer()
```

## Built-in Commands

### `yarn start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

The build script, `nsm build`, builds both your nextjs project and a directory
called `.nsm` which allows you to create a server.

There are two files in your root directory: `index.ts` and `server.ts`.
`index.ts` will implement the fake functions, and `server.ts` will handle the creation of the server using `nextjs-server-modules`.

### `yarn test`

The test script runs tests using ava.

- We have configured ava for typescript with esbuild-runner [(see this example)](https://github.com/seamapi/fake-august/blob/main/ava.config.js)
- `nsm` provides an import that can be used to easily create tests (shown below)

```ts
// tests/health.test.ts
import test from "ava"
import getTestServer from "tests/fixtures/get-test-server"

test("GET /health", async (t) => {
  const { axios } = await getTestServer(t)

  const res = await axios.get("/health")

  t.is(res.data.status, "ok")
})
```

### `yarn format`

This formatting scripts fixes any styling issues you have in your code.

### `yarn create-sample-db`

This script prints out a sample db json print out that will be used to generate sandbox data for this device. You should import the json data into into the [sample-scenarios folder in @seamapi/seam-connect](https://github.com/seamapi/seam-connect/tree/main/lib/sandbox/sample-scenarios).

## Publishing your NPM module

To publish, add one of the following tags at the beginning of your commit message:

| type             | version | commit message                    |
| ---------------- | ------- | --------------------------------- |
| patch release    | _._.x   | "fix: <some message>"             |
| feature release  | \_.x.0  | "feat: <some message>"            |
| breaking release | x.0.0   | "BREAKING CHANGE: <some message>" |
