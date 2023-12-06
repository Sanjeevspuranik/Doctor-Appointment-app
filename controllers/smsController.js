// controllers/smsController.js
const twilio = require("twilio");

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

const sendSMS = async (to, body) => {
  try {
    const message = await twilioClient.messages.create({
      to,
      from: twilioPhoneNumber,
      body,
    });

    console.log(`SMS sent with SID: ${message.sid}`);
    return { success: true, message: "SMS sent successfully" };
  } catch (error) {
    console.error(`Error sending SMS: ${error.message}`);
    return { success: false, message: "Failed to send SMS" };
  }
};

module.exports = { sendSMS };
