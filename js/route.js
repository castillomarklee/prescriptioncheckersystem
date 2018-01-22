'use strict';

var application = angular.module('App', ['ui.router', 'ui.bootstrap']);

	application.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    	 
        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
	        .state('/', {
	            url: '/',
	            templateUrl: './views/homepage.html',
	            controller: 'registercontroller'
	        })
	        .state('admin', {
	            url: '/admin',
	            templateUrl: './views/adminlogin.html',
	            controller: 'adminlogincontroller'
	        })
	        .state('adminhomepage', {
	            url: '/adminhomepage',
	            templateUrl: './views/adminhomepage.html',
	            controller: 'adminhomecontroller'
	        })
	        .state('admindoctorservice', {
	            url: '/admindoctorservice',
	            templateUrl: './views/admindoctorservice.html',
	            controller: 'admindoctorservicecontroller'
	        })
	        .state('adminworkerservice', {
	            url: '/adminworkerservice',
	            templateUrl: './views/adminworkerpage.html',
	            controller: 'adminworkerservicecontroller'
	        })
	        .state('adminuser', {
	            url: '/adminuser',
	            templateUrl: './views/adminuserpage.html',
	            controller: 'adminusercontroller'
	        })
	        .state('hospworkeruser', {
	            url: '/hospworkeruser',
	            templateUrl: './views/worker.html',
	            controller: 'workercontroller'
	        })
	        .state('hospworkerhome', {
	            url: '/hospworkerhome',
	            templateUrl: './views/workerhome.html',
	            controller: 'workerhomecontroller'
	        })
	        .state('userhome', {
	            url: '/userhome',
	            templateUrl: './views/userhome.html',
	            controller: 'usercontroller'
	        })
	        .state('doctor', {
	            url: '/doctor',
	            templateUrl: './views/doctorloginpage.html',
	            controller: 'doctorlogincontroller'
	        })
	        .state('doctorhomepage', {
	            url: '/doctorhomepage',
	            templateUrl: './views/doctorhomepage.html',
	            controller: 'doctorhomecontroller'
	        });

    }
]);

	application.controller('registercontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
			$(document).ready(function() {
				$(".loading").fadeOut("slow");
			});

			$scope.resgistrationform = {};
			$scope.registrationformessage = "";
			$scope.alertclass = "";
			$scope.alerthide = true;
			$scope.loginform = {};
			$scope.loginformmessage = "";
			$scope.loginformmessagehide = true;

			$http({
			method: 'GET',
			url: './services/userChecksessionservice.php'
			}).then(function(response) {
				console.log(response);
				if(response.data.usersession == true) {
					$location.path("/userhome");
				} else {
					$location.path("/homepage");
				}
			});

			$scope.registeruser = function() {
					$http({
						method: 'POST',
						url: './services/registeruserservice.php',
						data: $scope.resgistrationform
					}).then(function(response) {
						console.log(response.data);
						if(response.data.usernamelength == true) {
							$scope.registrationformessage = "Username must be more than 5 characters.";
							$scope.alertclass = "alert-danger";
							$scope.alerthide = false;
						} else if(response.data.passwordlength == true) {
							$scope.registrationformessage = "Password must be more than 5 charaters.";
							$scope.alertclass = "alert-danger";
							$scope.alerthide = false;
						} else if(response.data.availableusername == true) {
							$scope.registrationformessage = "Username already exists";
							$scope.alertclass = "alert-danger";
							$scope.alerthide = false;
						} else if(response.data.querysuccess == false) {
							$scope.registrationformessage = "Registration Successful";
							$scope.alertclass = "alert-success";
							$scope.alerthide = false;
						}
					});
				

			}

			$scope.closemodallogin = function() {
				$scope.loginform = {};
				$scope.loginformmessagehide = true;
			}

			$scope.loginuser = function() {
				$http({
					method: 'POST',
					url: './services/loginuserservice.php',
					data: $scope.loginform
				}).then(function(response) {
					if(response.data.querysuccess == true) {
						$scope.loginformmessage = "Invalid username or password";
						$scope.loginformmessagehide = false;
					} else {
						location.reload();
						$location.path('/userhome');
					}
				});
			}

			$scope.closeregisterform = function() {
				$scope.resgistrationform = {};
				$scope.registrationformessage = "";
				$scope.alertclass = "";
				$scope.alerthide = true;
			}

	}]);

