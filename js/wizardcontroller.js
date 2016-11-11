function wizardController($scope, $routeParams, $templateCache) {

	var vm;
	$scope.vm = this;
	vm = $scope.vm;

	getItemDynamoById = function(Id) {
		
		
		
		
	

		var params = {
				  TableName: 'TerraAltoPrototype',
				   KeyConditionExpression: 'HashKey = :hkey and Id = :rId',
				  ExpressionAttributeValues: {
				    ':hkey': 'Id',
				    ':rId': Id
				  }
				};


		docClient.query(params, function(err, data) {
			    if (err) {
			        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
			    } else {
			        console.log("Query succeeded.");
			        data.Items.forEach(function(item) {
			            console.log(" -", item.name + ": " + item.selEnviroment);
			        });
			    }
			});
		
		
/*
		var params = {
			"TableName" : 'TerraAltoPrototype',
			 AttributesToGet: [
			                   'STRING_VALUE',
			                 
			                 ],
			 Key : { 
			      "Id" : {
			        "N" : Id
			      }
			    }
		}

		dynamodb.getItem(params, function(err, data) {
			console.log('error: ' + err);
			console.log(data);
			//alert(JSON.stringify(data));
			alert(JSON.stringify(data.Item));
			vm.appform.appinfo = JSON.stringify(data.Item);
		});*/

	}
	init = function() {
		$templateCache.removeAll();
		vm.appform = {};
		vm.appform.ec2list = [];
		vm.appform.ec2keys = [ 'Type', 'Enviroments', 'OperatingSystem',
				'Delete' ];

		$scope.itemId = $routeParams.itemId;
		if ($scope.itemId != null && $scope.itemId != ''
				&& $scope.itemId != undefined) {
			getItemDynamoById($scope.itemId)
		}

		// Model
		vm.currentStep = 1;
		vm.steps = [ {
			step : 1,
			name : "App basic information",
			template : "step1.html"
		}, {
			step : 2,
			name : "App details",
			template : "step2.html"
		}, {
			step : 3,
			name : "EC2 Servers",
			template : "step3.html"
		}

		];
	}

	// Functions
	vm.gotoStep = function(newStep) {
		vm.currentStep = newStep;
	}

	vm.getStepTemplate = function() {
		for (var i = 0; i < vm.steps.length; i++) {
			if (vm.currentStep == vm.steps[i].step) {
				return vm.steps[i].template;
			}
		}
	}

	vm.save = function() {

		var random = parseInt(Math.random() * 1000000000);

		var itemParams = {};
		var item = {};
		var id = {
			"N" : random.toString()
		}
		item["Id"] = id;
		itemParams["Item"] = item;

		angular.forEach(vm.appform.appinfo, function(value, key) {

			itemParams.Item[key] = {
				"S" : value
			}

		});

		itemParams.Item["ec2list"] = {
			"S" : JSON.stringify(vm.appform.ec2list)
		}

		var table = new AWS.DynamoDB({
			params : {
				TableName : 'TerraAltoPrototype'
			}
		});

		var key = 'UNIQUE_KEY_ID';

		table.putItem(itemParams, function(err, data) {

			if (err) {
				alert("Error: " + err)
				console.log(err);
			} else {
				alert("Item Saved!!!");
				vm.appform = {};
				window.location.reload();
			}

		});

	}

	vm.createec2server = function() {

		var element = {
			Type : vm.appform.ec2.type,
			Enviroments : vm.appform.ec2.enviroments,
			OperatingSystem : vm.appform.ec2.operatingsystem
		};
		vm.appform.ec2list.push(element);

		vm.appform.ec2 = {};

	}

	init();

}
