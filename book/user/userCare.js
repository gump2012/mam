/**
 * Created by gump on 9/13/14.
 */
var mongoose = require('mongoose');
var querystring = require("querystring");
var publictool = require("../../public/publictool");

exports.usercare = function(response,request){
    var requestData = '';
    request.addListener('data', function(postDataChunk) {
        requestData += postDataChunk;
    });

    request.addListener('end', function() {
        var responsevalue = {
            info:-1
            ,more:{
                headImg:''
                ,name:''
                ,age:''
                ,leve:''
                ,sex:''
                ,long:''
                ,lat:''
            }
        }

        if(requestData != ''){
            var uid = querystring.parse(requestData).uid;
            var followuid = querystring.parse(requestData).followUid;

            if(uid && followuid){
                var bookuser = mongoose.model('user');
                bookuser.findOne({uid:uid},function(err,doc){
                    if(doc){
                        doc.mecare.push(followuid);
                        doc.save(function( err, silence ) {
                            if( err )
                            {
                                console.log(err);
                                publictool.responseValue(response,responsevalue,'');
                            }
                            else{
                                bookuser.findOne({uid:followuid},function(err,doc){
                                    if(doc){
                                        responsevalue.more.headImg = doc.headurl;
                                        responsevalue.more.name = doc.nickname;
                                        responsevalue.more.age = doc.Birth;
                                        responsevalue.more.leve = doc.leve;
                                        responsevalue.more.sex = doc.sex;
                                        responsevalue.more.long = doc.long;
                                        responsevalue.more.lat = doc.lat;

                                        doc.careme.push(uid);
                                        doc.save(function(err,silence){
                                            if( err )
                                            {
                                                console.log(err);
                                                publictool.responseValue(response,responsevalue,'');
                                            }
                                            else{
                                                responsevalue.info = "1";
                                                publictool.responseValue(response,responsevalue,'success');
                                            }
                                        });
                                    }else{
                                        publictool.responseValue(response,responsevalue,'no care user');
                                    }
                                });
                            }
                        });
                    }
                    else{
                        publictool.responseValue(response,responsevalue,'no user');
                    }
                });
            }else{
                publictool.responseValue(response,responsevalue,'no parameter');
            }
        }
        else{
            publictool.responseValue(response,responsevalue,'no data');
        }
    });
}