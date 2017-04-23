<?php
class Config {
	public static function getConfig(){
		$config = new stdClass();
		
		$config->host 		= "localhost";
		$config->username 	= "root";
		$config->password 	= "";
		$config->dbname 	= "ichat";
		
		return $config;
	}
}