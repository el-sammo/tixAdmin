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
		// Areas
		///

		$routeProvider.when('/', {
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

	app.controller('LoadServices', function(loginModal, errMgr) {});


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

	app.controller('AreasListController', function($scope, $http, $routeParams) {
		//TODO
		//get areaId
		var areaId = '54b32e4c3756f5d15ad4ca49';

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

				console.log($scope.menu.slug);
		
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
