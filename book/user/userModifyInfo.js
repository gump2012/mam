/**
 * Created by gump on 9/13/14.
 */
var mongoose = require('mongoose');
var querystring = require("querystring");
var publictool = require("../../public/publictool");

exports.modifyUserInfo = function (response,request){
    var requestData = '';
    request.addListener('data', function(postDataChunk) {
        requestData += postDataChunk;
    });

    request.addListener('end', function() {
        var responsevalue = {
            info:-1
        }

        if(requestData != ''){
            var uid = querystring.parse(requestData).uid;
            var headurl = querystring.parse(requestData).headUrl;
            var nick = querystring.parse(requestData).nickName;
            var Birth = querystring.parse(requestData).dateOfBirth;sex
            var sex = querystring.parse(requestData).sex;
            var shop = querystring.parse(requestData).shopName;
            var address = querystring.parse(requestData).address;phoneNum
            var phone = querystring.parse(requestData).phoneNum;
            if(uid && headurl && nick && Birth && sex){
                var bookuser = mongoose.model('user');
                bookuser.findOne({user_id:uid},function(err,doc){
                    if(doc){
                        doc.headurl = headurl;
                        doc.nickname = nick;
                        doc.Birth = Birth;
                        doc.sex = sex;
                        doc.shop = shop;
                        doc.address = address;
                        doc.phone = phone;
                        doc.save(function(err){
                            if(err){
                                console.log(err);
                            }else{
                                console.log('modify success');
                                responsevalue.info = "1";
                            }
                            publictool.responseValue(response,responsevalue,"");;
                        });
                    }
                    else{
                        publictool.responseValue(response,responsevalue,'no user');
                    }
                });
            }
            else{
                publictool.responseValue(response,responsevalue,'parameter incomplete');
            }
        }
        else{
            publictool.responseValue(response,responsevalue,'no info data');
        }
    });
}