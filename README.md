# CPaaS Test App Project - developer's guide (internal document)

This is **the web test app** for the CPaaS API.

## Prerequisites 

This is a Vue 3 +TypeScript + vite project.

### Recommended VsCode extensions:
* [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
* [Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets)

**IMPORTANT: linking the CpaaS API package into this project (how to install the cpaas sdk in this project)**

1. From the kmmclientsdk, build the project. Open terminal and ``cd`` into ``shared/build/developmentLibrary``. Then run ``npm link``
2. To use the API in **this** project, go back to this project and run ``npm link cpaas-api``

[Read more about npm-link](https://docs.npmjs.com/cli/v8/commands/npm-link)

***

## Quick start
    npm install
    npm run dev
Open http://localhost:3000 in your browser.

## How the SDK is configured in this project
The CPaaS SDK is configured in Vue 3 plugin located in ``/src/plugins/cpaasApiPlugin``






