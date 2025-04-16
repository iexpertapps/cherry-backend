# Msg91
Msg91 API V5 for node.js


# Msg91 Installation

```javascript 
npm install msg91-api --save
```

# Msg91 Integration


### Send SMS

```javascript
var msg91 = require("msg91")("API_KEY");

// Mobile No can be a single (XXXXXXXXXX) number or csv string (XXXXXXXXXX, XXXXXXXXXX)
// Variables with the same name defind in SMS template

var args = {
  "flow_id": "EnterflowID",
  "sender": "EnterSenderID",
  "mobiles": "Enter Mobile Number/Numbers separated by comma", 
  "VAR1": "VALUE1",
  "VAR2": "VALUE2"
};

msg91.sendSMS(args, function(err, response){
    console.log(err);
    console.log(response);
});
```

### Set OTP Expiry Time

```javascript
// Default 1 day - 1440 mins
msg91.setOtpExpiry(time_in_min);
```

### Set OTP Length

```javascript
// Default length: 4, min: 4, max: 9
msg91.setOtpLength(otp_length);
```

### Send OTP

```javascript

var mobileNo = "XXXXXXXXXX";

// OTP Template id of MSG91
var templateId = "******************"; 

// List of variable with the same name defind in OTP template
var params = {
    otp: "OTP", // Optional
    email: "EMAIL", // Optional    
    otp_length: "OTP_LENGTH", // Optional
    otp_expiry: "OTP_EXPIRY", // Optional
    userip: "USER IP", // Optional
    invisible: "VAL", // Optional | Description: For MOBILE APP only (do not use for Browsers); 1 for ON, 0 for OFF; Mobile Number Automatically Verified if its Mobile Network is ON
    unicode: "VAL", // Optional | Description: Enter 1 if sending SMS in languages other than English, for english pass 0
    extra_param: "EXTRA_PARAM" // Optional | Description: Here you can pass the variables created in the SendOTP template.

}, args = {
  "VAR1": "VALUE1",
  "VAR2": "VALUE2"
};

msg91.sendOTP(mobileNo, templateId, params, args, function(err, response){
    console.log(err);
    console.log(response);
});
```

### Verify OTP

```javascript

var mobileNo = "XXXXXXXXXX",
    otp = "XXXX";

msg91.verifyOTP(mobileNo, otp, function(err, response){
    console.log(err);
    console.log(response);
});
```

### Resend OTP

```javascript

var mobileNo = "XXXXXXXXXX";

msg91.resendOTP(mobileNo, function(err, response){
    console.log(err);
    console.log(response);
});

// Resend specific type of OTP.
msg91.resendOTP(mobileNo, "OTP_TYPE", function(err, response){
    console.log(err);
    console.log(response);
});
```


### Get Balance

```javascript

msg91.getBalance(function(err, msgCount){
    console.log(err);
    console.log(msgCount);
});

// Get Balance for given Route.
msg91.getBalance("ROUTE_NO", function(err, msgCount){
    console.log(err);
    console.log(msgCount);
});
```



# Msg91 Constants

### ROUTE_NO
```javascript
1 - Promotional Route
4 - Transactional Route
```

### OTP_TYPE
```javascript
voice - default
text
```

