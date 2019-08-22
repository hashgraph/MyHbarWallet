module.exports = {
    "renders 404 when navigating to an unknown route"(browser) {
        browser
            .url(
                `${process.env.VUE_DEV_SERVER_URL}/not-a-real-path-in-this-app`
            )
            .waitForElementVisible(".error-404", 5000)
            .assert.elementPresent(".hello")
            .assert.containsText(".error-code", "404")
            .end();
    }
};
