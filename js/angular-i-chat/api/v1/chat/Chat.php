<?php
require('config.php');

class Chat {	
	public static function execute($request){
		if ( empty($request['action']) ) {
			echo 'Required parameter \'action\' missing'; die;
		}
		
		switch($request['action']) :
			case 'send':
				self::_send($request);
			break;
			case 'update':
				self::_update($request);
			break;
			default:
				echo 'Invalid Action!'; die;
			break;
		endswitch;
	}
	private static function _send($request){
		try {
			print_r($request);
			if ( !empty($request['message']) ) {
				$connection = new PDO('mysql:host=' . Config::getConfig()->host . ';dbname=' . Config::getConfig()->dbname, Config::getConfig()->username, Config::getConfig()->password);
				
				// set the PDO error mode to exception
				$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				
				// prepare sql and bind parameters
				$statement_1 = $connection->prepare("INSERT INTO ichat_messages (message, user_id) 
				VALUES (:message, :user_id)");
				
				$statement_1->bindParam(':message', $message);
				$statement_1->bindParam(':user_id', $user_id);
				
				// insert a row
				$message 		= $request['message'];
				$receiver_id 	= $request['receiver_id'];
				if(!empty($_SESSION['user_id'])){
					$user_id = $_SESSION['user_id'];
				}
				else {
					$user_id = 'TEMP_' . rand(100000,900000);
					$_SESSION['user_id'] = $user_id;
				}
				$statement_1->execute();
				$message_id = $connection->lastInsertId();
				
				// prepare sql and bind parameters
				$statement_2 = $connection->prepare("INSERT INTO ichat_message_users (message_id, user_id) 
				VALUES (:message_id, :user_id)");
				
				$statement_2->bindParam(':message_id', $message_id);
				$statement_2->bindParam(':user_id', $user_id);
				$statement_2->execute();
				
				$statement_2->bindParam(':message_id', $message_id);
				$statement_2->bindParam(':user_id', $receiver_id);
				$statement_2->execute();
				
				echo "New records created successfully";
			}
			else {
				echo 'invalid message!';die;
			}
		}
		catch(Exception $e){
			echo $e->getMessage();die;
		}
	}
	private static function _update($request){
		try {
			print_r($request);
			if ( !empty($request['message']) ) {
				$connection = new PDO('mysql:host=' . Config::getConfig()->host . ';dbname=' . Config::getConfig()->dbname, Config::getConfig()->username, Config::getConfig()->password);
				
				// set the PDO error mode to exception
				$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				
				// prepare sql and bind parameters
				$statement_1 = $connection->prepare("INSERT INTO ichat_messages (message, user_id) 
				VALUES (:message, :user_id)");
				
				$statement_1->bindParam(':message', $message);
				$statement_1->bindParam(':user_id', $user_id);
				
				// insert a row
				$message 		= $request['message'];
				$receiver_id 	= $request['receiver_id'];
				if(!empty($_SESSION['user_id'])){
					$user_id = $_SESSION['user_id'];
				}
				else {
					$user_id = 'TEMP_' . rand(100000,900000);
					$_SESSION['user_id'] = $user_id;
				}
				$statement_1->execute();
				$message_id = $connection->lastInsertId();
				
				// prepare sql and bind parameters
				$statement_2 = $connection->prepare("INSERT INTO ichat_message_users (message_id, user_id) 
				VALUES (:message_id, :user_id)");
				
				$statement_2->bindParam(':message_id', $message_id);
				$statement_2->bindParam(':user_id', $user_id);
				$statement_2->execute();
				
				$statement_2->bindParam(':message_id', $message_id);
				$statement_2->bindParam(':user_id', $receiver_id);
				$statement_2->execute();
				
				echo "New records created successfully";
			}
			else {
				echo 'invalid message!';die;
			}
		}
		catch(Exception $e){
			echo $e->getMessage();die;
		}
	}	
}