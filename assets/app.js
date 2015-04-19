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
		// Order
		///

		$routeProvider.when('/orderDetails/:id', {
			controller: 'OrderDetailsController',
			templateUrl: '/templates/orderDetails.html'
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

	app.controller('LoadServices', function(loginModal, errMgr, fakeAuth) {});

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
		homeMgmt
	) {
		var areaId = $rootScope.areaId;
		$scope.areaId = $rootScope.areaId;
		$scope.authLevel = $rootScope.authLevel;

		// Auth Level Map
		// Should Exist in a Config
		// 1 - basic auth level; access to minimal functionality
		// 2 - slightly expanded auth level; access to user-assigned orders (driver)
		// 3 - expanded auth level; access to all orders; access to all customer info; dispatch (operator)
		// 4 - enhanced auth level; access to all orders, scheduling/payroll verification, basic reports (manager)
		// 5 - unrestricted auth level
	
		$scope.dailyOrders = homeMgmt.dailyOrders;
		$scope.weeklyOrders = homeMgmt.weeklyOrders;
		$scope.monthlyOrders = homeMgmt.monthlyOrders;

		$scope.dailySignUps = homeMgmt.dailySignUps;
		$scope.weeklySignUps = homeMgmt.weeklySignUps;
		$scope.monthlySignUps = homeMgmt.monthlySignUps;

		var od = $http.get('/orders/daily/' +areaId);

		od.error(function(err) {
			console.log('HomeController: orders-daily ajax failed');
			console.log(err);
			$scope.dayOrders = 'err';
		});

		od.then(function(res) {
			var dailyOrders = res.data;
			var dayGrossRevenue = 0;
			var dayNetRevenue = 0;
			if(dailyOrders && dailyOrders.length > 0) {
				dailyOrders.forEach(function(order) {
					dayGrossRevenue += parseFloat(order.total);
					if(order.discount) {
						dayNetRevenue += (parseFloat(order.deliveryFee) - parseFloat(order.discount));
					} else {
						dayNetRevenue += parseFloat(order.deliveryFee);
					}
				});
			}
			$scope.dayGrossRevenue = dayGrossRevenue.toFixed();
			$scope.dayNetRevenue = dayNetRevenue.toFixed();
			$scope.dayOrders = res.data.length;
		});

		var ow = $http.get('/orders/weekly/' +areaId);

		ow.error(function(err) {
			console.log('HomeController: orders-weekly ajax failed');
			console.log(err);
			$scope.weekOrders = 'err';
		});

		ow.then(function(res) {
			var weekOrders = res.data;
			var weekGrossRevenue = 0;
			var weekNetRevenue = 0;
			if(weekOrders && weekOrders.length > 0) {
				weekOrders.forEach(function(order) {
					weekGrossRevenue += parseFloat(order.total);
					if(order.discount) {
						weekNetRevenue += (parseFloat(order.deliveryFee) - parseFloat(order.discount));
					} else {
						weekNetRevenue += parseFloat(order.deliveryFee);
					}
				});
			}
			$scope.weekGrossRevenue = weekGrossRevenue.toFixed();
			$scope.weekNetRevenue = weekNetRevenue.toFixed();
			$scope.weekOrders = res.data.length;
		});

		var om = $http.get('/orders/monthly/' +areaId);

		om.error(function(err) {
			console.log('HomeController: orders-monthly ajax failed');
			console.log(err);
			$scope.weeksOrders = 'err';
		});

		om.then(function(res) {
			var weeksOrders = res.data;
			var weeksGrossRevenue = 0;
			var weeksNetRevenue = 0;
			if(weeksOrders && weeksOrders.length > 0) {
				weeksOrders.forEach(function(order) {
					weeksGrossRevenue += parseFloat(order.total);
					if(order.discount) {
						weeksNetRevenue += (parseFloat(order.deliveryFee) - parseFloat(order.discount));
					} else {
						weeksNetRevenue += parseFloat(order.deliveryFee);
					}
				});
			}
			$scope.weeksGrossRevenue = weeksGrossRevenue.toFixed();
			$scope.weeksNetRevenue = weeksNetRevenue.toFixed();
			$scope.weeksOrders = res.data.length;
		});

		var odo = $http.get('/orders/dailyOrphaned/' +areaId);

		odo.error(function(err) {
			console.log('HomeController: orphans-daily ajax failed');
			console.log(err);
			$scope.dayOrphans = 'err';
		});

		odo.then(function(res) {
			$scope.dayOrphans = res.data.length;
		});

		var owo = $http.get('/orders/weeklyOrphaned/' +areaId);

		owo.error(function(err) {
			console.log('HomeController: orphans-weekly ajax failed');
			console.log(err);
			$scope.weekOrphans = 'err';
		});

		owo.then(function(res) {
			$scope.weekOrphans = res.data.length;
		});

		var omo = $http.get('/orders/monthlyOrphaned/' +areaId);

		omo.error(function(err) {
			console.log('HomeController: orphans-monthly ajax failed');
			console.log(err);
			$scope.weeksOrphans = 'err';
		});

		omo.then(function(res) {
			$scope.weeksOrphans = res.data.length;
		});

		var cd = $http.get('/customers/daily/' +areaId);

		cd.error(function(err) {
			console.log('HomeController: customers-daily ajax failed');
			console.log(err);
			$scope.daySignups = 'err';
		});

		cd.then(function(res) {
			$scope.daySignUps = res.data;
			$scope.daySignups = res.data.length;
		});

		var cw = $http.get('/customers/weekly/' +areaId);

		cw.error(function(err) {
			console.log('HomeController: customers-weekly ajax failed');
			console.log(err);
			$scope.weekSignups = 'err';
		});

		cw.then(function(res) {
			$scope.weekSignUps = res.data;
			$scope.weekSignups = res.data.length;
		});

		var cm = $http.get('/customers/monthly/' +areaId);

		cm.error(function(err) {
			console.log('HomeController: customers-monthly ajax failed');
			console.log(err);
			$scope.weeksSignups = 'err';
		});

		cm.then(function(res) {
			$scope.weeksSignUps = res.data;
			$scope.weeksSignups = res.data.length;
		});

		var ad = $http.get('/applicants/daily/' +areaId);

		ad.error(function(err) {
			console.log('HomeController: applicants-daily ajax failed');
			console.log(err);
			$scope.dayApplicants = 'err';
		});

		ad.then(function(res) {
			$scope.dayApplicants = res.data.length;
		});

		var aw = $http.get('/applicants/weekly/' +areaId);

		aw.error(function(err) {
			console.log('HomeController: applicants-weekly ajax failed');
			console.log(err);
			$scope.weekApplicants = 'err';
		});

		aw.then(function(res) {
			$scope.weekApplicants = res.data.length;
		});

		var am = $http.get('/applicants/monthly/' +areaId);

		am.error(function(err) {
			console.log('HomeController: applicants-monthly ajax failed');
			console.log(err);
			$scope.weeksApplicants = 'err';
		});

		am.then(function(res) {
			$scope.weeksApplicants = res.data.length;
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

				messenger.show('The area has been created.', 'Success!');

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

				messenger.show('The area has been updated.', 'Success!');

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
	
			links: {
				website: {
					placeholder: function(customer) {
						return 'www.' + nameTransform(customer) + '.com';
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

				messenger.show('The customer has been created.', 'Success!');

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
		navMgr, messenger, pod, customerSchema, $scope, $http, $routeParams
	) {

		$scope.completedCount = 0;

		navMgr.protect(function() { return $scope.form.$dirty; });
		pod.podize($scope);

		var p = $http.get('/orders/byCustomerId/' + $routeParams.id);
	
		p.error(function(err) {
			console.log('CustomersEditController: customers-orders ajax failed');
			console.log(err);
		});
	
		p.then(function(res) {
			res.data.forEach(function(order) {
				if(order.orderStatus > 8) {
					$scope.completedCount ++;
				}
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

				messenger.show('The customer has been updated.', 'Success!');

				$scope.form.$setPristine();
			});
		};

		$scope.orderHistory = function orderHistory() {
			navMgr.cancel('#/customers/orders/' +$routeParams.id);
		};

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


	///
	// Controllers: Dispatch
	///

	app.controller('DispatchController', function($scope, $http, $routeParams, $rootScope, $window) {
		var areaId = $rootScope.areaId;
		$scope.authLevel = $rootScope.authLevel;

		// Auth Level Map
		// Should Exist in a Config
		// 1 - basic auth level; access to minimal functionality
		// 2 - slightly expanded auth level; access to user-assigned orders (driver)
		// 3 - expanded auth level; access to all orders; access to all customer info; dispatch (operator)
		// 4 - enhanced auth level; access to all orders, scheduling/payroll verification, basic reports (manager)
		// 5 - unrestricted auth level

		setTimeout(function() {
			$window.location.reload();
		}, 30000);

		var p = $http.get('/orders/last24Hours/' + areaId);
	
		p.error(function(err) {
			console.log('DispatchController: orders-last24hours ajax failed');
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
					'Order In Route',
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


	///
	// Controllers: Dispatch Order
	///

	app.controller('DispatchOrderController', function(
		$scope, $http, $routeParams, 
		$rootScope, messenger, $window
	) {
		var areaId = $rootScope.areaId;
		$scope.authLevel = $rootScope.authLevel;

		// Auth Level Map
		// Should Exist in a Config
		// 1 - basic auth level; access to minimal functionality
		// 2 - slightly expanded auth level; access to user-assigned orders (driver)
		// 3 - expanded auth level; access to all orders; access to all customer info; dispatch (operator)
		// 4 - enhanced auth level; access to all orders, scheduling/payroll verification, basic reports (manager)
		// 5 - unrestricted auth level

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

		$scope.dispatchOrder = function(orderId, driverId) {
			$scope.order.driverId = driverId;

			$scope.order.orderStatus = parseInt($scope.order.orderStatus);

			$http.put(
				'/orders/' + orderId, $scope.order
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('The order has been dispatched.', 'Success!');
				$http.post('/mail/sendOrderToDriver/'+orderId);

				$window.location.href = '#/dispatch/';
			});
		};
	});


	///
	// Controllers: Order
	///

	app.controller('OrderDetailsController', function(
		$scope, $http, $routeParams, $rootScope, 
		$q, $sce, configMgr, querystring, messenger,
		$window
	) {
		var areaId = $rootScope.areaId;
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

		// Auth Level Map
		// Should Exist in a Config
		// 1 - basic auth level; access to minimal functionality
		// 2 - slightly expanded auth level; access to user-assigned orders (driver)
		// 3 - expanded auth level; access to all orders; access to all customer info; dispatch (operator)
		// 4 - enhanced auth level; access to all orders, scheduling/payroll verification, basic reports (manager)
		// 5 - unrestricted auth level

		var p = $http.get('/orders/' + $routeParams.id);
	
		p.error(function(err) {
			console.log('OrderDetailsController: order ajax failed');
			console.log(err);
		});
	
		p.then(function(res) {
			$scope.order = res.data;
			$scope.orderStatus = $scope.order.orderStatus;
			$scope.paymentMethod = $scope.order.paymentMethods;
			$scope.total = '$'+parseFloat($scope.order.total).toFixed(2);
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

		$scope.setOrderPlaced = function(order) {
			order.orderStatus = parseInt(6);
			order.orderPlacedAt = new Date().getTime();
			$http.put(
				'/orders/' + order.id, order
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('The order has been placed.', 'Success!');

				$window.location.href = '#/dispatch/';
			});
		}

		$scope.setOrderCollected = function(order) {
			order.orderStatus = parseInt(7);
			order.orderCollectedAt = new Date().getTime();
			$http.put(
				'/orders/' + order.id, order
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('The order has been collected.', 'Success!');

				$window.location.href = '#/orderDetails/' + order.id;
			});
		}

		$scope.setOrderEnRoute = function(order) {
			order.orderStatus = parseInt(8);
			order.orderEnRouteAt = new Date().getTime();
			$http.put(
				'/orders/' + order.id, order
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('The order is en route.', 'Success!');

				$window.location.href = '#/orderDetails/' + order.id;
			});
		}

		$scope.setOrderDelivered = function(order) {
			order.orderStatus = parseInt(9);
			order.orderDeliveredAt = new Date().getTime();
			$http.put(
				'/orders/' + order.id, order
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('The order has been delivered.', 'Success!');

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

				messenger.show('The hotel has been created.', 'Success!');

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

				messenger.show('The hotel has been updated.', 'Success!');

				$scope.form.$setPristine();
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/');
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

				messenger.show('The promo has been created.', 'Success!');

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

				messenger.show('The promo has been updated.', 'Success!');

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

				messenger.show('The restaurant has been created.', 'Success!');

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

				messenger.show('The restaurant has been updated.', 'Success!');

				$scope.form.$setPristine();
			});
		};

		$scope.cancel = function cancel() {
			navMgr.cancel('#/');
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
		
				messenger.show('The story has been created.', 'Success!');
		
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
		
					messenger.show('The menu has been created.', 'Success!');
		
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

				messenger.show('The menu has been updated.', 'Success!');

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

				messenger.show('The item has been created.', 'Success!');

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

				messenger.show('The item has been updated.', 'Success!');

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

				messenger.show('The option has been created.', 'Success!');

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

				messenger.show('The option has been updated.', 'Success!');

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

	// Auth Level Map
	// Should Exist in a Config
	// 1 - basic auth level; access to minimal functionality
	// 2 - slightly expanded auth level; access to user-assigned orders (driver)
	// 3 - expanded auth level; access to all orders; access to all customer info; dispatch (operator)
	// 4 - enhanced auth level; access to all orders, scheduling/payroll verification, basic reports (manager)
	// 5 - unrestricted auth level
	
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
		console.log('$rootScope.areaId: '+$rootScope.areaId);

		// TODO 
		// clean phone number; integers only

		$scope.save = function save(user, options) {
			options || (options = {});

			$http.post(
				'/users/create', user
			).success(function(data, status, headers, config) {
				if(status >= 400) return;

				messenger.show('The user has been created.', 'Success!');

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

				messenger.show('The user has been updated.', 'Success!');

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
