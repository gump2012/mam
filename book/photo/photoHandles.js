/**
 * Created by lishiming on 14-7-3.
 */
var mongoose = require('mongoose');
var querystring = require("querystring");
var UPYun = require('../../upyun/upyun').UPYun;

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
    var upyun = new UPYun("yige2002", "yige", "qq85150091");
    upyun.getBucketUsage(testCallback);

    var requestData = '';
    request.addListener('data', function(postDataChunk) {
        requestData += postDataChunk;
    });

    request.addListener('end', function() {
        if(requestData != ''){
            var uid = querystring.parse(requestData).uid;
            var type = querystring.parse(requestData).type;
            var infotype = querystring.parse(requestData).info_type;
            var txt = querystring.parse(requestData).txt;
            var responsevalue = {"info":"-1"};
            if(uid&&type&&infotype&&txt){
                var infomodel = mongoose.model('info');
                var infoitem = {
                    babytype:type
                    ,index:1
                    ,img_samll:''
                    ,img_big:''
                    ,info_type:infotype
                    ,build_time:Date.now().toString()
                    ,txt:txt
                    ,commentlist:[]
                };

                infomodel.findOne({uid:uid},function(err,doc){
                   if(doc){
                       infoitem.index = doc.infolist.length + 1;
                       if(infoitem.info_type == "0"){
                           saveText(requestData,doc,infoitem);
                       }
                       else if(infoitem.info_type == "1"){
                           saveImage(requestData,doc,infoitem);
                       }else if(infoitem.info_type == "2"){
                           saveVideo();
                       }else{
                           var postData = JSON.stringify(responsevalue);
                           response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                           response.write(postData);
                           response.end();
                       }


                   }else{
                       var item = {
                           uid:uid
                           ,infolist:[]
                       }

                       infoitem.index = 1;
                       item.infolist.push(infoitem);

                       if(infoitem.info_type == "0"){
                           saveNewText(item,infomodel,requestData);
                       }else if(infoitem.info_type == "1"){
                           saveNewImage();
                       }else if(infoitem.info_type == "2"){
                           saveNewVideo();
                       }else{
                           var postData = JSON.stringify(responsevalue);
                           response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                           response.write(postData);
                           response.end();
                       }
                   }
                });
            }
            else{
                var postData = JSON.stringify(responsevalue);
                response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                response.write(postData);
                response.end();
            }

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

function testCallback(err, data) {
    if (!err) {
        console.log('Data: ');
        console.log(data);
    }
    else {
        console.log('Error: ');
        console.log(err);
    }
}

function saveText(requestData,doc,infoitem){
    doc.infolist.push(infoitem);
    doc.save(function(err){
        if( err )
        {
            console.log(err);
        }
    });
}

function saveNewText(item,infomodel,requestData){
    var newinfo = new infomodel(item);
    newinfo.save(function(err,silence){
        if( err )
        {
            console.log(err);
        }
    });
}

function saveImage(requestData,doc,infoitem){
    var smallimagedata = querystring.parse(requestData).img_small;
    //var smallimagejson = JSON().prar
}