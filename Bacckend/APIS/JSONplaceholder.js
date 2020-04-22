const request = require('request'); // first install it and then require it
 // const :>it is a variable ,that is fixed and dont want to change
 request('https://jsonplaceholder.typicode.com/users/1', function (error, response, body) {
  if(!error && response.statusCode == 200){
        const parsedData = JSON.parse(body);
	//  eval(require('locus'))   // use for debugging 
	  // use this version for installing npm i -D locus@2.0.0
      // console.log(parsedData);
	 // console.log(parsedData['name']);  
	  // console.log(parsedData.name);   //All are other ways or syntax
	  	  // console.log(parsedData.name + ' lives in ' + parsedData.address.city );
	  console.log(`${parsedData.name}  lives in ${parsedData.address.city}` );
	  
	  // look for video for other syntax
    }
});