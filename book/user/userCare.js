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

            }else{
                publictool.responseValue(response,responsevalue,'no parameter');
            }
            var bookuser = mongoose.model('user');
            bookuser.findOne()
        }
        else{
            publictool.responseValue(response,responsevalue,'no data');
        }
    });
}