application.controller('adminlogincontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$(document).ready(function() {
				$(".loading").fadeOut("slow");
		});
		$scope.adminformlogin = {};

		$scope.loginadmin = function() {
			$http({
				method: 'POST',
				url: './services/adminloginservice.php',
				data: $scope.adminformlogin
			}).then(function(response) {
				if(response.data.loginsuccess == true) {
					$location.path("/adminhomepage");
				} else {

				}
				console.log(response);
			});
		}
			
	}]);

application.controller('adminhomecontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$(document).ready(function() {
				$(".loading").fadeOut("slow");
		});
		
		$http({
			method: 'GET',
			url: './services/adminchecksessionservice.php'
		}).then(function(response) {
			console.log(response);
			if(response.data.adminsession == true) {
				$location.path("/adminhomepage");
			} else {
				$location.path("/admin");
			}
		});

		$scope.logout = function() {
			$http({
				method: 'GET',
				url: './services/logoutservice.php'
			}).then(function(response) {
				$location.path('/admin');
			});
		}
			
	}]);
		
application.controller('admindoctorservicecontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.pageSize = 10;
	$scope.currentPage = 1;

		$(document).ready(function() {
				$(".loading").fadeOut("slow");
		});
		$http({
			method: 'GET',
			url: './services/adminchecksessionservice.php'
		}).then(function(response) {
			console.log(response);
			if(response.data.adminsession == true) {
				$location.path("/admindoctorservice");
			} else {
				$location.path("/admin");
			}
		});

		$scope.logout = function() {
			$http({
				method: 'GET',
				url: './services/logoutservice.php'
			}).then(function(response) {
				$location.path('/admin');
			});
		}

		$scope.doctorregistrationform = {};
		$scope.doctorregistrationformmessage = "";
		$scope.doctorregistrationformalert = "";

		$scope.resizescreen = $(".well").outerHeight() + 900 + "px";
		var screensize = $(".well").outerHeight() + 900 + "px";

		$scope.collapsebuttonadd = function() {
			
			if($scope.resizescreen != screensize) {
				$scope.resizescreen = screensize;
				
			} else {
				$scope.resizescreen = $(".well").outerHeight() + 900 + "px";
			}
			$scope.doctorregistrationform = {};
			$scope.doctorregistrationformmessage = "";
			$scope.doctorregistrationformalert = "";

		}

		$scope.doctorformtable = [];

		$scope.registerdoctor = function() {
			$http({
				method: 'POST',
				url: './services/doctorregistrationservice.php',
				data: $scope.doctorregistrationform
			}).then(function(response) {
				console.log(response);
				if(response.data.usernameexist == true) {
					$scope.doctorregistrationformmessage = "Username Exists";
					$scope.doctorregistrationformalert = "alert-danger";
				} else if(response.data.usernamelength == true) {
					$scope.doctorregistrationformmessage = "Username must be more than 5 characters";
					$scope.doctorregistrationformalert = "alert-danger";
				} else if(response.data.passwordlength == true) {
					$scope.doctorregistrationformmessage = "Password must be more than 5 character";
					$scope.doctorregistrationformalert = "alert-danger";
				} else {
					$scope.resizescreen = $(".well").outerHeight() + 500 + "px";
					console.log($scope.doctorregistrationform.firstname);
					$scope.doctorregistrationformmessage = "Registration successful";
					$scope.doctorregistrationformalert = "alert-success";
					$scope.doctorregistrationformmessage = "";
					$scope.doctorregistrationformalert = "";
					$scope.doctorformtable.push({
						'doctorid': response.data.doctorid,
						'firstname': $scope.doctorregistrationform.firstname,
						'middlename': $scope.doctorregistrationform.middlename,
						'lastname': $scope.doctorregistrationform.lastname,
						'age': $scope.doctorregistrationform.age,
						'gender': $scope.doctorregistrationform.gender,
						'address': $scope.doctorregistrationform.address,
						'doctortype': $scope.doctorregistrationform.doctotype,
						'username': $scope.doctorregistrationform.username,
						'password': $scope.doctorregistrationform.password
					});
				$scope.doctorregistrationform = {};
				}
			});
		}

		

		$scope.doctortable = function() {
			$http({
				method: 'GET',
				url: './services/admindoctortableservice.php'
			}).then(function(response) {
				console.log(response);
				$scope.doctorformtable = response.data;
			});
		}
		// $scope.deletedoctormessage = "";
		// $scope.deletedoctor = function(docid) {
		// 	console.log(docid);
			// $http({
			// 		method: 'POST',
			// 		url: './services/admindeletedoctorservice.php',
			// 		data: {'id': docid}
			// 	}).then(function(response) {
			// 		console.log(response);
			// 	});
		// }

		$scope.updatemodalform = [];
		$scope.upadateformlabel = [];
		$scope.updatemodalformmessage = "";
		$scope.messagehide= false;

		$scope.updatedoctoraccount = function(id, firstname, middlename, lastname, age, gender, address, doctortype, username, password) {
			$scope.updatemodalform.push({
				'id': id,
				'firstname': firstname,
				'middlename': middlename,
				'lastname': lastname,
				'age': age,
				'gender': gender,
				'address': address,
				'doctortype': doctortype,
				'username': username,				
				'password': password
			});
			$scope.upadateformlabel = $scope.updatemodalform[0];
			console.log($scope.upadateformlabel);
		}


			$scope.submitmodalform = function() {
				$http({
					method: 'POST',
					url: './services/adminupdatedoctorservice.php',
					data: $scope.upadateformlabel
				}).then(function(response) {
					if(response.data.usernameexist == true) {
						$scope.updatemodalformmessage = "Username already exists.";
						$scope.messagehide= true;
					} else {
						location.reload();
					}
				});
			}

			$scope.closemodalbutton = function() {
				$scope.updatemodalform = [];
				$scope.upadateformlabel = [];
				$scope.updatemodalformmessage = "";
				$scope.messagehide= false;
			}	

		$scope.doctortable();

	}]);



