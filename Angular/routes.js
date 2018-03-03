// Defining the routes for myApp

myApp.config(['$routeProvider',function($routeProvider){
  $routeProvider
      .when('/',{
        //path to the file
        templateUrl: 'views/index-view2016.html', // Intitial route to EPL 2016/17 season.
        //declaring the controller
        controller: 'mainController',
        //alias for controller
        controllerAs: 'myEPL'
      })
      .when('/15',{
        //path to the file
        templateUrl: 'views/index-view2015.html', // on demand route to EPL 2015/16 season.
        //declaring the controller
        controller: 'mainController',
        //alias for controller
        controllerAs: 'myEPL'
      })
      .when('/match-view/:date/:team1code/:team2code',{// on demand route to Match View with date & team codes as parameters.
        //path to the file
        templateUrl: 'views/match-view.html',
        //declaring the controller
        controller: 'matchController',
        //alias for controller
        controllerAs: 'matchStats'
      })
      .when('/team-view/:teamCode',{// on demand route to Team View with  team code as parameter.
        //path to the file
        templateUrl: 'views/team-view.html',
        //declaring the controller
        controller: 'teamController',
        //alias for controller
        controllerAs: 'teamStats'
      })
      .otherwise(
          {
              template   : '<h1>404 page not found</h1>' // in case of some unrecognised path.
          }
        );
}]);
