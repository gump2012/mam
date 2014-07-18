/**
 * Created by lishiming on 1/16/14.
 */
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var db = require("./db/db.js");

var bookLoginHandlers = require("./book/login/bookLoginHandlers");
var photoHandles = require("./book/photo/photoHandles");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/book/login"] = bookLoginHandlers.bookLogin;
handle["/book/register"] = bookLoginHandlers.bookRegister;
handle["/book/findpassword"] = bookLoginHandlers.findpassword;
handle["/info/addinfo"] = photoHandles.addInfo;
handle["/info/getinfolist"] = photoHandles.getPhotoBookList;
handle["/info/getOneInfo"] = photoHandles.getOneInfo;
handle["/info/deleteInfo"] = photoHandles.deleteInfo;
db.start();
server.start(router.route,handle);
