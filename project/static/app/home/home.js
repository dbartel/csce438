define([
	"angular",
	"angularRoute"], function(angular) {
		return angular.module("tbaApp.home", ["ui.router"])
			.controller("HomeCtrl", ["$scope", "$http", "$timeout", function($scope, $http, $timeout) {
                $scope.trends = [];
                $scope.pickedTrend = {};
                $scope.trendSelected = false;


                $scope.displayBlocks = {
                    trends: true,
                    tweets: false,
                    words: false,
                    post: false
                };
                
                //hide a page and display another
                //h is hidden, s is displayed (correlates to displayBlocks object)
                //pass in an optional callback function to execute after page switch
                $scope.togglePage = function(h,s, callback) {
                    $scope.displayBlocks[h] = false;
                    $timeout(function() {
                        $scope.displayBlocks[s] = true;
                        if (callback) callback();
                    }, 250);
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
                    $scope.trendSelected = true;
                };

                $scope.getTweets = function() {
                    $http({
                        method: "GET",
                        url: "/api/tweets",
                        params: { q:$scope.pickedTrend.name}
                    }).success(function(data, status, headers, config) {
                        $scope.tweets = data.statuses;
                    });
                };

            }]);
        });

