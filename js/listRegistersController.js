function listRegistersController($scope) {
	lctrl = this

	$scope.list = [];

	lctrl.listGrid = function listTable() {

		var docClient = new AWS.DynamoDB.DocumentClient();

		var params = {
			TableName : "TerraAltoPrototype",
		};

		docClient.scan(params, function(err, data) {
			if (err)
				console.log(JSON.stringify(err, null, 2));
			else {

				angular.forEach(data.Items, function(value, key) {

					value.size = JSON.parse(value["ec2list"]).length;

					$scope.list.push(value);

				});

				$scope.$apply();

			}
		});

	}

	lctrl.listGrid();

}
