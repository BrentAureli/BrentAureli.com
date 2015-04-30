myApp.controller('dailydoseController', ['$scope', 'chatSocket', function($scope, chatSocket){
	$scope.messages = [];

	chatSocket.on('message', function(data){
		$scope.messages.push(data.message);
	});
}]);