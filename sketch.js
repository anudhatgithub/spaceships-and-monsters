var ball;
var carColor;
var inp, button , button1
var name = "";
var edges;
var Gamestate = 0;
var laserArray = [];
var MonsterArray = [];
var player;
var playercount=null;
var allPlayers=null;
var greeting;

function setup() {
    createCanvas(windowWidth, windowHeight);

     database = firebase.database();

                 
    // database.ref("car").on("value",(data)=>{
    //     carColor = data.val();
    //     console.log(carColor);

    // })
     
    player = new Player();
    player.getCount();

    form = new Formclass()
    edges = createEdgeSprites();


}

function draw() {
    background("blue");
    if(Gamestate===0){
        player.getCount();
        form.display();
        player.getGameState();
        // greeting  =  createElement('h1',"Waiting for other Players");
        // greeting.position(windowWidth/2,windowHeight/2);
        // if(Gamestate===1){
        //     greeting.hide();
        // }
    }
    if(playercount===4 && Gamestate===0){
      Gamestate = 1;
      player.updateGameState(); 
    }
    if(Gamestate===1){
        player.display();
    }
}


                                                   
