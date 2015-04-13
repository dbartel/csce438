define([
	"angular",
	"angularRoute",
    "lodash"], function(angular,r,_) {
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
				
				$scope.tweets = [
				{
					text: "sdfasdfasdf"
				},
				{
					text: "asdasasd"
				}
				];
				
                
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
                        $scope.getWordFrequency();

                    });
                };

                $scope.getWordFrequency = function() {
                    var tweets = _.pluck($scope.tweets, "text");
                    //reduce all tweets into one string
                    var words = _.reduce(tweets, function(str, t) {
                        return str + " " + t;
                    });

                    //tokenize string
                    words = words.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                    words = words.split(" ");

                    //count frequencies
                    var frequencies = {};
                    _.forEach(words, function(w) {
                        frequencies[w] = frequencies[w] || 0;
                        frequencies[w]++;
                    });

                    $scope.wordFrequency = [];
                    _.forIn(frequencies, function(value, key) {
                        $scope.wordFrequency.push({
                            word: key,
                            freq: value
                        });
                    });

                    //inverse sort
                    $scope.wordFrequency = _.sortBy($scope.wordFrequency, function(n) {
                        return -n.freq;
                    });

                    console.log($scope.wordFrequency);
                    //slice down to top 15
                    $scope.wordFrequency = _.slice($scope.wordFrequency, 0, 15);

                }


            }]);
        });

