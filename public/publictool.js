/**
 * Created by gump on 9/13/14.
 */
var url = require("url");
var querystring = require("querystring");

exports.assistantValue = function (request){
    var arg = url.parse(request.url).query;
    var assistant = querystring.parse(arg).a;
    return assistant;
}

exports.responseValue = function (response,value,strlog){
    if(strlog.length > 0){
        console.log(strlog);
    }

    var postData = JSON.stringify(value);
    response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
    response.write(postData);
    response.end();
}