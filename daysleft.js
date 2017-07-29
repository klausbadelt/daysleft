'use strict';
var AWS = require('aws-sdk');
var ses = new AWS.SES({'region': 'us-east-1'});
var daysleft = Math.trunc((Date.parse("2017-09-13 00:00 PST+0700")-Date.now())/(1000*60*60*24));
var params = {
  Source: "klaus@kinonation.com", 
  Destination: {
    BccAddresses: [], 
    CcAddresses: [], 
    ToAddresses: [
      "success@simulator.amazonses.com",
      "klaus@kinonation.com"
    ]
  }, 
  Message: {
    Body: {
      Html: {
        Charset: "UTF-8", 
        Data: "<h1>" + daysleft + "</h1><p>days left to demo day</p>"
      }, 
      Text: {
        Charset: "UTF-8", 
        Data: daysleft + " days left to demo day."
      }
    },
    Subject: {
      Charset: "UTF-8", 
      Data: daysleft + " Days Left"
    }
  }
};

console.log('===SENDING EMAIL===');
ses.sendEmail(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    console.log("===EMAIL SENT===");
    console.log(data);           // successful response
  }    
});
