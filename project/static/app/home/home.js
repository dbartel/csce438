define([
	"angular",
	"angularRoute"], function(angular) {
		return angular.module("tbaApp.home", ["ui.router"])
			.controller("HomeCtrl", ["$scope", "$http", function($scope, $http) {
                $scope.trends = [];
                $scope.pickedTrend = {};
                $scope.trendSelected = false;


                $scope.displayBlocks = {
                    trends: true,
                    tweets: false,
                    words: false,
                    post: false
                };
                



                //fetch trends
                $http({
                    method: "GET",
                    url: "/api/trends"
                }).success(function(data,status,headers,config) {
                    $scope.trends = data.trends;
                });


                $scope.selectTrend = function(trend) {
                    $scope.pickedTrend = trend;
                };

                $scope.displayTweets = function() {
                    $scope.displayBlocks.tweets = true;
                }


            }]);
        });

