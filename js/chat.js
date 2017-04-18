/* 
Created by: Kenrick Beckett
Modified by: psbhanu
Name: Chat Engine
*/

var instanse = false;
var state = 0;
var mes;
var file;

function Chat () {
    this.update 			= updateChat;
    this.send 				= sendChat;
	this.login 				= loginChatUser;
	this.logout				= logoutChatUser;
	this.getState 			= getStateOfChat;
	this.getDate 			= getDateOfChat;
	this.getDateWithDay 	= getDateOfChatWithDay;
	this.getTime 			= getTimeOfChat;
	this.addSmile 			= addSmile;
	this.addChatBIU 		= addChatBIU;
	this.clearScreen		= clearChatScreen;
}
// Clear Screen
function clearChatScreen(Screen){
	var Screen = document.getElementById(Screen);
	Screen.innerHTML="";
}
// Adaugare font B, I, U
function addChatBIU(start, end, zona) {
  var adchat = document.getElementById(zona);
  var IE = /*@cc_on!@*/false;    // this variable is false in all browsers, except IE

  if (IE) {
    adchat.value = adchat.value + start + end;    // Add in field the initial values + received dta
    var pos = adchat.value.length - end.length;    // Sets location for cursor position

    // position the cursor through a selected area
    range = adchat.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);        // start position
    range.moveStart('character', pos);        // end position
    range.select();                 // selects the zone
  }
  else if (adchat.selectionStart || adchat.selectionStart == "0") {
    var startPos = adchat.selectionStart;
    var endPos = adchat.selectionEnd;
    adchat.value = adchat.value.substring(0, startPos) + start + adchat.value.substring(startPos, endPos) + end + adchat.value.substring(endPos, adchat.value.length);

    // Place the cursor between formats in #adchat
    adchat.setSelectionRange((endPos+start.length),(endPos+start.length));
    adchat.focus();
  }
}

// for clicked smile in element with ID passed in "idadd"
function addSmile(smile, idadd) {
  var tarea_com = document.getElementById(idadd);
  tarea_com.value += smile;
  tarea_com.focus();
}


