/**
 * Created by lishiming on 3/3/14.
 */

var mongoose = require('mongoose');
function start(){
    var mongodb = mongoose.connect('mongodb://latest.toupai360.com:27017/mam');

    var db = mongodb.connection;

    db.on('error',console.error.bind(console,'connection erro:'));
    db.once('open',function callback(){
        console.log('db is open success!');

        var userSchema = new mongoose.Schema({
            mail:{
                type: String,
                unique: true
            }
            ,ps   :String
            ,user_id:{
                type: String,
                unique: true
            }
            ,nickname:String
            ,headurl:String
            ,Birth:String
            ,sex:String
            ,shop:String
            ,address:String
            ,phone:String
            ,careme:[]
            ,mecare:[]
        });

        mongoose.model('user',userSchema);

        var photoSchema = new mongoose.Schema({
            uid:{
                type:String
                ,unique:true
            }
            ,infolist:[mongoose.Schema.Types.Mixed]
        });

        mongoose.model('info',photoSchema);
    });
};

exports.start = start;
