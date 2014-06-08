/**
 * Created by lishiming on 1/16/14.
 */
function router(handle,pathname,response,request){
    request.setEncoding('utf8');
    console.log(request.url);

    if(typeof handle[pathname] === 'function'){
        handle[pathname](response,request);
    }else{
        console.log("No request handler found for " + pathname);
        response.writeHead(404,{"Content-Type":"text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = router;