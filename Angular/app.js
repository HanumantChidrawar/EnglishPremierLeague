//Declaring the EPLApp.
var myApp= angular.module('EPLApp',['ngRoute']);

//Start of the Main controller for index-view201x.html.
myApp.controller('mainController',['$http','$q',function($http,$q){

  var main=this; //Saving the context

  this.Data2015=[];//data storage for EPL 15/16 season
  this.Data2016=[];//data storage for EPL 16/17 season
  this.Data=[];//data storage for bothEPL seasons


  this.getRounds=function(){// function for fetching and processing seasons data

    main.Data2016= $http({
      method: 'GET',
      url:'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json'//Fetching data of epl16/17 season
    });
    main.Data2015= $http({
      method: 'GET',
      url:'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json'//Fetching data of epl16/17 season
    });

    $q.all([main.Data2016,main.Data2015]).then(function successCallback(response){// This is a promise that the following functions will be executed only after the successfull fetching of both seasons data
      main.Data2016= response[0].data;
      main.Data2015= response[1].data;
      main.Data[0]= main.Data2016;
      main.Data[1]= main.Data2015;
    },
    function errorCallback(response){// in case of any error
      alert("Error occurred");
    });

  };//end of getRounds.

this.getRounds();

}]);// end of mainController

//Match controller for match-view
myApp.controller('matchController',['$http','$routeParams','$q',function($http, $routeParams,$q){

 var main=this; //Saving the context

 this.rounds2015=[];
 this.rounds2016=[];

  this.img=[ // Collection of objects containing images of each team in EPl across the two seasons.

  {
     code: 'ARS',
     url: 'img/arsenal.jpeg'
  },

  {
     code: 'AVL',
     url: 'img/aston_villa.png'
  },

  {
     code: 'BOU',
     url: 'img/bournemouth.png'
  },

  {
     code: 'BUR',
     url: 'img/burnley.jpeg'
  },

  {
     code: 'CHE',
     url: 'img/chelsea.png'
  },

  {
     code: 'CRY',
     url: 'img/crystal_palace.jpeg'
  },

  {
     code: 'EVE',
     url: 'img/everon.png'
  },

  {
     code: 'HUL',
     url: 'img/hull city.png'
  },

  {
     code: 'LEI',
     url: 'img/Leicester City.png'
  },

  {
     code: 'LIV',
     url: 'img/liverpool.jpeg'
  },

  {
     code: 'MCI',
     url: 'img/manchester city.png'
  },

  {
     code: 'MUN',
     url: 'img/manchester united.png'
  },

  {
     code: 'MFC',
     url: 'img/middlebrough.png'
  },

  {
     code: 'NEW',
     url: 'img/newcastle united.png'
  },

  {
     code: 'NOR',
     url: 'img/norwich.png'
  },

  {
     code: 'SOU',
     url: 'img/south hampton.png'
  },

  {
     code: 'STK',
     url: 'img/stoke city.png'
  },

  {
     code: 'SUN',
     url: 'img/sunderland.png'
  },

  {
     code: 'SWA',
     url: 'img/swansea.png'
  },

  {
     code: 'TOT',
     url: 'img/tottenham hotspur.png'
  },

  {
     code: 'WAT',
     url: 'img/watford.jpeg'
  },

  {
     code: 'WBA',
     url: 'img/west brownwich albion.png'
  },

  {
     code: 'WHU',
     url: 'img/west ham united.png'
  }
  ];

    this.getRounds=function(){ // function for fetcing and processing data

      main.Data2015 = $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json');//Get request for fetching the 2015 season details.
      main.Data2016 = $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json');  //Get request for fetching the 2016 season details.

      $q.all([main.Data2015 , main.Data2016]).then(function successCallback(response){ // This is a promise that the following functions will be executed only after the successfull fetching of both seasons data
        main.rounds2015=response[0].data.rounds;
        main.rounds2016=response[1].data.rounds;

        this.matchDetails= function(){// this function will get the match details based on the team codes
         main.rounds= main.rounds2015.concat(main.rounds2016);
         main.date= $routeParams.date;
         main.year= (main.date).substr(0,4);
         main.team1code= $routeParams.team1code;// fethcing the team code send as query parameters.
         main.team2code= $routeParams.team2code;// fethcing the team code send as query parameters.

         if(main.year == 2015){// checking the date of match whether it is season 15 only which will reduce the searching time for us.
            for(var i=0; i < main.rounds2015.length; i++){
            var match1= main.rounds2015[i];
            for(var j=0; j < match1.matches.length; j++){

              main.roundName= main.rounds2015[i].name;
              matchDate= match1.matches[j].date;

              // confirming the match with the team codes & match date.
              if(matchDate == main.date && match1.matches[j].team1.code == main.team1code && match1.matches[j].team2.code == main.team2code){

                  main.teamName1= match1.matches[j].team1.name;
                  main.teamName2= match1.matches[j].team2.name;
                  main.score1= match1.matches[j].score1;
                  main.score2= match1.matches[j].score2;

                    if(main.score1 > main.score2){ //checking for winning team.
                    main.message1= (main.teamName1)+" beat "+(main.teamName2)+" by "+(main.score1 - main.score2)+" Goals.";
                    }
                    else if(main.score1 < main.score2){
                    main.message1= (main.teamName2)+" beat "+(main.teamName1)+" by "+(main.score2 - main.score1)+" Goals.";
                    }
                    else{
                    main.message1="Match Drawn";
                    }

                  }

                }

              }

            }
            else if(main.year == 2016){// checking the date of match whether it is 2016 then we have to search in both seasons.

              for(var i=0; i < main.rounds.length; i++){

                var match1= main.rounds[i];
                for(var j=0; j < match1.matches.length; j++){

                   main.roundName= main.rounds[i].name;
                   matchDate= match1.matches[j].date;

                  // confirming the match with the team codes & match date.
                   if(matchDate == main.date && match1.matches[j].team1.code == main.team1code && match1.matches[j].team2.code == main.team2code){

                       main.teamName1= match1.matches[j].team1.name;
                       main.teamName2= match1.matches[j].team2.name;
                       main.score1= match1.matches[j].score1;
                       main.score2= match1.matches[j].score2;

                         if(main.score1 > main.score2){//checking for winning team.
                         main.message1= (main.teamName1)+" beat "+(main.teamName2)+" by "+(main.score1 - main.score2)+" Goals.";
                         }
                         else if(main.score1 < main.score2){
                         main.message1= (main.teamName2)+" beat "+(main.teamName1)+" by "+(main.score2 - main.score1)+" Goals.";
                         }
                         else{
                         main.message1="Match Drawn";
                         }
                       }
                     }
                   }
                 }
                 else{
                    //this is for thoose matches which are played in 2017.
                        for(var i=0; i < main.rounds2016.length; i++){
                           var match1= main.rounds2016[i];
                           for(var j=0; j < match1.matches.length; j++){
                                 main.roundName= main.rounds2016[i].name;
                                 matchDate= match1.matches[j].date;

                                 // confirming the match with the team codes & match date.
                                 if(matchDate == main.date && match1.matches[j].team1.code == main.team1code && match1.matches[j].team2.code == main.team2code){

                                   main.teamName1= match1.matches[j].team1.name;
                                   main.teamName2= match1.matches[j].team2.name;
                                   main.score1= match1.matches[j].score1;
                                   main.score2= match1.matches[j].score2;

                                   if(main.score1 > main.score2){//checks for winning team
                                     main.message1= (main.teamName1)+" beat "+(main.teamName2)+" by "+(main.score1 - main.score2)+" Goals.";
                                   }
                                   else if(main.score1 < main.score2){
                                     main.message1= (main.teamName2)+" beat "+(main.teamName1)+" by "+(main.score2 - main.score1)+" Goals.";
                                   }
                                   else{
                                     main.message1="Match Drawn";
                                   }
                                 }
                               }
                             }
                 }

            for(var i=0; i< main.img.length; i++){// Getting the correct Image og logo based on the team code we have.

              if(main.team1code == main.img[i].code)
      	       main.url1= main.img[i].url;
               else if(main.team2code == main.img[i].code)
      	        main.url2= main.img[i].url;
                else{}

              }

    };// end of matchDetails function

    this.matchDetails();
  },
  function errorCallback(response) {
      alert("Error occurred");
  });//end 0f $q service

    };//end of getRounds.

   this.getRounds();
}]);//end of match-controller.

