/**
 * Created by lishiming on 1/15/14.
 */
var http = require("http");

function start(route,handle){
    function onRequest(request,response){
       route(handle,pathname,response,request);
    }

    http.createServer(onRequest).listen(9527);
    console.log("server has started");
}

exports.start = start;