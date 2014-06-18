/**
 * Created by gump on 2/20/14.
 */

var mongoose = require('mongoose');
var querystring = require("querystring");
var crypto = require('crypto');

exports.bookLogin = function (response,request){

    var requestData = '';
    request.addListener('data', function(postDataChunk) {
        requestData += postDataChunk;
    });

    request.addListener('end', function() {

        responsevalue = {
            "user_id":"-1"
            ,"data":{
                "nick_name":"xxx"
                ,"sex":"男"
                ,"age":"32"
                ,"grade":"12"
                ,"notice":"xxxxxxxxxxxxxx"
                ,"address":"xxxxxx"
                ,"shop_name":"xxxxx"
                ,"phone":"1251522"
                ,"publish":"1"
                ,"reply":"1"
                ,"collect":"-1"
                ,"follow":"-1"
                ,"photo_show":"1"
                ,"vedio_show":"-1"
                ,"letter":"-1"
            }
        }

        if(requestData != ''){
            var ps = querystring.parse(requestData).password;
            var mail = querystring.parse(requestData).email;

            if(ps && mail){
                var bookuser = mongoose.model('user');
                bookuser.find({mail:mail},function(err,buser){
                    if(buser.length > 0)
                    {
                        responsevalue.user_id = buser.user_id;
                        responsevalue.data.nick_name = buser.nickname;
                    }

                    var postData = JSON.stringify(responsevalue);
                    response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                    response.write(postData);
                    response.end();
                });
            }
            else{
                var postData = JSON.stringify(responsevalue);
                response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                response.write(postData);
                response.end();
            }
        }
        else{
            var postData = JSON.stringify(responsevalue);
            response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
            response.write(postData);
            response.end();
        }
    });
}

exports.bookRegister = function (response,request){

    var requestData = '';
    request.addListener('data', function(postDataChunk) {
        requestData += postDataChunk;
    });

    request.addListener('end', function() {

        if(requestData != ''){
            var nickname = querystring.parse(requestData).nickname;
            var password = querystring.parse(requestData).password;
            var email = querystring.parse(requestData).email;
            if(nickname && password && email){
                var bookuser = mongoose.model('user');
                bookuser.find({mail:email},function(err,buser){
                    responsevalue = {
                        info:-1
                    };
                    if(buser.length == 0)
                    {
                        responsevalue.info = 1;
                        var newuser = new bookuser({
                            mail:email
                            ,ps:password
                            ,user_id:crypto.createHash('md5').update(Date.now().toString() + email).digest('hex')
                            ,nickname:nickname
                        });

                        //保存实例
                        newuser.save( function( err, silence ) {
                            if( err )
                            {
                                console.log(err);
                            }
                        });
                    }
                    else{
                        console.log('用户已经存在');
                    }

                    var postData = JSON.stringify(responsevalue);
                    response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                    response.write(postData);
                    response.end();
                });
            }
            else{
                responsevalue = {
                    info:-1
                };
                console.log('参数不全');
                var postData = JSON.stringify(responsevalue);
                response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                response.write(postData);
                response.end();
            }
        }
        else{
            responsevalue = {
                info:-1
            };
            console.log('没有数据');
            var postData = JSON.stringify(responsevalue);
            response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
            response.write(postData);
            response.end();
        }
    });
}

exports.findpassword = function(response,request){
    var requestData = '';
    request.addListener('data', function(postDataChunk) {
        requestData += postDataChunk;
    });

    request.addListener('end', function() {

        if(requestData != ''){
            var email = querystring.parse(requestData).email;
            if(email){
                var bookuser = mongoose.model('user');
                bookuser.find({mail:email},function(err,buser){
                    responsevalue = {
                        info:-1
                    };
                    if(buser.length > 0)
                    {
                        responsevalue.info = 1;
                    }

                    var postData = JSON.stringify(responsevalue);
                    response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                    response.write(postData);
                    response.end();
                });
            }
            else{
                responsevalue = {
                    info:-1
                };
                var postData = JSON.stringify(responsevalue);
                response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                response.write(postData);
                response.end();
            }
        }
        else{
            responsevalue = {
                info:-1
            };
            var postData = JSON.stringify(responsevalue);
            response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
            response.write(postData);
            response.end();
        }
    });
}

