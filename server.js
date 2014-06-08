/**
 * Created by lishiming on 1/15/14.
 */
var http = require("http");
var url = require("url");
var visitRes = require("./visitRes/visitRes");

function start(route,handle){
    function onRequest(request,response){
        var pathname = url.parse(request.url).pathname;
        if(pathname.indexOf("/res/") != -1){
            visitRes.visitRes(request,response);
        }
        else{
            route(handle,pathname,response,request);
        }
    }

    http.createServer(onRequest).listen(10080);
    console.log("server has started");
}

exports.start = start;