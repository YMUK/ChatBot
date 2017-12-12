// region ***** require *****
const restify = require('restify');
const builder = require('botbuilder');
const scheduler = require('node-schedule');
const request = require('superagent');

// endregion

//region ***** Server セットアップ *****/
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log("Server Start");
});
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID, // MBFPortalに作成したボットのID
    appPassword: process.env.MICROSOFT_APP_PASSWORD // MBFPortalに作成したボットのPassword
});

server.post('/', connector.listen()); // 例：https://xxx.co.jp/
//endregion

//region ***** Bot セットアップ ***** /
var bot = module.exports = new builder.UniversalBot(connector, [
    (session, args, next) => {
//        session.send(session.message.text);
		if(session.userData.isKnown){
		
		session.send(session.userData.nake+"さん こんにちは！");
		}else{
		
		session.beginDialog("firstTime");	
    }
]);

bot.dialog("firsttime",[
	(session,args,next)=>{
		session.send("はじめまして!");
		builder.Prompts.text(session,"あなたの名前は何？");
},
	(session,results,next)=>{
		session.userData.name=results.response;
		session.userData.isKnown=true;
		session.send(session.userData.name+"さん");
		session.endCoversation("よろしくお願いします!!");
	}
]);