application.filter('startFrom', function() {
	return function(data, start) {
		return data.slice(start);
	}
});

application.controller('adminworkerservicecontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$(document).ready(function() {
				$(".loading").fadeOut("slow");
		});
		$http({
			method: 'GET',
			url: './services/adminchecksessionservice.php'
		}).then(function(response) {
			console.log(response);
			if(response.data.adminsession == true) {
				$location.path("/adminworkerservice");
			} else {
				$location.path("/admin");
			}
		});

		$scope.logout = function() {
			$http({
				method: 'GET',
				url: './services/logoutservice.php'
			}).then(function(response) {
				$location.path('/admin');
			});
		}

		$scope.resizescreen = $(".well").outerHeight() + 900 + "px";
		var screensize = $(".well").outerHeight() + 900 + "px";

		$scope.collapsebuttonadd = function() {
			
			if($scope.resizescreen != screensize) {
				$scope.resizescreen = screensize;
				
			} else {
				$scope.resizescreen = $(".well").outerHeight() + 900 + "px";
			}

		}

		$scope.registerworkerform = {};
		$scope.registerworkerformmessage = "";
		$scope.alertclass = "";

		$scope.registerworker = function() {
			$http({
				method: 'POST',
				url: './services/adminregisterworker.php',
				data: $scope.registerworkerform
			}).then(function(response) {
				if(response.data.usernameexist == true) {
					$scope.registerworkerformmessage = "Username already exists.";
					$scope.alertclass = "alert-danger";
				} else if(response.data.usernamelength == true) {
					$scope.registerworkerformmessage = "Username must be more than 5 characters";
					$scope.alertclass = "alert-danger";
				} else if(response.data.passwordlength == true) {
					$scope.registerworkerformmessage = "Password must be more than 5 characters";
					$scope.alertclass = "alert-danger";
				} else {
					console.log(response);
					$scope.registerworkerformmessage = "Registration successful";
					$scope.alertclass = "alert-success";
				}
			});
		}

		$scope.workertableform = [];

		$scope.workertable = function() {
			$http({
				method: 'GET',
				url: './services/workertable.php'
			}).then(function(response) {
				$scope.workertableform = response.data;
			});
		}

		$scope.workerupdatemodalform = [];
		$scope.workerform = [];
		$scope.workerformmessage = "";

		$scope.workerupdatemodal = function(id, firstname, middlename, lastname, age, gender, address, nationality, username, password) {
			$scope.workerupdatemodalform.push({
				'id': id,
				'firstname': firstname,
				'middlename': middlename,
				'lastname': lastname,
				'age': age,
				'gender': gender,
				'address': address,
				'nationality': nationality,
				'username': username,
				'password': password
			});
			$scope.workerform = $scope.workerupdatemodalform[0];
		}

		$scope.submitworkermodal = function() {
			$http({
				method: 'POST',
				url: './services/workerupdateservice.php',
				data: $scope.workerform
			}).then(function(response) {
				console.log(response);
				if(response.data.usernameexist == true) {
					$scope.workerformmessage = "Username already exists.";
				} else if(response.data.usernamelength == true) {
					$scope.workerformmessage = "Username must be more than 5 characters";
				} else if(response.data.passwordlength === true) {
					$scope.workerformmessage = "Password must be more than 5 characters";
				} else {
					location.reload();
				}
			});
		}

		$scope.workertable();

	}]);

