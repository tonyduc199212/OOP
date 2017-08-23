var engine = require('consolidate');
var express = require("express");
var app = express();

app.use(express.static("public"));
//app.engine('html', require('ejs').renderFile);
app.engine('html', engine.mustache);
app.set("view engine", "html");
app.set("views","./views");

var server = require("http").Server(app);
//var server = require("http").createServer(app);

var io = require("socket.io")(server);


server.listen(3000, function(){
	console.log('server is started on port 3000!!!')
});


io.on("connection",function(socket){
	 console.log("co nguoi ket noi: " + socket.id);
});


app.get("/",function(req, res){
    res.render("index.html",{ check0:[1,2,3]});
	//res.sendFile(__dirname+"/views/index.html")
});

//làm socket io gửi ds mảng về