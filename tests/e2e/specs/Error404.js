module.exports = {
    "renders 404 when navigating to an unknown route": browser => {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}not-a-real-path-in-the-app`)
            .waitForElementVisible(".error-404", 5000)
            .assert.containsText(".error-code", "404")
            .end();
    }
};