application.controller('adminusercontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$scope.pageSize = 10;
		$scope.currentPage = 1;

		$(document).ready(function() {
				$(".loading").fadeOut("slow");
		});
		
		$http({
			method: 'GET',
			url: './services/adminchecksessionservice.php'
		}).then(function(response) {
			console.log(response);
			if(response.data.adminsession == true) {
				$location.path("/adminuser");
			} else {
				$location.path("/admin");
			}
		});

		$scope.logout = function() {
			$http({
				method: 'GET',
				url: './services/logoutservice.php'
			}).then(function(response) {
				$location.path('/admin');
			});
		}

		$scope.resizescreen = $(".well").outerHeight() + 900 + "px";
		var screensize = $(".well").outerHeight() + 900 + "px";

		$scope.collapsebuttonadd = function() {
			
			if($scope.resizescreen != screensize) {
				$scope.resizescreen = screensize;
				
			} else {
				$scope.resizescreen = $(".well").outerHeight() + 900 + "px";
			}

		}

		$scope.usertableform = [];

		$scope.usertable = function() {
			$http({
				method: 'GET',
				url: './services/adminusergettableservice.php'
			}).then(function(response) {
				$scope.usertableform = response.data;
			})
		}

		$scope.registeruserform = {};
		$scope.registeruserformmessage = "";
		$scope.alertclass = "";

		$scope.registeruser = function() {
			$http({
				method: 'POST',
				url: './services/adminuserregisterservice.php',
				data: $scope.registeruserform
			}).then(function(response) {
				console.log(response);
				if(response.data.usernameexist == true) {
					$scope.alertclass = "alert-danger";
					$scope.registeruserformmessage = "Username already exists.";
				} else if(response.data.usernamelength == true) {
					$scope.alertclass = "alert-danger";
					$scope.registeruserformmessage = "Username must be more than 5 characters";
				} else if(response.data.passwordlength == true) {
					$scope.alertclass = "alert-danger";
					$scope.registeruserformmessage = "Password must be more than 5 characters";
				} else {
					location.reload();
					alert("Registration Successful");
				}
			});
		}

		$scope.updateuserform = [];
		$scope.user = [];

		$scope.updateusermodal = function(id, firstname, middlename, lastname, age, gender, address, nationality, username, password) {
			$scope.updateuserform.push({
				'userid': id,
				'firstname': firstname,
				'middlename': middlename,
				'lastname': lastname,
				'age': age,
				'genderq': gender,
				'address': address,
				'nationality': nationality,
				'username': username,
				'password': password
			});
			$scope.user = $scope.updateuserform[0];
		} 

		$scope.closemodal = function() {
			$scope.updateuserform = [];
			$scope.user = [];
		}

		$scope.usertable();

			
	}]);

