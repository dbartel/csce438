define([
	"angular", 
	"angularRoute",
    "angularAnimate",
	"app/home/home"
], function(angular, angularRoute, home) {
	return angular.module('tbaApp', [
		"ui.router", 
        "ngAnimate",
		"tbaApp.home"
	]);
});