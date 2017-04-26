<?php
require('config.php');

class Chat {	
	private static function _response($response){
		echo json_encode($response);die;
	}
	
	public static function execute($request){
		$response = array(
			'code' 		=> '400',
			'error' 	=> 'true',
			'message' 	=> 'Error: Bad request!',
		);
		
		if ( empty($request['action']) ) {
			$response = array(
				'code' 		=> '400',
				'error' 	=> 'true',
				'message' 	=> 'Error: Bad request - Required parameter \'action\' missing!',
			);
		}
		
		switch($request['action']) :
			case 'set':
				$response = self::_set($request, $response);
			break;
			case 'get':
				$response = self::_get($request, $response);
			break;
			case 'getId':
				$response = self::_getId($request, $response);
			break;
			default:
				$response = array(
					'code' 		=> '400',
					'error' 	=> 'true',
					'message' 	=> 'Error: Invalid Action!',
				);
			break;
		endswitch;
		
		self::_response($response);
	}
	private static function _set($request, $response){
		try {
			//print_r($request);
			if ( !empty($request['receiver_id']) ) {
				$connection = new PDO('mysql:host=' . Config::getConfig()->host . ';dbname=' . Config::getConfig()->dbname, Config::getConfig()->username, Config::getConfig()->password);
				
				// set the PDO error mode to exception
				$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				
				// prepare sql and bind parameters
				$statement_1 = $connection->prepare("INSERT INTO ichat_messages (message, user_id, user_name) 
				VALUES (:message, :user_id, :user_name)");
				
				$statement_1->bindParam(':message', $message);
				$statement_1->bindParam(':user_id', $user_id);
				$statement_1->bindParam(':user_name', $user_name);
				
				// insert a row
				$message 				= $request['message'];
				$receiver_id 			= $request['receiver_id'];
				$receiver_name 			= $request['receiver_name'];
				$receiver_is_receiver 	= 1;
				$user_id 				= $request['self_id'];
				$user_name 				= $request['self_name'];
				$user_is_receiver 		= 0;
				/*
				if(!empty($_SESSION['user_id'])){
					$user_id = $_SESSION['user_id'];
				}
				else {
					$user_id = 'TEMP_' . rand(100000,900000);
					$_SESSION['user_id'] = $user_id;
				}
				*/
				
				$statement_1->execute();
				$message_id = $connection->lastInsertId();
				
				// prepare sql and bind parameters
				$statement_2 = $connection->prepare("INSERT INTO ichat_message_users (message_id, user_id, user_name, is_receiver) 
				VALUES (:message_id, :user_id, :user_name, :is_receiver)");
				
				$statement_2->bindParam(':message_id', $message_id);
				$statement_2->bindParam(':user_id', $user_id);
				$statement_2->bindParam(':user_name', $user_name);
				$statement_2->bindParam(':is_receiver', $user_is_receiver);
				$statement_2->execute();
				
				$statement_2->bindParam(':message_id', $message_id);
				$statement_2->bindParam(':user_id', $receiver_id);
				$statement_2->bindParam(':user_name', $receiver_name);
				$statement_2->bindParam(':is_receiver', $receiver_is_receiver);
				$statement_2->execute();
				
				$response = array(
					'code' 		=> '200',
					'error' 	=> 'false',
					'message' 	=> 'Success: New records created successfully!',
				);
				$connection = null;
			}
			else {
				$response = array(
					'code' 		=> '400',
					'error' 	=> 'true',
					'message' 	=> 'Error: Invalid Message!',
				);
			}
		}
		catch(Exception $e){
			$response = array(
				'code' 		=> '503',
				'error' 	=> 'true',
				'message' 	=> 'Error: ' . $e->getMessage(),
			);
		}
		return $response;
	}
	private static function _getId($request, $response){
		if(!empty($_SESSION['user_id'])){
			$user_id = $_SESSION['user_id'];
			$response = array(
				'code' 		=> '200',
				'error' 	=> 'false',
				'message' 	=> 'Success: Temp Id Found!',
				'self_id' 	=> $user_id,
			);
		}
		else {
			$user_id = 'TEMP_' . rand(100000,900000);
			$_SESSION['user_id'] = $user_id;
			$response = array(
				'code' 		=> '200',
				'error' 	=> 'false',
				'message' 	=> 'Success: Temp Id Created Successfully!',
				'self_id' 	=> $user_id,
			);
		}
		return $response;
	}
	private static function _get($request, $response){
		$user_id = $_SESSION['user_id'];
		if(empty($user_id)) {
			$response = array(
				'code' 		=> '401',
				'error' 	=> 'true',
				'message' 	=> 'Error: Invalid User or Chat Not Started Yet!',
			);
		}
		else {
			try {
				//print_r($request);
				if ( !empty($request['receiver_id']) ) {
					$connection = new PDO('mysql:host=' . Config::getConfig()->host . ';dbname=' . Config::getConfig()->dbname, Config::getConfig()->username, Config::getConfig()->password);
					
					// set the PDO error mode to exception
					$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
					
					$receiver_id = $request['receiver_id'];
					
					$statement = $connection->prepare('
						SELECT cu.id as p_id, cu.message_id as p_message_id, cu.user_id as p_user_id, cu.user_name as p_user_name, cu.is_receiver as p_user_is_receiver, cu.created as p_created,
						cm.id as message_id, cm.message as message, cm.user_id, cm.user_name
						
						FROM ichat_message_users cu
						
						LEFT JOIN ichat_messages AS cm ON cu.message_id = cm.id
						
						WHERE cu.user_id = "' . $user_id . '"
						
						ORDER BY cu.created
					'); 
					//	WHERE cu.user_id = "' . $user_id . '" #OR cu.user_id = "' . $receiver_id . '"
					$statement->execute();

					// set the resulting array to associative
					$results = $statement->setFetchMode(PDO::FETCH_ASSOC); 
					
					$response = array(
						'code' 		=> '200',
						'error' 	=> 'false',
						'message' 	=> 'Success: New records found!',
						'messages' 	=> $statement->fetchAll(),
					);
					$connection = null;
				}
				else {
					$response = array(
						'code' 		=> '400',
						'error' 	=> 'true',
						'message' 	=> 'Error: Invalid Receiver!',
					);
				}
			}
			catch(Exception $e){
				$response = array(
					'code' 		=> '503',
					'error' 	=> 'true',
					'message' 	=> 'Error: ' . $e->getMessage(),
				);
			}
		}
		return $response;
	}
}