application.controller('workercontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$(document).ready(function() {
				$(".loading").fadeOut("slow");
		});
		
		// $http({
		// 	method: 'GET',
		// 	url: './services/adminchecksessionservice.php'
		// }).then(function(response) {
		// 	console.log(response);
		// 	if(response.data.adminsession == true) {
		// 		$location.path("/hospworkeruser");
		// 	} else {
		// 		$location.path("/admin");
		// 	}
		// });

		$scope.hosploginform = {};
		$scope.hosploginformmessage = "";
		$scope.alerthide = true;

		$scope.login = function() {
			$http({
				method: 'POST',
				url: './services/hospworkerloginservice.php',
				data: $scope.hosploginform
			}).then(function(response) {
				if(response.data.loginerror == true) {
					$scope.hosploginformmessage = "Username or password is invalid";
					$scope.alerthide = false;
				} else if(response.data.loginerror == false) {
					$location.path('/hospworkerhome');
				}
			});
		}
			// workerChecksession.php
	}]);

application.controller('workerhomecontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {

		$scope.pageSize = 10;
		$scope.currentPage = 1;

		$scope.pageSizeupdate = 10;
		$scope.currentPageupdate = 1;

		$(document).ready(function() {
				$(".loading").fadeOut("slow");
		});

		$scope.savebuttonenable = true;
		$scope.userregister = false;
		$scope.walkinpatientform = {};
		$scope.usernameexistid = "";
		$scope.walkinpatientformmessage = "";
		$scope.alertmessage = "";
		$scope.proceed = true;
		$scope.canel = true;
		$scope.vitalsignform = {};
		$scope.tableform = [];
		$scope.selecteduser = "";
		$scope.alertmodal = "";
		$scope.showselected = true;
		var existinguserbutton = false;
		var walkinuserbutton = false;
		
		$http({
			method: 'GET',
			url: './services/workerChecksession.php'
		}).then(function(response) {
			console.log(response);
			if(response.data.workersession == true) {
				$location.path("/hospworkerhome");
			} else {
				$location.path("/hospworkeruser");
			}
		});

		$scope.logout = function() {
			$http({
			method: 'GET',
			url: './services/hospworkerlogoutservice.php'
			}).then(function(response) {
				$location.path("/hospworkeruser");
			});
		}

		$scope.resizescreen = $(".well").outerHeight() + 1400 + "px";
		var screensize = $(".well").outerHeight() + 900 + "px";

		$scope.vitalsignsave = function() {
			if(walkinuserbutton == true) {
				$scope.vitalsignform.firstname = $scope.walkinpatientform.firstname;
				$scope.vitalsignform.middlename = $scope.walkinpatientform.middlename;
				$scope.vitalsignform.lastname = $scope.walkinpatientform.lastname;
				$scope.vitalsignform.age = $scope.walkinpatientform.age;
				$scope.vitalsignform.gender = $scope.walkinpatientform.gender;
				$scope.vitalsignform.address = $scope.walkinpatientform.address;
				$scope.vitalsignform.nationality = $scope.walkinpatientform.nationality;
				$scope.vitalsignform.username = $scope.walkinpatientform.username;
				$scope.vitalsignform.password = $scope.walkinpatientform.password;
				$http({
				method: 'POST',
				url: './services/vitalsignsaveservice.php',
				data: $scope.vitalsignform 
				}).then(function(response) {
					console.log(response);
					$scope.tableform.push({
						'vitalsignid': response.data.vitalsignid,
						'bp': $scope.vitalsignform.bloodpressure,
						'cardiacrate': $scope.vitalsignform.cardiacrate,
						'pulserate': $scope.vitalsignform.pulserate,
						'temperature': $scope.vitalsignform.temperature,
						'respiratoryrate': $scope.vitalsignform.respiratoryrate,
						'oxygensaturation': $scope.vitalsignform.oxygen,
						'date_created': response.data.vitalsigndate,
						'firstname': $scope.vitalsignform.firstname,
						'middlename': $scope.vitalsignform.middlename,
						'lastname': $scope.vitalsignform.lastname,
						'workerid': response.data.workerid
					});
					$scope.savebuttonenable = true;
					$scope.userregister = false;
					$scope.walkinpatientform = {};
					$scope.usernameexistid = "";
					$scope.walkinpatientformmessage = "";
					$scope.alertmessage = "";
					$scope.proceed = true;
					$scope.canel = true;
					$scope.vitalsignform = {};
					$scope.selecteduser = "";
					$scope.alertmodal = "";
					walkinuserbutton = false;
					existinguserbutton = false;
			});
			} else if(existinguserbutton == true) {
				$http({
				method: 'POST',
				url: './services/vitalsignsaveservice.php',
				data: $scope.vitalsignform 
				}).then(function(response) {
					console.log(response);
					$scope.tableform.push({
						'vitalsignid': response.data.vitalsignid,
						'bp': $scope.vitalsignform.bloodpressure,
						'cardiacrate': $scope.vitalsignform.cardiacrate,
						'pulserate': $scope.vitalsignform.pulserate,
						'temperature': $scope.vitalsignform.temperature,
						'respiratoryrate': $scope.vitalsignform.respiratoryrate,
						'oxygensaturation': $scope.vitalsignform.oxygen,
						'date_created': response.data.vitalsigndate,
						'firstname': $scope.vitalsignform.firstname,
						'middlename': $scope.vitalsignform.middlename,
						'lastname': $scope.vitalsignform.lastname,
						'workerid': response.data.workerid
					});
					$scope.savebuttonenable = true;
					$scope.userregister = false;
					$scope.walkinpatientform = {};
					$scope.usernameexistid = "";
					$scope.walkinpatientformmessage = "";
					$scope.alertmessage = "";
					$scope.proceed = true;
					$scope.canel = true;
					$scope.vitalsignform = {};
					$scope.selecteduser = "";
					$scope.alertmodal = "";
					walkinuserbutton = false;
					existinguserbutton = false;
				});
			}
			
		}

		$scope.closewalkinpatientmodal = function() {
			$scope.savebuttonenable = true;
			$scope.userregister = false;
			$scope.walkinpatientform = {};
			$scope.usernameexistid = "";
			$scope.walkinpatientformmessage = "";
			$scope.alertmessage = "";
			$scope.proceed = true;
			$scope.canel = true;
			$scope.selecteduser = "";
			$scope.alertmodal = "";
			$scope.showselected = true;
			var existinguserbutton = false;
			var walkinuserbutton = false;
		}

		$scope.modalproceed = function() {
			$scope.savebuttonenable = false;
			$scope.walkinpatientformmessage = "";
			$scope.alertmessage = "";
			$scope.proceed = true;
			$scope.canel = true;
			$scope.selecteduser = "";
			$scope.alertmodal = "";
			$scope.showselected = true;
		}

		$scope.modalcancel = function () {
			$scope.savebuttonenable = true;
			$scope.userregister = false;
			$scope.walkinpatientform = {};
			$scope.usernameexistid = "";
			$scope.walkinpatientformmessage = "";
			$scope.alertmessage = "";
			$scope.proceed = true;
			$scope.canel = true;
			$scope.selecteduser = "";
			$scope.alertmodal = "";
			$scope.showselected = true;
			var existinguserbutton = false;
			var walkinuserbutton = false;
		}

		$scope.savewalkinpatient = function() {
			walkinuserbutton = true;
			$http({
			method: 'POST',
			url: './services/walkinpatientcheckusernameservice.php',
			data: $scope.walkinpatientform
			}).then(function(response) {
				console.log(response);
				if(response.data.usernameexist == true) {
					$scope.walkinpatientformmessage = "User exists with id ";
					$scope.usernameexistid = response.data.userid;
					$scope.alertmessage = "alert-info";
					$scope.proceed = true;
					$scope.canel = true;
				} else {
					$scope.savebuttonenable = false;
					$scope.usernameexistid = "";
					$scope.walkinpatientformmessage = "Added temporary. Please enter his vital signs to save the account.";
					$scope.alertmessage = "alert-success";
					$scope.proceed = false;
					$scope.canel = false;
				}
			});
		}

		$scope.vitalsigntable = function() {
			$http({
			method: 'GET',
			url: './services/vitalsigntableservice.php'
			}).then(function(response) {
				$scope.tableform = response.data;
			});
		}

		$scope.vitalsigndelete = function(id) {
			$http({
			method: 'POST',
			url: './services/vitalsigndeleteservice.php',
			data: {'id': id}
			}).then(function(response) {
				location.reload();
			});
		}

		$scope.updatemodalform = [];
		$scope.updateform = [];

		$scope.modalupdate = function(id, temperature, cardiacrate, pulserate, bloodpressure, respiratoryrate, oxygen) {
			$scope.updatemodalform.push({'id': id, 'temperature': temperature, 'cardiacrate': cardiacrate, 'pulserate': pulserate, 'bloodpressure': bloodpressure, 'respiratoryrate': respiratoryrate, 'oxygen': oxygen});
			$scope.updateform = $scope.updatemodalform[0];
		}

		$scope.closeupdatemodal = function() {
			$scope.updatemodalform = [];
			$scope.updateform = [];
		}

		$scope.updatevitalsign = function() {
			$http({
			method: 'POST',
			url: './services/vitalsignupdateservice.php',
			data: $scope.updateform
			}).then(function(response) {
				location.reload();
			});
		}

		$scope.existinguserform = [];

		$scope.existingusers = function() {
			existinguserbutton = true;
			$http({
			method: 'GET',
			url: './services/userexistingtableservice.php'
			}).then(function(response) {
				$scope.existinguserform = response.data;
			});
		}

		$scope.selectuser = function(id) {
			$http({
			method: 'POST',
			url: './services/userexistselectservice.php',
			data: {'id': id}
			}).then(function(response) {
				$scope.vitalsignform = response.data[0];
				console.log($scope.vitalsignform);
				$scope.selecteduser = id;
			});
			$scope.alertmodal = "alert-success";
			$scope.showselected = false;
		}

		$scope.existingusers();
		$scope.vitalsigntable();

	}]);		
		
