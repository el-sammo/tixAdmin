(function() {
	'use strict';

	var app = angular.module('app', [
		'ngRoute', 'ui.bootstrap', 'ImageCropper'
	]);
	var $ = jQuery;

	///
	// Routes
	///

	app.config(function($routeProvider) {

		///
		// Home
		///

		$routeProvider.when('/', {
			controller: 'HomeController',
			templateUrl: '/templates/home.html'
		});


		///
		// Applicants
		///

		$routeProvider.when('/applicants', {
			controller: 'ApplicantsListController',
			templateUrl: '/templates/applicantsList.html'
		});


		///
		// Areas
		///

		$routeProvider.when('/areas', {
			controller: 'AreasListController',
			templateUrl: '/templates/areasList.html'
		});

		$routeProvider.when('/areas/add', {
			controller: 'AreasAddController',
			templateUrl: '/templates/areasForm.html'
		});

		$routeProvider.when('/areas/edit/:id', {
			controller: 'AreasEditController',
			templateUrl: '/templates/areasForm.html'
		});


		///
		// Customers
		///

		$routeProvider.when('/customers/add', {
			controller: 'CustomersAddController',
			templateUrl: '/templates/customersForm.html'
		});

		$routeProvider.when('/customers/edit/:id', {
			controller: 'CustomersEditController',
			templateUrl: '/templates/customersForm.html'
		});

		$routeProvider.when('/customers/orders/:id', {
			controller: 'CustomersOrdersController',
			templateUrl: '/templates/customersOrders.html'
		});

		$routeProvider.when('/customers/search', {
			controller: 'CustomersSearchController',
			templateUrl: '/templates/customersSearch.html'
		});


		///
		// Dispatch
		///

		$routeProvider.when('/dispatch', {
			controller: 'DispatchController',
			templateUrl: '/templates/dispatch.html'
		});

		$routeProvider.when('/dispatch/:id', {
			controller: 'DispatchOrderController',
			templateUrl: '/templates/dispatchOrder.html'
		});


		///
		// Drivers
		///

		$routeProvider.when('/driversReports', {
			controller: 'DriversReportsController',
			templateUrl: '/templates/driversReportsList.html'
		});


		///
		// Email List Mgmt
		///

		$routeProvider.when('/emailList/add', {
			controller: 'EmailListAddController',
			templateUrl: '/templates/emailListForm.html'
		});

		$routeProvider.when('/emailList/edit/:id', {
			controller: 'EmailListEditController',
			templateUrl: '/templates/emailListForm.html'
		});

		$routeProvider.when('/emailList/search', {
			controller: 'EmailListSearchController',
			templateUrl: '/templates/emailListSearch.html'
		});


		///
		// Hotels
		///

		$routeProvider.when('/hotels', {
			controller: 'HotelsListController',
			templateUrl: '/templates/hotelsList.html'
		});

		$routeProvider.when('/hotels/add/:id', {
			controller: 'HotelsAddController',
			templateUrl: '/templates/hotelsForm.html'
		});

		$routeProvider.when('/hotels/edit/:id', {
			controller: 'HotelsEditController',
			templateUrl: '/templates/hotelsForm.html'
		});


		///
		// Messaging
		///

		$routeProvider.when('/messages', {
			controller: 'MessagesListController',
			templateUrl: '/templates/messagesList.html'
		});

		$routeProvider.when('/messages/:id', {
			controller: 'MessageDetailsController',
			templateUrl: '/templates/messageDetails.html'
		});


		///
		// Order
		///

		$routeProvider.when('/orderDetails/:id', {
			controller: 'OrderDetailsController',
			templateUrl: '/templates/orderDetails.html'
		});


		///
		// Promos
		///

		$routeProvider.when('/promos', {
			controller: 'PromosListController',
			templateUrl: '/templates/promosList.html'
		});

		$routeProvider.when('/promos/add/:id', {
			controller: 'PromosAddController',
			templateUrl: '/templates/promosForm.html'
		});

		$routeProvider.when('/promos/edit/:id', {
			controller: 'PromosEditController',
			templateUrl: '/templates/promosForm.html'
		});


		///
		// Restaurants
		///

		$routeProvider.when('/restaurants', {
			controller: 'RestaurantsListController',
			templateUrl: '/templates/list.html'
		});

		$routeProvider.when('/restaurants/add/:id', {
			controller: 'RestaurantsAddController',
			templateUrl: '/templates/restaurantsForm.html'
		});

		$routeProvider.when('/restaurants/edit/:id', {
			controller: 'RestaurantsEditController',
			templateUrl: '/templates/restaurantsForm.html'
		});


		///
		// Shifts
		///

		$routeProvider.when('/shifts/:id', {
			controller: 'ShiftViewController',
			templateUrl: '/templates/shiftView.html'
		});

		$routeProvider.when('/shifts', {
			controller: 'ShiftsListController',
			templateUrl: '/templates/shiftsList.html'
		});

		$routeProvider.when('/driverShifts/:id', {
			controller: 'DriverShiftsListController',
			templateUrl: '/templates/driverShiftsList.html'
		});


		///
		// Stories
		///

		$routeProvider.when('/stories/add', {
			controller: 'StoriesAddController',
			templateUrl: '/templates/storyForm.html'
		});

		$routeProvider.when('/stories/view', {
			controller: 'StoriesListController',
			templateUrl: '/templates/storiesList.html'
		});


		///
		// Menus
		///

		$routeProvider.when('/menus/:id', {
			controller: 'MenusListController',
			templateUrl: '/templates/menusList.html'
		});

		$routeProvider.when('/menus/add/:id', {
			controller: 'MenusAddController',
			templateUrl: '/templates/menusForm.html'
		});

		$routeProvider.when('/menus/edit/:id', {
			controller: 'MenusEditController',
			templateUrl: '/templates/menusForm.html'
		});


		///
		// Items
		///

		$routeProvider.when('/items/:id', {
			controller: 'ItemsListController',
			templateUrl: '/templates/itemsList.html'
		});

		$routeProvider.when('/items/add/:id', {
			controller: 'ItemsAddController',
			templateUrl: '/templates/itemsForm.html'
		});

		$routeProvider.when('/items/edit/:id', {
			controller: 'ItemsEditController',
			templateUrl: '/templates/itemsForm.html'
		});


		///
		// Options
		///

		$routeProvider.when('/options/:id', {
			controller: 'OptionsListController',
			templateUrl: '/templates/optionsList.html'
		});

		$routeProvider.when('/options/add/:id', {
			controller: 'OptionsAddController',
			templateUrl: '/templates/optionsForm.html'
		});

		$routeProvider.when('/options/edit/:id', {
			controller: 'OptionsEditController',
			templateUrl: '/templates/optionsForm.html'
		});


		///
		// Users
		///

		$routeProvider.when('/users/add', {
			controller: 'UsersAddController',
			templateUrl: '/templates/usersForm.html'
		});

		$routeProvider.when('/users/edit/:id', {
			controller: 'UsersEditController',
			templateUrl: '/templates/usersForm.html'
		});

		$routeProvider.when('/users/search', {
			controller: 'UsersSearchController',
			templateUrl: '/templates/usersSearch.html'
		});


		///
		// Other
		///

		$routeProvider.otherwise({
			redirectTo: '/'
		});
	});


	///
	// Navbar Management
	///

	app.factory('navMgr', function navMgrFactory(
		$rootScope, $location, $window, $modal
	) {
		var service = {
			///
			// Form navigation management
			///

			shouldProtect: function() { return false; },

			onNavStart: function(evt, newUrl) {
				if(! this.shouldProtect()) return this.protect(false);

				this.navAway(newUrl);

				evt.preventDefault();
			},

			protect: function(shouldProtect) {
				var value = shouldProtect;

				if(typeof shouldProtect !== 'function') {
					shouldProtect = function() { return value; }
				}
				this.shouldProtect = shouldProtect;
			},

			cancel: function(newUrl) {
				if(! this.shouldProtect()) {
					this.protect(false);
					$window.location.href = newUrl;
					return;
				}
				this.navAway(newUrl);
			},

			navAway: function(newUrl) {
				var self = this;

				var modal = $modal.open({
					templateUrl: '/templates/navAway.html',
					backdrop: 'static',
					resolve: {}
				});

				modal.result.then(function(selected) {
					if(selected == 'save') {
						// TODO
						alert('functionality not implemented: save as draft');
						return;
					}

					self.protect(false);
					$window.location.href = newUrl;
				});
			}
		};

		return service;
	});

	///
	// Querystring builder
	///
	
	app.factory('querystring', function querystringFactory() {
			var service = {
				stringify: function(query, noEncode) {
					var items = [];
					angular.forEach(query, function(value, key) {
						if(noEncode) {
							items.push(key + '=' + value);
						} else {
							items.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
						}
					});
					return items.join('&');
				}
			};

			return service;
	});


	///
	// Configuration managements
	///
	
	app.factory('configMgr', function configMgrFactory() {
			var service = {
				config: {
					vendors: {
						googleMaps: {
							key: 'AIzaSyCmRFaH2ROz5TueD8XapBCTAdBppUir_Bs'
						}
					}
				},
			};

			return service;
	});


	///
	// Error management
	///

	app.factory('errMgr', function errMgrFactory($modal, $rootScope) {
		var service = {
			show: function(message, title) {
				$modal.open({
					templateUrl: '/templates/error.html',
					backdrop: true,
					controller: 'ErrController',
					resolve: {
						options: function() {
							return {
								message: message || 'An unknown error occurred.',
								title: title || 'Whoops! Something went wrong...'
							};
						}
					}
				});
			}
		};

		$rootScope.$on('httpError', function(evt, args) {
			service.show(args.error);
		});

		return service;
	});

	app.controller('ErrController', function($scope, options) {
		$scope.options = options;
	});

	app.constant('bigScreenWidth', 1179);

	app.factory('deviceMgr', function($window, bigScreenWidth) {
		var service = {
			getWindowWidth: function() {
				return $($window).width();
			},
	
			isBigScreen: function(width) {
				width || (width = service.getWindowWidth());
				return width >= bigScreenWidth;
			}
		};
	
		return service;
	});

	app.factory('messageMgmt', function messageMgmtFactory(
		$modal, $rootScope, $http
	) {
		var service = {
			send: function() {
				$modal.open({
					templateUrl: '/templates/sendMassMessage.html',
					backdrop: true,
					controller: 'MessageSendController'
				});
			}
		};

		return service;
	});


	app.factory('customerMgmt', function customerMgmtFactory(
		$modal, $rootScope, $http
	) {
		var service = {
			specialCharge: function(customerId) {
				$modal.open({
					templateUrl: '/templates/specialCharge.html',
					backdrop: true,
					controller: 'ChargeController',
					resolve: {
						args: function() {
							return {
								customerId: customerId
							}
						}
					}
				});
			}
		};

		return service;
	});


	app.factory('dispatchOrderMgmt', function dispatchOrderFactory(
		$modal, $rootScope, $http
	) {
		var service = {
			dispatchOrder: function(orderId, driverId) {
				$modal.open({
					templateUrl: '/templates/dispatchOrderToDriver.html',
					backdrop: true,
					controller: 'DispatchOrderToDriverController',
					resolve: {
						args: function() {
							return {
								orderId: orderId,
								driverId: driverId
							}
						}
					}
				});
			}
		};

		return service;
	});


	app.factory('homeMgmt', function homeMgmtFactory(
		$modal, $rootScope, $http
	) {
		var service = {
			dailyOrders: function() {
				$modal.open({
					templateUrl: '/templates/dailyOrders.html',
					backdrop: true,
					controller: 'HomeController'
				});
			},
			weeklyOrders: function() {
				$modal.open({
					templateUrl: '/templates/weeklyOrders.html',
					backdrop: true,
					controller: 'HomeController'
				});
			},
			monthlyOrders: function() {
				$modal.open({
					templateUrl: '/templates/monthlyOrders.html',
					backdrop: true,
					controller: 'HomeController'
				});
			},
			dailyPromos: function() {
				$modal.open({
					templateUrl: '/templates/dailyPromos.html',
					backdrop: true,
					controller: 'HomeController'
				});
			},
			weeklyPromos: function() {
				$modal.open({
					templateUrl: '/templates/weeklyPromos.html',
					backdrop: true,
					controller: 'HomeController'
				});
			},
			monthlyPromos: function() {
				$modal.open({
					templateUrl: '/templates/monthlyPromos.html',
					backdrop: true,
					controller: 'HomeController'
				});
			},
			dailySignUps: function() {
				$modal.open({
					templateUrl: '/templates/dailySignUps.html',
					backdrop: true,
					controller: 'HomeController'
				});
			},
			weeklySignUps: function() {
				$modal.open({
					templateUrl: '/templates/weeklySignUps.html',
					backdrop: true,
					controller: 'HomeController'
				});
			},
			monthlySignUps: function() {
				$modal.open({
					templateUrl: '/templates/monthlySignUps.html',
					backdrop: true,
					controller: 'HomeController'
				});
			},
		};
		return service;
	});


	///
	// Authentication / Login management
	///

	app.factory('loginModal', function loginModalFactory($modal, $rootScope) {
		var service = {
			show: function() {
				$modal.open({
					templateUrl: '/templates/login.html',
					backdrop: true,
					controller: 'LoginController'
				});
			}
		};

		$rootScope.$on('httpForbidden', function() {
			service.show();
		});

		return service;
	});

	app.controller('LoginController', function(
		$scope, $modalInstance, $http, $window
	) {

		$scope.credentials = {};

		$scope.submit = function(credentials) {
			$http.post(
				'/login', credentials
			).success(function(data, status, headers, config) {
				return $modalInstance.dismiss('done');
			}).error(function(err) {
				$scope.error = err.error;
			});
		};

		$scope.cancel = function() {
			$window.location.href = '/login';
		};
	});


	///
	// User Messaging
	///

	app.factory('messenger', function messengerFactory($rootScope) {
		var service = {
			show: function(msg, title) {
				$rootScope.$broadcast('userMessage', {
					message: msg,
					title: title
				});
			}
		};
		return service;
	});

	app.controller('MessageController', function($scope) {
		$scope.alertType = 'info';

		$scope.close = function() {
			$scope.title = '';
			$scope.userMessage = '';
		};

		$scope.$on('userMessage', function(evt, args) {
			$scope.title = args.title;
			$scope.userMessage = args.message;
		});
	});


	app.factory('orderMgmt', function($modal, $rootScope, $http) {
		var service = {
			assumeOrder: function(customerId) {
				$modal.open({
					templateUrl: '/templates/assumeOrder.html',
					backdrop: true,
					controller: 'OrderMgmtController',
					resolve: {
						args: function() {
							return {
								customerId: customerId
							}
						}
					}
				});
			},
			startOrder: function(customerId) {
				$modal.open({
					templateUrl: '/templates/startOrder.html',
					backdrop: true,
					controller: 'OrderMgmtController',
					resolve: {
						args: function() {
							return {
								customerId: customerId
							}
						}
					}
				});
			}
		};
		return service;
	});


	app.controller('OrderMgmtController', function(
		args, $scope, $modalInstance, $http, $rootScope
	) {
		$scope.secret = '8847fhhfw485fwkebfwerfv7w458gvwervbkwer8fw5fberubckfckcaer4cbwvb72arkbfrcb1n4hg7';
		$scope.customerId = args.customerId;
		$http.get('/customers/' +$scope.customerId).then(function(res) {
			$scope.fName = res.data.fName;
			$scope.lName = res.data.lName;
		});
	});


	///
	// HTTP interception
	///

	app.provider('httpInterceptor', function() {
		this.$get = function($q, $location, $rootScope) {
			var service = {
				responseError: function(response) {
					defaultLocation = new RegExp('^' + $location.host() + ':?[0-9]*$');

					// Only handle ajax calls to valid paths
					if(! (isAjax(response) && isRegistered(response))) {
						return $q.reject(response);
					}

					// Handle unauthorized by prompting for login
					if(response.status === 401) {
						console.log('unauthorized');
						$rootScope.$broadcast('httpForbidden');
						return response;
					}

					var errorMsg = generateErrorMsg(response);
					$rootScope.$broadcast('httpError', {error: errorMsg});

					return response;
				}
			};
			return service;
		};

		var registration = [];
		var defaultLocation;

		this.register = function(pathMatch, hostMatch) {
			registration.push({host: hostMatch, path: pathMatch});
		};

		function generateErrorMsg(response) {
			// Everything else, display error message
			var appError = "There's a problem with the application.";
			var networkError = (
				"There's a problem with the network or the server is down."
			);

			var errors = {
				0: networkError,
				400: appError,
				404: appError,
				500: appError
			};

			return (
				(errors[response.status] || appError) +
				' Please try again later.'
			);
		}

		function isAjax(response) {
			var accept = response.config.headers['Accept'] || '';
			return accept.match(/application\/json/);
		}

		function isRegistered(response) {
			var parsed = parseUrl(response.config.url);
			var host = parsed.host;
			var path = parsed.pathname;

			var result = false;
			registration.forEach(function(reg) {
				reg.host || (reg.host = defaultLocation);
				if(host.match(reg.host) && path.match(reg.path)) {
					result = true;
				}
			});

			return result;
		}

		function parseUrl(url) {
			var parser = document.createElement('a');
			parser.href = url;

			return {
				protocol: parser.protocol,
				host: parser.host,
				port: parser.port,
				pathname: parser.pathname,
				hash: parser.hash,
				search: parser.search
			};
		}
	});
	app.config(function($httpProvider) {
		$httpProvider.interceptors.push('httpInterceptor');
	});


	///
	// Event-Based Services Loader
	///

	app.controller('LoadServices', function(loginModal, errMgr, fakeAuth, authMgr) {});


	app.factory('authMgr', function($rootScope, $http, $q) {
		// Auth Level Map
		// Should Exist in a Config
		// 1 - basic auth level; access to minimal functionality
		// 2 - slightly expanded auth level; access to user-assigned orders (driver)
		// 3 - expanded auth level; access to all orders; access to all customer info; dispatch (operator)
		// 4 - enhanced auth level; access to all orders, scheduling/payroll verification, basic reports (manager)
		// 5 - unrestricted auth level
			
		var service = {
			getAuthLevel: function() {
				return $http.get('/users/authLevel').then(function(authRes) {
					if(! (authRes && authRes.data)) {
						return $q.reject(
							'Invalid authLevel response: ' + JSON.stringify(authRes)
						);
					}
					return authRes.data;
	
				}).catch(function(err) {
					console.error(err);
					$q.reject(err);
				});
			}
		};
	
		return service;
	});


	app.factory('fakeAuth', function($rootScope) {
		// TODO
		// get customerId
		$rootScope.customerId = '54c6644c0517463077a759aa';
		// TODO
		// get areaId
		$rootScope.areaId = '54b32e4c3756f5d15ad4ca49';
		// TODO
		// get authLevel
		$rootScope.authLevel = 5;
	
		return {};
	});


	///
	// Form Pods
	///

	app.factory('pod', function podFactory(errMgr, $modal) {
		///
		// Event handlers
		///

		function onRemove(list, idx, defaultItem) {
			if(! canRemove(list, idx)) return;

			var filteredItem = {};
			$.map(list[idx], function(value, key) {
				if(key.match(/^\$/)) return;
				filteredItem[key] = value;
			});

			if(JSON.stringify(filteredItem) == JSON.stringify(defaultItem)) {
				list.splice(idx, 1);
				return;
			}

			$modal.open({
				templateUrl: '/templates/podRemoveConfirm.html',
				backdrop: true,
				controller: 'PodController',
				resolve: {
					args: function() {
						return {
							list: list,
							idx: idx
						}
					}
				}
			});
		}

		function onCopy(list, idx) {
			// Index must be within list
			if(idx < 0 || list.length <= idx) {
				return;
			}

			var item = angular.copy(list[idx]);
			spliceItem(list, idx, item);
		}

		function onAdd(list, idx, defaultItem) {
			// Index must be within list
			if(idx < 0 || list.length <= idx) {
				return;
			}

			var item;

			if(defaultItem) {
				item = angular.copy(defaultItem);
			} else {
				item = angular.copy(list[idx]);

				$.map(item, function(value, key) {
					item[key] = '';
				});
			}

			spliceItem(list, idx, item);
		}


		///
		// Utility methods
		///

		function spliceItem(list, idx, item) {
			list.splice(idx + 1, 0, item);
		}

		function canRemove(list, idx) {
			// Cannot remove last pod
			if(list.length < 2) {
				errMgr.show(
					'This item cannot be removed.',
					"I'm sorry, but I can't let you do that..."
				);
				return false;
			}

			// Index must be within list
			if(idx < 0 || list.length <= idx) {
				return false;
			}

			return true;
		}


		///
		// Service definition
		///

		var service = {
			podize: function(scope) {
				scope.$pod = {
					remove: onRemove,
					copy: onCopy,
					add: onAdd
				};
			}
		};
		return service;
	});

	app.controller('PodController', function(args, $scope, $modalInstance) {
		$scope.list = args.list;
		$scope.idx = args.idx;

		$scope.confirmRemove = function(list, idx) {
			list.splice(idx, 1);
			$modalInstance.dismiss('done');
		};
	});



	///
	// Controllers: Home
	///

	app.controller('HomeController', function(
		$scope, $http, $routeParams, $rootScope,
		homeMgmt, messageMgmt, authMgr
	) {
		var authPromise = authMgr.getAuthLevel();
		var areaId = $rootScope.areaId;
		$scope.areaId = $rootScope.areaId;

		authPromise.then(function(authData) {

			$scope.authLevel = authData.authLevel;
			$scope.authUserId = authData.userId;

			$scope.sendMessage = messageMgmt.send;
		
			$scope.dailyOrders = homeMgmt.dailyOrders;
			$scope.weeklyOrders = homeMgmt.weeklyOrders;
			$scope.monthlyOrders = homeMgmt.monthlyOrders;
	
			$scope.dailyPromos = homeMgmt.dailyPromos;
			$scope.weeklyPromos = homeMgmt.weeklyPromos;
			$scope.monthlyPromos = homeMgmt.monthlyPromos;
	
			$scope.dailySignUps = homeMgmt.dailySignUps;
			$scope.weeklySignUps = homeMgmt.weeklySignUps;
			$scope.monthlySignUps = homeMgmt.monthlySignUps;

			var allOrders = $http.get('/orders/allTime/' +areaId).then(function(res) {
				var allTimeOrderData = res.data;
				var allTimeGrossRevenue = 0;
				var allTimeNetRevenue = 0;
				var allTimeOrders = 0;
				var allTimePromos = 0;
				var allTimePromosDisc = 0;
				allTimeOrderData.forEach(function(order) {
					if(order.orderStatus > 4) {
						allTimeOrders ++;
						allTimeGrossRevenue += parseFloat(order.total);
						if(order.discount) {
							allTimeNetRevenue += (parseFloat(order.deliveryFee) - parseFloat(order.discount));
							allTimePromos ++;
							allTimePromosDisc += parseFloat(order.discount);
						} else {
							allTimeNetRevenue += parseFloat(order.deliveryFee);
						}
					}
				});
				$scope.allTimeGrossRevenue = allTimeGrossRevenue.toFixed(2);
				$scope.allTimeNetRevenue = allTimeNetRevenue.toFixed(2);
				$scope.allTimeOrders = allTimeOrders;
				$scope.allTimePromos = allTimePromos;
				$scope.allTimePromosDisc = allTimePromosDisc;
			}).catch(function(err) {
				console.log('orders-allTime err:');
				console.log(err);
			});
	
			$http.get('/orders/daily/' +areaId).then(function(res) {
				var dailyOrders = res.data;
				var dayGrossRevenue = 0;
				var dayNetRevenue = 0;
				var dayOrders = 0;
				var dayPromos = 0;
				var dayPromosDisc = 0;
				var dayPromosArr = [];
				if(dailyOrders && dailyOrders.length > 0) {
					dailyOrders.forEach(function(order) {
						if(order.orderStatus > 4) {
							dayOrders ++;
							dayGrossRevenue += parseFloat(order.total);
							if(order.discount) {
								dayNetRevenue += (parseFloat(order.deliveryFee) - parseFloat(order.discount));
								dayPromos ++;
								dayPromosDisc = dayPromosDisc + parseFloat(order.discount);
								if(dayPromosArr.indexOf(order.promo.toLowerCase()) < 0) {
									dayPromosArr.push(order.promo.toLowerCase());
								}
							} else {
								dayNetRevenue += parseFloat(order.deliveryFee);
							}
						}
					});
				}
				$scope.dayGrossRevenue = dayGrossRevenue.toFixed(2);
				$scope.dayNetRevenue = dayNetRevenue.toFixed(2);
				$scope.dayOrders = dayOrders;
				$scope.dayPromos = dayPromos;
				$scope.dayPromosDisc = dayPromosDisc.toFixed(2);
				$scope.dayPromosArr = dayPromosArr;
			}).catch(function(err) {
				console.log('orders-daily err:');
				console.log(err);
			});
	
			$http.get('/orders/weekly/' +areaId).then(function(res) {
				var weekOrders = res.data;
				var weekGrossRevenue = 0;
				var weekNetRevenue = 0;
				var weeklyOrders = 0;
				var weeklyPromos = 0;
				var weeklyPromosDisc = 0;
				var weeklyPromosArr = [];
				if(weekOrders && weekOrders.length > 0) {
					weekOrders.forEach(function(order) {
						if(order.orderStatus > 4) {
							weeklyOrders ++;
							weekGrossRevenue += parseFloat(order.total);
							if(order.discount) {
								weekNetRevenue += (parseFloat(order.deliveryFee) - parseFloat(order.discount));
								weeklyPromos ++;
								weeklyPromosDisc = weeklyPromosDisc + parseFloat(order.discount);
								if(weeklyPromosArr.indexOf(order.promo.toLowerCase()) < 0) {
									weeklyPromosArr.push(order.promo.toLowerCase());
								}
							} else {
								weekNetRevenue += parseFloat(order.deliveryFee);
							}
						}
					});
				}
				$scope.weekGrossRevenue = weekGrossRevenue.toFixed(2);
				$scope.weekNetRevenue = weekNetRevenue.toFixed(2);
				$scope.weekOrders = weeklyOrders;
				$scope.weekPromos = weeklyPromos;
				$scope.weekPromosDisc = weeklyPromosDisc.toFixed(2);
				$scope.weekPromosArr = weeklyPromosArr;
			}).catch(function(err) {
				console.log('orders-weekly err:');
				console.log(err);
			});
	
			$http.get('/orders/monthly/' +areaId).then(function(res) {
				var weeksOrders = res.data;
				var weeksGrossRevenue = 0;
				var weeksNetRevenue = 0;
				var monthlyOrders = 0;
				var monthlyPromos = 0;
				var monthlyPromosDisc = 0;
				var monthlyPromosArr = [];
				if(weeksOrders && weeksOrders.length > 0) {
					weeksOrders.forEach(function(order) {
						if(order.orderStatus > 4) {
							monthlyOrders ++;
							weeksGrossRevenue += parseFloat(order.total);
							if(order.discount) {
								weeksNetRevenue += (parseFloat(order.deliveryFee) - parseFloat(order.discount));
								monthlyPromos ++;
								monthlyPromosDisc = monthlyPromosDisc + parseFloat(order.discount);
								if(monthlyPromosArr.indexOf(order.promo.toLowerCase()) < 0) {
									monthlyPromosArr.push(order.promo.toLowerCase());
								}
							} else {
								weeksNetRevenue += parseFloat(order.deliveryFee);
							}
						}
					});
				}
				$scope.weeksGrossRevenue = weeksGrossRevenue.toFixed(2);
				$scope.weeksNetRevenue = weeksNetRevenue.toFixed(2);
				$scope.weeksOrders = monthlyOrders;
				$scope.weeksPromos = monthlyPromos;
				$scope.weeksPromosDisc = monthlyPromosDisc.toFixed(2);
				$scope.weeksPromosArr = monthlyPromosArr;
			}).catch(function(err) {
				console.log('orders-monthly err:');
				console.log(err);
			});
	
			$http.get('/customers/allTime/' +areaId).then(function(res) {
				$scope.allTimeSignUps = res.data.length;
			}).catch(function(err) {
				console.log('customers-allTime err:');
				console.log(err);
			});
	
			$http.get('/customers/daily/' +areaId).then(function(res) {
				$scope.daySignUps = res.data;
				$scope.daySignups = res.data.length;
			}).catch(function(err) {
				console.log('customers-daily err:');
				console.log(err);
			});
	
			$http.get('/customers/weekly/' +areaId).then(function(res) {
				$scope.weekSignUps = res.data;
				$scope.weekSignups = res.data.length;
			}).catch(function(err) {
				console.log('customers-weekly err:');
				console.log(err);
			});
	
			$http.get('/customers/monthly/' +areaId).then(function(res) {
				$scope.weeksSignUps = res.data;
				$scope.weeksSignups = res.data.length;
			}).catch(function(err) {
				console.log('customers-monthly err:');
				console.log(err);
			});
	
			$http.get('/applicants/allTime/' +areaId).then(function(res) {
				$scope.allTimeApplicants = res.data.length;
			}).catch(function(err) {
				console.log('applicants-allTime err:');
				console.log(err);
			});
	
			$http.get('/applicants/daily/' +areaId).then(function(res) {
				$scope.dayApplicants = res.data.length;
			}).catch(function(err) {
				console.log('applicants-daily err:');
				console.log(err);
			});
	
			$http.get('/applicants/weekly/' +areaId).then(function(res) {
				$scope.weekApplicants = res.data.length;
			}).catch(function(err) {
				console.log('applicants-weekly err:');
				console.log(err);
			});
	
			$http.get('/applicants/monthly/' +areaId).then(function(res) {
				$scope.weeksApplicants = res.data.length;
			}).catch(function(err) {
				console.log('applicants-monthly err:');
				console.log(err);
			});

		});

	});

	///
	// Controllers: Applicants
	///

	app.controller('ApplicantsListController', function($scope, $http, $routeParams, $rootScope) {
		$scope.areaName = $rootScope.areaName;

		var p = $http.get('/applicants');

		p.error(function(err) {
			console.log('ApplicantsListController: ajax failed');
			console.log(err);
		});

		p.then(function(res) {
			$scope.applicants = res.data;
		});
	});


	///
	// Controllers: Areas
	///

	app.config(function(httpInterceptorProvider) {
		httpInterceptorProvider.register(/^\/areas/);
	});

	app.factory('areaSchema', function() {
		function nameTransform(area) {
			if(! area || ! area.name || area.name.length < 1) {
				return 'area-name';
			}
			return (area.name
				.replace(/[^a-zA-Z ]/g, '')
				.replace(/ /g, '-')
				.toLowerCase()
			);
		}

		var service = {
			defaults: {
				area: {
					name: '',
					phone: '',
					subdomain: '',
					hiring: '',
					franchisee: {
						name: '',
						phone: '',
						email: '',
						address: {
							street: '',
							city: '',
							state: '',
							zip: ''
						}
					}
				}
			},

			links: {
				website: {
					placeholder: function(area) {
						return 'www.' + nameTransform(area) + '.com';
					},
					addon: 'http://'
				},
				facebook: {
					placeholder: nameTransform,
					addon: 'facebook.com/'
				},
				twitter: {
					placeholder: nameTransform,
					addon: '@'
				},
				instagram: {
					placeholder: nameTransform,
					addon: 'instagram.com/'
				},
				pinterest: {
					placeholder: nameTransform,
					addon: 'pinterest.com/'
				},
			},

			populateDefaults: function(area) {
				$.map(service.defaults.area, function(value, key) {
					if(area[key]) return;
					if(typeof value === 'object') {
						area[key] = angular.copy(value);
						return;
					}
					area[key] = value;
				});
				return area;
			}
		};

		return service;
	});

	app.controller('AreasListController', function($scope, $http, $routeParams, $rootScope) {
		var areaId = $rootScope.areaId;

		$scope.path = 'restaurants';

		var p = $http.get('/areas/' + areaId);

		p.error(function(err) {
			console.log('AreasListController: area ajax failed');
			console.log(err);
		});

		p.then(function(res) {
			$scope.area = res.data;
		});

		var r = $http.get('/restaurants/byAreaId/' + areaId);

		r.error(function(err) {
			console.log('AreasListController: restaurants ajax failed');
			console.log(err);
		});

		r.then(function(res) {
			$scope.restaurants = res.data;
		});

	});

	app.controller('AreasAddController', function(
		navMgr, messenger, pod, areaSchema, $scope, $http, $window
	) {
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.areaSchema = areaSchema;
		$scope.area = areaSchema.populateDefaults({});

		$scope.save = function save(area, options) {
			options || (options = {});

			$http.post(
				'/areas/create', area
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Area created', '');

				if(options.addMore) {
					$scope.area = {};
					return;
				}

				navMgr.protect(false);
				$window.location.href = '#/areas/' + data.id;
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/areas');
		};
	});

	app.controller('AreasEditController', function(
		navMgr, messenger, pod, areaSchema, $scope, $http, $routeParams
	) {
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.areaSchema = areaSchema;
		$scope.editMode = true;

		$http.get(
			'/areas/' + $routeParams.id
		).success(function(data, status, headers, config) {
			$scope.area = areaSchema.populateDefaults(data);
		});

		$scope.save = function save(area, options) {
			options || (options = {});

			$http.put(
				'/areas/' + area.id, area
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Area updated', '');

				$scope.form.$setPristine();
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/areas');
		};
	});


	///
	// Controllers: Customers
	///

	app.config(function(httpInterceptorProvider) {
		httpInterceptorProvider.register(/^\/customers/);
	});

	app.factory('customerSchema', function() {
		function nameTransform(customer) {
			if(! customer || ! customer.fName || customer.fName.length < 1) {
				return 'customer-name';
			}
			return (customer.fName
				.replace(/[^a-zA-Z ]/g, '')
				.replace(/ /g, '-')
				.toLowerCase()
			);
		}

		var service = {
			defaults: {
				customer: {
					areaId: '',
					fName: '',
					lName: '',
					addresses: {
						primary: {
							streetNumber: '',
							streetName: '',
							apt: '',
							city: '',
							state: '',
							zip: ''
						}
					},
					username: '',
					password: '',
					phone: '',
					email: ''
				}
			},
	
			populateDefaults: function(customer) {
				$.map(service.defaults.customer, function(value, key) {
					if(customer[key]) return;
					if(typeof value === 'object') {
						customer[key] = angular.copy(value);
						return;
					}
					customer[key] = value;
				});
				return customer;
			}
		};

		return service;
	});

	app.controller('CustomersAddController', function(
		navMgr, messenger, pod, customerSchema,
		$scope, $http, $window, $rootScope
	) {
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.customerSchema = customerSchema;
		$scope.customer = customerSchema.populateDefaults({});

		$scope.customer.areaId = $rootScope.areaId;

		// TODO 
		// clean phone number; integers only

		$scope.save = function save(customer, options) {
			options || (options = {});

			$http.post(
				'/customers/create', customer
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Customer created', '');

				if(options.addMore) {
					$scope.customer = {};
					return;
				}

				navMgr.protect(false);
				$window.location.href = '#/customers/' + data.id;
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/customers');
		};
	});


	app.controller('CustomersEditController', function(
		navMgr, messenger, pod, customerSchema, 
		$scope, $http, $routeParams, customerMgmt,
		$window, orderMgmt
	) {

		$scope.customerId = $routeParams.id;

		$scope.completedCount = 0;
		$scope.orderToComplete = false;
		$scope.startOrder = true;

		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		var p = $http.get('/orders/byCustomerId/' + $scope.customerId);
	
		p.error(function(err) {
			console.log('CustomersEditController: customers-orders ajax failed');
			console.log(err);
		});
	
		p.then(function(res) {
			var firstOrder = true;
			var today = new Date();
		
			var thisYear = today.getFullYear();
			var thisMonth = today.getMonth();
			var thisDate = today.getDate();
		
			var todayMSecs = new Date(thisYear, thisMonth, thisDate, 0, 0, 0, 0).getTime();

			res.data.forEach(function(order) {
				var thisOrderMSecs = new Date(order.updatedAt).getTime();
				if(firstOrder && order.orderStatus < 9 && thisOrderMSecs > todayMSecs) {
					$scope.assumeOrderId = order.id;
					$scope.orderToComplete = true;
					$scope.startOrder = false;
				}
				if(order.orderStatus > 8) {
					$scope.completedCount ++;
				}
				firstOrder = false;
			});
			$scope.orders = res.data;
			$scope.ordersCount = res.data.length;
		});

		$scope.customerSchema = customerSchema;
		$scope.editMode = true;

		$http.get(
			'/customers/' + $routeParams.id
		).success(function(data, status, headers, config) {
			$scope.customer = customerSchema.populateDefaults(data);
		});

		$scope.save = function save(customer, options) {
			options || (options = {});

			// TODO 
			// clean phone number; integers only

			$http.put(
				'/customers/' + customer.id, customer
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Customer updated', '');

				$scope.form.$setPristine();
			});
		};

		$scope.orderHistory = function orderHistory() {
			navMgr.cancel('#/customers/orders/' +$routeParams.id);
		};

		$scope.assumeOrder = orderMgmt.assumeOrder;

		$scope.startOrder = orderMgmt.startOrder;

		$scope.specialCharge = customerMgmt.specialCharge;

		$scope.cancel = function cancel() {
			navMgr.cancel('#/customers');
		};
	});

	app.controller('CustomersOrdersController', function(
		customerSchema,	$scope, $http, $window, $rootScope
	) {

		var p = $http.get('/orders/byCustomerId/' + $routeParams.id);
	
		p.error(function(err) {
			console.log('CustomersOrdersController: customers-orders ajax failed');
			console.log(err);
		});
	
		p.then(function(res) {
			$scope.orders = res.data;
		});

	});

	app.controller('CustomersSearchController', function(
		customerSchema,	$scope, $http, $window, $rootScope
	) {

		$scope.fNameSearch = function() {
			var p = $http.get('/customers/byFName/' + $scope.fName);
	
			p.error(function(err) {
				console.log('CustomersSearchController: customers-fName ajax failed');
				console.log(err);
			});
	
			p.then(function(res) {
				$scope.customers = res.data;
			});
		};

		$scope.lNameSearch = function() {
			var p = $http.get('/customers/byLName/' + $scope.lName);
	
			p.error(function(err) {
				console.log('CustomersSearchController: customers-lName ajax failed');
				console.log(err);
			});
	
			p.then(function(res) {
				$scope.customers = res.data;
			});
		}

		$scope.phoneSearch = function() {
			var p = $http.get('/customers/byPhone/' + $scope.phone);
	
			p.error(function(err) {
				console.log('CustomersSearchController: customers-phone ajax failed');
				console.log(err);
			});
	
			p.then(function(res) {
				$scope.customers = res.data;
			});
		}

	});


	app.controller('ChargeController', function(
		messenger, $scope, $http, args, $modalInstance
	) {
		var p = $http.get('/customers/' + args.customerId).then(function(res) {
			$scope.customer = res.data;
		}).catch(function(err) {
			console.log('ChargeController: customers ajax failed');
			console.log(err);
		});

		$scope.makeCharge = function() {
			var r = $http.post('/checkout/processPayment', {customer: $scope.customer, paymentMethodId: $scope.selMethod, amount: $scope.amount}).then(function(res) {
				return $modalInstance.dismiss('done');
				messenger.show('Charge processed', '');
			}).catch(function(err) {
				// if orders ajax fails...
				console.log('ChargeController: makeCharge-processPayment ajax failed');
				// console.error(err);
				$scope.paymentFailed = true;
			});
		};
	});


	///
	// Controllers: Dispatch
	///

	app.controller('DispatchController', function(
		$scope, $http, $routeParams, $rootScope, 
		$window, deviceMgr, authMgr, $timeout
	) {

		var areaId = $rootScope.areaId;

		if(deviceMgr.isBigScreen()) {
			$scope.showBig = true;
		} else {
			$scope.showBig = false;
		}

		function refreshData() {
			// assure that the page is still the same
			// using hash instead of pathname
			if(!location.hash.match('dispatch')) {
				return;
			}

			var currentHours = new Date().getHours();
			var currentMinutes = new Date().getMinutes();
			var ampm = 'am';
	
			if(currentHours > 11) {
				ampm = 'pm';
				if(currentHours > 12) {
					currentHours -= 12;;
				}
			}
	
			if(currentMinutes < 10) {
				currentMinutes = '0'+currentMinutes;
			}
	
			$scope.currentDisplayTime = currentHours+':'+currentMinutes+' '+ampm;


			var authPromise = authMgr.getAuthLevel();
	
			authPromise.then(function(authData) {
	
				var areaId = $rootScope.areaId;
				$scope.areaId = $rootScope.areaId;
				$scope.authUserId = authData.userId;
				$scope.authLevel = authData.authLevel;
	
				var p = $http.get('/orders/daily/' + areaId);
			
				p.error(function(err) {
					console.log('DispatchController: orders-daily ajax failed');
					console.log(err);
				});
			
				p.then(function(res) {
					res.data.map(function(order) {
						var orderDate = new Date(order.updatedAt);
						var orderDateSecsPre = orderDate.getTime();
						var orderDateSecsPost = orderDateSecsPre - 21600;
						var ampm = 'am';
						order.updatedYear = new Date(orderDateSecsPost).getFullYear();
						order.updatedMonth = new Date(orderDateSecsPost).getMonth() + 1;
						order.updatedDate = new Date(orderDateSecsPost).getDate();
						if(order.updatedMonth.toString().length < 2) {
							order.updatedMonth = '0'+order.updatedMonth.toString();
						}
						if(order.updatedDate.toString().length < 2) {
							order.updatedDate = '0'+order.updatedDate.toString();
						}
						order.updatedAtDate = order.updatedYear+'-'+order.updatedMonth+'-'+order.updatedDate;
						order.updatedHours = new Date(orderDateSecsPost).getHours();
						order.updatedMinutes = new Date(orderDateSecsPost).getMinutes();
						if(order.updatedHours > 12) {
							ampm = 'pm';
							order.updatedHours = order.updatedHours - 12;
						}
						if(order.updatedHours.toString().length < 2) {
							order.updatedHours = '0'+order.updatedHours.toString();
						}
						if(order.updatedMinutes.toString().length < 2) {
							order.updatedMinutes = '0'+order.updatedMinutes.toString();
						}
						order.updatedAtTime = order.updatedHours+':'+order.updatedMinutes;
						order.updatedAt = order.updatedAtDate+' '+order.updatedAtTime+' '+ampm;
						order.total = parseFloat(order.total).toFixed(2);
		
						var now = new Date().getTime();
		
						if(order.paymentAcceptedAt) {
							var old = (now - order.paymentAcceptedAt).toString();
			
							var formattedNow = old.substr(0, (old.length - 3)); 
			
							var formattedAgeHour = Math.floor(parseInt(formattedNow) / 3600);
							var formattedAgeSec = parseInt(formattedNow) % 60;
			
							if(formattedAgeSec < 10) {
								formattedAgeSec = '0' + formattedAgeSec;
							}
			
							if(formattedAgeHour > 0) {
								var formattedAgeMin = Math.floor(parseInt(formattedNow - (formattedAgeHour * 3600)) / 60);
								if(formattedAgeMin < 10) {
									formattedAgeMin = '0' + formattedAgeMin;
								}
								order.finalAge = formattedAgeHour + ':' + formattedAgeMin + ':' + formattedAgeSec;
							} else {
								var formattedAgeMin = Math.floor(parseInt(formattedNow) / 60);
								order.finalAge = formattedAgeMin + ':' + formattedAgeSec;
							}
		
							if(order.orderStatus > 8 && order.orderDeliveredAt && order.paymentAcceptedAt) {
								var timeToDelivery = parseInt(order.orderDeliveredAt) - parseInt(order.paymentAcceptedAt);
		
								var formattedNow = timeToDelivery.toString().substr(0, (timeToDelivery.toString().length - 3)); 
				
								var formattedAgeHour = Math.floor(parseInt(formattedNow) / 3600);
								var formattedAgeSec = parseInt(formattedNow) % 60;
				
								if(formattedAgeSec < 10) {
									formattedAgeSec = '0' + formattedAgeSec;
								}
				
								if(formattedAgeHour > 0) {
									var formattedAgeMin = Math.floor(parseInt(formattedNow - (formattedAgeHour * 3600)) / 60);
									if(formattedAgeMin < 10) {
										formattedAgeMin = '0' + formattedAgeMin;
									}
									order.timeToDelivery = formattedAgeHour + ':' + formattedAgeMin + ':' + formattedAgeSec;
								} else {
									var formattedAgeMin = Math.floor(parseInt(formattedNow) / 60);
									order.timeToDelivery = formattedAgeMin + ':' + formattedAgeSec;
								}
							}
		
						} else {
							order.finalAge = 'Pending';
						}
		
						// TODO
						// put this in a config? or what?
						// orderStatus map
						// < 1 = not started
						// 1   = started (ordering)
						// 2   = payment initiated
						// 3   = payment accepted
						// 4   = payment declined
						// 5   = order completed
						// 6   = order ordered (at restaurant)
						// 7   = order collected (from restaurant)
						// 8   = order en route
						// 9   = order delivered
						
						var orderStatusMap = [
							'No status',
							'Ordering',
							'Payment Initiated',
							'Payment Not Processed',
							'Payment Declined',
							'Payment Accepted',
							'Order Placed',
							'Order Picked up',
							'Order En Route',
							'Order Delivered'
						];
		
						order.currStatus = orderStatusMap[order.orderStatus];
			
						if(order.things.length > 0) {
							order.restaurants = '';
							var firstRest = true;
							order.things.forEach(function(thing) {
								if(!order.restaurants.match(thing.restaurantName)) {
									if(firstRest) {
										order.restaurants = thing.restaurantName;
										firstRest = false;
									} else {
										order.restaurants = order.restaurants + ', ' + thing.restaurantName;
									}
								}
							});
						}
		
						if(order.driverId) {
							var r = $http.get('/users/' + order.driverId);
						
							r.error(function(err) {
								console.log('DispatchController: users ajax failed');
								console.log(err);
							});
						
							r.then(function(res) {
								order.driver = res.data.fName;
							});
						}
		
						if(order.customerId) {
							var r = $http.get('/customers/' + order.customerId);
						
							r.error(function(err) {
								console.log('DispatchController: customers ajax failed');
								console.log(err);
							});
						
							r.then(function(res) {
								order.destination = res.data.addresses.primary.streetNumber+' '+res.data.addresses.primary.streetName;
							});
						} else {
							order.destination = 'not entered yet';
						}
					});
			
					$scope.orders = res.data;
				});
			});

			$timeout(function() {
				refreshData();
			}, 30000);
		}
		refreshData();
	});


	///
	// Controllers: Dispatch Order
	///

	app.controller('DispatchOrderController', function(
		$scope, $http, $routeParams, $rootScope,
		$window, messenger, dispatchOrderMgmt, authMgr
	) {
		var areaId = $rootScope.areaId;

		var authPromise = authMgr.getAuthLevel();

		authPromise.then(function(authData) {

			var areaId = $rootScope.areaId;
			$scope.areaId = $rootScope.areaId;
			$scope.authLevel = authData.authLevel;

			if(authData.authLevel < 3) {
				$window.location.href = '#/';
			}

			var p = $http.get('/orders/' + $routeParams.id);
		
			p.error(function(err) {
				console.log('DispatchOrderController: orders ajax failed');
				console.log(err);
			});
		
			p.then(function(res) {
				$scope.order = res.data;
	
				var r = $http.get('/users/drivers/');
				
				r.error(function(err) {
					console.log('DispatchOrderController: users ajax failed');
					console.log(err);
				});
				
				r.then(function(res) {
					$scope.drivers = res.data;
				});
			});
	
			$scope.dispatchOrderToDriver = dispatchOrderMgmt.dispatchOrder;
	
		});

	});


	///
	// Controllers: Dispatch Order to Driver
	///

	app.controller('DispatchOrderToDriverController', function(
		$scope, $http, $routeParams, $rootScope,
		$location, messenger, args, $modalInstance
	) {
		var areaId = $rootScope.areaId;

		var p = $http.get('/orders/' + args.orderId);
	
		p.error(function(err) {
			console.log('DispatchOrderToDriverController: orders ajax failed');
			console.log(err);
		});
	
		p.then(function(res) {
			$scope.order = res.data;

			var rests = [];
			$scope.order.things.forEach(function(thing) {
				if(rests.indexOf(thing.restaurantName) < 0) {
					rests.push(thing.restaurantName);
				}
			});
		
			$scope.addRests = 0;
			if(rests.length > 1) {
				$scope.addRests = rests.length - 1;
			}
		
			$scope.restNames = '';
			var firstName = true;
			rests.forEach(function(rest) {
				if(firstName) {
					$scope.restNames = rest;
					firstName = false;
				} else {
					if(rests.indexOf(rest) < $scope.addRests) {
						$scope.restNames = $scope.restNames + ', ' + rest;
					} else {
						$scope.restNames = $scope.restNames + ' and ' + rest;
					}
				}
			})

			var r = $http.get('/users/' + args.driverId);
			
			r.error(function(err) {
				console.log('DispatchOrderToDriverController: users ajax failed');
				console.log(err);
			});
			
			r.then(function(res) {
				$scope.driver = res.data;
			});
		});

		$scope.dispatchOrder = function() {
			if(! args.orderId && args.driverId) {
				console.log('dispatchOrder args not present');
				$modalInstance.dismiss('cancel');
			}

			$scope.order.driverId = args.driverId;
			if($scope.readyMins && $scope.readyMins > 0) {
				$scope.order.readyMins = $scope.readyMins;
			} else {
				$scope.order.readyMins = '0';
			}

			$http.put(
				'/orders/' + $scope.order.id, $scope.order
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Order dispatched', '');
				$http.post('/mail/sendOrderToDriver/'+$scope.order.id);

				var redirectTo = '/dispatch';
				$location.path(redirectTo);

				return $modalInstance.dismiss('done');
			});
		};
	});


	///
	// Controllers: Drivers
	///

	app.controller('DriversReportsController', function(
		$scope, $http, $rootScope, authMgr
	) {
		var authPromise = authMgr.getAuthLevel();

		authPromise.then(function(authData) {

			var areaId = $rootScope.areaId;
			$scope.areaId = $rootScope.areaId;
			$scope.authLevel = authData.authLevel;

			if(authData.authLevel < 3) {
				$window.location.href = '#/';
			}

			$http.get('/users/activeByAreaId/' + areaId).then(function(res) {
				$scope.drivers = res.data;
			}).catch(function(err) {
				console.log('DriversReportsController users-activeByAreaId ajax failed');
				console.log(err);
			});
	
		});

	});



	app.factory('emailListSchema', function() {
		var service = {
			defaults: {
				email: {
					email: '',
					fName: '',
					active: '',
				}
			},

			populateDefaults: function(email) {
				$.map(service.defaults.email, function(value, key) {
					if(email[key]) return;
					if(typeof value === 'object') {
						email[key] = angular.copy(value);
						return;
					}
					email[key] = value;
				});
				return email;
			}
		};

		return service;
	});

	app.controller('EmailListAddController', function(
		navMgr, messenger, pod,
		$scope, $http, $window, $rootScope
	) {
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.save = function save(email, options) {
			email.areaId = $rootScope.areaId;
			email.active = true;

			options || (options = {});

			$http.post(
				'/emails/create', email
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Email added', '');

				navMgr.protect(false);
				$window.location.href = '#/emailList/search';
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/emailList/search');
		};
	});

	app.controller('EmailListEditController', function(
		navMgr, messenger, pod, emailListSchema, $scope, $http, $routeParams
	) {

		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.emailListSchema = emailListSchema;
		$scope.editMode = true;

		$http.get(
			'/emails/' + $routeParams.id
		).success(function(data, status, headers, config) {
			$scope.email = emailListSchema.populateDefaults(data);
		});

		$scope.save = function save(email, options) {
			options || (options = {});

			$http.put(
				'/emails/' + email.id, email
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Email list updated', '');

				$scope.form.$setPristine();
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/emailList/search');
		};
	});

	app.controller('EmailListSearchController', function(
		emailListSchema,	$scope, $http, $window, $rootScope
	) {
		var areaId = $rootScope.areaId;
		
		var authLevelMap = [
			'None',
			'Basic',
			'Driver',
			'Operator',
			'Manager'
		];

		$scope.fNameSearch = function() {
			var p = $http.get('/emails/byFName/' + $scope.fName);
	
			p.error(function(err) {
				console.log('EmailListSearchController: emails-fName ajax failed');
				console.log(err);
			});
	
			p.then(function(res) {
				$scope.emails = res.data;
			});
		};

		$scope.emailSearch = function() {
			var p = $http.get('/emails/byEmail/' + $scope.email);
	
			p.error(function(err) {
				console.log('EmailListSearchController: emails-phone ajax failed');
				console.log(err);
			});
	
			p.then(function(res) {
				$scope.emails = res.data;
			});
		}

	});


	///
	// Controllers: Hotels
	///

	app.config(function(httpInterceptorProvider) {
		httpInterceptorProvider.register(/^\/hotels/);
	});

	app.factory('hotelSchema', function() {
		function nameTransform(hotel) {
			if(! hotel || ! hotel.name || hotel.name.length < 1) {
				return 'hotel-name';
			}
			return (hotel.name
				.replace(/[^a-zA-Z ]/g, '')
				.replace(/ /g, '-')
				.toLowerCase()
			);
		}

		var service = {
			defaults: {
				hotel: {
					areaId: '',
					name: '',
					addresses: [ ],
					phone: ''
				},
				address: {
					streetNumber: '',
					streetName: '',
					city: '',
					state: '',
					zip: '',
				},
			},

			populateDefaults: function(hotel) {
				$.map(service.defaults.hotel, function(value, key) {
					if(hotel[key]) return;
					if(typeof value === 'object') {
						hotel[key] = angular.copy(value);
						return;
					}
					hotel[key] = value;
				});
				if(hotel.addresses.length < 1) {
					hotel.addresses.push(angular.copy(
						service.defaults.address
					));
				}
				hotel.addresses.forEach(function(address) {
					_.forEach(service.defaults.address, function(value, key) {
						if(address[key]) return;
						if(typeof value === 'object') {
							address[key] = angular.copy(value);
							return;
						}
						address[key] = value;
					});
				});
				return hotel;
			}
		};

		return service;
	});

	app.controller('HotelsListController', function($scope, $http, $routeParams, $rootScope) {
		var areaId = $rootScope.areaId;

		$scope.path = 'hotels';

		var p = $http.get('/areas/' + areaId);

		p.error(function(err) {
			console.log('HotelsListController: area ajax failed');
			console.log(err);
		});

		p.then(function(res) {
			$scope.area = res.data;
		});

		var r = $http.get('/hotels/byAreaId/' + areaId);

		r.error(function(err) {
			console.log('HotelsListController: hotels ajax failed');
			console.log(err);
		});

		r.then(function(res) {
			$scope.hotels = res.data;
		});

	});

	app.controller('HotelsAddController', function(
		navMgr, messenger, pod, hotelSchema, $scope, $http, $routeParams, $window
	) {
		
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.hotelSchema = hotelSchema;
		$scope.hotel = hotelSchema.populateDefaults({});

		$scope.hotel.areaId = $routeParams.id;

		$scope.save = function save(hotel, options) {

			options || (options = {});

			$http.post(
				'/hotels/create', hotel
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Hotel created', '');

				if(options.addMore) {
					$scope.hotel = {};
					return;
				}

				navMgr.protect(false);
				$window.location.href = '#/hotels/';
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/');
		};
	});

	app.controller('HotelsEditController', function(
		navMgr, messenger, pod, hotelSchema, $scope, $http, $routeParams
	) {
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.hotelSchema = hotelSchema;
		$scope.editMode = true;

		$http.get(
			'/hotels/' + $routeParams.id
		).success(function(data, status, headers, config) {
			$scope.hotel = hotelSchema.populateDefaults(data);
		});

		$scope.save = function save(hotel, options) {
			options || (options = {});

			$http.put(
				'/hotels/' + hotel.id, hotel
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Hotel updated', '');

				$scope.form.$setPristine();
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/');
		};
	});


	///
	// Messages
	///
	

	app.controller('MessagesListController', function($scope, $http, $routeParams, $rootScope) {
		var areaId = $rootScope.areaId;

		$scope.path = 'messages';

		var p = $http.get('/areas/' + areaId);

		p.error(function(err) {
			console.log('MessagesListController: area ajax failed');
			console.log(err);
		});

		p.then(function(res) {
			$scope.area = res.data;
		});

		var r = $http.get('/messages/byAreaId/' + areaId);

		r.error(function(err) {
			console.log('MessagesListController: messages ajax failed');
			console.log(err);
		});

		r.then(function(res) {
			$scope.messages = res.data;
		});

	});


	app.controller('MessageDetailsController', function($scope, $http, $routeParams, $rootScope) {
		var messageId = $routeParams.id;

		var p = $http.get('/messages/' + messageId);

		p.error(function(err) {
			console.log('MessageDetailsController: message ajax failed');
			console.log(err);
		});

		p.then(function(res) {
			$scope.message = res.data;
		});
	});


	app.controller('MessageSendController', function(
		$scope, $http, $routeParams, $rootScope, 
		messageMgmt, $modalInstance, messenger,
		$window
	) {
		var areaId = $rootScope.areaId;


		$scope.sendMassMessage = function() {
			var message = {};

			message.areaId = areaId;
			message.mType = $scope.mType;
			if($scope.rType) {
				message.rType = $scope.rType;
			}

			message.content = $scope.content;
			message.subject = $scope.subject;

			$http.post('/messages/create', message).success(
			function(data, status, headers, config) {
				messenger.show('Message queued', '');
				if(message.mType === 'email') {
					$http.post('/blaster/sendEmail/'+data.id);
					$window.location.href = '#/messages';
					return $modalInstance.dismiss('done');
				} else if(message.mType === 'text') {
					$http.post('/blaster/sendText/'+data.id);
					$window.location.href = '#/messages';
					return $modalInstance.dismiss('done');
				} else {
					console.log('BAD message:');
					console.log(message);
				}
			});
		}

	});


	///
	// Controllers: Order
	///

	app.controller('OrderDetailsController', function(
		$scope, $http, $routeParams, $rootScope, 
		$q, $sce, configMgr, querystring, messenger,
		$window, $timeout
	) {
		var areaId = $rootScope.areaId;

		function refreshData() {
			// assure that the page is still the same
			// using hash instead of pathname
			if(!location.hash.match('orderDetails')) {
				return;
			}

			$scope.authLevel = $rootScope.authLevel;
	
			// $scope.orderRestaurants = [
			//   {
			//     name: ...
			//     items: [
			//       name: ...
			//       quantity: ...
			//       option: ...
			//     ]
			//   }
			// ];
			$scope.orderRestaurants = [];
	
			var p = $http.get('/orders/' + $routeParams.id);
		
			p.error(function(err) {
				console.log('OrderDetailsController: order ajax failed');
				console.log(err);
			});
		
			p.then(function(res) {
				$scope.order = res.data;
				$scope.orderStatus = $scope.order.orderStatus;
				$scope.dispatchReceived = parseInt('0');
				if($scope.order.dispatchReceived) {
					$scope.dispatchReceived = $scope.order.dispatchReceived;
				}
				$scope.paymentMethod = $scope.order.paymentMethods;
				$scope.deliveryFee = '$'+parseFloat($scope.order.deliveryFee).toFixed(2);
				$scope.discount = '$'+parseFloat($scope.order.discount).toFixed(2);
				if($scope.order.gratuity) {
					$scope.gratuity = '$'+parseFloat($scope.order.gratuity).toFixed(2);
				} else {
					$scope.gratuity = '$0.00';
				}
				$scope.total = '$'+parseFloat($scope.order.total).toFixed(2);
				var subplustax = parseFloat($scope.order.subtotal) + parseFloat($scope.order.tax);
				$scope.subplustax = '$'+parseFloat(subplustax).toFixed(2);
				$scope.order.things.forEach(function(thing) {
					$scope.getRestaurantName(thing.optionId).then(function(restaurantData) {
						var restaurant = _.find($scope.orderRestaurants, {name: restaurantData.name});
						if(! restaurant) {
							restaurant = {name: restaurantData.name, phone: restaurantData.phone, items: []};
							$scope.orderRestaurants.push(restaurant);
						}
						restaurant.items.push(
							_.pick(thing, ['quantity', 'name', 'option', 'specInst', 'price'])
						);
					});
				});
	
				var r = $http.get('/customers/' + $scope.order.customerId);
				
				r.error(function(err) {
					console.log('OrderDetailsController: customer ajax failed');
					console.log(err);
				});
				
				r.then(function(res) {
					$scope.customer = res.data;
					if($scope.customer.addresses.primary.apt) {
						$scope.apt = $scope.customer.addresses.primary.apt;
					}
					$scope.fName = $scope.customer.fName;
					$scope.lName = $scope.customer.lName;
					$scope.phone = $scope.customer.phone;
					$scope.address = $scope.customer.addresses.primary.streetNumber+' '+$scope.customer.addresses.primary.streetName+' '+$scope.customer.addresses.primary.city;
	
					$scope.src = $sce.trustAsResourceUrl(
						'https://www.google.com/maps/embed/v1/place?' + querystring.stringify({
							key: configMgr.config.vendors.googleMaps.key,
							q: ([
								$scope.customer.addresses.primary.streetNumber,
								$scope.customer.addresses.primary.streetName,
								$scope.customer.addresses.primary.city,
								$scope.customer.addresses.primary.state,
								$scope.customer.addresses.primary.zip
							].join('+'))
						})
					);
				});
			});

			$timeout(function() {
				refreshData();
			}, 30000);
		}
		refreshData();

		$scope.setOrderPlaced = function(order) {
			order.orderStatus = parseInt(6);
			order.orderPlacedAt = new Date().getTime();
			$http.put(
				'/orders/' + order.id, order
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Order placed', '');

				$window.location.href = '#/dispatch/';
			});
		}

		$scope.setDispatchReceived = function(order) {
			order.dispatchReceived = new Date().getTime();
			$http.put(
				'/orders/' + order.id, order
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Dispatch confirmed', '');

				refreshData();
			});
		}

		$scope.setOrderCollected = function(order) {
			order.orderStatus = parseInt(7);
			order.orderCollectedAt = new Date().getTime();
			$http.put(
				'/orders/' + order.id, order
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Order collected', '');

				refreshData();
			});
		}

		$scope.setOrderEnRoute = function(order) {
			order.orderStatus = parseInt(8);
			order.orderEnRouteAt = new Date().getTime();
			$http.put(
				'/orders/' + order.id, order
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Order en route', '');

				refreshData();
			});
		}

		$scope.setOrderDelivered = function(order) {
			order.orderStatus = parseInt(9);
			order.orderDeliveredAt = new Date().getTime();
			$http.put(
				'/orders/' + order.id, order
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Order delivered', '');

				$window.location.href = '#/dispatch/';
			});
		}

		$scope.getRestaurantName = function(optionId) {
			return $q(function(resolve, reject) {
				var r = $http.get('/options/' + optionId);
				
				r.error(function(err) {
					console.log('OrderDetailsController: getRestaurantName-options ajax failed');
					console.log(err);
					reject(err);
				});
				
				r.then(function(res) {
					var s = $http.get('/items/' + res.data.itemId);
					
					s.error(function(err) {
						console.log('OrderDetailsController: getRestaurantName-items ajax failed');
						console.log(err);
						reject(err);
					});
					
					s.then(function(res) {
						var t = $http.get('/menus/' + res.data.menuId);
						
						t.error(function(err) {
							console.log('OrderDetailsController: getRestaurantName-menus ajax failed');
							console.log(err);
							reject(err);
						});
						
						t.then(function(res) {
							var u = $http.get('/restaurants/' + res.data.restaurantId);
							
							u.error(function(err) {
								console.log('OrderDetailsController: getRestaurantName-restaurants ajax failed');
								console.log(err);
								reject(err);
							});
							
							u.then(function(res) {
								resolve(res.data);
							});
						});
					});
				});
			});
		};

	});


	///
	// Controllers: Promos
	///

	app.config(function(httpInterceptorProvider) {
		httpInterceptorProvider.register(/^\/promos/);
	});

	app.factory('promoSchema', function() {
		function nameTransform(promo) {
			if(! promo || ! promo.name || promo.name.length < 1) {
				return 'promo-name';
			}
			return (promo.name
				.replace(/[^a-zA-Z ]/g, '')
				.replace(/ /g, '-')
				.toLowerCase()
			);
		}

		var service = {
			defaults: {
				promo: {
					areaId: '',
					name: '',
					uses: '',
					expires: '',
					effect: '',
					amount: ''
				}
			},

			populateDefaults: function(promo) {
				$.map(service.defaults.promo, function(value, key) {
					if(promo[key]) return;
					if(typeof value === 'object') {
						promo[key] = angular.copy(value);
						return;
					}
					promo[key] = value;
				});

				return promo;
			}
		};

		return service;
	});

	app.controller('PromosListController', function($scope, $http, $routeParams, $rootScope) {
		var areaId = $rootScope.areaId;

		$scope.path = 'promos';

		var p = $http.get('/areas/' + areaId);

		p.error(function(err) {
			console.log('PromosListController: area ajax failed');
			console.log(err);
		});

		p.then(function(res) {
			$scope.area = res.data;
		});

		var r = $http.get('/promos/byAreaId/' + areaId);

		r.error(function(err) {
			console.log('PromosListController: promos ajax failed');
			console.log(err);
		});

		r.then(function(res) {
			$scope.promos = res.data;
		});

	});

	app.controller('PromosAddController', function(
		navMgr, messenger, pod, promoSchema, $scope, $http, $routeParams, $window
	) {
		
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.promoSchema = promoSchema;
		$scope.promo = promoSchema.populateDefaults({});

		$scope.promo.areaId = $routeParams.id;

		$scope.save = function save(promo, options) {

			options || (options = {});

			$http.post(
				'/promos/create', promo
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Promo created', '');

				if(options.addMore) {
					$scope.promo = {};
					return;
				}

				navMgr.protect(false);
				$window.location.href = '#/promos/';
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/');
		};
	});

	app.controller('PromosEditController', function(
		navMgr, messenger, pod, promoSchema, $scope, $http, $routeParams
	) {
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.promoSchema = promoSchema;
		$scope.editMode = true;

		$http.get(
			'/promos/' + $routeParams.id
		).success(function(data, status, headers, config) {
			$scope.promo = promoSchema.populateDefaults(data);
		});

		$scope.save = function save(promo, options) {

			options || (options = {});

			$http.put(
				'/promos/' + promo.id, promo
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Promo updated', '');

				$scope.form.$setPristine();
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/');
		};
	});


	///
	// Controllers: Restaurants
	///

	app.config(function(httpInterceptorProvider) {
		httpInterceptorProvider.register(/^\/restaurants/);
	});

	app.factory('restaurantSchema', function() {
		function nameTransform(restaurant) {
			if(! restaurant || ! restaurant.name || restaurant.name.length < 1) {
				return 'restaurant-name';
			}
			return (restaurant.name
				.replace(/[^a-zA-Z ]/g, '')
				.replace(/ /g, '-')
				.toLowerCase()
			);
		}

		var service = {
			defaults: {
				restaurant: {
					areaId: '',
					name: '',
					desc: '',
					slogan: '',
					cuisine: '',
					featured: '',
					active: '',
					image: '',
					slug: '',
					phone: '',
					addresses: [ ],
					hours0open: '',
					hours0close: '',
					hours1open: '',
					hours1close: '',
					hours2open: '',
					hours2close: '',
					hours3open: '',
					hours3close: '',
					hours4open: '',
					hours4close: '',
					hours5open: '',
					hours5close: '',
					hours6open: '',
					hours6close: '',
				},
				address: {
					streetNumber: '',
					streetName: '',
					city: '',
					state: '',
					zip: '',
				}
			},

			links: {
				website: {
					placeholder: function(restaurant) {
						return 'www.' + nameTransform(restaurant) + '.com';
					},
					addon: 'http://'
				},
				facebook: {
					placeholder: nameTransform,
					addon: 'facebook.com/'
				},
				twitter: {
					placeholder: nameTransform,
					addon: '@'
				},
				instagram: {
					placeholder: nameTransform,
					addon: 'instagram.com/'
				},
				pinterest: {
					placeholder: nameTransform,
					addon: 'pinterest.com/'
				},
			},

			populateDefaults: function(restaurant) {
				$.map(service.defaults.restaurant, function(value, key) {
					if(restaurant[key]) return;
					if(typeof value === 'object') {
						restaurant[key] = angular.copy(value);
						return;
					}
					restaurant[key] = value;
				});

				if(restaurant.addresses.length < 1) {
					restaurant.addresses.push(service.defaults.address);
				}

				restaurant.addresses.forEach(function(address) {
					_.forEach(service.defaults.address, function(value, key) {
						if(address[key]) return;
						if(typeof value === 'object') {
							address[key] = angular.copy(value);
							return;
						}
						address[key] = value;
					});
				});
				return restaurant;
			}
		};

		return service;
	});

	app.controller('RestaurantsListController', function(datatables, $scope) {
		$scope.name = 'Restaurant';
		$scope.pluralName = 'Restaurants';
		$scope.path = 'restaurants';

		datatables.build($scope, {
			id: 'fms-restaurants-grid',
			ajax: '/restaurants/datatables',
			actions: [
				{
					url: '#/restaurants/edit/',
					content: '<i class="fa fa-2x fa-pencil-square-o"></i>'
				},
				{
					url: '#/restaurants/',
					content: '<i class="fa fa-2x fa-binoculars"></i>'
				}
			],
			cols: [
				{label: 'Actions', data: 'id'},
				{label: 'Name', data: 'name'},
				{label: 'Created', data: 'createdAt', type: 'time'},
				{label: 'Updated', data: 'updatedAt', type: 'time'},
			]
		}); 
	});

	app.controller('RestaurantsAddController', function(
		navMgr, messenger, pod, restaurantSchema, $scope, $http, $routeParams, $window
	) {
		
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.restaurantSchema = restaurantSchema;
		$scope.restaurant = restaurantSchema.populateDefaults({});

		$scope.restaurant.areaId = $routeParams.id;

		$scope.imageCropResult = null;
		$scope.showImageCropper = false;

		$scope.$watch('imageCropResult', function(image) {
			if($scope.restaurant) {
				$scope.restaurant.image = image;
			}
		});

		$scope.getSlug = function(name) {
			var namePcs = name.split(" ");
			var namePcsLength = namePcs.length;
			var counter = 0;
			var first = true;
			var slug = '';
			while(counter < namePcsLength) {
				if(first) {
					var a = namePcs[counter].toLowerCase();
					var b = a.replace(/&/g, 'and');
					var c = b.replace(/\-/g, '');
					var d = c.replace(/[^A-Za-z0-9]/g, '');
					if(d.length > 0) {
						slug += d;
						first = false;
					}
				} else {
					var e = namePcs[counter].toLowerCase();
					var f = e.replace(/&/g, 'and');
					var g = f.replace(/\-/g, '');
					var h = g.replace(/[^A-Za-z0-9]/g, '');
					if(h.length > 0) {
						slug += '-';
						slug += h;
					}
				}
				counter ++;
			}
			return slug;
		}

		$scope.save = function save(restaurant, options) {
			restaurant.slug = $scope.getSlug(restaurant.name);

			options || (options = {});

			$http.post(
				'/restaurants/create', restaurant
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Restaurant created', '');

				if(options.addMore) {
					$scope.restaurant = {};
					return;
				}

				navMgr.protect(false);
				$window.location.href = '#/restaurants/' + data.id;
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/');
		};
	});

	app.controller('RestaurantsEditController', function(
		navMgr, messenger, pod, restaurantSchema, $scope, $http, $routeParams
	) {
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.restaurantSchema = restaurantSchema;
		$scope.editMode = true;

		$http.get(
			'/restaurants/' + $routeParams.id
		).success(function(data, status, headers, config) {
			$scope.restaurant = restaurantSchema.populateDefaults(data);
		});

		$scope.imageCropResult = null;
		$scope.showImageCropper = false;

		$scope.$watch('imageCropResult', function(image) {
			if($scope.restaurant) {
				$scope.restaurant.image = image;
			}
		});

		$scope.save = function save(restaurant, options) {
			options || (options = {});

			$http.put(
				'/restaurants/' + restaurant.id, restaurant
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Restaurant updated', '');

				$scope.form.$setPristine();
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/');
		};
	});


	///
	// Controllers: Shifts
	///

	app.controller('DriverShiftsListController', function(
		$scope, $http, $routeParams, $rootScope, authMgr
	) {
		$scope.areaName = $rootScope.areaName;
		$scope.areaId = $rootScope.areaId;

		var driverId = $routeParams.id;

		var authPromise = authMgr.getAuthLevel();

		authPromise.then(function(authData) {

			$scope.authLevel = authData.authLevel;

			var shiftsHistory = [];

			// first get historic shifts
			$http.get('/shifts/byDriverId/'+driverId).then(function(shifts) {
				if(shifts && shifts.data && shifts.data.length > 0) {
					shifts.data.forEach(function(shift) {
						var thisShift = {};
						thisShift.id = shift.id;
						thisShift.date = shift.date;
						thisShift.net = shift.net;
						thisShift.reconciledBy = shift.reconciledBy;
	
						shiftsHistory.push(thisShift);
					});
				}

				// next get current shift
				$http.get('/orders/byDriverIdToday/' +driverId).then(function(orders) {
					if(orders && orders.data && orders.data.length > 0) {
						var currentShift = {};
						var currentTotalTips = 0;
						var currentCashCollected = 0;
						var first = true;
						var currentDate;
						orders.data.forEach(function(order) {
							if(order.paymentMethods === 'cash') {
								currentCashCollected += parseFloat(order.total);
							} else {
								if(order.gratuity && parseFloat(order.gratuity) > 0) {
									currentTotalTips += parseFloat(order.gratuity);
								}
							}
							if(first) {
								var currentDateYear = new Date(order.paymentAcceptedAt).getFullYear();
								var currentDateMonth = new Date(order.paymentAcceptedAt).getMonth() + 1;
								var currentDateDate = new Date(order.paymentAcceptedAt).getDate();

								if(currentDateMonth < 10) {
									currentDateMonth = '0'+currentDateMonth;
								}
		
								if(currentDateDate < 10) {
									currentDateDate = '0'+currentDateDate;
								}
		
								currentDate = currentDateYear+''+currentDateMonth+''+currentDateDate;
							}

							first = false;
						});

						currentShift.date = currentDate;
						currentShift.net = '$'+(parseFloat(currentTotalTips) - parseFloat(currentCashCollected)).toFixed(2);
						currentShift.reconciledBy = 'PENDING';
	
						shiftsHistory.push(currentShift);
					}
				}).catch(function(err) {
					console.log('ShiftsList: orders-err:');
					console.log(err);
				});
			}).catch(function(err) {
				console.log('ShiftsList: shifts-err:');
				console.log(err);
			});

			$scope.shifts = shiftsHistory;
	
		});
	});

	app.controller('ShiftViewController', function(navMgr, messenger, pod, $scope, $http, $routeParams, $window, $rootScope) {
		$scope.areaId = $rootScope.areaId;

		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.save = function save(story) {

			story.areaId = $scope.areaId;

			$http.post(
				'/stories/create', story
			).success(function(data, status, headers, config) {
				if(status >= 400) return;
		
				messenger.show('Story created', '');
		
				navMgr.protect(false);
				$window.location.href = '#/stories/' + data.id;
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/stories');
		};
	});


	///
	// Controllers: Stories
	///

	app.controller('StoriesListController', function($scope, $http, $routeParams, $rootScope) {
		$scope.areaName = $rootScope.areaName;
		$scope.areaId = $rootScope.areaId;

		var p = $http.get('/stories/byAreaId/' +$scope.areaId);

		p.error(function(err) {
			console.log('StoriesListController: ajax failed');
			console.log(err);
		});

		p.then(function(res) {
			$scope.stories = res.data;
		});
	});

	app.controller('StoriesAddController', function(navMgr, messenger, pod, $scope, $http, $routeParams, $window, $rootScope) {
		$scope.areaId = $rootScope.areaId;

		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.save = function save(story) {

			story.areaId = $scope.areaId;

			$http.post(
				'/stories/create', story
			).success(function(data, status, headers, config) {
				if(status >= 400) return;
		
				messenger.show('Story created', '');
		
				navMgr.protect(false);
				$window.location.href = '#/stories/' + data.id;
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/stories');
		};
	});


	///
	// Controllers: Menus
	///

	app.config(function(httpInterceptorProvider) {
		httpInterceptorProvider.register(/^\/menus/);
	});

	app.factory('menuSchema', function() {
		function nameTransform(menu) {
			if(! menu || ! menu.name || menu.name.length < 1) {
				return 'menu-name';
			}
			return (menu.name
				.replace(/[^a-zA-Z ]/g, '')
				.replace(/ /g, '-')
				.toLowerCase()
			);
		}

		var service = {
			defaults: {
				menu: {
					restaurantId: '',
					name: '',
					desc: '',
					active: '',
					slug: '',
					availStart: '',
					availEnd: ''
				}
			},

			links: {
				website: {
					placeholder: function(menu) {
						return 'www.' + nameTransform(menu) + '.com';
					},
					addon: 'http://'
				},
				facebook: {
					placeholder: nameTransform,
					addon: 'facebook.com/'
				},
				twitter: {
					placeholder: nameTransform,
					addon: '@'
				},
				instagram: {
					placeholder: nameTransform,
					addon: 'instagram.com/'
				},
				pinterest: {
					placeholder: nameTransform,
					addon: 'pinterest.com/'
				},
			},

			populateDefaults: function(menu) {
				$.map(service.defaults.menu, function(value, key) {
					if(menu[key]) return;
					if(typeof value === 'object') {
						menu[key] = angular.copy(value);
						return;
					}
					menu[key] = value;
				});
				return menu;
			}
		};

		return service;
	});

	app.controller('MenusListController', function($scope, $http, $routeParams) {
		$scope.path = 'menus';

		var p = $http.get('/restaurants/' + $routeParams.id);

		p.error(function(err) {
			console.log('MenusListController: restaurant ajax failed');
			console.log(err);
		});

		p.then(function(res) {
			$scope.restaurant = res.data;
		});

		var r = $http.get('/menus/byRestaurantId/' + $routeParams.id);

		r.error(function(err) {
			console.log('MenusListController: menus ajax failed');
			console.log(err);
		});

		r.then(function(res) {
			$scope.menus = res.data;
		});

	});


	app.controller('MenusAddController', function(
		navMgr, messenger, pod, menuSchema, $scope, $http, $routeParams, $window
	) {

		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.menuSchema = menuSchema;
		$scope.menu = menuSchema.populateDefaults({});

		$scope.menu.restaurantId = $routeParams.id

		$scope.getSlug = function(name) {
			var namePcs = name.split(" ");
			var namePcsLength = namePcs.length;
			var counter = 0;
			var first = true;
			var slug = '';
			while(counter < namePcsLength) {
				if(first) {
					var a = namePcs[counter].toLowerCase();
					var b = a.replace(/&/g, 'and');
					var c = b.replace(/\-/g, '');
					var d = c.replace(/[^A-Za-z0-9]/g, '');
					if(d.length > 0) {
						slug += d;
						first = false;
					}
				} else {
					var e = namePcs[counter].toLowerCase();
					var f = e.replace(/&/g, 'and');
					var g = f.replace(/\-/g, '');
					var h = g.replace(/[^A-Za-z0-9]/g, '');
					if(h.length > 0) {
						slug += '-';
						slug += h;
					}
				}
				counter ++;
			}

			return slug;
		}

		$scope.save = function save(menu, options) {

			var p = $http.get('/restaurants/' + $routeParams.id);
		
			p.error(function(err) {
				console.log('MenusAddController: restaurant ajax failed');
				console.log(err);
			});
		
			p.then(function(res) {
				$scope.menu.slug = res.data.slug;

				$scope.menu.slug += '-';
				$scope.menu.slug += $scope.getSlug(menu.name);

				options || (options = {});
		
				$http.post(
					'/menus/create', menu
				).success(function(data, status, headers, config) {
					if(status >= 400) return;
		
					messenger.show('Menu created', '');
		
					if(options.addMore) {
						$scope.menu = {};
						return;
					}
		
					navMgr.protect(false);
					$window.location.href = '#/menus/' + $routeParams.id;
				});
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/menus/'+$routeParams.id);
		};
	});

	app.controller('MenusEditController', function(
		navMgr, messenger, pod, menuSchema, $scope, $http, $routeParams
	) {

		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.menuSchema = menuSchema;
		$scope.editMode = true;

		$http.get(
			'/menus/' + $routeParams.id
		).success(function(data, status, headers, config) {
			$scope.menu = menuSchema.populateDefaults(data);
		});

		$scope.save = function save(menu, options) {
			options || (options = {});

			$http.put(
				'/menus/' + menu.id, menu
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Menu updated', '');

				$scope.form.$setPristine();
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/menus/');
		};
	});


	///
	// Controllers: Items
	///

	app.config(function(httpInterceptorProvider) {
		httpInterceptorProvider.register(/^\/items/);
	});

	app.factory('itemSchema', function() {
		function nameTransform(item) {
			if(! item || ! item.name || item.name.length < 1) {
				return 'item-name';
			}
			return (item.name
				.replace(/[^a-zA-Z ]/g, '')
				.replace(/ /g, '-')
				.toLowerCase()
			);
		}

		var service = {
			defaults: {
				item: {
					menuId: '',
					name: '',
					desc: '',
					image: '',
					active: ''
				}
			},

			links: {
				website: {
					placeholder: function(item) {
						return 'www.' + nameTransform(item) + '.com';
					},
					addon: 'http://'
				},
				facebook: {
					placeholder: nameTransform,
					addon: 'facebook.com/'
				},
				twitter: {
					placeholder: nameTransform,
					addon: '@'
				},
				instagram: {
					placeholder: nameTransform,
					addon: 'instagram.com/'
				},
				pinterest: {
					placeholder: nameTransform,
					addon: 'pinterest.com/'
				},
			},

			populateDefaults: function(item) {
				$.map(service.defaults.item, function(value, key) {
					if(item[key]) return;
					if(typeof value === 'object') {
						item[key] = angular.copy(value);
						return;
					}
					item[key] = value;
				});
				return item;
			}
		};

		return service;
	});

	app.controller('ItemsListController', function(datatables, $http, $routeParams, $scope) {
		$scope.path = 'items';

		var p = $http.get('/menus/' + $routeParams.id);

		p.error(function(err) {
			console.log('ItemsListController: menu ajax failed');
			console.log(err);
		});

		p.then(function(res) {
			$scope.menu = res.data;
		});

		var r = $http.get('/items/byMenuId/' + $routeParams.id);

		r.error(function(err) {
			console.log('MenusListController: items ajax failed');
			console.log(err);
		});

		r.then(function(res) {
			$scope.items = res.data;
		});

	});

	app.controller('ItemsAddController', function(
		navMgr, messenger, pod, itemSchema, $scope, $http, $routeParams, $window
	) {

		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.itemSchema = itemSchema;
		$scope.item = itemSchema.populateDefaults({});

		$scope.item.menuId = $routeParams.id;
		$scope.item.active = true;

		$scope.imageCropResult = null;
		$scope.showImageCropper = false;

		$scope.$watch('imageCropResult', function(image) {
			if($scope.item) {
				$scope.item.image = image;
			}
		});

		$scope.save = function save(item, options) {
			options || (options = {});

			$http.post(
				'/items/create', item
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Item created', '');

				if(options.addMore) {
					$scope.item = {};
					return;
				}

				navMgr.protect(false);
				$window.location.href = '#/items/' + $routeParams.id;
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/items/'+$routeParams.id);
		};
	});

	app.controller('ItemsEditController', function(
		navMgr, messenger, pod, itemSchema, $scope, $http, $routeParams
	) {
		
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.itemSchema = itemSchema;
		$scope.editMode = true;

		$http.get(
			'/items/' + $routeParams.id
		).success(function(data, status, headers, config) {
			$scope.item = itemSchema.populateDefaults(data);
		});

		$scope.imageCropResult = null;
		$scope.showImageCropper = false;

		$scope.$watch('imageCropResult', function(image) {
			if($scope.item) {
				$scope.item.image = image;
			}
		});

		$scope.save = function save(item, options) {
			options || (options = {});

			$http.put(
				'/items/' + item.id, item
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Item updated', '');

				$scope.form.$setPristine();
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/items');
		};
	});


	///
	// Controllers: Options
	///

	app.config(function(httpInterceptorProvider) {
		httpInterceptorProvider.register(/^\/options/);
	});

	app.factory('optionSchema', function() {
		function nameTransform(option) {
			if(! option || ! option.name || option.name.length < 1) {
				return 'option-name';
			}
			return (option.name
				.replace(/[^a-zA-Z ]/g, '')
				.replace(/ /g, '-')
				.toLowerCase()
			);
		}

		var service = {
			defaults: {
				option: {
					itemId: '',
					name: '',
					price: ''
				}
			},

			links: {
				website: {
					placeholder: function(option) {
						return 'www.' + nameTransform(option) + '.com';
					},
					addon: 'http://'
				},
				facebook: {
					placeholder: nameTransform,
					addon: 'facebook.com/'
				},
				twitter: {
					placeholder: nameTransform,
					addon: '@'
				},
				instagram: {
					placeholder: nameTransform,
					addon: 'instagram.com/'
				},
				pinterest: {
					placeholder: nameTransform,
					addon: 'pinterest.com/'
				},
			},

			populateDefaults: function(option) {
				$.map(service.defaults.option, function(value, key) {
					if(option[key]) return;
					if(typeof value === 'object') {
						option[key] = angular.copy(value);
						return;
					}
					option[key] = value;
				});
				return option;
			}
		};

		return service;
	});

	app.controller('OptionsListController', function(datatables, $http, $routeParams, $scope) {
		$scope.path = 'options';

		var p = $http.get('/items/' + $routeParams.id);

		p.error(function(err) {
			console.log('ItemsListController: item ajax failed');
			console.log(err);
		});

		p.then(function(res) {
			$scope.item = res.data;
		});

		var r = $http.get('/options/byItemId/' + $routeParams.id);

		r.error(function(err) {
			console.log('MenusListController: items ajax failed');
			console.log(err);
		});

		r.then(function(res) {
			$scope.options = res.data;
		});

	});

	app.controller('OptionsAddController', function(
		navMgr, messenger, pod, optionSchema, $scope, $http, $routeParams, $window
	) {

		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.optionSchema = optionSchema;
		$scope.option = optionSchema.populateDefaults({});

		$scope.option.itemId = $routeParams.id;

		$scope.save = function save(option, options) {
			options || (options = {});

			$http.post(
				'/options/create', option
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Option created', '');

				if(options.addMore) {
					$scope.option = {};
					return;
				}

				navMgr.protect(false);
				$window.location.href = '#/options/' + $routeParams.id;
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/options/'+$routeParams.id);
		};
	});

	app.controller('OptionsEditController', function(
		navMgr, messenger, pod, optionSchema, $scope, $http, $routeParams
	) {
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.optionSchema = optionSchema;
		$scope.editMode = true;

		$http.get(
			'/options/' + $routeParams.id
		).success(function(data, status, headers, config) {
			$scope.option = optionSchema.populateDefaults(data);
		});

		$scope.save = function save(option, options) {
			options || (options = {});

			$http.put(
				'/options/' + option.id, option
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Option updated', '');

				$scope.form.$setPristine();
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/options');
		};
	});


	app.config(function(httpInterceptorProvider) {
		httpInterceptorProvider.register(/^\/users/);
	});

	app.factory('userSchema', function() {
		function nameTransform(user) {
			if(! user || ! user.fName || user.fName.length < 1) {
				return 'user-name';
			}
			return (user.fName
				.replace(/[^a-zA-Z ]/g, '')
				.replace(/ /g, '-')
				.toLowerCase()
			);
		}

		var service = {
			defaults: {
				user: {
					areaId: '',
					fName: '',
					lName: '',
					username: '',
					phone: '',
					authLevel: '',
					wage: '',
					dependants: '',
					email: ''
				}
			},
	
			links: {
				website: {
					placeholder: function(user) {
						return 'www.' + nameTransform(user) + '.com';
					},
					addon: 'http://'
				},
				facebook: {
					placeholder: nameTransform,
					addon: 'facebook.com/'
				},
				twitter: {
					placeholder: nameTransform,
					addon: '@'
				},
				instagram: {
					placeholder: nameTransform,
					addon: 'instagram.com/'
				},
				pinterest: {
					placeholder: nameTransform,
					addon: 'pinterest.com/'
				},
			},
	
			populateDefaults: function(user) {
				$.map(service.defaults.user, function(value, key) {
					if(user[key]) return;
					if(typeof value === 'object') {
						user[key] = angular.copy(value);
						return;
					}
					user[key] = value;
				});
				return user;
			}
		};

		return service;
	});

	app.controller('UsersAddController', function(
		navMgr, messenger, pod, userSchema,
		$scope, $http, $window, $rootScope
	) {
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.authLevels = [
			{id: 0, name: 'None'},
			{id: 1, name: 'Basic'},
			{id: 2, name: 'Driver'},
			{id: 3, name: 'Operator'},
			{id: 4, name: 'Manager'}
		];

		$scope.userSchema = userSchema;
		$scope.user = userSchema.populateDefaults({});

		$scope.user.areaId = $rootScope.areaId;

		// TODO 
		// clean phone number; integers only

		$scope.save = function save(user, options) {
			options || (options = {});

			$http.post(
				'/users/create', user
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('User created', '');

				if(options.addMore) {
					$scope.user = {};
					return;
				}

				navMgr.protect(false);
				$window.location.href = '#/users/' + data.id;
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/users');
		};
	});

	app.controller('UsersEditController', function(
		navMgr, messenger, pod, userSchema, $scope, $http, $routeParams
	) {

		$scope.authLevels = [
			{id: 0, name: 'None'},
			{id: 1, name: 'Basic'},
			{id: 2, name: 'Driver'},
			{id: 3, name: 'Operator'},
			{id: 4, name: 'Manager'}
		];

		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.userSchema = userSchema;
		$scope.editMode = true;

		$http.get(
			'/users/' + $routeParams.id
		).success(function(data, status, headers, config) {
			$scope.user = userSchema.populateDefaults(data);
		});

		$scope.save = function save(user, options) {
			options || (options = {});

			// TODO 
			// clean phone number; integers only

			$http.put(
				'/users/' + user.id, user
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('User updated', '');

				$scope.form.$setPristine();
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/users');
		};
	});

	app.controller('UsersSearchController', function(
		userSchema,	$scope, $http, $window, $rootScope
	) {
		var areaId = $rootScope.areaId;
		
		var authLevelMap = [
			'None',
			'Basic',
			'Driver',
			'Operator',
			'Manager'
		];

		$scope.fNameSearch = function() {
			var p = $http.get('/users/byFName/' + $scope.fName);
	
			p.error(function(err) {
				console.log('UsersSearchController: users-fName ajax failed');
				console.log(err);
			});
	
			p.then(function(res) {
				res.data.map(function(user) {
					user.authLevel = authLevelMap[user.authLevel];
				});
				$scope.users = res.data;
			});
		};

		$scope.lNameSearch = function() {
			var p = $http.get('/users/byLName/' + $scope.lName);
	
			p.error(function(err) {
				console.log('UsersSearchController: users-lName ajax failed');
				console.log(err);
			});
	
			p.then(function(res) {
				$scope.users = res.data;
			});
		}

		$scope.phoneSearch = function() {
			var p = $http.get('/users/byPhone/' + $scope.phone);
	
			p.error(function(err) {
				console.log('UsersSearchController: users-phone ajax failed');
				console.log(err);
			});
	
			p.then(function(res) {
				$scope.users = res.data;
			});
		}

	});


	///
	// Holder
	///

	app.directive('holderJs', function() {
		return {
			link: function(scope, element, attrs) {
				attrs.$set('data-src', attrs.holderJs);
				Holder.run({images:element[0]});
			}
		};
	});

}());
