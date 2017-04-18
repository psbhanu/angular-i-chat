<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
  	<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>PSB Chat Room</title>
        
        <link rel='shortcut icon' type='image/x-icon' href='favicon.ico' />
    
        <!-- Bootstrap -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/bootstrap-theme.css" rel="stylesheet">
        <link href="css/datepicker.css" rel="stylesheet">
        <link href="css/psb-media.css" rel="stylesheet">
    
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
          <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="js/bootstrap.min.js"></script>
        <script src="js/bootstrap-datepicker.js"></script>
        <script src="js/bootstrap-tooltip.js"></script>
        <script type="text/javascript" src="js/chat.js"></script>
  	</head>
  	<body>
        <div class="wrapper">
            <div class="container" style="padding-top:10px">
                <div class="container-inner">
                <div class="well" style="margin:auto">
                    <div class="row-fluid">
                    	<a class="btn btn-default btn-xs psb-logout-btn" href="#"><img width="16" height="16" src="images/global/shutdownx32.png"></a>
                        <a class="btn btn-default btn-xs" href="http://psbmachines.com" target="_blank" >
                        	<img width="16" height="16" src="images/global/psbmachinesx32.png" alt="PSB" title="PSB Machines" />
                        </a>
                        <a class="btn btn-default btn-xs" href="http://chat.psbmachines.com" target="_blank" >
                        	<img width="16" height="16" src="images/global/psbchatx32.png" alt="PSB" title="PSB Machines" />
                            PSB Chat Room
                        </a>
                        <p class="label label-info" id="name-area">Hi, </p>
                        <div class="clearfix"></div>
                        <div id="chat-wrap" class="psb-chat-area-container">
                        	<div id="chat-area" class="psb-chat-area">
                            	
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                    <form id="send-message-area" action="" method="post" class="" role="form" >
                        <div id="chatadd">
                            <div id="chatex" style="text-align: right; margin-bottom:5px;">
                                <button type="button" class="btn btn-default btn-xs" onclick="chat.clearScreen('chat-area');" >
                                    <img src="images/global/clearx32.png" alt="B" />
                                </button>
                                <!-- Split button -->
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                        <img width="16" height="16" src="images/global/smilex32.png" alt=":P" title=":P" />
                                        <span class="caret"></span>
                                    </button>                        
                                    <ul class="dropdown-menu psb-smilie-dropdown" role="menu" style=" ">
                                        <li>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':)', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0001.gif' alt=':)' title=':)' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0001.gif" alt=":)" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0001.gif' alt=':)' title=':)' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':(', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0002.gif' alt=':(' title=':(' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0002.gif" alt=":(" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0002.gif' alt=':(' title=':(' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':P', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0003.gif' alt=':P' title=':P' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0003.gif" alt=":P" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0003.gif' alt=':P' title=':P' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':D', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0004.gif' alt=':D' title=':D' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0004.gif" alt=":D" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0004.gif' alt=':D' title=':D' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':S', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0005.gif' alt=':S' title=':S' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0005.gif" alt=":S" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0005.gif' alt=':S' title=':S' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':O', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0006.gif' alt=':O' title=':O' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0006.gif" alt=":O" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0006.gif' alt=':O' title=':O' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':=)', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0007.gif' alt=':=' title=':=' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0007.gif" alt=":=)" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0007.gif' alt=':=' title=':=' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':|H', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0008.gif' alt=':|H' title=':|H' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0008.gif" alt=":|H" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0008.gif' alt=':|H' title=':|H' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':X', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0009.gif' alt=':X' title=':X' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0009.gif" alt=":X" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0009.gif' alt=':X' title=':X' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':-*', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0010.gif' alt=':-*' title=':-*' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0010.gif" alt=":-*" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0010.gif' alt=':-*' title=':-*' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':JJ', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0011.gif' alt=':JJ' title=':JJ' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0011.gif" alt=":JJ" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0011.gif' alt=':JJ' title=':JJ' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':II', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0012.gif' alt=':II' title=':II' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0012.gif" alt=":II" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0012.gif' alt=':II' title=':II' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':HH', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0013.gif' alt=':HH' title=':HH' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0013.gif" alt=":HH" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0013.gif' alt=':HH' title=':HH' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':GG', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0014.gif' alt=':GG' title=':GG' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0014.gif" alt=":GG" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0014.gif' alt=':GG' title=':GG' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':FF', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0015.gif' alt=':FF' title=':FF' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0015.gif" alt=":FF" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0015.gif' alt=':FF' title=':FF' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':EE', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0016.gif' alt=':EE' title=':EE' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0016.gif" alt=":EE" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0016.gif' alt=':EE' title=':EE' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':KK', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0017.gif' alt=':KK' title=':KK' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0017.gif" alt=":KK" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0017.gif' alt=':KK' title=':KK' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':CC', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0018.gif' alt=':CC' title=':CC' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0018.gif" alt=":CC" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0018.gif' alt=':CC' title=':CC' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':BB', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0019.gif' alt=':BB' title=':BB' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0019.gif" alt=":BB" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0019.gif' alt=':BB' title=':BB' />" />
                                            </button>
                                            <button type="button" class="btn btn-white btn-xs" onclick="chat.addSmile(':AA', 'sendie');" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0020.gif' alt=':AA' title=':AA' />" >
                                                <img width="24" height="24" src="images/ywsmilies/0020.gif" alt=":AA" data-toggle="tooltip" data-placement="top" data-animation="true" data-html="true" title="<img class='psb-smilie-preview' src='images/ywsmilies/0020.gif' alt=':AA' title=':AA' />" />
                                            </button>
                                        </li>
                                        <!--<li><a href="#">Another action</a></li>
                                        <li><a href="#">Something else here</a></li>
                                        <li class="divider"></li>
                                        <li><a href="#">Separated link</a></li>-->
                                    </ul>
                                </div> 
                                <!-- /Split button -->
                          
                                <button type="button" class="btn btn-default btn-xs" onclick="chat.addChatBIU('[b]','[/b]', 'sendie');" >
                                    <img src="images/smile/bold.png" alt="B" />
                                </button>
                                <button type="button" class="btn btn-default btn-xs" onclick="chat.addChatBIU('[i]','[/i]', 'sendie');" >
                                    <img src="images/smile/italic.png" alt="I" />
                                </button>
                                <button type="button" class="btn btn-default btn-xs" onclick="chat.addChatBIU('[u]','[/u]', 'sendie');" >
                                    <img src="images/smile/underline.png" alt="U" />
                                </button>
                            </div>
                        </div>
                        
                       	<div class="form-group">
                            <textarea id="sendie" class="psb-message-container" rows="3" maxlength = "1000" ></textarea>
                        </div>                    
                        <div class="form-group">
                            <input type="button" value="Send" class="btn btn-info btn-block psb-send-message" id="psb-send-message" />
                        </div>                    
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <script type="text/javascript">
            //$(document).ready(function(){
				<?php if(!isset($_SESSION['username']) || $_SESSION['username'] == '') : ?>
                // ask user for name with popup prompt    
				var name = prompt("Your Name Please: ", "Guest");
				
				// default name is 'Guest'
				if (!name || name === ' ') {
				   name = "Guest";	
				}
				// strip tags
				name = name.replace(/(<([^>]+)>)/ig,"");
				window.self = name;
				<?php else : ?>
                var name = '<?php echo $_SESSION['username']; ?>';
				// strip tags
				name = name.replace(/(<([^>]+)>)/ig,"");
				window.self = name;
                <?php endif; ?>

				// kick off chat
				var chat =  new Chat();
				$(function() {
					 chat.getState(); 
					 // watch textarea for key presses
					 $("#sendie").keydown(function(event) {  
					 
						 var key = event.which;  
				   
						 //all keys including return.  
						 if (key >= 33) {
						   
							 var maxLength = $(this).attr("maxlength");  
							 var length = this.value.length;  
							 
							 // don't allow new content if length is maxed out
							 if (length >= maxLength) {  
								 event.preventDefault();  
							 }  
						  }  
																																																					});
					 // watch textarea for release of key press
					 $('#sendie').keyup(function(e) {	
						  //if( $(this).val() == '')  { $(this).val(""); return 0; }				 
						  if (e.keyCode == 13) { 
						  
							var text = $(this).val();
							var maxLength = $(this).attr("maxlength");  
							var length = text.length; 
							 
							// send 
							if (length <= maxLength + 1) { 
							 	if( text.replace("\n","") != '' ) {
								chat.send(text, name, 'message', chat.getDate() + ', ' +chat.getTime());	
								}
                                $(this).val("");
								
							} else {
							
								$(this).val(text.substring(0, maxLength));
								
							}	
							
							
						  }
					 });
					 $('#psb-send-message').click(function() {	
                        var text = $('#sendie').val();
                        if( text != '' ) {
                            var maxLength = $('#sendie').attr("maxlength");  
                            var length = text.length; 
                             
                            // send 
                            if (length <= maxLength + 1) { 
                             
                                chat.send(text, name, 'message', chat.getDate() + ', ' +chat.getTime());	
                                $('#sendie').val("");
                                
                            } else {
                            
                                $('#sendie').val(text.substring(0, maxLength));
                                
                            }
                        }	
					 });
                     $('.psb-logout-btn').click(function(){
                     	chat.send('leave-alert', name, 'leave-alert', chat.getDate() + ', ' +chat.getTime());
                     	chat.logout();
                     });
                     
				});
				chat.login(name); 
                // display name on page
				$("#name-area").append('<span><i class="user"></i>' + name + '</span>');
				$('.psb-chat-area-container').prepend('<div class="psb-chat-area-pre-text">'+ chat.getDateWithDay() +'</div>');
				//$('.psb-chat-area').append('<div class="psb-chat-area-join-text">'+ name + ' Joined - ' + chat.getDate() + ', ' +chat.getTime() + '</div>');
				setInterval('chat.update()', 2000);
				//chat.getState(); 
				<?php if(!isset($_SESSION['username']) || $_SESSION['username'] == '') : ?>
				chat.send('join-alert', name, 'join-alert', chat.getDate() + ', ' +chat.getTime());
				<?php else : ?>
                chat.update();
				<?php endif; ?>
				$("[data-toggle=tooltip]").tooltip({ placement: 'left'});
			//});
        </script>
  	</body>
</html>
