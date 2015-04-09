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
                $scope.togglePage = function(h,s) {
                    $scope.displayBlocks[h] = false;
                    $timeout(function() {
                        $scope.displayBlocks[s] = true;
                    }, 250);
                }


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



            }]);
        });

