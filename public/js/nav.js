angular.module('sarDatabase')
.controller('navController', ['$scope', '$timeout', '$q', '$log', '$window', '$mdSidenav',
function($scope, $timeout, $q, $log, $window, $mdSidenav) {
  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }

  var userOpenEvent;
  
  angular.extend($scope, {
    toggleNav: buildToggler('left'),
    
    user: $window.user,
    openUser: function openUser($mdOpenMenu, ev) {
      userOpenEvent = ev;
      $mdOpenMenu(ev);
    },
    login: function login(ev) {
      alert('Not implemented');
    },
    
    search: {
      searchText: '',

      querySearch: function(query) {
        var deferred = $q.defer();
        var results = [
          { first: 'Matt', last: 'Cosand' },
          { first: 'Amber', last: 'Cosand' }
        ];
        
        $timeout(function() { deferred.resolve(results); }, 1000, false);
        return deferred.promise;
      },
      searchTextChange: function searchTextChange(text) {
        $log.info('Text changed to ' + text);
      },
      selectedItemChange: function selectedItemChange(item) {
        $log.info('Item changed to ' + JSON.stringify(item));
      }
    }
  });
}]);