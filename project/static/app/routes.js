define([
	"app"
], function(app) {
	return app.config(["$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider) {
		// $urlRouterProvider.otherwise("/");
		$urlRouterProvider.otherwise("/");
		$stateProvider
			.state("home", {
				url:"/", 
				templateUrl: "/static/app/home/home.html",
				controller: "HomeCtrl"
			});
	}]);
});