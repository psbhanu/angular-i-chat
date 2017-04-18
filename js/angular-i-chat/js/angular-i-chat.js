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
	
	var iChat = angular.module('iChat', []);
	
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
		
	iChat.directive('iChat', ['$animate', '$q', '$parse', '$injector', function($animate, $q, $parse, $injector) {
		
		return {
			restrict: 'ECA',
			controller: 'iChatController',
			controllerAs: 'iChatCtrl',
			transclude: true,
			templateUrl: function(element, attr) {
				return attr.templateUrl || 'templates/i-chat.html';
			},
			link : function (scope, elem, attr) {
				scope.label 		= attr.label || 'iChat';
				scope.width 		= attr.width || '100px';
				
				if(attr.opened){
					scope.state 	= 'opened'
					scope.height 	= attr.height || '500px';
				}
				else {
					scope.state 	= 'closed';
					scope.height 	= attr.height || '50px';
				}
			}
		  };
	}]);
	
})(window, window.angular);