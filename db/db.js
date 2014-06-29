/**
 * Created by lishiming on 3/3/14.
 */

var mongoose = require('mongoose');
function start(){
    var mongodb = mongoose.connect('mongodb://114.215.129.162:27017/mam');

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
        });

        mongoose.model('user',userSchema);
    });
};

exports.start = start;