application.controller('usercontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$(document).ready(function() {
				$(".loading").fadeOut("slow");
		});

		$scope.pageSize = 9;
		$scope.currentPage = 1;

		$scope.pageSizev = 9;
		$scope.currentPagev = 1;

		$scope.pageSizer = 10;
		$scope.currentPager = 1;

		$scope.resizescreen = $(".well").outerHeight() + 2500 + "px";
		var screensize = $(".well").outerHeight() + 300 + "px";

		$scope.doctorsched = false;

		$http({
			method: 'GET',
			url: './services/userChecksessionservice.php'
		}).then(function(response) {
			console.log(response);
			if(response.data.usersession == true) {
				$location.path("/userhome");
			} else {
				$location.path("/homepage");
			}
		});

		$scope.profileform = [];
		$scope.doctorschedform = [];
		$scope.id = "";
		$scope.desc = "";
		$scope.time = "";
		$scope.schedmessage = "";
		$scope.id = "";

		$http({
			method: 'GET',
			url: './services/userprofile.php'
		}).then(function(response) {
			$scope.profileform = response.data[0];
		});

		$scope.logout = function() {
			$http({
				method: 'GET',
				url: './services/logoutservice.php'
			}).then(function(response) {
				$location.path('/');
			});
		}

		$scope.doctorsform = [];

		$scope.getdoctors = function() {
			$http({
				method: 'GET',
				url: './services/getdoctors.php'
			}).then(function(response) {
				$scope.doctorsform = response.data;
			});
		}

		$scope.modalschedclose = function() {
			$scope.doctorschedform = [];
			$scope.desc = "";
			$scope.time = "";
			$scope.schedmessage = "";
			$scope.id = "";
		}

		$scope.selectschedmodalclose = function() {
			$scope.id = "";
			$scope.desc = "";
			$scope.time = "";
			$scope.schedmessage = "";
			$scope.id = "";
		}



		$scope.selectedschedmodal = function(id, desc, time) {
			$scope.id = id;
			$scope.desc = desc;
			$scope.time = time;
		}

		$scope.doctorschedulemodal = function(id) {
			$http({
				method: 'POST',
				url: './services/getdoctorschedservice.php',
				data: {'id': id}
			}).then(function(response) {
				$scope.doctorschedform = response.data;
			});
		}

		$scope.saveselectedsched = function() {
			$http({
				method: 'POST',
				url: './services/saveselectedschedservice.php',
				data: {'id': $scope.id, 'desc': $scope.desc, 'time': $scope.time}
			}).then(function(response) {
				if(response.data.appointmentexist == true) {
					$scope.schedmessage = "The schedule already exists";
				} else {
					location.reload();
				}
			});
		}

		$scope.appointmentform = [];

		$scope.appointmenttable = function() {
			$http({
				method: 'GET',
				url: './services/appointmenttableservice.php'
			}).then(function(response) {
				$scope.appointmentform = response.data;
			});
		}

		$scope.vitalsignform = [];

		$scope.vitalsigntable = function() {
			$http({
				method: 'GET',
				url: './services/vitalsigntableserviceuser.php'
			}).then(function(response) {
				$scope.vitalsignform = response.data;
				console.log(response);
			});
		}

		$scope.vitalsigntable();
		$scope.appointmenttable();
		$scope.getdoctors();

	}]);
		

