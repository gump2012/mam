/**
 * Created by gump on 2/20/14.
 */

var mongoose = require('mongoose');
var querystring = require("querystring");
var crypto = require('crypto');
var email = require('nodemailer');

exports.bookLogin = function (response,request){

    var requestData = '';
    request.addListener('data', function(postDataChunk) {
        requestData += postDataChunk;
    });

    request.addListener('end', function() {

        var responsevalue = {
            user_id:"-1"
            ,data:{
                nick_name:"xxx"
                ,sex:""
                ,age:""
                ,grade:""
                ,notice:""
                ,address:""
                ,shop_name:""
                ,phone:""
                ,publish:""
                ,reply:""
                ,collect:""
                ,follow:""
                ,photo_show:""
                ,vedio_show:""
                ,letter:""
            }
        }

        if(requestData != ''){
            var ps = querystring.parse(requestData).password;
            var mail = querystring.parse(requestData).email;

            if(ps && mail){
                var bookuser = mongoose.model('user');
                bookuser.findOne({mail:mail},function(err,buser){
                    if(buser)
                    {
                        if(ps == buser.ps){
                            responsevalue.user_id = buser.user_id;
                            responsevalue.data.nick_name = buser.nickname;
                        }else{
                            responsevalue.user_id = '-1';
                        }

                    }
                    else{
                        responsevalue.user_id = '-2';
                    }

                    var postData = JSON.stringify(responsevalue);
                    response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                    response.write(postData);
                    response.end();
                });
            }
            else{
                responsevalue.user_id = '-3';
                var postData = JSON.stringify(responsevalue);
                response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                response.write(postData);
                response.end();
            }
        }
        else{
            responsevalue.user_id = '-4';
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
                bookuser.findOne({mail:email},function(err,buser){
                    responsevalue = {
                        info:-1
                    };
                    if(buser)
                    {
                        responsevalue.info = 1;

                        sendmail(email);
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

function sendmail(stremail){
    email.send(
        {
            ssl: true,
            host : "smtp.qq.com",//发送 smtp.qq.com，接收 pop.qq.com
            domain : "[182.92.80.203]",//可以在浏览器中输入 http://ip.qq.com/ 得到
            to : stremail,
            from : "85150091@qq.com",
            subject : "node_mailer test email",
            body: "Hello! This is a test of the node_mailer.",
            authentication : "login",
            username : "85150091",
            password : "1234qaz",
            debug: true
        },
        function(err, result){
            if(err){ console.log("the err: ",err); }
        }
    );

}

