
var request = require('request'); // first install it and then require it
 request('http://www.google.com', function (error, response, body) {
                                              //pass 3 arguments (error, response, body)
   if (!error && response.statusCode == 200) {     // status 200 mean everything is good
                                                // or successful http request
     console.log(body) // Show the HTML for the Google homepage.
	   // if everything is good then it send google html and it can also send Apis html
   }
 })
// if i write anything in place of http://www.google.com eg https://nffj then it goes to error condition
 