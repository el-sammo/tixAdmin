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
		// Championships
		///

		$routeProvider.when('/championships/list', {
			controller: 'ChampionshipsListController',
			templateUrl: '/templates/championshipsList.html'
		});

		$routeProvider.when('/championships/add', {
			controller: 'ChampionshipsAddController',
			templateUrl: '/templates/championshipsForm.html'
		});

		$routeProvider.when('/championships/edit/:id', {
			controller: 'ChampionshipsEditController',
			templateUrl: '/templates/championshipsForm.html'
		});

		$routeProvider.when('/championships/search', {
			controller: 'ChampionshipsSearchController',
			templateUrl: '/templates/championshipsSearch.html'
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
		// Entities
		///

		$routeProvider.when('/entities/list', {
			controller: 'EntitiesListController',
			templateUrl: '/templates/entitiesList.html'
		});

		$routeProvider.when('/entities/list/:id', {
			controller: 'EntitiesPoolListController',
			templateUrl: '/templates/entitiesPoolList.html'
		});

		$routeProvider.when('/entities/add', {
			controller: 'EntitiesAddController',
			templateUrl: '/templates/entitiesForm.html'
		});

		$routeProvider.when('/entities/edit/:id', {
			controller: 'EntitiesEditController',
			templateUrl: '/templates/entitiesForm.html'
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
		// Pools
		///

		$routeProvider.when('/pools/list/:id', {
			controller: 'PoolsListController',
			templateUrl: '/templates/poolsList.html'
		});

		$routeProvider.when('/pools/add/:id', {
			controller: 'PoolsAddController',
			templateUrl: '/templates/poolsForm.html'
		});

		$routeProvider.when('/pools/edit/:id', {
			controller: 'PoolsEditController',
			templateUrl: '/templates/poolsForm.html'
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
			allTimeOrders: function() {
				$modal.open({
					templateUrl: '/templates/allTimeOrders.html',
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

	app.controller('LoadServices', function(loginModal, errMgr, authMgr) {});


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
		var ccPercent = .029;
		var extraCCCharge = .3;
		var bevCost = .32;

		authPromise.then(function(authData) {

			$scope.authLevel = authData.authLevel;
			$scope.authUserId = authData.userId;

			$scope.sendMessage = messageMgmt.send;
		
			$scope.dailyOrders = homeMgmt.dailyOrders;
			$scope.weeklyOrders = homeMgmt.weeklyOrders;
			$scope.monthlyOrders = homeMgmt.monthlyOrders;
			$scope.allTimeOrders = homeMgmt.allTimeOrders;
	
			$scope.dailyPromos = homeMgmt.dailyPromos;
			$scope.weeklyPromos = homeMgmt.weeklyPromos;
			$scope.monthlyPromos = homeMgmt.monthlyPromos;
	
			$scope.dailySignUps = homeMgmt.dailySignUps;
			$scope.weeklySignUps = homeMgmt.weeklySignUps;
			$scope.monthlySignUps = homeMgmt.monthlySignUps;

			var allOrders = $http.get('/orders/allTime/').then(function(res) {
				var allTimeOrderData = res.data;

				var allTimeBevs = 0;
				var allTimeBevsNet = 0;
				var allTimeGrossRevenue = 0;
				var allTimeNetRevenue = 0;
				var allTimeOrders = 0;
				var allTimePromos = 0;
				var allTimePromosDisc = 0;

				allTimeOrderData.forEach(function(order) {
					var ccTotal = 0;
					var bevNet = 0;
					if(order.orderStatus > 4) {
						allTimeOrders ++;
						allTimeGrossRevenue += parseFloat(order.total);
						if(order.discount) {
							if(order.paymentMethods != 'cash') {
								var ccFee = (parseFloat(order.total) * ccPercent).toFixed(2);
								var ccCharge = extraCCCharge;
								ccTotal = parseFloat(ccFee) + parseFloat(ccCharge);
							}
							if(order.bevThings && order.bevThings.length > 0) {
								order.bevThings.forEach(function(bevThing) {
									allTimeBevs += bevThing.quantity;
									var thisBevThingEffect = ((bevThing.price * bevThing.quantity) - (bevCost * bevThing.quantity)).toFixed(2);
									allTimeBevsNet += parseFloat(thisBevThingEffect);
									bevNet += parseFloat(thisBevThingEffect);
								});
							}
							allTimeNetRevenue += (parseFloat(order.deliveryFee) - parseFloat(order.discount) - parseFloat(ccTotal) + parseFloat(bevNet));
							allTimePromos ++;
							allTimePromosDisc += parseFloat(order.discount);
						} else {
							if(order.paymentMethods != 'cash') {
								var ccFee = (parseFloat(order.total) * ccPercent).toFixed(2);
								var ccCharge = extraCCCharge;
								ccTotal = parseFloat(ccFee) + parseFloat(ccCharge);
							}
							if(order.bevThings && order.bevThings.length > 0) {
								order.bevThings.forEach(function(bevThing) {
									allTimeBevs += bevThing.quantity;
									var thisBevThingEffect = ((bevThing.price * bevThing.quantity) - (bevCost * bevThing.quantity)).toFixed(2);
									allTimeBevsNet += parseFloat(thisBevThingEffect);
									bevNet += parseFloat(thisBevThingEffect);
								});
							}
							allTimeNetRevenue += (parseFloat(order.deliveryFee) - parseFloat(ccTotal) + parseFloat(bevNet));
						}
					}
				});
				$scope.allTimeBevs = allTimeBevs;
				$scope.allTimeBevsNet = allTimeBevsNet.toFixed(2);
				$scope.allTimeGrossRevenue = allTimeGrossRevenue.toFixed(2);
				$scope.allTimeNetRevenue = allTimeNetRevenue.toFixed(2);
				$scope.allTimeOrders = allTimeOrders;
				$scope.allTimePromos = allTimePromos;
				$scope.allTimePromosDisc = allTimePromosDisc;
			}).catch(function(err) {
				console.log('orders-allTime err:');
				console.log(err);
			});

			$http.get('/orders/daily/').then(function(res) {
				var dailyOrders = res.data;

				var dayBevs = 0;
				var dayBevsNet = 0;
				var dayGrossRevenue = 0;
				var dayNetRevenue = 0;
				var dayOrders = 0;
				var dayPromos = 0;
				var dayPromosArr = [];
				var dayPromosDisc = 0;

				if(dailyOrders && dailyOrders.length > 0) {
					dailyOrders.forEach(function(order) {
						var ccTotal = 0;
						var bevNet = 0;
						if(order.orderStatus > 4) {
							dayOrders ++;
							dayGrossRevenue += parseFloat(order.total);
							if(order.discount) {
								if(order.paymentMethods != 'cash') {
									var ccFee = (parseFloat(order.total) * ccPercent).toFixed(2);
									var ccCharge = extraCCCharge;
									ccTotal = parseFloat(ccFee) + parseFloat(ccCharge);
								}
								if(order.bevThings && order.bevThings.length > 0) {
									order.bevThings.forEach(function(bevThing) {
										dayBevs += bevThing.quantity;
										var thisBevThingEffect = ((bevThing.price * bevThing.quantity) - (bevCost * bevThing.quantity)).toFixed(2);
										dayBevsNet += parseFloat(thisBevThingEffect);
										bevNet += parseFloat(thisBevThingEffect);
									});
								}
								dayNetRevenue += (parseFloat(order.deliveryFee) - parseFloat(order.discount) - parseFloat(ccTotal) + parseFloat(bevNet));
								dayPromos ++;
								dayPromosDisc = dayPromosDisc + parseFloat(order.discount);
								if(dayPromosArr.indexOf(order.promo.toLowerCase()) < 0) {
									dayPromosArr.push(order.promo.toLowerCase());
								}
							} else {
								if(order.paymentMethods != 'cash') {
									var ccFee = (parseFloat(order.total) * ccPercent).toFixed(2);
									var ccCharge = extraCCCharge;
									ccTotal = parseFloat(ccFee) + parseFloat(ccCharge);
								}
								if(order.bevThings && order.bevThings.length > 0) {
									order.bevThings.forEach(function(bevThing) {
										dayBevs += bevThing.quantity;
										var thisBevThingEffect = ((bevThing.price * bevThing.quantity) - (bevCost * bevThing.quantity)).toFixed(2);
										dayBevsNet += parseFloat(thisBevThingEffect);
										bevNet += parseFloat(thisBevThingEffect);
									});
								}
								dayNetRevenue += (parseFloat(order.deliveryFee) - parseFloat(ccTotal) + parseFloat(bevNet));
							}
						}
					});
				}
				$scope.dayBevs = dayBevs;
				$scope.dayBevsNet = dayBevsNet.toFixed(2);
				$scope.dayGrossRevenue = dayGrossRevenue.toFixed(2);
				$scope.dayNetRevenue = dayNetRevenue.toFixed(2);
				$scope.dayOrders = dayOrders;
				$scope.dayPromos = dayPromos;
				$scope.dayPromosArr = dayPromosArr;
				$scope.dayPromosDisc = dayPromosDisc.toFixed(2);
			}).catch(function(err) {
				console.log('orders-daily err:');
				console.log(err);
			});
	
			$http.get('/orders/weekly/').then(function(res) {
				var weekOrders = res.data;

				var weekGrossRevenue = 0;
				var weekNetRevenue = 0;
				var weeklyBevs = 0;
				var weeklyBevsNet = 0;
				var weeklyOrders = 0;
				var weeklyPromos = 0;
				var weeklyPromosArr = [];
				var weeklyPromosDisc = 0;

				if(weekOrders && weekOrders.length > 0) {
					weekOrders.forEach(function(order) {
						var ccTotal = 0;
						var bevNet = 0;
						if(order.orderStatus > 4) {
							weeklyOrders ++;
							weekGrossRevenue += parseFloat(order.total);
							if(order.discount) {
								if(order.paymentMethods != 'cash') {
									var ccFee = (parseFloat(order.total) * ccPercent).toFixed(2);
									var ccCharge = extraCCCharge;
									ccTotal = parseFloat(ccFee) + parseFloat(ccCharge);
								}
								if(order.bevThings && order.bevThings.length > 0) {
									order.bevThings.forEach(function(bevThing) {
										weeklyBevs += bevThing.quantity;
										var thisBevThingEffect = ((bevThing.price * bevThing.quantity) - (bevCost * bevThing.quantity)).toFixed(2);
										weeklyBevsNet += parseFloat(thisBevThingEffect);
										bevNet += parseFloat(thisBevThingEffect);
									});
								}
								weekNetRevenue += (parseFloat(order.deliveryFee) - parseFloat(order.discount) - parseFloat(ccTotal) + parseFloat(bevNet));
								weeklyPromos ++;
								weeklyPromosDisc = weeklyPromosDisc + parseFloat(order.discount);
								if(weeklyPromosArr.indexOf(order.promo.toLowerCase()) < 0) {
									weeklyPromosArr.push(order.promo.toLowerCase());
								}
							} else {
								if(order.paymentMethods != 'cash') {
									var ccFee = (parseFloat(order.total) * ccPercent).toFixed(2);
									var ccCharge = extraCCCharge;
									ccTotal = parseFloat(ccFee) + parseFloat(ccCharge);
								}
								if(order.bevThings && order.bevThings.length > 0) {
									order.bevThings.forEach(function(bevThing) {
										weeklyBevs += bevThing.quantity;
										var thisBevThingEffect = ((bevThing.price * bevThing.quantity) - (bevCost * bevThing.quantity)).toFixed(2);
										weeklyBevsNet += parseFloat(thisBevThingEffect);
										bevNet += parseFloat(thisBevThingEffect);
									});
								}
								weekNetRevenue += (parseFloat(order.deliveryFee) - parseFloat(ccTotal) + parseFloat(bevNet));
							}
						}
					});
				}
				$scope.weekBevs = weeklyBevs;
				$scope.weekBevsNet = weeklyBevsNet.toFixed(2);
				$scope.weekGrossRevenue = weekGrossRevenue.toFixed(2);
				$scope.weekNetRevenue = weekNetRevenue.toFixed(2);
				$scope.weekOrders = weeklyOrders;
				$scope.weekPromos = weeklyPromos;
				$scope.weekPromosArr = weeklyPromosArr;
				$scope.weekPromosDisc = weeklyPromosDisc.toFixed(2);
			}).catch(function(err) {
				console.log('orders-weekly err:');
				console.log(err);
			});
	
			$http.get('/orders/monthly/').then(function(res) {
				var weeksOrders = res.data;

				var weeksBevs = 0;
				var weeksBevsNet = 0;
				var weeksGrossRevenue = 0;
				var weeksNetRevenue = 0;
				var monthlyOrders = 0;
				var monthlyPromos = 0;
				var monthlyPromosArr = [];
				var monthlyPromosDisc = 0;

				if(weeksOrders && weeksOrders.length > 0) {
					weeksOrders.forEach(function(order) {
						var ccTotal = 0;
						var bevNet = 0;
						if(order.orderStatus > 4) {
							monthlyOrders ++;
							weeksGrossRevenue += parseFloat(order.total);
							if(order.discount) {
								if(order.paymentMethods != 'cash') {
									var ccFee = (parseFloat(order.total) * ccPercent).toFixed(2);
									var ccCharge = extraCCCharge;
									ccTotal = parseFloat(ccFee) + parseFloat(ccCharge);
								}
								if(order.bevThings && order.bevThings.length > 0) {
									order.bevThings.forEach(function(bevThing) {
										weeksBevs += bevThing.quantity;
										var thisBevThingEffect = ((bevThing.price * bevThing.quantity) - (bevCost * bevThing.quantity)).toFixed(2);
										weeksBevsNet += parseFloat(thisBevThingEffect);
										bevNet += parseFloat(thisBevThingEffect);
									});
								}
								weeksNetRevenue += (parseFloat(order.deliveryFee) - parseFloat(order.discount) - parseFloat(ccTotal) + parseFloat(bevNet));
								monthlyPromos ++;
								monthlyPromosDisc = monthlyPromosDisc + parseFloat(order.discount);
								if(monthlyPromosArr.indexOf(order.promo.toLowerCase()) < 0) {
									monthlyPromosArr.push(order.promo.toLowerCase());
								}
							} else {
								if(order.paymentMethods != 'cash') {
									var ccFee = (parseFloat(order.total) * ccPercent).toFixed(2);
									var ccCharge = extraCCCharge;
									ccTotal = parseFloat(ccFee) + parseFloat(ccCharge);
								}
								if(order.bevThings && order.bevThings.length > 0) {
									order.bevThings.forEach(function(bevThing) {
										weeksBevs += bevThing.quantity;
										var thisBevThingEffect = ((bevThing.price * bevThing.quantity) - (bevCost * bevThing.quantity)).toFixed(2);
										weeksBevsNet += parseFloat(thisBevThingEffect);
										bevNet += parseFloat(thisBevThingEffect);
									});
								}
								weeksNetRevenue += (parseFloat(order.deliveryFee) - parseFloat(ccTotal) + parseFloat(bevNet));
							}
						}
					});
				}
				$scope.weeksBevs = weeksBevs;
				$scope.weeksBevsNet = weeksBevsNet.toFixed(2);
				$scope.weeksGrossRevenue = weeksGrossRevenue.toFixed(2);
				$scope.weeksNetRevenue = weeksNetRevenue.toFixed(2);
				$scope.weeksOrders = monthlyOrders;
				$scope.weeksPromos = monthlyPromos;
				$scope.weeksPromosArr = monthlyPromosArr;
				$scope.weeksPromosDisc = monthlyPromosDisc.toFixed(2);
			}).catch(function(err) {
				console.log('orders-monthly err:');
				console.log(err);
			});
	
			$http.get('/customers/allTime/').then(function(res) {
				$scope.allTimeSignUps = res.data.length;
			}).catch(function(err) {
				console.log('customers-allTime err:');
				console.log(err);
			});
	
			$http.get('/customers/daily/').then(function(res) {
				$scope.daySignUps = res.data;
				$scope.daySignups = res.data.length;
			}).catch(function(err) {
				console.log('customers-daily err:');
				console.log(err);
			});
	
			$http.get('/customers/weekly/').then(function(res) {
				$scope.weekSignUps = res.data;
				$scope.weekSignups = res.data.length;
			}).catch(function(err) {
				console.log('customers-weekly err:');
				console.log(err);
			});
	
			$http.get('/customers/monthly/').then(function(res) {
				$scope.weeksSignUps = res.data;
				$scope.weeksSignups = res.data.length;
			}).catch(function(err) {
				console.log('customers-monthly err:');
				console.log(err);
			});
	
			$http.get('/applicants/allTime/').then(function(res) {
				$scope.allTimeApplicants = res.data.length;
			}).catch(function(err) {
				console.log('applicants-allTime err:');
				console.log(err);
			});
	
			$http.get('/applicants/daily/').then(function(res) {
				$scope.dayApplicants = res.data.length;
			}).catch(function(err) {
				console.log('applicants-daily err:');
				console.log(err);
			});
	
			$http.get('/applicants/weekly/').then(function(res) {
				$scope.weekApplicants = res.data.length;
			}).catch(function(err) {
				console.log('applicants-weekly err:');
				console.log(err);
			});
	
			$http.get('/applicants/monthly/').then(function(res) {
				$scope.weeksApplicants = res.data.length;
			}).catch(function(err) {
				console.log('applicants-monthly err:');
				console.log(err);
			});

		});

	});


	///
	// Controllers: Championships
	///

	app.config(function(httpInterceptorProvider) {
		httpInterceptorProvider.register(/^\/championships/);
	});

	app.factory('championshipSchema', function() {
		function nameTransform(championship) {
			if(! championship || ! championship.name || championship.name.length < 1) {
				return 'championship-name';
			}
			return (championship.name
				.replace(/[^a-zA-Z ]/g, '')
				.replace(/ /g, '-')
				.toLowerCase()
			);
		}

		var service = {
			defaults: {
				championship: {
					name: '',
					tagline: '',
					location: '',
					date: ''
				}
			},
	
			populateDefaults: function(championship) {
				$.map(service.defaults.championship, function(value, key) {
					if(championship[key]) return;
					if(typeof value === 'object') {
						championship[key] = angular.copy(value);
						return;
					}
					championship[key] = value;
				});
				return championship;
			}
		};

		return service;
	});

	app.controller('ChampionshipsListController', function($scope, $http, $routeParams, $rootScope) {
		$scope.path = 'championships';

		$http.get('/championships/').then(function(res) {
			$scope.championships = res.data;
		}).catch(function(err) {
			console.log('ChampionshipsListController: championships ajax failed');
			console.log(err);
		});

	});

	app.controller('ChampionshipsAddController', function(
		navMgr, messenger, pod, championshipSchema,
		$scope, $http, $window, $rootScope
	) {
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.championshipSchema = championshipSchema;
		$scope.championship = championshipSchema.populateDefaults({});

		$scope.save = function save(championship, options) {
			options || (options = {});

			$http.post(
				'/championships/create', championship
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Championship created', '');

				if(options.addMore) {
					$scope.championship = {};
					return;
				}

				navMgr.protect(false);
				$window.location.href = '#/championships/' + data.id;
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/championships');
		};
	});


	app.controller('ChampionshipsEditController', function(
		navMgr, messenger, pod, championshipSchema, 
		$scope, $http, $routeParams, $window, orderMgmt
	) {

		$scope.championshipId = $routeParams.id;

		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.championshipSchema = championshipSchema;
		$scope.editMode = true;

		$http.get(
			'/championships/' + $routeParams.id
		).success(function(data, status, headers, config) {
			$scope.championship = championshipSchema.populateDefaults(data);
		});

		$scope.save = function save(championship, options) {
			options || (options = {});

			$http.put(
				'/championships/' + championship.id, championship
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Championship updated', '');

				$scope.form.$setPristine();
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/championships');
		};
	});

	app.controller('ChampionshipsSearchController', function(
		championshipSchema,	$scope, $http, $window, $rootScope
	) {

		$scope.nameSearch = function() {
			var p = $http.get('/championships/byName/' + $scope.name);
	
			p.error(function(err) {
				console.log('ChampionshipsSearchController: championships-fName ajax failed');
				console.log(err);
			});
	
			p.then(function(res) {
				$scope.championships = res.data;
			});
		}

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
		customerSchema,	$scope, $http, $window, $rootScope, $routeParams
	) {

		$http.get('/orders/byCustomerIdCompleted/' + $routeParams.id).then(function(res) {
			var allOrders = res.data;

			allOrders.map(function(order) {
				var d = new Date(order.paymentAcceptedAt);

				var orderYear = d.getFullYear();
				var orderMonth = d.getMonth() + 1;
				var orderDay = d.getDate();

				if(orderMonth < 10) {
					orderMonth = '0'+orderMonth;
				}

				if(orderDay < 10) {
					orderDay = '0'+orderDay;
				}

				order.orderDate = orderYear+'-'+orderMonth+'-'+orderDay;
			});

			$scope.orders = allOrders;
		}).catch(function(err) {
			console.log('CustomersOrdersController orders-byCustomerIdCompleted ajax fail');
			console.log(err);
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
	// Controllers: Entities
	///

	app.config(function(httpInterceptorProvider) {
		httpInterceptorProvider.register(/^\/entities/);
	});

	app.factory('entitySchema', function() {
		function nameTransform(entity) {
			if(! entity || ! entity.name || entity.name.length < 1) {
				return 'entity-name';
			}
			return (entity.name
				.replace(/[^a-zA-Z ]/g, '')
				.replace(/ /g, '-')
				.toLowerCase()
			);
		}

		var service = {
			defaults: {
				entity: {
					name: '',
					tagline: '',
					location: '',
					date: ''
				}
			},
	
			populateDefaults: function(entity) {
				$.map(service.defaults.entity, function(value, key) {
					if(entity[key]) return;
					if(typeof value === 'object') {
						entity[key] = angular.copy(value);
						return;
					}
					entity[key] = value;
				});
				return entity;
			}
		};

		return service;
	});

	app.controller('EntitiesListController', function($scope, $http, $routeParams, $rootScope) {
		$scope.path = 'entities';

		$http.get('/entities').then(function(res) {
			$scope.entities = res.data;
		}).catch(function(err) {
			console.log('EntitiesListController: entities ajax failed');
			console.log(err);
		});

	});

	app.controller('EntitiesAddController', function(
		navMgr, messenger, pod, entitySchema,
		$scope, $http, $window, $rootScope
	) {
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.entitySchema = entitySchema;
		$scope.entity = entitySchema.populateDefaults({});

		$scope.save = function save(entity, options) {
			options || (options = {});

			$http.post(
				'/entities/create', entity
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Entity created', '');

				if(options.addMore) {
					$scope.entity = {};
					return;
				}

				navMgr.protect(false);
				$window.location.href = '#/entities/' + data.id;
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/entities');
		};
	});


	app.controller('EntitiesEditController', function(
		navMgr, messenger, pod, entitySchema, 
		$scope, $http, $routeParams, $window, orderMgmt
	) {

		$scope.entityId = $routeParams.id;

		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.entitySchema = entitySchema;
		$scope.editMode = true;

		$http.get(
			'/entities/' + $routeParams.id
		).success(function(data, status, headers, config) {
			$scope.entity = entitySchema.populateDefaults(data);
		});

		$scope.save = function save(entity, options) {
			options || (options = {});

			$http.put(
				'/entities/' + entity.id, entity
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Entity updated', '');

				$scope.form.$setPristine();
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/entities');
		};
	});

	app.controller('EntitiesPoolListController', function($scope, $http, $routeParams, $rootScope) {
		$scope.path = 'pools';
		var championshipId = $routeParams.id;

		$http.get('/championships/' +championshipId).then(function(res) {
			$scope.championship = res.data;
		}).catch(function(err) {
			console.log('EntitiesPoolListController: pools ajax failed');
			console.log(err);
		});

		$http.get('/pools/byChampionshipId/' +championshipId).then(function(res) {
			$scope.pools = res.data;
		}).catch(function(err) {
			console.log('EntitiesPoolListController: pools ajax failed');
			console.log(err);
		});

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
				$scope.discountPercent = 0;
				$scope.bevThings = $scope.order.bevThings;
				$scope.order.things.forEach(function(thing) {
					$scope.getRestaurantName(thing.optionId).then(function(restaurantData) {
						var restaurant = _.find($scope.orderRestaurants, {name: restaurantData.name});
						if(! restaurant) {
							restaurant = {name: restaurantData.name, phone: restaurantData.phone, items: []};
							$scope.orderRestaurants.push(restaurant);
						}
						// TODO: build an array (if more than one rest w/discount
						// and ng-repeat loop through on the template
						if(restaurantData.discountPercent) {
							$scope.discountPercent = restaurantData.discountPercent;
							$scope.discountPercentRestName = restaurantData.name;
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
			}, 120000);
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
	// Controllers: Pools
	///

	app.config(function(httpInterceptorProvider) {
		httpInterceptorProvider.register(/^\/pools/);
	});

	app.factory('poolSchema', function() {
		function nameTransform(pool) {
			if(! pool || ! pool.name || pool.name.length < 1) {
				return 'pool-name';
			}
			return (pool.name
				.replace(/[^a-zA-Z ]/g, '')
				.replace(/ /g, '-')
				.toLowerCase()
			);
		}

		var service = {
			defaults: {
				pool: {
					name: '',
					championshipId: '',
					max_entities: ''
				}
			},
	
			populateDefaults: function(pool) {
				$.map(service.defaults.pool, function(value, key) {
					if(pool[key]) return;
					if(typeof value === 'object') {
						pool[key] = angular.copy(value);
						return;
					}
					pool[key] = value;
				});
				return pool;
			}
		};

		return service;
	});

	app.controller('PoolsListController', function($scope, $http, $routeParams, $rootScope) {
		$scope.path = 'pools';
		var championshipId = $routeParams.id;

		$http.get('/championships/' +championshipId).then(function(res) {
			$scope.championship = res.data;
		}).catch(function(err) {
			console.log('PoolsListController: pools ajax failed');
			console.log(err);
		});

		$http.get('/pools/byChampionshipId/' +championshipId).then(function(res) {
			$scope.pools = res.data;
		}).catch(function(err) {
			console.log('PoolsListController: pools ajax failed');
			console.log(err);
		});

	});

	app.controller('PoolsAddController', function(
		navMgr, messenger, pod, poolSchema,
		$scope, $http, $window, $rootScope, $routeParams
	) {
		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.poolSchema = poolSchema;
		$scope.pool = poolSchema.populateDefaults({});

		$scope.pool.championshipId = $routeParams.id;

		$scope.save = function save(pool, options) {
			options || (options = {});

			$http.post(
				'/pools/create', pool
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Pool created', '');

				if(options.addMore) {
					$scope.pool = {};
					return;
				}

				navMgr.protect(false);
				$window.location.href = '#/pools/' + data.id;
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/pools');
		};
	});


	app.controller('PoolsEditController', function(
		navMgr, messenger, pod, poolSchema, 
		$scope, $http, $routeParams, $window, orderMgmt
	) {

		$scope.poolId = $routeParams.id;

		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		$scope.poolSchema = poolSchema;
		$scope.editMode = true;

		$http.get(
			'/pools/' + $routeParams.id
		).success(function(data, status, headers, config) {
			$scope.pool = poolSchema.populateDefaults(data);
		});

		$scope.save = function save(pool, options) {
			options || (options = {});

			$http.put(
				'/pools/' + pool.id, pool
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('Pool updated', '');

				$scope.form.$setPristine();
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/pools');
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
					fName: '',
					lName: '',
					username: '',
					phone: '',
					authLevel: '',
					email: ''
				}
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

			user.active = true;

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
