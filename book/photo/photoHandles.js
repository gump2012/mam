/**
 * Created by lishiming on 14-7-3.
 */
var mongoose = require('mongoose');
var querystring = require("querystring");
var UPYun = require('../../upyun/upyun').UPYun;
var upyun = new UPYun("yige2002video", "yigevideo", "qq85150091");
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
            if(uid&&type&&infotype){
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
                       console.log('has data');
                       infoitem.index = doc.infolist.length + 1;
                       if(infoitem.info_type == "0"){
                           saveText(requestData,doc,infoitem,responsevalue,response);
                       }
                       else if(infoitem.info_type == "1" || infoitem.info_type == "2"){
                           saveImage(requestData,doc,infoitem,responsevalue,response);
                       }else{
                           console.log('infotype wrong');
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
                           saveNewText(item,infomodel,requestData,responsevalue,response);
                       }else if(infoitem.info_type == "1" || infoitem.info_type == "2"){
                           saveNewImage(item,infomodel,requestData,responsevalue,response);
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

function saveText(requestData,doc,infoitem,responsevalue,response){
    doc.infolist.push(infoitem);
    doc.save(function(err){
        if( err )
        {
            console.log(err);
        }
        else{
            responsevalue.info = "1";
        }

        var postData = JSON.stringify(responsevalue);
        response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
        response.write(postData);
        response.end();
    });
}

function saveNewText(item,infomodel,requestData,responsevalue,response){
    var newinfo = new infomodel(item);
    newinfo.save(function(err,silence){
        if( err )
        {
            console.log(err);
        }
        else{
            responsevalue.info = "1";
        }

        var postData = JSON.stringify(responsevalue);
        response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
        response.write(postData);
        response.end();
    });
}

function saveImage(requestData,doc,infoitem,responsevalue,response){
    var smallimagedata = querystring.parse(requestData).img_small;
    console.log('saveImage');
    if(smallimagedata){
        var smallimagejson = JSON.parse(smallimagedata);

        if(smallimagejson[0] && smallimagejson[1]){
            var smallpath = '/'+doc.uid+'/'+'small'+smallimagejson[0];
            console.log(smallpath);
            new Data
            upyun.writeFile(smallpath, smallimagejson[1], true, function(err, data){
                if (!err) {
                    infoitem.img_samll = 'http://testmycdn.b0.upaiyun.com' + smallpath;
                    var bigimagedata = querystring.parse(requestData).img_big;
                    if(bigimagedata){
                        var bigimagejson = JSON.parse(smallimagedata);
                        if(bigimagejson[0] && bigimagejson[1]){
                            var bigpath = '/'+doc.uid+'/'+'big'+bigimagejson[0];
                            upyun.writeFile(bigpath, bigimagejson[1].toDateString(), true, function(err, data){
                                if (!err) {
                                    infoitem.img_big = 'http://testmycdn.b0.upaiyun.com' + bigpath;
                                    if(infoitem.txt && infoitem.txt.length > 0){
                                        var commentitme = {
                                            des_time:infoitem.build_time
                                            ,des_text:infoitem.txt
                                        }

                                        infoitem.commentlist.push(commentitme);
                                    }
                                    doc.infolist.push(infoitem);
                                    doc.save(function(err){
                                        if( err )
                                        {
                                            console.log(err);
                                        }
                                        else{
                                            responsevalue.info = "1";
                                        }
                                        console.log('success');
                                        var postData = JSON.stringify(responsevalue);
                                        response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                                        response.write(postData);
                                        response.end();
                                    });
                                }
                                else{
                                    console.log('put big fail');
                                    var postData = JSON.stringify(responsevalue);
                                    response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                                    response.write(postData);
                                    response.end();
                                }
                            });
                        }
                        else{
                            console.log('no big json');
                            var postData = JSON.stringify(responsevalue);
                            response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                            response.write(postData);
                            response.end();
                        }
                    }
                    else{
                        console.log('no big data');
                        var postData = JSON.stringify(responsevalue);
                        response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                        response.write(postData);
                        response.end();
                    }
                }
                else{
                    console.log('put small fail');
                    console.log(err);
                    var postData = JSON.stringify(responsevalue);
                    response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                    response.write(postData);
                    response.end();
                }
            });

        }else{
            console.log('no small json');
            var postData = JSON.stringify(responsevalue);
            response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
            response.write(postData);
            response.end();
        }
    }else{
        console.log('no smallimagedata');
        var postData = JSON.stringify(responsevalue);
        response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
        response.write(postData);
        response.end();
    }
}

function saveNewImage(item,infomodel,requestData,responsevalue,response){
    var smallimagedata = querystring.parse(requestData).img_small;
    if(smallimagedata){
        var smallimagejson = JSON.parse(smallimagedata);

        if(smallimagejson[0] && smallimagejson[1]){
            var smallpath = '/'+doc.uid+'/'+'small'+smallimagejson[0];
            upyun.writeFile(smallpath, smallimagejson[1], true, function(err, data){
                if (!err) {
                    item.infolist[0].img_samll = 'http://testmycdn.b0.upaiyun.com' + smallpath;
                    var bigimagedata = querystring.parse(requestData).img_big;
                    if(bigimagedata){
                        var bigimagejson = JSON.parse(smallimagedata);
                        if(bigimagejson[0] && bigimagejson[1]){
                            var bigpath = '/'+doc.uid+'/'+'big'+bigimagejson[0];
                            upyun.writeFile(bigpath, bigimagejson[1], true, function(err, data){
                                if (!err) {
                                    item.infolist[0].img_big = 'http://testmycdn.b0.upaiyun.com' + bigpath;
                                    if(item.infolist[0].txt && item.infolist[0].txt.length > 0){
                                        var commentitme = {
                                            des_time:item.infolist[0].build_time
                                            ,des_text:item.infolist[0].txt
                                        }

                                        item.infolist[0].commentlist.push(commentitme);
                                    }

                                    var newinfo = new infomodel(item);
                                    newinfo.save(function(err,silence){
                                        if( err )
                                        {
                                            console.log(err);
                                        }
                                        else{
                                            responsevalue.info = "1";
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
                            });
                        }
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

        }else{
            var postData = JSON.stringify(responsevalue);
            response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
            response.write(postData);
            response.end();
        }
    }else{
        var postData = JSON.stringify(responsevalue);
        response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
        response.write(postData);
        response.end();
    }
}