application.controller('doctorlogincontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$(document).ready(function() {
				$(".loading").fadeOut("slow");
		});


		$scope.loginform = {};
		$scope.loginformmessage = "";

		$scope.login = function() {
			$http({
			method: 'POST',
			url: './services/doctorlogin.php',
			data: $scope.loginform
		}).then(function(response) {
			if(response.data.loginsuccess == true) {
				$scope.loginformmessage = "Invalid username and password.";
			} else {
				$location.path('/doctorhomepage');
			}
		});
		}

	}]);	

application.controller('doctorhomecontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$scope.pageSize = 10;
		$scope.currentPage = 1;

		$scope.pageSizevitalsign = 10;
		$scope.currentPagevitalsign = 1;

		$(document).ready(function() {
				$(".loading").fadeOut("slow");
		});


		$('.datepicker').datepicker({
		    startDate: '-3d'
		});

		$http({
			method: 'GET',
			url: './services/doctorChecksession.php'
		}).then(function(response) {
			if(response.data.doctorsession == true) {
				$location.path('/doctorhomepage');
			} else {
				$location.path('/doctor');
			}
		});

		$scope.logout = function() {
			$http({
			method: 'GET',
			url: './services/doctorlogoutservice.php'
		}).then(function(response) {
			$location.path('/doctor');
		});
		}

		$scope.resizescreen = $(".well").outerHeight() + 900 + "px";
		var screensize = $(".well").outerHeight() + 300 + "px";

		$scope.collapsebuttonadd = function() {
			
			if($scope.resizescreen != screensize) {
				$scope.resizescreen = screensize;
				
			} else {
				$scope.resizescreen = $(".well").outerHeight() + 900 + "px";
			}

		}

		$scope.schedform = {};
		$scope.schedformmessage = "";
		$scope.schedtableform = [];
		$scope.schedupdateform = [];
		$scope.vitalsignform = [];

		$scope.savesched = function() {
			$http({
			method: 'POST',
			url: './services/saveschedservice.php',
			data: $scope.schedform
			}).then(function(response) {
				if(response.data.schedexist == true) {
					$scope.schedformmessage = "Schedule already exist.";
				} else {
					$scope.schedtableform.push({
						'schedid': response.data.id,
						'scheddesc': response.data.desc,
						'schedtime': response.data.sched,
						'date_created': response.data.datecreate,
						'docid': response.data.docid
					});
				}
			});
		}

		

		$scope.schedtable = function() {
			$http({
			method: 'POST',
			url: './services/schedtableservice.php'
			}).then(function(response) {
				$scope.schedtableform = response.data;
			});
		}

		$scope.scheddelete = function(id) {
			$http({
			method: 'POST',
			url: './services/scheddeleteservice.php',
			data: {'id': id}
			}).then(function(response) {
				location.reload();
			});
		}

		$scope.schededitmodal = function(id, desc, sched) {
			$scope.schedupdateform.push({
				'id': id,
				'desc': desc,
				'sched': sched
			});
		}

		$scope.schedupdate = function() {
			$http({
			method: 'POST',
			url: './services/schedupdateservice.php',
			data: $scope.schedupdateform[0]
			}).then(function(response) {
				location.reload();
			});
		}

		$scope.vitalsigntable = function() {
			$http({
			method: 'GET',
			url: './services/doctorvitalsigntableservice.php'
			}).then(function(response) {
				$scope.vitalsignform = response.data;
			});
		}

		$scope.schedtable();
		$scope.vitalsigntable(); 

	}]);		
