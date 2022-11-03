# Contributing to GitHub Pull Request Title Case Helper

1. [Development Workspace Setup](#development-workspace-setup)
2. [Project Structure](#project-structure)
3. [Commands](#commands)
   1. [TL;DR / Cheatsheet](#tldr--cheatsheet)
   2. [All Commands](#all-commands)
4. [Deploying New Releases](#deploying-new-releases)

## Development Workspace Setup

To start development and testing, ensure you have Node.js 16.x or 18.x installed, then simply run
the following command.

```bash
npm install
```

Be aware that this project uses [husky](https://www.npmjs.com/package/husky/v/latest) and
[lint-staged](https://www.npmjs.com/package/lint-staged/v/latest) to ensure linting and formatting
are performed on all changed files prior to committing them. When you execute `npm install` without
any arguments, NPM will automatically run the `prepare` command defined in `package.json` to set up
the Husky git hook(s). If you install dependencies some other way, be sure to run

```bash
npm run prepare
```

before beginning development.

## Project Structure

The overall structure of this project's source files follows the ensuing convention:

* `src/assets`
  * Static assets - namely, images, non-compiled CSS/JS/HTML, etc
* `src/content-script`
  * Source code that is specific to the `tc` button's functionality lives
* `src/popup`
  * Source code that is specific to the popup's functionality lives (note: "popup" here refers to
    the button that appears next to the URL bar in the browser that users can click to display a
    miniature UI for the extension)
* `src/content-script.ts`
  * The main "entrypoint" for Vite to compile all the source code for the `tc` button's
    functionality
* `src/popup.html`
  * The main "entrypoint" for Vite to compile all the source code for the popup mentioned
    above
* `tests`
  * All unit tests for the project divided in a way that corresponds to the `tc`/popup segregation
    described above

## Commands

### TL;DR / Cheatsheet

* Use `npm run chrome:dev` or `npm run firefox:dev` for hot-reloading development
* Use `npm run build` to create production-ready extension artifacts in the `dist` folder
* Use `npm run test`/`npm run test:coverage` to run unit tests with/without coverage respectively

### All Commands

```bash
npm run chrome:webext       # Deploys an already-built copy of the extension into a Chrome browser session
npm run chrome:live-reload  # Continuously builds the extension while watching for changes and deploys it into a Chrome browser session
npm run chrome:dev          # Builds the extension once, then continuously rebuilds the extension while watching for changes and deploys it into a Chrome browser session
npm run firefox:webext      # Deploys an already-built copy of the extension into a Firefox browser session
npm run firefox:live-reload # Continuously builds the extension while watching for changes and deploys it into a Firefox browser session
npm run firefox:dev         # Builds the extension once, then continuously rebuilds the extension while watching for changes and deploys it into a Firefox browser session
npm run build               # Builds all extension artifacts
npm run build:watch         # Builds all extension artifacts and watches for changes
npm run test                # Runs all unit tests
npm run test:coverage       # Runs all unit tests with code coverage analysis
npm run lint-and-format     # Runs ESLint, Stylelint, and Prettier on the whole project
npm run prepare             # Performs finalizing installation steps for the project (e.g. husky install)
```

>Why is there a `:live-reload` *and* a `:dev`?

You may be wondering why both are defined when they seem to do the same thing. The nuance between
these two commands is that `:live-reload` will immediately try to serve whatever artifacts are
built - this is obviously problematic in situations where no former build has been performed (e.g.
immediately after a developer clones this repository). Therefore, we define `:dev` as a command
which performs the exact same operation, except it builds the necessary artifacts first. The end
result of this architecture is that we are *always* safe to run `:dev`, but we may or may not be
safe to run `:live-reload`.

## Deploying New Releases

This project's static web artifacts get uploaded to the Chrome and Firefox extension marketplaces
via a GitHub Actions workflow, and as such, there are no code changes required to deploy newer
versions. However, as a matter of convention, the `version` in [package.json](./package.json) should
be incremented as part of every feature pull request.

>Note: every time you bump the `package.json` version, be sure to do another `npm install` to update
>this module's `package-lock.json` with the newest version of itself.
