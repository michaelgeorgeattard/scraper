var config = require('./wikipedia.json');
var util = require('util');
var _ = require("lodash");
var https = require("https");
var rp = require('request-promise');
var Promise = require("bluebird");

var obj = {};

function decode(item, obj) {
    console.log()    
 
    if (item.url) {
        retrieve(item.url)
            .then(response => {
                obj.data = response;
            })
            .then(() => {
                console.log(obj);
                
                _.each(item.data, (subItem) => {
                    decode(subItem, obj["data"] = {})
                });
            });
    }
}

function retrieve(url) {
    return rp(url)
        .then(function (htmlString) {
            return htmlString;
        })
        .catch(function (err) {
            // Crawling failed... 
        });
}

_.each(config, (item) => {
    decode(item, obj);
});