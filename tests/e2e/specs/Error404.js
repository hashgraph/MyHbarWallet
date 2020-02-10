module.exports = {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    "It Renders 404 When Navigating to an Unknown Route"(browser) {
        browser
        // eslint-disable-next-line no-process-env
            .url(`${process.env.VUE_DEV_SERVER_URL}not-a-real-path-in-the-app`)
            .waitForElementVisible(".error-404", 5000)
            .assert.containsText(".error-code", "404")
            .end();
    }
};
