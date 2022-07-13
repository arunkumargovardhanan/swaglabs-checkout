# swaglabs-checkout
Automate online shopping experience
---
# Playwright Setup Guide
---

## Features of this framework
* [Design Pattern: Page Object Model](https://playwright.dev/docs/test-pom)

## Getting started

### Pre-requisites
* Node.js
* Any Text Editor

### Setup Scripts 
* Clone the repository into a folder 
* Go to Project root directory and install Dependency: `npm install`
* All the dependencies from package.json would be installed in node_modules folder.

### How to Run Test

* From root directory, to run single test on single browser through multiple workers: `npx playwright test ./products.spec.js --project=chromium --headed`
* From root directory, to run entire suite on single browser through multiple workers: `npx playwright test tests/ --project=chromium --headed` 
* From root directory, to run entire suite on all configured browsers and devices through multiple workers: `npx playwright test tests/ --headed` 