// object to convert BBCODE in HTML tags
/* -default 
var bbcodeParser={};(function(){var token_match=/{[A-Z_]+[0-9]*}|:\)|:\(|:P|:D|:S|:O|:=\)|:\|H|:X|:\-\<star>/ig;bbcodeParser.tokens={'URL':'((?:(?:[a-z][a-z\\d+\\-.]*:\\/{2}(?:(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+|[0-9.]+|\\[[a-z0-9.]+:[a-z0-9.]+:[a-z0-9.:]+\\])(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)|(?:www\\.(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)))','LOCAL_URL':'((?:[a-z0-9\-._~\!$&\'()*+,;=:@|]+|%[\dA-F]{2})*(?:\/(?:[a-z0-9\-._~\!$&\'()*+,;=:@|]+|%[\dA-F]{2})*)*(?:\?(?:[a-z0-9\-._~\!$&\'()*+,;=:@\/?|]+|%[\dA-F]{2})*)?(?:#(?:[a-z0-9\-._~\!$&\'()*+,;=:@\/?|]+|%[\dA-F]{2})*)?)','EMAIL':'((?:[\\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*(?:[\\w\!\#$\%\'\*\+\-\/\=\?\^\`{\|\}\~]|&)+@(?:(?:(?:(?:(?:[a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(?:\\d{1,3}\.){3}\\d{1,3}(?:\:\\d{1,5})?))','TEXT':'(.*?)','SIMPLETEXT':'([a-zA-Z0-9-+.,_ ]+)','INTTEXT':'([a-zA-Z0-9-+,_. ]+)','IDENTIFIER':'([a-zA-Z0-9-_]+)','COLOR':'([a-z]+|#[0-9abcdef]+)','NUMBER':'([0-9]+)'};bbcodeParser.bbcode_matches=[];bbcodeParser.html_tpls=[];bbcodeParser._getRegEx=function(str){var matches=str.match(token_match);var i=0;var replacement='';if(matches.length<=0){return new RegExp(preg_quote(str),'g');}
for(;i<matches.length;i+=1){var token=matches[i].replace(/[{}0-9]/g,'');if(bbcodeParser.tokens[token]){replacement+=preg_quote(str.substr(0,str.indexOf(matches[i])))+bbcodeParser.tokens[token];str=str.substr(str.indexOf(matches[i])+matches[i].length);}}
replacement+=preg_quote(str);return new RegExp(replacement,'gi');};bbcodeParser._getTpls=function(str){var matches=str.match(token_match);var i=0;var replacement='';var positions={};var next_position=0;if(matches.length<=0){return str;}
for(;i<matches.length;i+=1){var token=matches[i].replace(/[{}0-9]/g,'');var position;if(positions[matches[i]]){position=positions[matches[i]];}else{next_position+=1;position=next_position;positions[matches[i]]=position;}
if(bbcodeParser.tokens[token]){replacement+=str.substr(0,str.indexOf(matches[i]))+'$'+position;str=str.substr(str.indexOf(matches[i])+matches[i].length);}}
replacement+=str;return replacement;};bbcodeParser.addBBCode=function(bbcode_match,bbcode_tpl){bbcodeParser.bbcode_matches.push(bbcodeParser._getRegEx(bbcode_match));bbcodeParser.html_tpls.push(bbcodeParser._getTpls(bbcode_tpl));};bbcodeParser.bbcodeToHtml=function(str){var i=0;for(;i<bbcodeParser.bbcode_matches.length;i+=1){str=str.replace(bbcodeParser.bbcode_matches[i],bbcodeParser.html_tpls[i]);}
return str;};function preg_quote(str,delimiter){return(str+'').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\'+(delimiter||'')+'-]','g'),'\\$&');}})();
bbcodeParser.addBBCode('[b]{TEXT}[/b]', '<span class="sb">{TEXT}</span>');
bbcodeParser.addBBCode('[u]{TEXT}[/u]', '<span class="su">{TEXT}</span>');
bbcodeParser.addBBCode('[i]{TEXT}[/i]', '<span class="si">{TEXT}</span>');
bbcodeParser.addBBCode('[url]{URL}[/url]', '<a href="{URL}" title="link" target="_blank" rel="nofallow">{URL}</a>');
bbcodeParser.addBBCode('[url={URL}]{TEXT}[/url]', '<a href="{URL}" title="link" target="_blank" rel="nofallow">{TEXT}</a>');
bbcodeParser.addBBCode(':)', '<img src="images/smile/0.gif" width="18" height="18" alt=":)" />');
bbcodeParser.addBBCode(':(', '<img src="images/smile/1.gif" width="18" height="18" alt=":(" />');
bbcodeParser.addBBCode(':P', '<img src="images/smile/2.gif" width="18" height="18" alt=":P" />');
bbcodeParser.addBBCode(':D', '<img src="images/smile/3.gif" width="18" height="18" alt=":D" />');
bbcodeParser.addBBCode(':S', '<img src="images/smile/4.gif" width="18" height="18" alt=":S" />');
bbcodeParser.addBBCode(':O', '<img src="images/smile/5.gif" width="18" height="18" alt=":O" />');
bbcodeParser.addBBCode(':=)', '<img src="images/smile/6.gif" width="18" height="18" alt=":=)" />');
bbcodeParser.addBBCode(':|H', '<img src="images/smile/7.gif" width="42" height="18" alt=":|H" />');
bbcodeParser.addBBCode(':X', '<img src="images/smile/8.gif" width="18" height="18" alt=":X" />');
bbcodeParser.addBBCode(':-*', '<img src="images/smile/9.gif" width="18" height="18" alt=":-*" />');
*/
/* -blue
var bbcodeParser={};(function(){var token_match=/{[A-Z_]+[0-9]*}|:\)|:\(|:P|:D|:S|:O|:=\)|:\|H|:X|:\-\<star*>/ig;bbcodeParser.tokens={'URL':'((?:(?:[a-z][a-z\\d+\\-.]*:\\/{2}(?:(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+|[0-9.]+|\\[[a-z0-9.]+:[a-z0-9.]+:[a-z0-9.:]+\\])(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)|(?:www\\.(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)))','LOCAL_URL':'((?:[a-z0-9\-._~\!$&\'()*+,;=:@|]+|%[\dA-F]{2})*(?:\/(?:[a-z0-9\-._~\!$&\'()*+,;=:@|]+|%[\dA-F]{2})*)*(?:\?(?:[a-z0-9\-._~\!$&\'()*+,;=:@\/?|]+|%[\dA-F]{2})*)?(?:#(?:[a-z0-9\-._~\!$&\'()*+,;=:@\/?|]+|%[\dA-F]{2})*)?)','EMAIL':'((?:[\\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*(?:[\\w\!\#$\%\'\*\+\-\/\=\?\^\`{\|\}\~]|&)+@(?:(?:(?:(?:(?:[a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(?:\\d{1,3}\.){3}\\d{1,3}(?:\:\\d{1,5})?))','TEXT':'(.*?)','SIMPLETEXT':'([a-zA-Z0-9-+.,_ ]+)','INTTEXT':'([a-zA-Z0-9-+,_. ]+)','IDENTIFIER':'([a-zA-Z0-9-_]+)','COLOR':'([a-z]+|#[0-9abcdef]+)','NUMBER':'([0-9]+)'};bbcodeParser.bbcode_matches=[];bbcodeParser.html_tpls=[];bbcodeParser._getRegEx=function(str){var matches=str.match(token_match);var i=0;var replacement='';if(matches.length<=0){return new RegExp(preg_quote(str),'g');}
for(;i<matches.length;i+=1){var token=matches[i].replace(/[{}0-9]/g,'');if(bbcodeParser.tokens[token]){replacement+=preg_quote(str.substr(0,str.indexOf(matches[i])))+bbcodeParser.tokens[token];str=str.substr(str.indexOf(matches[i])+matches[i].length);}}
replacement+=preg_quote(str);return new RegExp(replacement,'gi');};bbcodeParser._getTpls=function(str){var matches=str.match(token_match);var i=0;var replacement='';var positions={};var next_position=0;if(matches.length<=0){return str;}
for(;i<matches.length;i+=1){var token=matches[i].replace(/[{}0-9]/g,'');var position;if(positions[matches[i]]){position=positions[matches[i]];}else{next_position+=1;position=next_position;positions[matches[i]]=position;}
if(bbcodeParser.tokens[token]){replacement+=str.substr(0,str.indexOf(matches[i]))+'$'+position;str=str.substr(str.indexOf(matches[i])+matches[i].length);}}
replacement+=str;return replacement;};bbcodeParser.addBBCode=function(bbcode_match,bbcode_tpl){bbcodeParser.bbcode_matches.push(bbcodeParser._getRegEx(bbcode_match));bbcodeParser.html_tpls.push(bbcodeParser._getTpls(bbcode_tpl));};bbcodeParser.bbcodeToHtml=function(str){var i=0;for(;i<bbcodeParser.bbcode_matches.length;i+=1){str=str.replace(bbcodeParser.bbcode_matches[i],bbcodeParser.html_tpls[i]);}
return str;};function preg_quote(str,delimiter){return(str+'').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\'+(delimiter||'')+'-]','g'),'\\$&');}})();
bbcodeParser.addBBCode('[b]{TEXT}[/b]', '<span class="sb">{TEXT}</span>');
bbcodeParser.addBBCode('[u]{TEXT}[/u]', '<span class="su">{TEXT}</span>');
bbcodeParser.addBBCode('[i]{TEXT}[/i]', '<span class="si">{TEXT}</span>');
bbcodeParser.addBBCode('[url]{URL}[/url]', '<a href="{URL}" title="link" target="_blank" rel="nofallow">{URL}</a>');
bbcodeParser.addBBCode('[url={URL}]{TEXT}[/url]', '<a href="{URL}" title="link" target="_blank" rel="nofallow">{TEXT}</a>');
bbcodeParser.addBBCode(':)', '<img src="images/smilies/10.gif" width="24" height="24" alt=":)" />');
bbcodeParser.addBBCode(':(', '<img src="images/smilies/1.gif" width="24" height="24" alt=":(" />');
bbcodeParser.addBBCode(':P', '<img src="images/smilies/2.gif" width="24" height="24" alt=":P" />');
bbcodeParser.addBBCode(':D', '<img src="images/smilies/3.gif" width="24" height="24" alt=":D" />');
bbcodeParser.addBBCode(':S', '<img src="images/smilies/4.gif" width="24" height="24" alt=":S" />');
bbcodeParser.addBBCode(':O', '<img src="images/smilies/5.gif" width="24" height="24" alt=":O" />');
bbcodeParser.addBBCode(':=)', '<img src="images/smilies/6.gif" width="24" height="24" alt=":=)" />');
bbcodeParser.addBBCode(':|H', '<img src="images/smilies/7.gif" width="24" height="24" alt=":|H" />');
bbcodeParser.addBBCode(':X', '<img src="images/smilies/8.gif" width="24" height="24" alt=":X" />');
bbcodeParser.addBBCode(':-*', '<img src="images/smilies/9.gif" width="24" height="24" alt=":-*" />');
*/
var bbcodeParser={};(function(){var token_match=/{[A-Z_]+[0-9]*}|:\)|:\(|:P|:D|:S|:O|:=\)|:\|H|:X|:AA|:BB|:CC|:KK|:EE|:FF|:GG|:HH|:II|:JJ|:\-\*/ig;bbcodeParser.tokens={'URL':'((?:(?:[a-z][a-z\\d+\\-.]*:\\/{2}(?:(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+|[0-9.]+|\\[[a-z0-9.]+:[a-z0-9.]+:[a-z0-9.:]+\\])(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)|(?:www\\.(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)))','LOCAL_URL':'((?:[a-z0-9\-._~\!$&\'()*+,;=:@|]+|%[\dA-F]{2})*(?:\/(?:[a-z0-9\-._~\!$&\'()*+,;=:@|]+|%[\dA-F]{2})*)*(?:\?(?:[a-z0-9\-._~\!$&\'()*+,;=:@\/?|]+|%[\dA-F]{2})*)?(?:#(?:[a-z0-9\-._~\!$&\'()*+,;=:@\/?|]+|%[\dA-F]{2})*)?)','EMAIL':'((?:[\\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*(?:[\\w\!\#$\%\'\*\+\-\/\=\?\^\`{\|\}\~]|&)+@(?:(?:(?:(?:(?:[a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(?:\\d{1,3}\.){3}\\d{1,3}(?:\:\\d{1,5})?))','TEXT':'(.*?)','SIMPLETEXT':'([a-zA-Z0-9-+.,_ ]+)','INTTEXT':'([a-zA-Z0-9-+,_. ]+)','IDENTIFIER':'([a-zA-Z0-9-_]+)','COLOR':'([a-z]+|#[0-9abcdef]+)','NUMBER':'([0-9]+)'};bbcodeParser.bbcode_matches=[];bbcodeParser.html_tpls=[];bbcodeParser._getRegEx=function(str){var matches=str.match(token_match);var i=0;var replacement='';if(matches.length<=0){return new RegExp(preg_quote(str),'g');}
for(;i<matches.length;i+=1){var token=matches[i].replace(/[{}0-9]/g,'');if(bbcodeParser.tokens[token]){replacement+=preg_quote(str.substr(0,str.indexOf(matches[i])))+bbcodeParser.tokens[token];str=str.substr(str.indexOf(matches[i])+matches[i].length);}}
replacement+=preg_quote(str);return new RegExp(replacement,'gi');};bbcodeParser._getTpls=function(str){var matches=str.match(token_match);var i=0;var replacement='';var positions={};var next_position=0;if(matches.length<=0){return str;}
for(;i<matches.length;i+=1){var token=matches[i].replace(/[{}0-9]/g,'');var position;if(positions[matches[i]]){position=positions[matches[i]];}else{next_position+=1;position=next_position;positions[matches[i]]=position;}
if(bbcodeParser.tokens[token]){replacement+=str.substr(0,str.indexOf(matches[i]))+'$'+position;str=str.substr(str.indexOf(matches[i])+matches[i].length);}}
replacement+=str;return replacement;};bbcodeParser.addBBCode=function(bbcode_match,bbcode_tpl){bbcodeParser.bbcode_matches.push(bbcodeParser._getRegEx(bbcode_match));bbcodeParser.html_tpls.push(bbcodeParser._getTpls(bbcode_tpl));};bbcodeParser.bbcodeToHtml=function(str){var i=0;for(;i<bbcodeParser.bbcode_matches.length;i+=1){str=str.replace(bbcodeParser.bbcode_matches[i],bbcodeParser.html_tpls[i]);}
return str;};function preg_quote(str,delimiter){return(str+'').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\'+(delimiter||'')+'-]','g'),'\\$&');}})();
bbcodeParser.addBBCode('[b]{TEXT}[/b]', '<span class="sb">{TEXT}</span>');
bbcodeParser.addBBCode('[u]{TEXT}[/u]', '<span class="su">{TEXT}</span>');
bbcodeParser.addBBCode('[i]{TEXT}[/i]', '<span class="si">{TEXT}</span>');
bbcodeParser.addBBCode('[url]{URL}[/url]', '<a href="{URL}" title="link" target="_blank" rel="nofallow">{URL}</a>');
bbcodeParser.addBBCode('[url={URL}]{TEXT}[/url]', '<a href="{URL}" title="link" target="_blank" rel="nofallow">{TEXT}</a>');
bbcodeParser.addBBCode(':)', '<img src="images/ywsmilies/0001.gif" width="24" height="24" alt=":)" />');
bbcodeParser.addBBCode(':(', '<img src="images/ywsmilies/0002.gif" width="24" height="24" alt=":(" />');
bbcodeParser.addBBCode(':P', '<img src="images/ywsmilies/0003.gif" width="24" height="24" alt=":P" />');
bbcodeParser.addBBCode(':D', '<img src="images/ywsmilies/0004.gif" width="24" height="24" alt=":D" />');
bbcodeParser.addBBCode(':S', '<img src="images/ywsmilies/0005.gif" width="24" height="24" alt=":S" />');
bbcodeParser.addBBCode(':O', '<img src="images/ywsmilies/0006.gif" width="24" height="24" alt=":O" />');
bbcodeParser.addBBCode(':=)', '<img src="images/ywsmilies/0007.gif" width="24" height="24" alt=":=)" />');
bbcodeParser.addBBCode(':|H', '<img src="images/ywsmilies/0008.gif" width="24" height="24" alt=":|H" />');
bbcodeParser.addBBCode(':X', '<img src="images/ywsmilies/0009.gif" width="24" height="24" alt=":X" />');
bbcodeParser.addBBCode(':-*', '<img src="images/ywsmilies/0010.gif" width="24" height="24" alt=":-*" />');
bbcodeParser.addBBCode(':JJ', '<img src="images/ywsmilies/0011.gif" width="24" height="24" alt=":JJ" />');
bbcodeParser.addBBCode(':II', '<img src="images/ywsmilies/0012.gif" width="24" height="24" alt=":II" />');
bbcodeParser.addBBCode(':HH', '<img src="images/ywsmilies/0013.gif" width="24" height="24" alt=":HH" />');
bbcodeParser.addBBCode(':GG', '<img src="images/ywsmilies/0014.gif" width="24" height="24" alt=":GG" />');
bbcodeParser.addBBCode(':FF', '<img src="images/ywsmilies/0015.gif" width="24" height="24" alt=":FF" />');
bbcodeParser.addBBCode(':EE', '<img src="images/ywsmilies/0016.gif" width="24" height="24" alt=":EE" />');
bbcodeParser.addBBCode(':KK', '<img src="images/ywsmilies/0017.gif" width="24" height="24" alt=":KK" />');
bbcodeParser.addBBCode(':CC', '<img src="images/ywsmilies/0018.gif" width="24" height="24" alt=":CC" />');
bbcodeParser.addBBCode(':BB', '<img src="images/ywsmilies/0019.gif" width="24" height="24" alt=":BB" />');
bbcodeParser.addBBCode(':AA', '<img src="images/ywsmilies/0020.gif" width="24" height="24" alt=":AA" />');

//login the chat username
function loginChatUser(name){
	 $.ajax({
		   type: "POST",
		   url: "process.php",
		   data: {  
					'function': 'loginChatUser',
					'name': name,
					'file': file
					},
		   dataType: "json",
		
		   success: function(data){

		   },
	});
}
//logout the chat username
function logoutChatUser(){
	 $.ajax({
		   type: "POST",
		   url: "process.php",
		   data: {  
					'function': 'logoutChatUser',
					'file': file
					},
		   dataType: "json",
		
		   success: function(data){
			   location.reload();
		   },
	});
}
//gets the state of the chat
function getStateOfChat(){
	if(!instanse){
		 instanse = true;
		 $.ajax({
			   type: "POST",
			   url: "process.php",
			   data: {  
			   			'function': 'getState',
						'file': file
						},
			   dataType: "json",
			
			   success: function(data){
				   state = data.state;
				   instanse = false;
			   },
			});
	}	 
}

//Updates the chat
function updateChat(){
	 if(!instanse){
		 instanse = true;
	     $.ajax({
			   type: "POST",
			   url: "process.php",
			   data: {  
			   			'function': 'update',
						'state': state,
						'file': file
						},
			   dataType: "json",
			   success: function(data){
				   if(data.text){
						for (var i = 0; i < data.text.length; i++) {
                          	//$('#chat-area').append($("<p>"+ data.text[i] +"</p>"));
							if(data.type[i] == 'join-alert'){
								$('#chat-area').append('<div class="psb-chat-area-join-text">'+ data.user[i] + ' Joined - ' + data.time[i] + '</div>');
							}
							else if(data.type[i] == 'leave-alert'){
								$('#chat-area').append('<div class="psb-chat-area-leave-text">'+ data.user[i] + ' Leaved - ' + data.time[i] + '</div>');
							}
							else {
								applyClass = '';
								if(window.self != data.user[i]) applyClass = 'psb-fade-it';
								//bbcodeParser.bbcodeToHtml(objChat.chats[i].chat)
                            	$('#chat-area').append($('<p class="'+applyClass+'"><span>'+ data.user[i] + '</span>' + bbcodeParser.bbcodeToHtml(data.text[i]) + '</p>'));
							}
							document.getElementById('chat-area').scrollTop = document.getElementById('chat-area').scrollHeight;
						}								  
				   }
				   //document.getElementById('chat-area').scrollTop = document.getElementById('chat-area').scrollHeight;
				   instanse = false;
				   state = data.state;
			   },
			});
	 }
	 else {
		 setTimeout(updateChat, 1500);
	 }
}

//send the message
function sendChat(message, nickname, type, time)
{       
    updateChat();
     $.ajax({
		   type: "POST",
		   url: "process.php",
		   data: {  
		   			'function': 'send',
					'message': message,
					'nickname': nickname,
					'file': file,
					'type': type,
					'time': time
				 },
		   dataType: "json",
		   success: function(data){
			   updateChat();
		   },
		});
}
function getDateOfChat(){
	var m_names = new Array("January", "February", "March", 
	"April", "May", "June", "July", "August", "September", 
	"October", "November", "December");
	
	var d = new Date();
	var curr_date = d.getDate();
	var sup = "";
	if (curr_date == 1 || curr_date == 21 || curr_date ==31) {
	   sup = "st";
	}
	else if (curr_date == 2 || curr_date == 22) {
	   sup = "nd";
	}
	else if (curr_date == 3 || curr_date == 23) {
	   sup = "rd";
	}
	else {
	   sup = "th";
	}
	
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	
	return (curr_date + "<SUP>" + sup + "</SUP> " 
	+ m_names[curr_month] + " " + curr_year);
}
function getDateOfChatWithDay(){
	var d_names = new Array("Sunday", "Monday", "Tuesday",
	"Wednesday", "Thursday", "Friday", "Saturday");
	
	var m_names = new Array("January", "February", "March", 
	"April", "May", "June", "July", "August", "September", 
	"October", "November", "December");
	
	var d = new Date();
	var curr_day = d.getDay();
	var curr_date = d.getDate();
	var sup = "";

	if (curr_date == 1 || curr_date == 21 || curr_date ==31) {
	   sup = "st";
	}
	else if (curr_date == 2 || curr_date == 22) {
	   sup = "nd";
	}
	else if (curr_date == 3 || curr_date == 23) {
	   sup = "rd";
	}
	else {
	   sup = "th";
	}
	
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	
	return (d_names[curr_day] + " " + curr_date + "<SUP>"
	+ sup + "</SUP> " + m_names[curr_month] + " " + curr_year);
}
function getTimeOfChat(){
	var a_p = "";
	var d = new Date();
	var curr_hour = d.getHours();
	if (curr_hour < 12) {
	   a_p = "AM";
	}
	else {
	   a_p = "PM";
	}
	if (curr_hour == 0) {
	   curr_hour = 12;
	}
	if (curr_hour > 12) {
	   curr_hour = curr_hour - 12;
	}
	
	var curr_min = d.getMinutes();
	
	curr_min = curr_min + "";
	
	if (curr_min.length == 1) {
	   curr_min = "0" + curr_min;
	}
	
	return (curr_hour + " : " + curr_min + " " + a_p);
}