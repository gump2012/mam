/**
 * Created by gump on 2/20/14.
 */

var mongoose = require('mongoose');
var querystring = require("querystring");
var crypto = require('crypto');
var nodemailer = require("nodemailer");

exports.bookLogin = function (response,request){

    var requestData = '';
    request.addListener('data', function(postDataChunk) {
        requestData += postDataChunk;
    });

    request.addListener('end', function() {

        var responsevalue = {
            user_id:"-1"
            ,data:{
                head:"http://pic.yupoo.com/zhaohaining2014/DSs2NQVC/y82Iy.jpg"
                ,photo_one:'http://pic.yupoo.com/zhaohaining2014/DSs2NUgP/Pzj5o.jpg'
                ,photo_two:'http://pic.yupoo.com/zhaohaining2014/DSs2NVot/oYkps.jpg'
                ,nick_name:"xxx"
                ,sex:"男"
                ,age:"32"
                ,grade:"1"
                ,notice:""
                ,address:""
                ,shop_name:""
                ,phone:""
                ,publish:[]
                ,reply:[]
                ,collect:[]
                ,follow:[]
                ,photo_show:[]
                ,vedio_show:[]
                ,letter:[]
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
                        struid = crypto.createHash('md5').update(Date.now().toString() + email).digest('hex');
                        var newuser = new bookuser({
                            mail:email
                            ,ps:password
                            ,user_id:struid
                            ,nickname:nickname
                        });

                        //保存实例
                        newuser.save( function( err, silence ) {
                            if( err )
                            {
                                console.log(err);
                            }
                        });

                        //保存一个info
                        var infomodel = mongoose.model('info');
                        var item = {
                            uid:struid
                            ,infolist:[]
                        }
                        var newinfo = new infomodel(item);
                        newinfo.save(function(err,silence){
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

                        sendmail(email,buser.ps);
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

function sendmail(stremail,ps){
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "qq",
        auth: {
            user: "85150091@qq.com",
            pass: "1234qaz"
        }
    });

// setup e-mail data with unicode symbols

    var strtext = "您的帐户："+stremail+"<br />"+
        "您的帐户密码："+ps+"<br />"+
        "请妥善保管您的帐户和密码<br />"+
        "此邮件为系统发出，无需回复，如有其它问题请联系在线客服！<br />"+
        "QQ客服：973397822<br />"+
        "感谢您对我们的支持！<br />";

    var mailOptions = {
        from: "85150091@qq.com", // sender address
        to: '"'+stremail+'"', // list of receivers
        subject: "找回密码", // Subject line
        text: strtext, // plaintext body
        html: "<b>"+strtext+"</b>" // html body
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    });

}

