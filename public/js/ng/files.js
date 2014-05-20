/**
 * Pots controller definition
 */
app.controller('FilesController', function FilesController($scope, $http) {
	$scope.statuses = {
		NEW: "New",
		PRINTED: "Printed",
		DELETED: "Deleted"
	};

	$scope.configuration = {
		SO: "windows",
		DB: "In Memory Database",
		printer: "doPdf",
		printableFiles : 45
	};

	$scope.intro = "You can see  the list of files downloaded to your folder.";
	$scope.files = [];
	var updating = false;

	//Return all the list of groups
	$scope.list = function() {
		$http({
			method : 'GET',
			url : 'http://localhost:4000/files'
		}).success(function(data, status, headers, config) {
			$scope.syncFiles(data);
		}).error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			console.log(data);
		});
	};

	$scope.print = function(filename){
		$http({
			method : 'GET',
			url : 'http://localhost:4000/print/'+filename
		}).success(function(data, status, headers, config) {
			Printer.notify(
				"File named " + filename + " has successfully printed.",
				'http://localhost:4000/file/'+filename
			);
			localStorage.setItem("file_status_"+filename,$scope.statuses.PRINTED);
			$scope.list();
		}).error(function(data, status, headers, config) {
			alert(JSON.stringify(data));
		});
	};

	$scope.print = function(filename){
		$http({
			method : 'GET',
			url : 'http://localhost:4000/print/'+filename
		}).success(function(data, status, headers, config) {
			Printer.notify(
				"File named " + filename + " has successfully printed.",
				'http://localhost:4000/file/'+filename
			);
			localStorage.setItem("file_status_"+filename,$scope.statuses.PRINTED);
			$scope.list();
		}).error(function(data, status, headers, config) {
			alert(JSON.stringify(data));
		});
	};

	$scope.remove = function(filename){
		$http({
			method : 'DELETE',
			url : 'http://localhost:4000/file/'+filename
		}).success(function(data, status, headers, config) {
			if (data.stderr){
				Printer.notify(
					"Error deleting file " + filename + "\n" + data.stderr
				);
			}else{
				Printer.notify(
					"File named " + filename + " has been successfully deleted."
				);
				localStorage.removeItem("file_status_"+filename);
				$scope.list();
			}

		}).error(function(data, status, headers, config) {
			alert(JSON.stringify(data));
		});
	};


	/**
	 * Update statuses of remote files against local stored files
	 */
	$scope.syncFiles = function(files){
		var ls_files = localStorage.getItem("files");
		if(ls_files){
			ls_files = JSON.parse(ls_files);
			console.log(ls_files);

			//Storing the status of the files by name
			//Names are unique because are managed by host OS folder.
			for (var idx in files){
				var conc_name = "file_status_"+files[idx].name;

				console.log(conc_name);

				switch (localStorage.getItem(conc_name)) {
					case $scope.statuses.NEW:
						files[idx].status = $scope.statuses.NEW;
						break;

					case $scope.statuses.PRINTED:
						files[idx].status = $scope.statuses.PRINTED;
						break;

					case $scope.statuses.DELETED:
						files[idx].status = $scope.statuses.DELETED;
						break;

					default:
						files[idx].status = $scope.statuses.NEW;
						break;
				}

				localStorage.setItem(conc_name,files[idx].status);
			}

		}

		localStorage.setItem("files",JSON.stringify(files));
		$scope.files=files;
	};

	$scope.list();
});
