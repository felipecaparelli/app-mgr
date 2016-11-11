AWS.config.update({
	accessKeyId : 'AKIAIVNBCHQXX4TKYYOA',
	secretAccessKey : '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'
});

// Configure the region 
AWS.config.region = 'eu-west-1';

var dynamodb = new AWS.DynamoDB();

var docClient = new AWS.DynamoDB.DocumentClient();

var app = angular.module('app', [ 'ngRoute' ]);

app.controller("WizardController", [ '$scope', '$routeParams', '$templateCache', wizardController ]);
app.controller("ListRegistersController", [ '$scope', listRegistersController ]);

app.config(function($routeProvider) {

	$routeProvider.when("/home", {
		templateUrl : "wizard.html",
		controller : "WizardController"
	}).when("/home/:itemId", {
		templateUrl : "wizard.html",
		controller : "WizardController"
	}).when("/listall", {
		templateUrl : "listall.html",
		controller : "ListRegistersController"
	})
});
