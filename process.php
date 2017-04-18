<?php
    session_start();
    $function = $_POST['function'];
    $log = array();
    
    switch($function) {
    
    	 case('loginChatUser'):
			 $_SESSION['username'] = $_POST['name'];
			 //echo $_SESSION['username'];
        	 break;	

    	 case('logoutChatUser'):
		 	 unset($_SESSION['username']);
			 //session_destroy();
        	 break;	

    	 case('getState'):
        	 if(file_exists('data'.DIRECTORY_SEPARATOR.'chat.txt')){
               $lines = file('data'.DIRECTORY_SEPARATOR.'chat.txt');
        	 }
             $log['state'] = count($lines); 
        	 break;	
    	
    	 case('update'):
        	$state = $_POST['state'];
        	if(file_exists('data'.DIRECTORY_SEPARATOR.'chat.txt')){
        	   $lines = file('data'.DIRECTORY_SEPARATOR.'chat.txt');
        	}
        	 
			$count =  count($lines);
        	if($state == $count){
        		 $log['state'] = $state;
        		 $log['text'] = false;
        		 
        	}
        	else{
        			$text= array();
					$user= array();
					$type= array();
					$time= array();
        			$log['state'] = $state + count($lines) - $state;
        			foreach ($lines as $line_num => $line) {
        				if($line_num >= $state){
							$line = str_replace("\n", "", $line);
							$decodedJSON = json_decode($line, false);
                         	$text[] = $decodedJSON->chat;
                         	$user[] = $decodedJSON->user;
                         	$type[] = $decodedJSON->type;
                         	$time[] = $decodedJSON->time;
        				 }
         
                    }
        			$log['text'] = $text; 
        			$log['user'] = $user; 
        			$log['type'] = $type; 
        			$log['time'] = $time; 
        	}
        	  
            break;
    	 
    	 case('send'):
		  $nickname = htmlentities(strip_tags($_POST['nickname']));
		  $type = $_POST['type'];
		  $time = $_POST['time'];
			 $reg_exUrl = "/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/";
			  $message = htmlentities(strip_tags($_POST['message']));
		 if(($message) != "\n"){
        	
			 if(preg_match($reg_exUrl, $message, $url)) {
       			$message = preg_replace($reg_exUrl, '<a href="'.$url[0].'" target="_blank">'.$url[0].'</a>', $message);
				} 
			 
        	 $writeJSON = array(
			 	'user'	=> $nickname,
				'chat'	=> str_replace("\n", " ", $message),
				'time'	=> $time,
				'type'	=> $type
			 );
        	 //fwrite(fopen('data'.DIRECTORY_SEPARATOR.'chat.txt', 'a'), "<span>". $nickname . "</span>" . $message = str_replace("\n", " ", $message) . "\n"); 
        	 fwrite(fopen('data'.DIRECTORY_SEPARATOR.'chat.txt', 'a'), json_encode($writeJSON). "\n"); 
		 }
        	 break;
    	
    }
    
    echo json_encode($log);

?>