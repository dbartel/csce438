require.config({
	baseUrl: "/static/",
	paths: {
		angular: "/static/lib/angular/angular",
		angularRoute: "/static/lib/angular/angular-ui-router.min",
		angularAnimate: "/static/lib/angular-animate/angular-animate"
	},
	shim: {
		"angular" : {"exports" : "angular"},
		"angularRoute" : {
			deps: ["angular"]
		},
		"angularAnimate" : {
			deps: ["angular"]
		}
	},
	deps: [
		"./bootstrap"
	]
});

