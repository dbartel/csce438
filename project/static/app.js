define([
	"angular", 
	"angularRoute",
	"app/home/home"
], function(angular, angularRoute, home) {
	return angular.module('tbaApp', [
		"ui.router", 
		"tbaApp.home"
	]);
});