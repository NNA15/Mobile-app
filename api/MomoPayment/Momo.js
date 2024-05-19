const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const https = require('https');

router.use(express.json());

router.post('/payment', (req, res) => {
    const amount = 50000;

    if (!amount) {
        return res.status(400).json({ error: 'Missing amount in request body' });
    }

    // Necessary information for MoMo API
    const partnerCode = "MOMO";
    const accessKey = "F8BBA842ECF85";
    const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const orderInfo = "Pay with MoMo";
    const redirectUrl = "https://momo.vn/return";
    const ipnUrl = "https://callback.url/notify";
    const requestType = "captureWallet";
    const extraData = "";

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto.createHmac('sha256', secretKey)
                           .update(rawSignature)
                           .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode,
        accessKey,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        extraData,
        requestType,
        signature,
        lang: 'en'
    });

    const options = {
        hostname: "test-payment.momo.vn",
        port: 443,
        path: "/v2/gateway/api/create",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(requestBody),
        },
    };

    // Send the request and get the response
    const reqq = https.request(options, (resMom) => {
        let data = '';

        resMom.on("data", (chunk) => {
            data += chunk;
        });

        resMom.on("end", () => {
            if (resMom.statusCode === 200) {
                const response = JSON.parse(data);
                res.json({ payUrl: response.payUrl });
            } else {
                res.status(resMom.statusCode).json({ error: 'Error from MoMo API', details: data });
            }
        });
    });

    reqq.on("error", (e) => {
        res.status(500).json({ error: `Problem with request: ${e.message}` });
    });

    // Write data to request body
    reqq.write(requestBody);
    reqq.end();
});

module.exports = router;