//Team View Controller
myApp.controller('teamController',['$http','$routeParams','$q',function($http,$routeParams,$q){

  var main=this; //Saving the context

  this.data1=[];
  this.data2=[];

  this.stats={//Object for storing all the data about the team whoose team code is passed as query parameter.
     code: ' ',
     name: ' ',
     count: {
    	  won15: 0,
    	  lost15: 0,
      	tied15: 0,
      	goals15: 0,
        won16: 0,
      	lost16: 0,
      	tied16: 0,
      	goals16: 0
  	 },
     wonMatches15: [],
     lostMatches15: [],
     tiedMatches15: [],
     wonMatches16: [],
     lostMatches16: [],
     tiedMatches16: [],
  };

  this.img=[// array of abjects containing the images which are logos of the teams in EPL.

  {
     code: 'ARS',
     url: 'img/arsenal.jpeg'
  },

  {
     code: 'AVL',
     url: 'img/aston_villa.png'
  },

  {
     code: 'BOU',
     url: 'img/bournemouth.png'
  },

  {
     code: 'BUR',
     url: 'img/burnley.jpeg'
  },

  {
     code: 'CHE',
     url: 'img/chelsea.png'
  },

  {
     code: 'CRY',
     url: 'img/crystal_palace.jpeg'
  },

  {
     code: 'EVE',
     url: 'img/everon.png'
  },

  {
     code: 'HUL',
     url: 'img/hull city.png'
  },

  {
     code: 'LEI',
     url: 'img/Leicester City.png'
  },

  {
     code: 'LIV',
     url: 'img/liverpool.jpeg'
  },

  {
     code: 'MCI',
     url: 'img/manchester city.png'
  },

  {
     code: 'MUN',
     url: 'img/manchester united.png'
  },

  {
     code: 'MFC',
     url: 'img/middlebrough.png'
  },

  {
     code: 'NEW',
     url: 'img/newcastle united.png'
  },

  {
     code: 'NOR',
     url: 'img/norwich.png'
  },

  {
     code: 'SOU',
     url: 'img/south hampton.png'
  },

  {
     code: 'STK',
     url: 'img/stoke city.png'
  },

  {
     code: 'SUN',
     url: 'img/sunderland.png'
  },

  {
     code: 'SWA',
     url: 'img/swansea.png'
  },

  {
     code: 'TOT',
     url: 'img/tottenham hotspur.png'
  },

  {
     code: 'WAT',
     url: 'img/watford.jpeg'
  },

  {
     code: 'WBA',
     url: 'img/west brownwich albion.png'
  },

  {
     code: 'WHU',
     url: 'img/west ham united.png'
  }
  ];

  this.teamCode= $routeParams.teamCode;//getting the query parameter using team code.

  this.getRounds=function(){

    main.Data2015 = $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json');//Get request for fetching the 2015 season details.
    main.Data2016 = $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json');  //Get request for fetching the 2016 season details.

  $q.all([main.Data2015,main.Data2016]).then(function successCallback(response){// promise that the function will be executed after tfetching data.
    main.Data2015=response[0].data;
    main.Data2016=response[1].data;

    this.getStats= function(){ // function for collecting the data for the team

    for(var i=0; i < main.Data2015.rounds.length; i++){ // EPL season 2015

           var match1= main.Data2015.rounds[i];

           for(var j=0; j < match1.matches.length; j++){

              if(match1.matches[j].team1.code === main.teamCode ){ // checking for the correct team by matching team code.
                  main.stats.code= match1.matches[j].team1.code;
                  if(main.stats.name === ' ')//setting the team name in object only if empty.
                      main.stats.name= match1.matches[j].team1.name;

                    if(match1.matches[j].score1 > match1.matches[j].score2){
                           main.stats.count.won15++;//counting the matches won in EPL15/16
                           main.stats.wonMatches15.push(match1.matches[j]);//collecting the matches won in EPL15/16
                    }
                    else if(match1.matches[j].score1 < match1.matches[j].score2){//counting & collecting the matches lost in EPL15/16
                          	main.stats.count.lost15++;
                            main.stats.lostMatches15.push(match1.matches[j]);
                    }
                    else{//counting & collecting the matches tied in EPL15/16
                            main.stats.count.tied15++;
                            main.stats.tiedMatches15.push(match1.matches[j]);
                    }

    		              main.stats.count.goals15 += match1.matches[j].score1;// counting the goals scored in EPL15/16
                  }
              else if(match1.matches[j].team2.code === main.teamCode ){

                    main.stats.code=match1.matches[j].team2.code;
                    if(main.stats.name === ' ')
                      main.stats.name= match1.matches[j].team2.name;

                    if(match1.matches[j].score2 > match1.matches[j].score1){
                           main.stats.count.won15++;
                           main.stats.wonMatches15.push(match1.matches[j]);
                    }
                    else if(match1.matches[j].score2 < match1.matches[j].score1){
                    	     main.stats.count.lost15++;
                           main.stats.lostMatches15.push(match1.matches[j]);
                    }
                    else{
                           main.stats.count.tied15++;
                           main.stats.tiedMatches15.push(match1.matches[j]);
                    }
    		              main.stats.count.goals15 += match1.matches[j].score2;
                  }
                  else{}

                }

              }


                  for(var i=0; i < main.Data2016.rounds.length; i++){ // similarly for EPL season 2016/17

                         var match1= main.Data2016.rounds[i];

                         for(var j=0; j < match1.matches.length; j++){

                            if(match1.matches[j].team1.code === main.teamCode ){
                                main.stats.code= match1.matches[j].team1.code;
                                if(main.stats.name === ' ')
                                    main.stats.name= match1.matches[j].team1.name;

                                  if(match1.matches[j].score1 > match1.matches[j].score2){
                                         main.stats.count.won16++;
                                         main.stats.wonMatches16.push(match1.matches[j]);
                                  }
                                  else if(match1.matches[j].score1 < match1.matches[j].score2){
                                  	     main.stats.count.lost16++;
                                         main.stats.lostMatches16.push(match1.matches[j]);
                                  }
                                  else{
                                        main.stats.count.tied16++;
                                        main.stats.tiedMatches16.push(match1.matches[j]);
                                  }

                  		              main.stats.count.goals16 += match1.matches[j].score1;
                                }
                            else if(match1.matches[j].team2.code === main.teamCode ){

                                  main.stats.code=match1.matches[j].team2.code;
                                  if(main.stats.name === ' ')
                                    main.stats.name= match1.matches[j].team2.name;

                                  if(match1.matches[j].score2 > match1.matches[j].score1){
                                         main.stats.count.won16++;
                                         main.stats.wonMatches16.push(match1.matches[j]);
                                  }
                                  else if(match1.matches[j].score2 < match1.matches[j].score1){
                                  	     main.stats.count.lost16++;
                                         main.stats.lostMatches16.push(match1.matches[j]);
                                  }
                                  else{
                                          main.stats.count.tied16++;
                                          main.stats.tiedMatches16.push(match1.matches[j]);
                                  }

                  		              main.stats.count.goals16 += match1.matches[j].score2;
                                }
                                else{}

                              }

                            }

    }// end of getStats function.

    this.getStats();

    main.teamStatistics= main.stats.count;
    main.matches15 = main.stats.matches15;
    main.matches16 = main.stats.matches16;
    main.teamName = main.stats.name;

    for(var i=0; i< main.img.length; i++){//setting the team logo as per team code.

      if(main.teamCode == main.img[i].code)
      	 main.url= main.img[i].url;
     }

  },
  function errorCallback(response) {//in case of failure.
      alert("Error occurred.");
  });

  };//end of getRounds.

  this.getRounds();

}]);// end of teamController
