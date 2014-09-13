/**
 * Created by gump on 9/13/14.
 */
var mongoose = require('mongoose');
var querystring = require("querystring");
var publictool = require("../../public/publictool");

exports.publicPhoto = function (response,request){
    var requestData = '';
    request.addListener('data', function(postDataChunk) {
        requestData += postDataChunk;
    });

    request.addListener('end', function() {
        if(requestData != ''){
            var uid = querystring.parse(requestData).uid;
            var infotype = querystring.parse(requestData).infotype;
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
                        publictool.responseValue(response,responsevalue,'');
                    }
                    else{
                        if(istart == 0){
                            for(var i = doc.infolist.length - 1;i > 0;--i){
                                if(doc.infolist[i].is_pulish == "1" &&
                                    doc.infolist[i].info_type == infotype)
                                {
                                    var item = {
                                        smallUrl:doc.infolist[i].img_samll
                                        ,imgUrl:doc.infolist[i].img_big
                                        ,vidUrl:doc.infolist[i].img_big
                                        ,build_Data:doc.infolist[i].build_time
                                        ,blessing:doc.infolist[i].blessing
                                    }

                                    responsevalue.list.push(item);
                                    if(responsevalue.list.length > 14){
                                        break;
                                    }
                                }
                            }
                        }
                        else{
                            for(var i = doc.infolist.length - istart - 1;i > 0;--i){
                                if(doc.infolist[i].is_pulish == "1" &&
                                    doc.infolist[i].info_type == infotype)
                                {
                                    var item = {
                                        smallUrl:doc.infolist[i].img_samll
                                        ,imgUrl:doc.infolist[i].img_big
                                        ,vidUrl:doc.infolist[i].img_big
                                        ,build_Data:doc.infolist[i].build_time
                                        ,blessing:doc.infolist[i].blessing
                                    }

                                    responsevalue.list.push(item);
                                    if(responsevalue.list.length > 14){
                                        break;
                                    }
                                }
                            }
                        }
                    }

                    publictool.assistantValue(response,responsevalue,'');
                }
                else{
                    publictool.assistantValue(response,responsevalue,'');
                }
            });
        }
        else{
            console.log('no data')
        }
    });
}
