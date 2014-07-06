/**
 * Created by lishiming on 14-7-3.
 */
var mongoose = require('mongoose');
var querystring = require("querystring");

exports.getPhotoBookList = function(response,request){
    var requestData = '';
    request.addListener('data', function(postDataChunk) {
        requestData += postDataChunk;
    });

    request.addListener('end', function() {
        if(requestData != ''){
            var uid = querystring.parse(requestData).uid;
            var babyid = querystring.parse(requestData).type;

            var responsevalue = {
                list:[]
            };

            var infomodel = mongoose.model('info');
            infomodel.findOne({uid:uid},'infolist',function(err,doc){
                if(doc){
                    for(i in doc.infolist){
                        if(babyid == "0")
                        {
                            var item = {
                                index:doc.infolist[i].index
                                ,vid:doc.infolist[i].video_image
                                ,img:doc.infolist[i].img_small
                                ,des:[]
                                ,build_time:doc.infolist[i].time
                                ,txt:doc.infolist[i].txt
                            }

                            for(j in doc.infolist[i].commentlist){
                                var commentitem = {
                                    des_time:doc.infolist[i].commentlist[j].time
                                    ,des_item:doc.infolist[i].commentlist[j].des
                                }

                                item.des.push(commentitem);
                            }

                            responsevalue.list.push(item);
                        }
                        else{
                            if(doc.infolist[i].babyid == babyid){

                            }
                        }

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
    });
}

exports.getOneInfo = function (response,request){
    var requestData = '';
    request.addListener('data', function(postDataChunk) {
        requestData += postDataChunk;
    });

    request.addListener('end', function() {
        if(requestData != ''){
            var uid = querystring.parse(requestData).uid;
            var index = querystring.parse(requestData).index;

            var responsevalue = {
                img:''
                ,vid:''
                ,txt:''
            }

            var infomodel = mongoose.model('info');
            infomodel.findOne({uid:uid},'infolist',function(err,doc){
                if(doc){
                    for(i in doc.infolist){
                        if(doc.infolist[i].index == index){
                            responsevalue.img = doc.infolist[i].img_big;
                            responsevalue.vid = doc.infolist[i].video_url;
                            responsevalue.txt = doc.infolist[i].txt;
                            break;
                        }
                    }
                }
                var postData = JSON.stringify(responsevalue);
                response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                response.write(postData);
                response.end();
            });
        }
    });
}

exports.modifyInfo = function(response,request){
    var requestData = '';
    request.addListener('data', function(postDataChunk) {
        requestData += postDataChunk;
    });

    request.addListener('end', function() {
        if(requestData != ''){
            var uid = querystring.parse(requestData).uid;
            var type = querystring.parse(requestData).type;
            var index = querystring.parse(requestData).index;
            var txt_type = querystring.parse(requestData).txt_type;
            var txt = querystring.parse(requestData).txt;
            var des_index = querystring.parse(requestData).des_index;
            var des_time = querystring.parse(requestData).des_time;

        }
    });
}

exports.addInfo = function(response,request){
    var requestData = '';
    request.addListener('data', function(postDataChunk) {
        requestData += postDataChunk;
    });

    request.addListener('end', function() {
        if(requestData != ''){
            var uid = querystring.parse(requestData).uid;
            var type = querystring.parse(requestData).type;
            var index = querystring.parse(requestData).index;
            var txt_type = querystring.parse(requestData).txt_type;
            var txt = querystring.parse(requestData).txt;
            var des_index = querystring.parse(requestData).des_index;
            var des_time = querystring.parse(requestData).des_time;
        }
    });
}

exports.deleteInfo = function(response,request){
    var requestData = '';
    request.addListener('data', function(postDataChunk) {
        requestData += postDataChunk;
    });

    request.addListener('end', function() {
        if(requestData != ''){

        }
    });
}