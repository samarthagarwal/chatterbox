var rtcApp = angular.module('rtc', []);

rtcApp.controller('chatCtrl', function($scope){

	$scope.msgs = [];
	var socket = io();
	
	socket.on('connect', function(){
		console.log("Connected to server!");
	});

	socket.on('newMessage', function(data){
		console.log(data + " - recieved");
		$scope.$apply($scope.msgs.push(data));
	});
	
	$scope.send = function(){
		var newMessage = {fullName:'', displayPicture:'', message:''};
		newMessage.fullName = $scope.userData.fullName;
		newMessage.displayPicture = $scope.userData.displayPicture;
		newMessage.message = $scope.message;
		socket.emit('newMessage', newMessage);
		console.log($scope.message + " - sent");
		$scope.message = '';
	}
});