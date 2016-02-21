"use strict"
//スコアー処理のオブジェクト

var Calculate = {
  type:"Calculation",
  }
  Calculate.prototype.ScorePoint = function(check,point){
     if(point == 1){
       if(check==1){$scope.agpoint1="15";
       }else if(check==2){$scope.agpoint2="15";}                  
     }else if(point == 2){
       if(check==1){$scope.agpoint1="30";
       }else if(check==2){$scope.agpoint2="30";}                  
     }else if(point == 3 && point1 < 3 || point == 3 && point2 < 3){
       if(check==1){$scope.agpoint1="40";isGamePoint1=true;
       }else if(check==2){$scope.agpoint2="40";isGamePoint2=true;}
       //PointChance();
     }else if(point1 == 3 && point2 == 3){
       $scope.agpoint1="DEUCE";
       $scope.agpoint2="DEUCE";
     }else if(point1 == 3 && point2 == 4 || point1 == 4 && point2 == 3){
       if(point1 > point2){
         $scope.agpoint1="Ad";isGamePoint1=true;
       }else if(point2 > point1){
         $scope.agpoint2="Ad";isGamePoint2=true;
       }
       //PointChance();
     }else if(point1 == 4 && point2 == 4){
       point1 = 3; point2 = 3;
       $scope.agpoint1="DEUCE"; $scope.agpoint2="DEUCE";
     }else if(point1 == 3 && point2 == 5 || point1 == 5 && point2 == 3){
       if(point1 > point2){
         gamepoint1++;
         GamePoint(1,gamepoint1);
       }else if(point2 > point1){
         gamepoint2++;
         GamePoint(2,gamepoint2);
       }
     }else if(point1 == 4 && point2 < 3){
       gamepoint1++;
       GamePoint(1,gamepoint1);
     }else if(point2 == 4 && point1 < 3){
       gamepoint2++;
       GamePoint(2,gamepoint2);
     }     
  }

  Calculate.prototype.GamePoint = function(check,gamepoint){
    //PointChanceGet();
    var xx = gamecount-1,
        yy = xx+2;
    ServerChange();
    ServerChangeEasy();
    if(gamepoint < gamecount || gamepoint1 == gamecount && gamepoint2 == (gamecount-1) || gamepoint1 == (gamecount-1) && gamepoint2 == gamecount ){
      ClearPoint();
      if(check==1){$scope.aggame1=gamepoint1
      }else if(check==2){$scope.aggame2=gamepoint2}             
    }else if(gamepoint == gamecount && gamepoint1 < (gamecount-1) || gamepoint == gamecount && gamepoint2 <(gamecount-1) || gamepoint1 == yy && gamepoint2 == xx || gamepoint1 == xx && gamepoint2 == yy){
      if(gamepoint1 > gamepoint2){
        setpoint1++;
        SetPoint(1,setpoint1);
      }else if(gamepoint1 < gamepoint2){
        setpoint2++;
        SetPoint(2,setpoint2);
      }
    }else if(gamepoint1 == gamecount && gamepoint2 == gamecount){
      isTiebreak=true;//タイブレイク　スタート
      ClearPoint();
      $scope.aggame1="TIE BREAK";
      $scope.aggame2="TIE BREAK";
    }
  }
  Calculate.prototype.TieBreak = function(check,point){
    if((point1+point2)%2 == 1){
      ServerChange();
    }
    if(point < 7 || point1 > 5 && point2 > 5 && (point1-point2) == 1 || point1 > 5 && point2 > 5 && (point2-point1)==1 || point1 == point2){
      if(check==1){$scope.agpoint1=point1;
      }else if(check==2){$scope.agpoint2=point2;}
    }else if(point1==6 && point2 < 6 || point2==6 && point1 < 6 || point1 > 5 && point2 > 5 && (point1-point2)==1 || point1 > 5 && point2 > 5 && (point2-point1)==1){
      if(point1>point2)isGamePoint1=true;
      else if(point2>point1)isGamePoint2=true;
      //PointChance();
    }else if(point1 > 5 && point2 > 5 && (point1-point2)==2 || point1 > 5 && point2 > 5 && (point2-point1)==2 || point1 == 7 && point2 < 6 || point1 < 6 && point2 == 7){
      $scope.aggame1="0";
      $scope.aggame2="0";
      isTiebreak=false; //タイブレイク終了
      if(point1 > point2){
        gamepoint1++;
        setpoint1++;
        SetPoint(1,setpoint1);
      }else if(point2 > point1){
        gamepoint2++;
        setpoint2++;
        SetPoint(2,setpoint2);
      }
      ClearPoint();
    }
  }
  Calculate.prototype.SetPoint = function(check,setpoint){
  //セットポイントのカウント
  //ゲームカウントの保存
  numgamecount++;
  if(numgamecount==1){gamecountsave[0]=gamepoint1;gamecountsave[1]=gamepoint2;
  }else if(numgamecount==2){gamecountsave[2]=gamepoint1;gamecountsave[3]=gamepoint2;
  }else if(numgamecount==3){gamecountsave[4]=gamepoint1;gamecountsave[5]=gamepoint2;
  }else if(numgamecount==4){gamecountsave[6]=gamepoint1;gamecountsave[7]=gamepoint2;
  }else if(numgamecount==5){gamecountsave[8]=gamepoint1;gamecountsave[9]=gamepoint2;}
  ClearPoint();
  gamepoint1=0;
  gamepoint2=0;
  $scope.aggame1="0";
  $scope.aggame2="0";
  console.log(gamecountsave);
  if(check==1){$scope.agset1=setpoint1;
  }else if(check==2){$scope.agset2=setpoint2;}
  if(setcount == 1){
      if(setpoint1 == 1){
        if(gametype=="1"){winner=player1;
        }else{winner=player1+" & "+player3;}
        console.log(winner + "が勝者です");
        isGameSet = true;
      }else if(setpoint2 == 1){
        if(gametype=="1"){winner=player2;
        }else{winner=player2+" & "+player4;}
        console.log(winner + "が勝者です");
        isGameSet = true;
      }                                              
  }else if(setcount == 3){
      if(setpoint1 == 2){
        if(gametype=="1"){winner=player1;
        }else{winner=player1+" & "+player3;}
        console.log(winner + "が勝者です");
        isGameSet = true;
      }else if(setpoint2 == 2){
        if(gametype=="1"){winner=player2;
        }else{winner=player2+" & "+player4;}
        console.log(winner + "が勝者です");
        isGameSet = true;
      }
  }else if(setcount == 5){
      if(setpoint1 == 3){
        if(gametype=="1"){winner=player1;
        }else{winner=player1+" & "+player3;}
        console.log(winner + "が勝者です");
        isGameSet = true;
      }else if(setpoint2 == 3){
        if(gametype=="1"){winner=player2;
        }else{winner=player2+" & "+player4;}
        console.log(winner + "が勝者です");
        isGameSet = true;
      }
    }
  }
}
