class Formclass {

  constructor(){
    inp = createInput('name');
    inp.position(300,300)
    button = createButton('PLAY');
    button.position(300, 330);
  
    button1 = createButton('Reset');
    button1.position(400, 600);
  
  }
  display(){
  button.mousePressed(() => {
    name=inp.value()
    inp.hide();
    button.hide();
    player.x=20;
    player.y=20;
    // Gamestate=1;
    playercount = playercount + 1;
    player.index= playercount;
    player.updateCount();
    player.name = name;
     player.updateplayer();
  
  });
  
  button1.mousePressed(() => {
    Gamestate=0;
    player.updateGameState();
   playercount=0;
   player.updateCount();
     player.destroyPlayers();
  });
  
  
  }
  }