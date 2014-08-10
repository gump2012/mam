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
                    for(var i = 0; i < doc.infolist.length;++i){

                        if(babyid == "0")
                        {
                            var item = {
                                index:doc.infolist[i].index
                                ,vid:doc.infolist[i].img_samll
                                ,img:doc.infolist[i].img_samll
                                ,info_type:doc.infolist[i].info_type
                                ,des:[]
                                ,build_time:doc.infolist[i].build_time
                                ,txt:''
                            }
                            if(doc.infolist[i].info_type == "0"){
                                if(doc.infolist[i].txt.length > 50){
                                    item.txt = doc.infolist[i].txt.substring(0,50);
                                }else{
                                    item.txt = doc.infolist[i].txt;
                                }
                            }

                            for(j in doc.infolist[i].commentlist){
                                var commentitem = {
                                    des_time:doc.infolist[i].commentlist[j].des_time
                                    ,des_item:doc.infolist[i].commentlist[j].des_text
                                    ,des_index:doc.infolist[i].commentlist[j].des_index
                                }

                                item.des.push(commentitem);
                            }

                            responsevalue.list.push(item);
                        }
                        else{
                            if(doc.infolist[i].babytype == babyid){
                                var item = {
                                    index:doc.infolist[i].index
                                    ,vid:doc.infolist[i].img_small
                                    ,img:doc.infolist[i].img_small
                                    ,info_type:infolist[i].info_type
                                    ,des:[]
                                    ,build_time:doc.infolist[i].build_time
                                    ,txt:''
                                }
                                if(doc.infolist[i].info_type == "0"){
                                    if(doc.infolist[i].txt.length > 50){
                                        item.txt = doc.infolist[i].txt.substring(0,50);
                                    }else{
                                        item.txt = doc.infolist[i].txt;
                                    }
                                }

                                for(j in doc.infolist[i].commentlist){
                                    var commentitem = {
                                        des_time:doc.infolist[i].commentlist[j].des_time
                                        ,des_item:doc.infolist[i].commentlist[j].des_text
                                        ,des_index:doc.infolist[i].commentlist[j].des_index
                                    }

                                    item.des.push(commentitem);
                                }

                                responsevalue.list.push(item);
                            }
                        }
                    }

                    var postData = JSON.stringify(responsevalue);
                    response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                    response.write(postData);
                    response.end();
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
                    for(var i = 0;i < doc.infolist.length;++i){
                        if(doc.infolist[i].index == Number(index)){
                            responsevalue.img = doc.infolist[i].img_big;
                            responsevalue.vid = doc.infolist[i].img_big;
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
            var index = querystring.parse(requestData).index;
            var txt = querystring.parse(requestData).txt;
            var des_index = querystring.parse(requestData).des_index;
            var responsevalue = {"info":"-1"};
            if(uid&&index){
                var infomodel = mongoose.model('info');

                infomodel.findOne({uid:uid},function(err,doc){
                    if(doc){
                        var bfind = false;
                        for(var i = 0; i < doc.infolist.length;++i){
                            if(doc.infolist[i].index == Number(index)){
                                bfind = true;
                                if(doc.infolist[i].info_type == "0"){
                                    if(txt){
                                        if(txt.length == 0){
                                            doc.infolist.remove(i);
                                        }
                                        else{
                                            doc.infolist[i].txt = txt;
                                        }
                                        doc.markModified('infolist');
                                        doc.save(function(err){
                                            if(err){
                                                console.log(err);
                                            }else{
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
                                }else{
                                    if(txt){
                                        if(txt.length == 0){
                                            if(des_index && des_index < doc.infolist[i].commentlist.length){
                                                doc.infolist[i].commentlist.remove(des_index);
                                            }
                                        }
                                        else{
                                            var commentitem = {
                                                des_time:Date.now().toString()
                                                ,des_text:txt
                                                ,des_index:0
                                            }

                                            if(doc.infolist[i].commentlist.length > 0){
                                                commentitem.des_index = doc.infolist[i].commentlist[doc.infolist[i].commentlist.length - 1].des_index + 1;
                                            }
                                            doc.infolist[i].commentlist.push(commentitem);
                                        }
                                        doc.markModified('infolist');
                                        doc.save(function(err,silence){
                                            if(err){
                                                console.log(err);
                                            }else{
                                                console.log(doc.infolist[0].commentlist);
                                                console.log('save');
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
                                }
                                break;
                            }
                        }
                        if(!bfind){
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
                });
            }else{
                var postData = JSON.stringify(responsevalue);
                response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                response.write(postData);
                response.end();
            }
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
            var infotype = querystring.parse(requestData).info_type;
            var txt = querystring.parse(requestData).txt;
            var strsmallimage = querystring.parse(requestData).img_small;
            var strbigimage = querystring.parse(requestData).img_big;
            var ispublish = querystring.parse(requestData).is_pulish;
            var responsevalue = {"info":"-1"};
            if(uid&&type&&infotype&&ispublish){
                var infomodel = mongoose.model('info');
                var infoitem = {
                    babytype:type
                    ,index:0
                    ,img_samll:''
                    ,img_big:''
                    ,info_type:infotype
                    ,build_time:Date.now().toString()
                    ,txt:txt
                    ,is_pulish:ispublish
                    ,commentlist:[]
                };

                infomodel.findOne({uid:uid},function(err,doc){
                   if(doc){
                       if(doc.infolist.length > 0){
                           infoitem.index = doc.infolist[doc.infolist.length-1].index+1;
                       }

                       if(infoitem.info_type == "0"){
                           saveText(requestData,doc,infoitem,responsevalue,response);
                       }
                       else if(infoitem.info_type == "1" || infoitem.info_type == "2"){
                           //saveImage(requestData,doc,infoitem,responsevalue,response);
                           if(strbigimage&&strsmallimage){
                               infoitem.img_samll = strsmallimage;
                               infoitem.img_big = strbigimage;

                               if(infoitem.txt && infoitem.txt.length > 0){
                                   var commentitme = {
                                       des_time:infoitem.build_time
                                       ,des_text:infoitem.txt
                                       ,des_index:0
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
                               console.log('infotype wrong');
                               var postData = JSON.stringify(responsevalue);
                               response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                               response.write(postData);
                               response.end();
                           }
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

                       infoitem.index = 0;
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
                console.log('no data');
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
            var uid = querystring.parse(requestData).uid;
            var index = querystring.parse(requestData).index;
            var infomodel = mongoose.model('info');
            var responsevalue = {"info":"-1"};

            infomodel.findOne({uid:uid},'infolist',function(err,doc){
                if(doc){
                    var isfind = false;
                    for(var i = 0;i < doc.infolist.length;++i){
                        if(doc.infolist[i].index == Number(index)){
                            isfind = true;
                            doc.infolist.splice(i,1);
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
                            break;
                        }
                    }

                    if(!isfind){
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

            });
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
    if(smallimagedata){
        console.log(smallimagedata);
        var smallimagejson = JSON.parse(decodeURI(smallimagedata));

        if(smallimagejson[0]&&smallimagejson[1]){
            var smallpath = '/'+doc.uid+'/small'+infoitem.index+smallimagejson[0];
            console.log(smallimagejson[1]);
            var base64Data = smallimagejson[1].replace(/\s/g,"+");
            var img = new Buffer(base64Data,'base64');
            upyun.writeFile(smallpath, img, true, function(err, data){
                if (!err) {
                    infoitem.img_samll = 'http://yige2002video.b0.upaiyun.com' + smallpath;
                    var bigimagedata = querystring.parse(requestData).img_big;
                    if(bigimagedata){
                        var bigimagejson = JSON.parse(bigimagedata);
                        if(bigimagejson[0] && bigimagejson[1]){
                            var bigpath = '/'+doc.uid+'/'+'big'+infoitem.index+bigimagejson[0];
                            base64Data = bigimagejson[1].replace(/\s/g,"+");
                            img = new Buffer(base64Data,'base64');
                            upyun.writeFile(bigpath, img, true, function(err, data){
                                if (!err) {
                                    infoitem.img_big = 'http://yige2002video.b0.upaiyun.com' + bigpath;
                                    if(infoitem.txt && infoitem.txt.length > 0){
                                        var commentitme = {
                                            des_time:infoitem.build_time
                                            ,des_text:infoitem.txt
                                            ,des_index:0
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
            var smallpath = '/'+doc.uid+'/'+'small'+item.infolist[0].index+smallimagejson[0];
            upyun.writeFile(smallpath, smallimagejson[1], true, function(err, data){
                if (!err) {
                    item.infolist[0].img_samll = 'http://testmycdn.b0.upaiyun.com' + smallpath;
                    var bigimagedata = querystring.parse(requestData).img_big;
                    if(bigimagedata){
                        var bigimagejson = JSON.parse(smallimagedata);
                        if(bigimagejson[0] && bigimagejson[1]){
                            var bigpath = '/'+doc.uid+'/'+'big'+item.infolist[0].index+bigimagejson[0];
                            upyun.writeFile(bigpath, bigimagejson[1], true, function(err, data){
                                if (!err) {
                                    item.infolist[0].img_big = 'http://testmycdn.b0.upaiyun.com' + bigpath;
                                    if(item.infolist[0].txt && item.infolist[0].txt.length > 0){
                                        var commentitme = {
                                            des_time:item.infolist[0].build_time
                                            ,des_text:item.infolist[0].txt
                                            ,dex_index:0
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