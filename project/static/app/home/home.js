define([
	"angular",
	"angularRoute"], function(angular) {
		return angular.module("tbaApp.home", ["ui.router"])
			.controller("HomeCtrl", ["$scope", "$http", function($scope, $http) {
                $scope.trends = [];


                //fetch trends
                $http({
                    method: "GET",
                    url: "/api/trends"
                }).success(function(data,status,headers,config) {
                    $scope.trends = data.trends;
                });
            }]);
        });

