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
	        .state('worker', {
	            url: '/worker',
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
	        })
	        .state('print', {
	            url: '/print',
	            templateUrl: './views/prinreport.html',
	            controller: 'printcontroller'
	        })
	        .state('adminappointment', {
	            url: '/adminappointment',
	            templateUrl: './views/adminappointment.html',
	            controller: 'adminappointmentcontroller'
	        })
	        .state('admindiagnosis', {
	            url: '/admindiagnosis',
	            templateUrl: './views/admindiagnosis.html',
	            controller: 'admindiagnosiscontroller'
	        })
	        .state('doctorsetting', {
	            url: '/doctorsetting',
	            templateUrl: './views/doctorsetting.html',
	            controller: 'doctorsettingcontroller'
	        })
	        .state('adminvitalsign', {
	            url: '/adminvitalsign',
	            templateUrl: './views/adminvitalsignpage.html',
	            controller: 'adminvitalsigncontroller'
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

			// $http({
			// method: 'GET',
			// url: './services/userChecksessionservice.php'
			// }).then(function(response) {
			// 	console.log(response);
			// 	if(response.data.usersession == true) {
			// 		$location.path("/userhome");
			// 	} else {
			// 		$location.path("/homepage");
			// 	}
			// });

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
						$( function() {
						    $( "#login" ).dialog();
						  } );
						$scope.loginformmessage = "Invalid username or password";
						$scope.loginformmessagehide = false;
						$scope.loginform = {};
						$scope.loginformmessagehide = true;
					} else {
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
		$scope.pageSize = 10;
		$scope.currentPage = 1;
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

			$scope.deletedoctoraccount = function(doctorid) {
				$http.post("./services/deletedoctorservice.php", {'doctorid': doctorid}).then(function(response) {
					location.reload();
				});
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
					location.reload();
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

		$scope.deleteworkeraccount = function(workerid) {
			$http.post("./services/deleteworkeraccountservice.php", {'workerid': workerid}).then(function(response) {
				location.reload();
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

		$scope.deleteuseraccount = function(userid) {
			$http.post("./services/deleteuseraccountservice.php", {'userid': userid}).then(function(response) {
				location.reload();
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
		// 		$location.path("/worker");
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

application.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

application.controller('workerhomecontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {

		$scope.pageSize = 10;
		$scope.currentPage = 1;

		$scope.pageSizeupdate = 10;
		$scope.currentPageupdate = 1;

		$scope.pageSizemed = 10;
		$scope.currentPagemed = 1;

		$scope.pageSizedrugallergy = 10;
		$scope.currentPagedrugallergy = 1;

		$scope.pageSizedrugallergymodal = 10;
		$scope.currentPagedrugallergymodal = 1;

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
				$location.path("/worker");
			}
		});

		$scope.logout = function() {
			$http({
			method: 'GET',
			url: './services/hospworkerlogoutservice.php'
			}).then(function(response) {
				$location.path("/worker");
			});
		}

		$scope.resizescreen = $(".well").outerHeight() + 2300 + "px";
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
					location.reload();
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

		$scope.medtableform = [];

		$scope.medtable = function() {
			$http({
			method: 'GET',
			url: './services/medtableservice.php'
			}).then(function(response) {
				$scope.medtableform = response.data;
			});
		}

		$scope.medform = {};

		$scope.savemed = function() {
			$http({
			method: 'POST',
			url: './services/medsaveservice.php',
			data: $scope.medform
			}).then(function(response) {
				$scope.medtableform.push({
					'medid': response.data.medid,
					'medname': response.data.name,
					'dosage': response.data.dosage,
					'category': response.data.category,
					'meduse': response.data.usage
				});
				$scope.medform = {};
			});
		}

		$scope.editmedform = {};

		$scope.editmedmodal = function(id, name, dosage, category, usage) {
			$scope.editmedform.id = id;
			$scope.editmedform.name = name;
			$scope.editmedform.dosage = dosage;
			$scope.editmedform.category = category;
			$scope.editmedform.usage = usage;
		}

		$scope.saveeditmodal = function() {
			$http({
			method: 'POST',
			url: './services/editmedsaveservice.php',
			data: $scope.editmedform
			}).then(function(response) {
				 location.reload();
			});
		}

		$scope.deletemed = function(medid) {
			$http({
			method: 'POST',
			url: './services/deletetmedservice.php',
			data: {'id': medid}
			}).then(function(response) {
				location.reload();
			});
		}

		$scope.closeeditmedmodal = function() {
			$scope.editmedform = {};
		}

		$scope.medcancelmodal = function() {
			$scope.medform = {};
		}

		$scope.userdrugalleryform = [];

		$scope.userdrugallerytable = function() {
			$http({
			method: 'GET',
			url: './services/userdrugallergyservice.php'
			}).then(function(response) {
				$scope.userdrugalleryform = response.data;
			});
		}

		$scope.userallergymodalform = [];
		$scope.userid = "";
		$scope.allergyform = {};

		function allergyymodaltouppercase(string) {
			return string.charAt(0).toUpperCase() + string.slice()
		}

		$scope.allergymodal = function(userid) {
			$scope.userid = userid;
			$http({
			method: 'POST',
			url: './services/userallergyservice.php',
			data: {'id': userid}
			}).then(function(response) {
				$scope.userallergymodalform = response.data;
				$scope.allergyform.userid = userid;
			});
		}

		$scope.allergymodalclose = function() {
			$scope.userallergymodalform = [];
			$scope.userid = "";
			$scope.allergyform = {};
		}

		$scope.saveallergy = function() {
			$http({
			method: 'POST',
			url: './services/saveallergyservice.php',
			data: $scope.allergyform
			}).then(function(response) {
				location.reload();
			});
		}

		$scope.existingusers();
		$scope.vitalsigntable();
		$scope.medtable();
		$scope.userdrugallerytable();

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

		$scope.pageSizervitalsign = 10;
		$scope.currentPagervitalsign = 1;

		$scope.pageSizerdiagnose = 10;
		$scope.currentPagerdiagnose = 1;

		$scope.pageSizerdiagnoseq = 10;
		$scope.currentPagerdiagnoseq = 1;

		$scope.pageSizemed = 10;
		$scope.currentPagemed = 1;


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
		$scope.dociduser = "";
		$scope.ftimem = "";
		$scope.ttimem = "";
		$scope.appointmentID = "";

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
			$scope.ftimem = "";
			$scope.ttimem = "";
			$scope.dociduser = "";
		}

		$scope.selectschedmodalclose = function() {
			$scope.id = "";
			$scope.desc = "";
			$scope.time = "";
			$scope.schedmessage = "";
			$scope.id = "";
			$scope.dociduser = "";
		}



		$scope.selectedschedmodal = function(id, desc, time, fromtimemoadal, totimemodal, dociduser) {
			$scope.id = id;
			$scope.desc = desc;
			$scope.time = time;
			$scope.ftimem = fromtimemoadal;
			$scope.ttimem = totimemodal;
			$scope.dociduser= dociduser;
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

		$scope.cancelModal = function(aID) {
			$scope.appointmentID = aID;
			console.log($scope.appointmentID);
		}

		$scope.userappointmentcancel = function() {
			$http({
				method: 'POST',
				url: './services/usercancelappointmentservice.php',
				data: {'appointmentid': $scope.appointmentID}
			}).then(function(response) {
				location.reload();
			});
		}

		$scope.cancelac = function() {
			$scope.appointmentID = "";
		}

		$scope.saveselectedsched = function() {
			$http({
				method: 'POST',
				url: './services/saveselectedschedservice.php',
				data: {'id': $scope.id, 'desc': $scope.desc, 'time': $scope.time, 'doctorid': $scope.dociduser}
			}).then(function(response) {
					location.reload();	
			});
		}

		$scope.appointmentform = [];

		$scope.appointmenttable = function() {
			$http({
				method: 'GET',
				url: './services/appointmenttableservice.php'
			}).then(function(response) {
				$scope.appointmentform = response.data;
				console.log(response);
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

		$scope.diagnosetableuserform = [];

		$scope.diagnosisusertable = function() {
			$http({
				method: 'GET',
				url: './services/diagnosistableserviceuser.php'
			}).then(function(response) {
				$scope.diagnosetableuserform = response.data;
			});
		}

		$scope.diagnosemodalform = [];

		$scope.diagnosemodal = function(date, description, complaint, diagnosis, recommendation, drugallergies, doctorfirstname, doctormiddlename, doctorlastname) {
			$scope.diagnosemodalform.push({
				'date': date,
				'description': description,
				'complaint': complaint,
				'diagnosis': diagnosis,
				'recommendation': recommendation,
				'drugallergies': drugallergies,
				'doctorfirstname': doctorfirstname,
				'doctormiddlename': doctormiddlename,
				'doctorlastname': doctorlastname
			});
		}

		$scope.diagnoseclosemodal = function() {
			$scope.diagnosemodalform = [];
		}

		$scope.medtableform = [];

		$scope.medtable = function() {
			$http({
				method: 'GET',
				url: './services/medtableuserservice.php'
			}).then(function(response) {
				$scope.medtableform = response.data;
			});
		}

		$scope.vitalsigntable();
		$scope.appointmenttable();
		$scope.getdoctors();
		$scope.diagnosisusertable();
		$scope.medtable();

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

		$scope.pageSizediagnosis = 10;
		$scope.currentPagediagnosis = 1;

		$scope.pageSizediagnosistable = 10;
		$scope.currentPagediagnosistable = 1;

		$(document).ready(function() {
				$(".loading").fadeOut("slow");
		});

		$('#timepicker1').timepicker();
		$('#timepicker2').timepicker();
		$('#timepicker3').timepicker();
		$('#timepicker4').timepicker();

		$('.datepicker').datepicker({
		    startDate: '-3d',
		    dateFormat: 'mm-dd-yy'
		}).val();

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

		$scope.printtprescriptionform = {};

		$scope.printprescriptionmodal = function(diagnoseid) {
			$http({
			method: 'POST',
			url: './services/prescriptionprintservice.php',
			data: {'diagnosis': diagnoseid}
			}).then(function(response) {
				$scope.printtprescriptionform = response.data[0];
			});
		}

		$scope.logout = function() {
			$http({
			method: 'GET',
			url: './services/doctorlogoutservice.php'
		}).then(function(response) {
			$location.path('/doctor');
		});
		}

		$scope.resizescreen = $(".well").outerHeight() + 1200 + "px";
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
				console.log(response);
				if(response.data.schedexist == true) {
					$scope.schedformmessage = "Schedule already exist.";
				} else {
					location.reload();
					$scope.schedtableform.push({
						'schedid': response.data.id,
						'scheddesc': response.data.desc,
						'schedtime': response.data.sched,
						'date_created': response.data.datecreate,
						'availability': response.data.availability,
						'fromtime': response.data.ftime,
						'totime': response.data.ttime,
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

		$scope.closeupdatemodalsched = function() {
			$scope.schedupdateform = [];
		}

		$scope.schededitmodal = function(id, desc, sched, ftimeupdate, ttimeupdate) {
			$scope.schedupdateform.push({
				'id': id,
				'desc': desc,
				'sched': sched,
				'fromtimeedit': ftimeupdate,
				'totimeedit': ttimeupdate
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



		$scope.expiresched = function() {
			var expiretime = new Date();
			if(expiretime.getHours() == 18) {
				$http({
				method: 'POST',
				url: './services/schedexpire.php'
				}).then(function(response) {
					// location.reload();
					// $scope.expiremodarray = response;
					// $('#myModal').modal('show');
				});
			}
		}

		$scope.patientschedarray = [];

		$scope.patientsched = function() {
			$http({
			method: 'GET',
			url: './services/patientschedservice.php'
			}).then(function(response) {
				$scope.patientschedarray = response.data;
			});
		}

		$scope.appointmentid = "";
		$scope.useridmodal = "";
		$scope.allergymodalform = [];
		$scope.alertalergy = "";

		$scope.diagnosemodal = function(diagnosemodalappointment,userid) {
			$scope.appointmentid = diagnosemodalappointment;
			$scope.useridmodal = userid;
		}

		$scope.diagnoseform = {};

		$scope.closediagnosemodal = function() {
			$scope.diagnoseform = {};
			$scope.useridmodal = "";
			$scope.appointmentid = "";
			$scope.allergymodalform = [];
			$scope.alertalergy = "";
		}

		$scope.collapseallergy = function() {
			$http({
			method: 'POST',
			url: './services/userallergycollapseservice.php',
			data: {'id': $scope.useridmodal}
			}).then(function(response) {
				$scope.allergymodalform = response.data;
				if($scope.allergymodalform.length <= 0) {
					$scope.alertalergy = "No allergies";
				}
			});
		}

		$scope.saveDiagnosemodal = function() {
			$scope.diagnoseform.appointmentid = $scope.appointmentid;
			$http({
					method: 'POST',
					url: './services/savediagnoseservice.php',
					data: $scope.diagnoseform
					}).then(function(response) {
						location.reload();
					});
			// $http({
			// method: 'POST',
			// url: './services/userallergycollapseservice.php',
			// data: {'id': $scope.useridmodal}
			// }).then(function(response) {
			// 	$scope.allergymodalform = response.data;
			// });

			// for(var i=0; i < $scope.allergymodalform.length; i++) {
			// 	if($scope.diagnoseform.recommendation.toLowerCase().indexOf(allergymodalform[i])!=-1) {
			// 		alert("Patient has allergies to recommendation");
			// 		break;
			// 	} else {
					// $http({
					// method: 'POST',
					// url: './services/savediagnoseservice.php',
					// data: $scope.diagnoseform
					// }).then(function(response) {
					// 	location.reload();
					// });
			// 		break;
			// 	}
			// }

			
		}

		$scope.diagnosetableform = [];

		$scope.diagnosetable = function() {
			$http({
			method: 'GET',
			url: './services/diagnosetableservice.php'
			}).then(function(response) {

				$scope.diagnosetableform = response.data;
				console.log($scope.diagnosetableform);
			});
		}

		$scope.diagnosetabledelete = function(diagnoseID) {
			$http({
			method: 'POST',
			url: './services/diagnosedeleteservice.php',
			data: {'id': diagnoseID}
			}).then(function(response) {
				location.reload();
			});
		}

		$scope.diagnoseeditform = {};

		$scope.diagnoseedit = function(id, description, complaint, diagnosis, recommendation, drugallergies) {
			$scope.diagnoseeditform.diagnoseid = id;
			$scope.diagnoseeditform.description = description;
			$scope.diagnoseeditform.complaint = complaint;
			$scope.diagnoseeditform.diagnosis = diagnosis;
			$scope.diagnoseeditform.recommendation = recommendation;
			$scope.diagnoseeditform.drugallergies = drugallergies;
		}

		$scope.diagnoseeditsave = function() {
			$http({
			method: 'POST',
			url: './services/diagnosesaveeditservice.php',
			data: $scope.diagnoseeditform
			}).then(function(response) {
				location.reload();
			});
		}

		$('#buttonprint').click(function(events) {
			$('.print').wordExport();
		});

		$scope.diagnoseeditclose = function() {
			$scope.diagnoseeditform = {};
		}

		$scope.schedtable();
		$scope.vitalsigntable(); 
		$scope.expiresched();
		$scope.patientsched();
		$scope.diagnosetable();

	}]);

	application.controller('printcontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {

		$scope.pageSize = 10;
		$scope.currentPage = 1;

		$scope.pageSizeupdate = 10;
		$scope.currentPageupdate = 1;

		$scope.pageSizemed = 10;
		$scope.currentPagemed = 1;

		$scope.pageSizedrugallergy = 10;
		$scope.currentPagedrugallergy = 1;

		$scope.pageSizedrugallergymodal = 10;
		$scope.currentPagedrugallergymodal = 1;

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
				$location.path("/print");
			} else {
				$location.path("/worker");
			}
		});

		$scope.logout = function() {
			$http({
			method: 'GET',
			url: './services/hospworkerlogoutservice.php'
			}).then(function(response) {
				$location.path("/worker");
			});
		}

		$scope.userinfoform = [];

		$scope.userinfomodal = function() {
			$http.get("./services/userinfoservice.php").then(function(response) {
				$scope.userinfoform = response.data;
				console.log(response.data);
			});
		}

		$scope.backbutton = function() {
			$location.path("/hospworkerhome");
		}

		$scope.printprescription = function(userid) {
			$http({
		        method: 'POST',
		        url: './services/prescriptionprint.php',
		        data: {
		            'id': userid
		        },
		        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

		    }).then(function(response) {

		    });
		}

		$scope.userinfomodal();

		$scope.resizescreen = $(".well").outerHeight() + 700 + "px";
		var screensize = $(".well").outerHeight() + 900 + "px";
	}]);		


application.controller('adminappointmentcontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
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
				$location.path("/adminappointment");
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
				url: './services/adminappointmenttableservice.php'
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

		$scope.deleteappointment = function(appointmentid) {
			$http({
			method: 'POST',
			url: './services/admindeleteappointmentservice.php',
			data: {'id': appointmentid}
			}).then(function(response) {
				location.reload();
			});
		}

		$scope.usertable();

			
	}]);


application.controller('admindiagnosiscontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$scope.pageSizezxc = 10;
		$scope.currentPagezxc = 1;

		$(document).ready(function() {
				$(".loading").fadeOut("slow");
		});
		
		$http({
			method: 'GET',
			url: './services/adminchecksessionservice.php'
		}).then(function(response) {
			console.log(response);
			if(response.data.adminsession == true) {
				$location.path("/admindiagnosis");
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

		$scope.usertableformzxc = [];

		$scope.usertable = function() {
			$http({
				method: 'GET',
				url: './services/admindiagnosisservice.php'
			}).then(function(response) {
				console.log("asjkdkljxczlkcvjklzjxc");
				console.log($scope.usertableform);
				$scope.usertableformzxcc = response.data;
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

		$scope.deleteappointment = function(appointmentid) {
			$http({
			method: 'POST',
			url: './services/admindeleteappointmentservice.php',
			data: {'id': appointmentid}
			}).then(function(response) {
				location.reload();
			});
		}

		$scope.usertable();

			
	}]);


application.controller('doctorsettingcontroller', ['$scope', '$http', '$location', 'fileUpload', function($scope, $http, $location, fileUpload) {
		$scope.pageSize = 10;
		$scope.currentPage = 1;

		$scope.pageSizevitalsign = 10;
		$scope.currentPagevitalsign = 1;

		$scope.pageSizediagnosis = 10;
		$scope.currentPagediagnosis = 1;

		$scope.pageSizediagnosistable = 10;
		$scope.currentPagediagnosistable = 1;

		$(document).ready(function() {
				$(".loading").fadeOut("slow");
		});

		$('#timepicker1').timepicker();
		$('#timepicker2').timepicker();
		$('#timepicker3').timepicker();
		$('#timepicker4').timepicker();

		$('.datepicker').datepicker({
		    startDate: '-3d',
		    dateFormat: 'mm-dd-yy'
		}).val();

		$http({
			method: 'GET',
			url: './services/doctorChecksession.php'
		}).then(function(response) {
			if(response.data.doctorsession == true) {
				$location.path('/doctorsetting');
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

		$scope.resizescreen = $(".well").outerHeight() + 1200 + "px";
		var screensize = $(".well").outerHeight() + 300 + "px";

		$scope.collapsebuttonadd = function() {
			
			if($scope.resizescreen != screensize) {
				$scope.resizescreen = screensize;
				
			} else {
				$scope.resizescreen = $(".well").outerHeight() + 900 + "px";
			}

		}

		// $scope.schedform = {};
		// $scope.schedformmessage = "";
		// $scope.schedtableform = [];
		// $scope.schedupdateform = [];
		// $scope.vitalsignform = [];

		// $scope.savesched = function() {
		// 	$http({
		// 	method: 'POST',
		// 	url: './services/saveschedservice.php',
		// 	data: $scope.schedform
		// 	}).then(function(response) {
		// 		console.log(response);
		// 		if(response.data.schedexist == true) {
		// 			$scope.schedformmessage = "Schedule already exist.";
		// 		} else {
		// 			$scope.schedtableform.push({
		// 				'schedid': response.data.id,
		// 				'scheddesc': response.data.desc,
		// 				'schedtime': response.data.sched,
		// 				'date_created': response.data.datecreate,
		// 				'availability': response.data.availability,
		// 				'fromtime': response.data.ftime,
		// 				'totime': response.data.ttime,
		// 				'docid': response.data.docid
		// 			});
		// 		}
		// 	});
		// }

		

		// $scope.schedtable = function() {
		// 	$http({
		// 	method: 'POST',
		// 	url: './services/schedtableservice.php'
		// 	}).then(function(response) {
		// 		$scope.schedtableform = response.data;
		// 	});
		// }

		// $scope.scheddelete = function(id) {
		// 	$http({
		// 	method: 'POST',
		// 	url: './services/scheddeleteservice.php',
		// 	data: {'id': id}
		// 	}).then(function(response) {
		// 		location.reload();
		// 	});
		// }

		// $scope.closeupdatemodalsched = function() {
		// 	$scope.schedupdateform = [];
		// }

		// $scope.schededitmodal = function(id, desc, sched, ftimeupdate, ttimeupdate) {
		// 	$scope.schedupdateform.push({
		// 		'id': id,
		// 		'desc': desc,
		// 		'sched': sched,
		// 		'fromtimeedit': ftimeupdate,
		// 		'totimeedit': ttimeupdate
		// 	});
		// }

		// $scope.schedupdate = function() {
		// 	$http({
		// 	method: 'POST',
		// 	url: './services/schedupdateservice.php',
		// 	data: $scope.schedupdateform[0]
		// 	}).then(function(response) {
		// 		location.reload();
		// 	});
		// }

		// $scope.vitalsigntable = function() {
		// 	$http({
		// 	method: 'GET',
		// 	url: './services/doctorvitalsigntableservice.php'
		// 	}).then(function(response) {
		// 		$scope.vitalsignform = response.data;
		// 	});
		// }



		// $scope.expiresched = function() {
		// 	var expiretime = new Date();
		// 	if(expiretime.getHours() == 18) {
		// 		$http({
		// 		method: 'POST',
		// 		url: './services/schedexpire.php'
		// 		}).then(function(response) {
		// 			location.reload();
		// 			// $scope.expiremodarray = response;
		// 			// $('#myModal').modal('show');
		// 		});
		// 	}
		// }

		// $scope.patientschedarray = [];

		// $scope.patientsched = function() {
		// 	$http({
		// 	method: 'GET',
		// 	url: './services/patientschedservice.php'
		// 	}).then(function(response) {
		// 		$scope.patientschedarray = response.data;
		// 	});
		// }

		// $scope.appointmentid = "";
		// $scope.useridmodal = "";
		// $scope.allergymodalform = [];
		// $scope.alertalergy = "";

		// $scope.diagnosemodal = function(diagnosemodalappointment,userid) {
		// 	$scope.appointmentid = diagnosemodalappointment;
		// 	$scope.useridmodal = userid;
		// }

		// $scope.diagnoseform = {};

		// $scope.closediagnosemodal = function() {
		// 	$scope.diagnoseform = {};
		// 	$scope.useridmodal = "";
		// 	$scope.appointmentid = "";
		// 	$scope.allergymodalform = [];
		// 	$scope.alertalergy = "";
		// }

		// $scope.collapseallergy = function() {
		// 	$http({
		// 	method: 'POST',
		// 	url: './services/userallergycollapseservice.php',
		// 	data: {'id': $scope.useridmodal}
		// 	}).then(function(response) {
		// 		$scope.allergymodalform = response.data;
		// 		if($scope.allergymodalform.length <= 0) {
		// 			$scope.alertalergy = "No allergies";
		// 		}
		// 	});
		// }

		// $scope.saveDiagnosemodal = function() {
		// 	$scope.diagnoseform.appointmentid = $scope.appointmentid;
		// 	$http({
		// 	method: 'POST',
		// 	url: './services/userallergycollapseservice.php',
		// 	data: {'id': $scope.useridmodal}
		// 	}).then(function(response) {
		// 		$scope.allergymodalform = response.data;
		// 	});

		// 	for(var i=0; i < $scope.allergymodalform.length; i++) {
		// 		if($scope.diagnoseform.recommendation.toLowerCase().indexOf(allergymodalform[i])!=-1) {
		// 			alert("Patient has allergies to recommendation");
		// 			break;
		// 		} else {
		// 			$http({
		// 			method: 'POST',
		// 			url: './services/savediagnoseservice.php',
		// 			data: $scope.diagnoseform
		// 			}).then(function(response) {
		// 				location.reload();
		// 			});
		// 			break;
		// 		}
		// 	}

			
		// }

		// $scope.diagnosetableform = [];

		// $scope.diagnosetable = function() {
		// 	$http({
		// 	method: 'GET',
		// 	url: './services/diagnosetableservice.php'
		// 	}).then(function(response) {

		// 		$scope.diagnosetableform = response.data;
		// 		console.log($scope.diagnosetableform);
		// 	});
		// }

		// $scope.diagnosetabledelete = function(diagnoseID) {
		// 	$http({
		// 	method: 'POST',
		// 	url: './services/diagnosedeleteservice.php',
		// 	data: {'id': diagnoseID}
		// 	}).then(function(response) {
		// 		location.reload();
		// 	});
		// }

		// $scope.diagnoseeditform = {};

		// $scope.diagnoseedit = function(id, description, complaint, diagnosis, recommendation, drugallergies) {
		// 	$scope.diagnoseeditform.diagnoseid = id;
		// 	$scope.diagnoseeditform.description = description;
		// 	$scope.diagnoseeditform.complaint = complaint;
		// 	$scope.diagnoseeditform.diagnosis = diagnosis;
		// 	$scope.diagnoseeditform.recommendation = recommendation;
		// 	$scope.diagnoseeditform.drugallergies = drugallergies;
		// }

		// $scope.diagnoseeditsave = function() {
		// 	$http({
		// 	method: 'POST',
		// 	url: './services/diagnosesaveeditservice.php',
		// 	data: $scope.diagnoseeditform
		// 	}).then(function(response) {
		// 		location.reload();
		// 	});
		// }

		// $scope.diagnoseeditclose = function() {
		// 	$scope.diagnoseeditform = {};
		// }

		// $scope.uploadFile = function() {
		// 	var form_data = new FormData();
		// 	angular.forEach($scope.files, function(file) {
		// 		form_data.append('file', file);
		// 	});
		// 	// $http({
		// 	// 	mehtod: 'POST',
		// 	// 	url: './services/savephoto.php',
		// 	// 	data: form_data,
		// 	// 	{
		// 	// 	transformRequest: angular.identity,
		// 	// 	headers: {'Content-Type': undefined, 'Process-Data': false}
		// 	// 	}
		// 	// }).then(function(response) {
		// 	// 	console.log(response);
		// 	// });
		// 	$http.post('./services/savephoto.php', form_data,
		// 		{
		// 			transformRequest: angular.identity,
		// 			headers: {'Content-Type': undefined, 'Process-Data': false}
		// 		}).then(function(response) {
		// 			console.log(response);
		// 		});
		// }

		$scope.uploadFile = function(){
	        var file = $scope.myFile;
	        console.log('file is ' );
	        console.dir(file);

	        var uploadUrl = "./services/savephoto.php";
	        var text = $scope.name;
	        fileUpload.uploadFileToUrl(file, uploadUrl);
	        
	    }

	    $scope.photoform = {};

	    $scope.profilephoto = function() {
	    	$http.get("./services/profilephotoservice.php").then(function(response) {
	    		$scope.photoform = response.data[0];
	    		console.log($scope.photoform);
	    	});
	    }

	    $scope.docinfoform = {};

	    $scope.doctorinfo = function() {
	    	$http.get("./services/docinfoservice.php").then(function(response) {
	    		$scope.docinfoform = response.data[0];
	    		console.log("asdkldjaslkdjaslk");
	    		console.log($scope.docinfoform);
	    	});
	    }

	    $scope.updatedoctorinfo = function() {
	    	$http.post("./services/updatedocinfoservice.php", $scope.docinfoform).then(function(response) {
	    		location.reload();
	    	});
	    }

		// $scope.schedtable();
		// $scope.vitalsigntable(); 
		// $scope.expiresched();
		// $scope.patientsched();
		// $scope.diagnosetable();
		$scope.profilephoto();
		$scope.doctorinfo();

	}]);


// application.directive("fileInput", function($parse) {
// 	return {
// 		link: function($scope, element, attrs) {
// 			element.on("change", function(event) {
// 				var files = event.target.files;
// 				$parse(attrs.fileInput).assign($scope, element[0].files);
// 				$scope.apply();
// 			});
// 		}
// 	}
// });

application.directive('fileModel', ['$parse', function ($parse) {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
   };
}]);

application.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
         var fd = new FormData();
         fd.append('file', file);
         $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined,'Process-Data': false}
         }).then(function(response) {
         	console.log(response);
         	location.reload();
         });
     }
 }]);

application.controller('adminvitalsigncontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {

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
				$location.path("/adminvitalsign");
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

		$scope.vitalsigntableform = [];

		$scope.vitalsigntable = function() {
			$http({
				method: 'GET',
				url: './services/adminvitalsigntableservice.php'
			}).then(function(response) {
				$scope.vitalsigntableform = response.data;
			});
		}

		$scope.deletevitalsign = function(id) {
			$http({
				method: 'POST',
				url: './services/adminvitalsigndeleteservice.php',
				data: {'id': id}
			}).then(function(response) {
				location.reload();
			});
		}

		$scope.vitalsigntable();

	}]);		
