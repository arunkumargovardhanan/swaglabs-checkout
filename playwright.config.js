// import { devices } from '@playwright/test';

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const { devices, expect } = require('@playwright/test');
const { matchers } = require('playwright-expect');
// add custom matchers
expect.extend(matchers);
const config = {
    globalSetup: require.resolve('./tests/globalSetup.js'),
    testDir: 'tests',
    use: {
        baseURL: 'https://www.saucedemo.com',
        storageState: 'storage-state/storageState.json',
        trace: 'retain-on-failure'
    },
    projects: [{
            name: 'chromium',
            use: {...devices['Desktop Chrome'],
                launchOptions: {
                    slowMo: 1000,
                },
            },
        },
        {
            name: 'firefox',
            use: {...devices['Desktop Firefox'],
                launchOptions: {
                    slowMo: 1000,
                    headless: false
                },
            },
        },
        {
            name: 'webkit',
            use: {...devices['Desktop Safari'],
                launchOptions: {
                    slowMo: 1000,
                    headless: false
                },
            },
        },
        {
            name: 'iPhone',
            use: {...devices['iPhone 10', 'Desktop Firefox', 'iPhone 11'],
                launchOptions: {
                    slowMo: 300,
                    headless: false
                },
            },
        },
    ],
    // reporter: ['line','experimental-allure-playwright']
};

module.exports = config;