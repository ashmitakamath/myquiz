class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide()
    background("yellow")
    fill(0)
    textSize(30)
    text("Result of the quiz",340,50)
    Contestant.getPlayerInfo()
    if(allConstestants  !== undefined){
      var displayAnswers=230
      fill("Blue")
      textSize(20)
      text("Note: Contestants who answered correct answers are highlighted in green color",130,230)
      for(var plr in allConstestants){
        var correctAnswers="2"
        if(correctAnswers===allConstestants[plr].answer)
        fill("green")
        else 
        fill(red)
        displayAnswers+=30
        textSize(20)
        text(allConstestants[plr].name+":"+allConstestants[plr].answer,250,displayAnswers)
        
      }
    }
    


    
    
  }

}
