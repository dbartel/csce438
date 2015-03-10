define([
	"app"
], function(app) {
	return app.config(["$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider) {
		// $urlRouterProvider.otherwise("/");
		$urlRouterProvider.otherwise("/home");
		$stateProvider
			.state("home", {
				url:"/home", 
				templateUrl: "/static/app/home/home.html",
				controller: "HomeCtrl"
			});
	}]);
});