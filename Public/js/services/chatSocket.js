myApp.factory('chatSocket', ['socketFactory', function(socketFactory){
	return socketFactory();
}]);