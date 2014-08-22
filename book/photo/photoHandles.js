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
            var indexstart = querystring.parse(requestData).index_start;
            var responsevalue = {
                list:[]
            };

            var infomodel = mongoose.model('info');
            infomodel.findOne({uid:uid},'infolist',function(err,doc){
                if(doc){
                    var istart = new Number(indexstart);
                    if(istart >= doc.infolist.length || istart < 0)
                    {
                        console.log('index 太长',istart);
                        var postData = JSON.stringify(responsevalue);
                        response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
                        response.write(postData);
                        response.end();
                    }
                    else{
                        if(istart == 0){
                            for(var i = doc.infolist.length - 1;i > 0;--i){
                                if(babyid == "全部")
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
                                    if(responsevalue.list.length > 14){
                                        break;
                                    }
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
                                        if(responsevalue.list.length > 14){
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(var i = doc.infolist.length - istart - 1;i > 0;--i){
                                if(babyid == "全部")
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
                                    if(responsevalue.list.length > 14){
                                        break;
                                    }
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
                                        if(responsevalue.list.length > 14){
                                            break;
                                        }
                                    }
                                }
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
            var responsevalue = {"info":"-1",
            "more":{
                "des_time":""
                ,"index":""
            }};
            if(uid&&index){
                var infomodel = mongoose.model('info');
                console.log('has uid',uid,index);
                infomodel.findOne({uid:uid},function(err,doc){
                    if(doc){
                        console.log('find');
                        console.log(doc.infolist.length);
                        var bfind = false;
                        console.log(index);
                        for(var i = 0; i < doc.infolist.length;++i){
                            console.log(doc.infolist[i].index);
                            console.log(doc.infolist[i].index == Number(index));
                            if(doc.infolist[i].index == Number(index)){
                                console.log('find doc');
                                console.log(doc.infolist[i].info_type);
                                bfind = true;
                                if(doc.infolist[i].info_type == "0"){
                                    if(txt){
                                        if(txt.length == 0){
                                            doc.infolist.splice(i,1);
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
doc.infolist.splice(i,1);
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
                                }else{
				    console.log(txt);
                                    if(txt){
                                        console.log('jin');
                                        console.log(txt.length);
                                        if(txt.length == 0){
                                            if(des_index && Number(des_index) < doc.infolist[i].commentlist.length){
                                                for(var j = 0; j < doc.infolist[i].commentlist.length;++j){
                                                    if(doc.infolist[i].commentlist[j].des_index == Number(des_index)){
                                                        doc.infolist[i].commentlist.splice(j,1);
                                                    }
                                                }
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

                                            responsevalue.more.des_time = commentitem.des_time;
                                            responsevalue.more.index = commentitem.des_index;

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
if(des_index && Number(des_index) < doc.infolist[i].commentlist.length){
                                                for(var j = 0; j < doc.infolist[i].commentlist.length;++j){
                                                    if(doc.infolist[i].commentlist[j].des_index == Number(des_index)){
                                                        doc.infolist[i].commentlist.splice(j,1);
                                                    }
                                                }
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
                                        console.log('no txt');
                                    
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
                console.log('no data');
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
            var ispublish = querystring.parse(requestData).is_publish;
            var responsevalue = {"info":"-1"
            ,"more":
                {"index":0
                 ,"info_type":"0"
                 ,"vid":""
                 ,"img":""
                 ,"des":[]
                 ,"build_time":"2016-4"
                 ,"build_time_day":"13"
                }
            };
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
                           if(strbigimage&&strsmallimage){
                               infoitem.img_samll = strsmallimage;
                               infoitem.img_big = strbigimage;

                               if(infoitem.txt && infoitem.txt.length > 0){
                                   var commentitme = {
                                       des_time:infoitem.build_time
                                       ,des_text:infoitem.txt
                                       ,des_index:0
                                   }
                                   responsevalue.more.des.push(commentitme);
                                   infoitem.commentlist.push(commentitme);
                               }

                               responsevalue.more.index = infoitem.index;
                               responsevalue.more.info_type = infoitem.info_type;
                               responsevalue.more.vid = infoitem.img_big;
                               responsevalue.more.img = infoitem.img_samll;
                               responsevalue.more.build_time = infoitem.build_time;
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
                                   responsevalue.more.des.push(commentitme);
                               }

                               responsevalue.more.index = infoitem.index;
                               responsevalue.more.info_type = infoitem.info_type;
                               responsevalue.more.vid = infoitem.img_big;
                               responsevalue.more.img = infoitem.img_samll;
                               responsevalue.more.build_time = infoitem.build_time;
                               var newinfo = new infomodel(item);
                               newinfo.save(function(err,silence){
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
