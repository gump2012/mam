var publictool = require("../../public/publictool");
var route = require("../../router");

var modifyinfo = require("./userModifyInfo");
var publicPhoto = require("./userPublicPhoto");

var myHandle = {}

myHandle["modifyUserInfo"] = modifyinfo.modifyUserInfo;
myHandle["getPublicPhoto"] = publicPhoto.publicPhoto;

exports.user = function (response,request){
    var assistant = publictool.getAssistantValue(request);
    if(assistant){
        console.log(assistant);
        route.route(myHandle,assistant,response,request);
    }
}