var request = require('request');

// Free currency API
var host = 'http://api.fixer.io/latest?base=';

var rp = require('request-promise');

var data = [];
rp({ uri: host+"USD", json: true })
.then(function (response) {
    console.log("1: Start");
    data.push("1: Start");
    return response;
})
.then(function (response) {
    console.log("2: One USD = " + response.rates.AUD + " AUD");
    data.push("2: USD");
    
    return rp({ uri: host+"AUD", json: true })
        .then(function (getAud) {
            console.log("3: One AUD = " + getAud.rates.USD + " USD");
            data.push("3: AUD");
            return getAud;
        })
        .then(function (getAud) {
            var number = response.rates.AUD * getAud.rates.USD;
            console.log("4.1: Equals: " + number );
            console.log("4.2: AUD: " + 1);
            console.log("4.3: USD: " + getAud.rates.USD);
            data.push("4: AUD");
            return getAud.rates.USD;
        })
})
.then(function (response) {
    console.log("5: End Here " + response);
})
.finally(function(){
    console.log(data);
})
.catch(function (err) {
    console.log(err);
});