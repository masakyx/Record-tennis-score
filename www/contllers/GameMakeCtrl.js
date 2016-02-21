"use strict"
angular.module('tennisapp.contollers.gamemake',[])
.contoller('GameMakeCtrl',function($scope.TennisID,socket,$ionicFrostedDelegate,$ionicScrollDelegate,$ionicPopup,$cordovaGoogleAnalytics){
    var id,
        mode;
    var tennisdata = TennisID.all();
    
    $scope.setChoice = "1";
    $scope.gameChoice = "6";
    $scope.gametype =  "1";
    $scope.modeChoice = "1";
    $scope.agtiebreak = true;
    $scope.agdeuce = true;
    $scope.player1 = "Player1";
    $scope.player2 = "Player2";

    $scope.choseType = function(){
      if($scope.gametype == "1"){
        $scope.daubles = false;
        $scope.player1 = "Player1";
        $scope.player2 = "Player2";
      }else{
        $scope.daubles = true;
        $scope.player1 = "フォアサイドPlayer1";
        $scope.player2 = "フォアサイドplayer2";
        $scope.player3 = "バックサイドPlayer1";
        $scope.player4 = "バックサイドplayer2";
      }
    }

    $scope.gamestartclick = function(){
      var creater = $scope.agcreater,
          player1 = $scope.agplayer1,
          player2 = $scope.agplayer2,
          player3 = $scope.agplayer3,
          player4 = $scope.agplayer4,
          set = $scope.setChoice,
          game = $scope.gameChoice,
          tiebreak = $scope.agtiebreak,
          deuce = $scope.agdeuce;
          mode = $scope.modeChoice;
      if($scope.gametype == "1"){
		  //シングルス
        if(creater == null || player1== null || player2== null){
          var alertPopup = $ionicPopup.alert({
            title:"名前を入力してください。"
          });
        }else{
          var confirmPopup = $ionicPopup.confirm({
            title:"試合データを作成しますか？",
            template:"試合データが作成された場合、リアルタイムに試合状況が配信されます。"
        });
          confirmPopup.then(function(res){
            if(res){
              tennisdata.creater = creater;
              tennisdata.player1 = player1;
              tennisdata.player2 = player2;
              tennisdata.gametype = "1";
              tennisdata.set = set;
              tennisdata.game = game;
              tennisdata.tiebreak = tiebreak;
              tennisdata.deuce = deuce;
              tennisdata.starttime = Date.now();
              socket.emit("tennis-start",{tennis:tennisdata,mode:mode});
            }
          });
        }
      }else{
		  //ダブルス
        if(creater == null || player1== null || player2== null || player3==null ||player4 == null){
          var alertPopup = $ionicPopup.alert({
            title:"名前を入力してください。"
          });
        }else{
          var confirmPopup = $ionicPopup.confirm({
            title:"試合データを作成しますか？",
            template:"試合データが作成された場合、リアルタイムに試合状況が配信されます。"
          });
          confirmPopup.then(function(res){
            if(res){
              tennisdata.realtime = true;
              tennisdata.creater = creater;
              tennisdata.player1 = player1;
              tennisdata.player2 = player2;
              tennisdata.player3 = player3;
              tennisdata.player4 = player4;
              tennisdata.gametype = "2";
              tennisdata.set = set;
              tennisdata.game = game;
              tennisdata.tiebreak = tiebreak;
              tennisdata.deuce = deuce;
              tennisdata.starttime=Date.now();
              socket.emit("tennis-start",{tennis:tennisdata,mode:mode});
            } 
          });
        }
      }
    }
       socket.on("tennis-start",function(data){
        tennisdata.ID = data._id;
        console.log(tennisdata);
        if($scope.modeChoice==0)location.href = "#/tab/dash/easyscoreboard/" + tennisdata.ID;
        else if($scope.modeChoice==1)location.href = "#/tab/dash/scoreboard/" + tennisdata.ID;
		// IDでURLを分けない場合
        //if($scope.modeChoice==0)location.href = "#/tab/dash/easyscoreboard";
        //else if($scope.modeChoice==1)location.href = "#/tab/dash/scoreboard";
    });
});











