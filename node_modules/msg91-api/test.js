/**
 * Created by pravartan on 20/04/21.
 */

var msg91 = require("./index")("API");
var args = {
    flow_id: "MSG91_SMS_TEMPL_FLOW_ID",
    sender: "MSG91_SENDER_ID",
    mobiles: "Mob/Mob1, Mob2, ...",
    VAR1: "VALUE1",
    VAR2: "VALUE2"
};
msg91.sendSMS(args, function (err, response) {
    console.log(err);
    console.log(response);
});

// Default 1 day - 1440 mins
msg91.setOtpExpiry(otp_expiry_min);

// Default length: 4, min: 4, max: 9
msg91.setOtpLength(otp_length);

var mobileNo =  "XXXXXXXXXX";
var params = { 
    otp: "OTP", // Optional
    email: "EMAIL", // Optional    
    otp_length: "OTP_LENGTH", // Optional
    otp_expiry: "OTP_EXPIRY", // Optional
    userip: "USER IP", // Optional
    invisible: "VAL", // Optional | Description: For MOBILE APP only (do not use for Browsers); 1 for ON, 0 for OFF; Mobile Number Automatically Verified if its Mobile Network is ON
    unicode: "VAL", // Optional | Description: Enter 1 if sending SMS in languages other than English, for english pass 0
    extra_param: "EXTRA_PARAM" // Optional | Description: Here you can pass the variables created in the SendOTP template.
}, args = { // Optional
    VAR1: "VALUE1",
    VAR2: "VALUE2"
};

    
msg91.sendOTP(mobileNo, "TEMPLATE_ID", params, args, function (err, response) {
    console.log(err);
    console.log(response);
});

var mobileNo =  "XXXXXXXXXX";

msg91.verifyOTP(mobileNo, function (err, response) {
    console.log(err);
    console.log(response);
});

var mobileNo =  "XXXXXXXXXX";

msg91.resendOTP(mobileNo, function (err, response) {
    console.log(err);
    console.log(response);
});

var mobileNo =  "XXXXXXXXXX";

msg91.resendOTP(mobileNo, "OTP_TYPE", function (err, response) {
    console.log(err);
    console.log(response);
});

msg91.getBalance(function(err, response){
    console.log(err);
    console.log(response);
})

msg91.getBalance("ROUTE", function(err, response){
    console.log(err);
    console.log("Custom Router : " + response);
})
