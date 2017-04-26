/**
* @license AngularChat v1.0.0-a0
* (c) 2016-2017 InfoAerial, http://infoaerial.com
* License: MIT
* @Author: psbhanu, http://psbhanu.com 
*/

(function(window, angular) {
	'use strict';
	
	var _debug = true;
	
	var isArray = angular.isArray;
	var isObject = angular.isObject;
	
	function inherit(parent, extra) {
		return angular.extend(Object.create(parent), extra);
	}
	
	var _l = function(){ 
		if(_debug) { 
			for(var i = 0; i < arguments.length; i++){
				console.log(arguments[i]);
			} 
		}
	};	
	
	var iChat = angular.module('iChat', ['ngSanitize']);
	
	// define iChat Message Service
	iChat.service( 'Messages', function() {
		var self = this;
		
		// Send Messages
		self.send = function(message) {};
		
		// Receive Messages
		self.receive = function(fn) {};
		
		// Set/Get User
		self.user = function(data) {};
		
		return self;	
	});	
	
	iChat.controller('iChatController', ['$animate', '$q', '$parse', '$injector', function($animate, $q, $parse, $injector) {
		
	}]);
	iChat.filter('html_safe', ['$sce',function($sce) {
		return function(value, type) {
			return $sce.trustAs(type || 'html', value);
		}
	}]);
	iChat.directive('schrollBottom', function () {
		return {
			scope: {
				schrollBottom: "="
			},
			link: function (scope, element) {
				scope.$watchCollection('schrollBottom', function (newValue) {
					if (newValue) {
						$(element).scrollTop($(element)[0].scrollHeight);
					}
				});
			}
		}
	});
	iChat.directive('iChat', ['$animate', '$q', '$parse', '$injector', '$sce', '$timeout','iChatRequest', function($animate, $q, $parse, $injector, $sce, $timeout, iChatRequest) {
		
		return {
			restrict: 'ECA',
			controller: 'iChatController',
			controllerAs: 'iChatCtrl',
			transclude: true,
			scope:{},
			templateUrl: function(element, attr) {
				return attr.templateUrl || 'templates/i-chat.html';
			},
			link : function (scope, elem, attr) {
				scope.updateRate 	= attr.updateRate || 5000;
				scope.receiverId 	= attr.receiverId || '';
				scope.receiverName	= attr.receiverName || 'Anonymous';
				scope.selfId		= attr.selfId || '';
				scope.selfName		= attr.selfName || 'Anonymous';
				scope.chats			= '<p><strong>Hi there! How can I help you?</strong></p>';
				scope.message		= '';
				scope.messages		= [];
				
				scope.label 		= attr.label || 'iChat';
				
				scope.btnWidth 		= attr.btnWidth || 'auto';
				scope.btnHeight 	= attr.btnHeight || 'auto';
				scope.btnClass 		= attr.btnClass || 'btn btn-lg btn-primary';
				
				scope.fullHeight 	= attr.fullHeight || '500px';
				scope.fullWidth 	= attr.fullWidth || 'auto';
				
				scope.minHeight 	= attr.minHeight || '50px';
				scope.minWidth 		= attr.minWidth || 'auto';
				
				if(attr.opened){
					scope.state 	= 'opened'
					scope.height 	= scope.fullHeight;
					scope.width 	= scope.fullWidth;
				}
				else {
					scope.state 	= 'closed';
					scope.height 	= scope.minHeight;
					scope.width 	= scope.minWidth;
				}
				_l(scope.state);
				
				scope.iChatToggle = function(){
					if( scope.state == 'closed'){
						scope.state 	= 'opened';
						scope.height 	= scope.fullHeight;
						scope.width 	= scope.fullWidth; 
					}
					else {
						scope.state 	= 'closed';
						scope.height 	= scope.minHeight;
						scope.width 	= scope.minWidth; 
					}
				}
				
				scope.iChatSet = function(message){
					iChatRequest.set(message, scope.receiverId, scope.receiverName, scope.selfId, scope.selfName );
					scope.messages.push({
						"id":"0",
						"p_id":"0",
						"message_id":"0",
						"p_message_id":"0",
						"user_id":scope.selfId,
						"p_user_id":scope.selfId,
						"message":message,
						"user_name":scope.selfName,
						"p_user_name":scope.selfName,
						"p_created":"",
					});
					_l(message);
					//scope.chats = $sce.trustAsHtml(scope.chats + '<p><strong>Me: </strong>' + message + '</p>'); 
					this.message = '';
				}
				
				var iChatGetCallback = function(data){
					_l(data);
					scope.messages = data;
				}
				var iChatGetErrorCallback = function(response){
				
				}
				var iChatGetIdCallback = function(data){
					_l(data);
					scope.selfId = data;
					scope.iChatGet(scope.receiverId, iChatGetCallback, iChatGetErrorCallback);
				}
				var iChatGetIdErrorCallback = function(response){
				
				}

				scope.iChatGet = function(receiverId, iChatGetCallback, iChatGetErrorCallback){
					$timeout(function(){
						iChatRequest.get(receiverId, iChatGetCallback, iChatGetErrorCallback);
						scope.iChatGet(receiverId, iChatGetCallback, iChatGetErrorCallback);
					}, scope.updateRate);
				};
				
				if(scope.selfId == '') {
					iChatRequest.getId(iChatGetIdCallback, iChatGetIdErrorCallback);
				}
				else {
					scope.iChatGet(scope.receiverId, iChatGetCallback, iChatGetErrorCallback);
				}
			}
		  };
	}]);
	
	iChat.service('iChatRequest', function($http){
		this.set = function(message, receiverId, receiverName, selfId, selfName){
			$http({
				url: '/api/v1/chat/',
				method: "POST",
				data: 'action=set&message=' + message + '&receiver_name=' + receiverName + '&receiver_id=' + receiverId + '&self_id=' + selfId + '&self_name=' + selfName,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.then(function(response) {
				_l(response);
				// success
			}, 
			function(response) { // optional
				// failed
			});	
		};
		this.get = function(receiverId, callback, errorCallback){
			callback	 	= callback || function(data){}
			errorCallback 	= errorCallback || function(data){}
			$http({
				url: '/api/v1/chat/',
				method: "POST",
				data: 'action=get&receiver_id=' + receiverId + '&last_message_id=' + receiverId,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.then(function(response) {
				_l(response);
				// success
				if(response.data){
					if(response.data.error == 'false'){
						if(!response.data.messages) {
							// Messages Missing
							_l('Executing ErrorCallback 1');
							errorCallback(response);
						}
						else {
							_l('Executing Callback');
							callback(response.data.messages);
						}
					}
					else {
						// Error Occurred at Server end!
						_l('Executing ErrorCallback 2');
						errorCallback(response);
					}
				}
				else {
					// Data Missing
					_l('Executing ErrorCallback 3');
					errorCallback(response);
				}
			}, 
			function(response) { // optional
				// failed
				_l('Executing ErrorCallback 4');
				errorCallback(response);
			});	
		};
		this.getId = function(callback, errorCallback){
			callback	 	= callback || function(data){}
			errorCallback 	= errorCallback || function(data){}
			$http({
				url: '/api/v1/chat/',
				method: "POST",
				data: 'action=getId',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.then(function(response) {
				_l(response);
				// success
				if(response.data){
					if(response.data.error == 'false'){
						if(!response.data.self_id) {
							// Messages Missing
							_l('Executing ErrorCallback 1');
							errorCallback(response);
						}
						else {
							_l('Executing Callback');
							callback(response.data.self_id);
						}
					}
					else {
						// Error Occurred at Server end!
						_l('Executing ErrorCallback 2');
						errorCallback(response);
					}
				}
				else {
					// Data Missing
					_l('Executing ErrorCallback 3');
					errorCallback(response);
				}
			}, 
			function(response) { // optional
				// failed
				_l('Executing ErrorCallback 4');
				errorCallback(response);
			});	
		};
	});
	
})(window, window.angular);