/**
 * Creates and returns a signed URL that points to MoonPay's purchasing flow (for hbars) w/ pre-filled wallet address
 */

import crypto from "crypto";

import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
    // environment variables from Netlify
    const { MOONPAY_API_KEY, MOONPAY_SECRET_KEY } = process.env;
    // walletAddress passed in from client side
    const { walletAddress } = event.queryStringParameters;

    const originalUrl = `https://buy.moonpay.com?apiKey=${MOONPAY_API_KEY}&currencyCode=hbar&walletAddress=${walletAddress}`;

    const signature = crypto
        .createHmac("sha256", MOONPAY_SECRET_KEY)
        .update(new URL(originalUrl).search)
        .digest("base64");

    const signedURL = `${originalUrl}&signature=${encodeURIComponent(
        signature
    )}`;

    return {
        statusCode: 200,
        body: signedURL,
    };
};

export { handler };
