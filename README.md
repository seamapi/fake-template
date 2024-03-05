# Fake Template

[![GitHub Actions](https://github.com/seamapi/fake-template/actions/workflows/check.yml/badge.svg)](https://github.com/seamapi/fake-template/actions/workflows/check.yml)

Package skeleton for a fake.

## Description

TODO: Describe fake here.

## Bootstrapping a new fake

1. [Trigger a makenew workflow from this repository][makenew workflow]. 🚀
   - Provide a value for each required input.
   - There are no defaults.
   - Example values are shown in parentheses.
2. When the workflow completes, clone your new repo and start coding!

[makenew workflow]: https://github.com/seamapi/fake-template/actions/workflows/makenew.yml

### Updating from this skeleton

If you want to pull in future updates from this skeleton,
you can fetch and merge in changes from this repository.

Add this as a new remote with

```
$ git remote add makenew git@github.com:seamapi/fake-template.git
```

You can then fetch and merge changes with

```
$ git fetch --no-tags makenew
$ git merge makenew/main
```

## Third Party API Fakes

Third party APIs are simulated in testing and staging environments using fakes.
Fakes:

- Mimic functionality of the third party API and internal state management without needing any physical devices.
- Enable reliable local testing.
- Enable staging environments for customers.
- Allow comparing API responses to look for discrepancies, reducing maintenance burden.

Read more about the difference between fakes, mocks and stubs in [this StackOverflow post](https://stackoverflow.com/a/346440/559475).

## Implementing a Fake

The fake will be automatically published to Github Packages as an NPM module, using npm-semantic-release.

This template uses the following:

- [EdgeSpec](https://github.com/seamapi/edgespec) for API routes.
- Zustand for state management.
- AVA for tests.

The fakes should implement the following interfaces:

- Start one or more HTTP servers on a provided port.
- Create or manipulate internal state (without using the API directly) to configure test fixtures,
  e.g., create a user, create an API key, create a sample device.
- Save and load internal state.

## Fake Checklist

- [ ] Fill in package name at `lib/logger.ts` and `pages/api/health.ts`
- [ ] Insomnia Export JSON File in `research/insomnia_config.json`
- [ ] Has README with instructions: how it works, links to relevant third party documentation or blogs, feature list, etc.
- [ ] Implements minimal set of endpoints needed to poll devices and perform actions.
- [ ] Added to [Seam Connect fake config map](https://github.com/seamapi/seam-connect/blob/main/lib/sandbox/fake-config-map.ts).
- [ ] Sample DB data imported into [seam-connect's sample-scenarios folder](https://github.com/seamapi/seam-connect/tree/main/lib/sandbox/sample-scenarios).
- [ ] Any environment variables, e.g., `MANUFACTURER_BASE_URL` added to seam-connect README and `getWorkspaceEnv` file.

## Installation

Add this as a dependency to your project using [npm]
by adding the line below to your project's `.npmrc`,

```
@seamapi:registry=https://npm.pkg.github.com
```

and installing the package with

```
$ npm install @seamapi/fake-template
```

[npm]: https://www.npmjs.com/

## Development and Testing

### Quickstart

```
$ git clone https://github.com/seamapi/fake-template.git
$ cd fake-template
$ nvm install
$ npm install
$ npm run test:watch
```

Primary development tasks are defined under `scripts` in `package.json`
and available via `npm run`.
View them with

```
$ npm run
```

### Source code

The [source code] is hosted on GitHub.
Clone the project with

```
$ git clone git@github.com:seamapi/fake-template.git
```

[source code]: https://github.com/seamapi/fake-template

### Requirements

You will need [Node.js] with [npm] and a [Node.js debugging] client.

Be sure that all commands run under the correct Node version, e.g.,
if using [nvm], install the correct version with

```
$ nvm install
```

Set the active version for each shell session with

```
$ nvm use
```

Ensure you are authenticated with the [GitHub Packages npm registry],
then install the development dependencies with

```
$ npm install
```

[Node.js]: https://nodejs.org/
[Node.js debugging]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[npm]: https://www.npmjs.com/
[nvm]: https://github.com/creationix/nvm
[GitHub Packages npm registry]: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages

### Publishing

#### Automatic

New versions are released automatically with [semantic-release]
as long as commits follow the [Angular Commit Message Conventions].

[Angular Commit Message Conventions]: https://semantic-release.gitbook.io/semantic-release/#commit-message-format
[semantic-release]: https://semantic-release.gitbook.io/

#### Manual

Publish a new version by triggering a [version workflow_dispatch on GitHub Actions].
The `version` input will be passed as the first argument to [npm-version].

This may be done on the web or using the [GitHub CLI] with

```
$ gh workflow run version.yml --raw-field version=<version>
```

[GitHub CLI]: https://cli.github.com/
[npm-version]: https://docs.npmjs.com/cli/version
[version workflow_dispatch on GitHub Actions]: https://github.com/seamapi/fake-template/actions?query=workflow%3Aversion

## GitHub Actions

_GitHub Actions should already be configured: this section is for reference only._

The following repository secrets must be set on [GitHub Actions]:

- `GH_TOKEN`: A personal access token for the bot user with
  `packages:write` and `contents:write` permission.
- `GIT_USER_NAME`: The GitHub bot user's real name.
- `GIT_USER_EMAIL`: The GitHub bot user's email.
- `GPG_PRIVATE_KEY`: The GitHub bot user's [GPG private key].
- `GPG_PASSPHRASE`: The GitHub bot user's GPG passphrase.

[GitHub Actions]: https://github.com/features/actions
[GPG private key]: https://github.com/marketplace/actions/import-gpg#prerequisites

## Contributing

> If using squash merge, edit and ensure the commit message follows the [Angular Commit Message Conventions] specification.
> Otherwise, each individual commit must follow the [Angular Commit Message Conventions] specification.

1. Create your feature branch (`git checkout -b my-new-feature`).
2. Make changes.
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin my-new-feature`).
5. Create a new draft pull request.
6. Ensure all checks pass.
7. Mark your pull request ready for review.
8. Wait for the required approval from the code owners.
9. Merge when ready.

[Angular Commit Message Conventions]: https://semantic-release.gitbook.io/semantic-release/#commit-message-format

## License

This npm package is Copyright (c) 2021-2023 Seam Labs, Inc.

## Warranty

This software is provided by the copyright holders and contributors "as is" and
any express or implied warranties, including, but not limited to, the implied
warranties of merchantability and fitness for a particular purpose are
disclaimed. In no event shall the copyright holder or contributors be liable for
any direct, indirect, incidental, special, exemplary, or consequential damages
(including, but not limited to, procurement of substitute goods or services;
loss of use, data, or profits; or business interruption) however caused and on
any theory of liability, whether in contract, strict liability, or tort
(including negligence or otherwise) arising in any way out of the use of this
software, even if advised of the possibility of such damage.
