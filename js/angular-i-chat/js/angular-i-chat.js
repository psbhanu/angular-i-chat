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
	iChat.directive('iChat', ['$animate', '$q', '$parse', '$injector', '$sce', function($animate, $q, $parse, $injector, $sce) {
		
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
				scope.chats			= '<p><strong>Hi there! How can I help you?</strong></p>';
				scope.typedText		= '';
				
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
				scope.iChatSend = function(typedText){
					scope.iChatUpdate();
					_l(typedText);
					scope.chats = $sce.trustAsHtml(scope.chats + '<p><strong>Me: </strong>' + typedText + '</p>'); 
					this.typedText = '';
				}
				
				scope.iChatUpdate = function(){
					document.getElementById('i-chat-container-inner-chat-content').scrollTop = document.getElementById('i-chat-container-inner-chat-content').scrollHeight;
				}
			}
		  };
	}]);
	
})(window, window.angular);