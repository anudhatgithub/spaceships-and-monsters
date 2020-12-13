class Player {

    constructor() {  
    
        this.index = null;

        this.name = "";

        this.x = 0;
        this.y = 0;
        
        this.ball = null;

        this.ball1 = createSprite(600, 600, 10, 10);
        this.ball1.shapeColor = "white";
        
        this.ball2 = createSprite(600, 600, 10, 10);
        this.ball2.shapeColor = "purple";
        
        this.ball3 = createSprite(600, 600, 10, 10);
        this.ball3.shapeColor = "yellow";
        
        this.ball4 = createSprite(600, 600, 10, 10);
        this.ball4.shapeColor = "red";

        this.balls = [this.ball1, this.ball2, this.ball3, this.ball4];

        
    }
    
    display() {
        this.getPlayers();
        if(allPlayers !== null){
            // if(this.index === 1){
            //     this.ball = this.ball1;
            // }
            // if(this.index === 2){
            //     this.ball = this.ball2;
            // }
            // if(this.index === 3){
            //     this.ball = this.ball3;
            // }
            // if(this.index === 4){
            //     this.ball = this.ball4;
            // }
            // this.ball.collide(edges)
            this.lasers();
            this.getPlayers();
        
            var i=0;
            for( var pr in allPlayers){
                i=allPlayers[pr].index-1;
                // console.log(i)
                if(i+1 !== this.index){
                    this.balls[i].x = allPlayers[pr].position.x;
                    this.balls[i].y = allPlayers[pr].position.y;
                }
                
                // console.log("Player index" +this.index +1)
                // console.log("AllPlayer index" +allPlayers[pr].index)

                // if(this.index +1 === allPlayers[pr].index ){
                //     this.ball.x = allPlayers[pr].position.x;
                //     this.ball.y = allPlayers[pr].position.y;
                // }
                // i=i+1;
            }

            if (Gamestate === 1) {

                if (frameCount % 100 === 0) {
                    this.spawnMonsters();
                }
                for (let m = 0; m < MonsterArray.length; m++) {
                    if (MonsterArray[m].isTouching(this.balls[this.index-1])) {
                        Gamestate = 2
                        this.balls[this.index-1].x = windowWidth / 2
                        this.balls[this.index-1].y = windowHeight / 2


                    }


                }

            }

            for (let m = 0; m < MonsterArray.length; m++) {

                MonsterArray[m].bounceOff(edges)


            }


            
            for (let i = 0; i < laserArray.length; i++) {
                for (let m = 0; m < MonsterArray.length; m++) {
                    if (laserArray[i].isTouching(MonsterArray[m])) {
                        laserArray[i].lifetime = 0;
                        MonsterArray[m].destroy();
                    }

                }



                
            }
            if (Gamestate === 2) {
                this.balls[this.index-1].visible = false;
                textSize(25)
                fill("RED");
                text("GAME OVER!!,TRY AGAIN?,Press r to try again", windowWidth / 2, windowHeight / 2)
                

            }
            if (keyWentDown("R")) {
                Gamestate = 1;
                this.balls[this.index-1].visible = true;
                this.balls[this.index-1].x = 20;
                this.balls[this.index-1].y = 20;
                
                
            }
            if (Gamestate === 1) {
                textSize(20)
                text(name, this.balls[this.index-1].x, this.balls[this.index-1].y - 20)
                text(this.balls[this.index-1].x +"," +this.balls[this.index-1].y, 200,200)
                
            }
            if (keyDown(LEFT_ARROW)) {
                console.log("left")
                this.changePosition(-5, 0);

            }
            else if (keyDown(RIGHT_ARROW)) {
                this.changePosition(5, 0);

            }
            else if (keyDown(UP_ARROW)) {
                this.changePosition(0, -5);
            }
            else if (keyDown(DOWN_ARROW)) {
                this.changePosition(0, +5);
            }
            drawSprites();
        }
    }

    changePosition(x, y) {
        this.balls[this.index-1].x = this.balls[this.index-1].x + x;
        this.balls[this.index-1].y = this.balls[this.index-1].y + y;
        this.updateplayer();
    }
    
    lasers() {
        if (keyWentDown("space") && Gamestate === 1) {
            var laser1 = createSprite(this.balls[this.index-1].x, this.balls[this.index-1].y, 15, 5)
            var laser2 = createSprite(this.balls[this.index-1].x, this.balls[this.index-1].y, 5, 15)
            var laser3 = createSprite(this.balls[this.index-1].x, this.balls[this.index-1].y, 15, 5)
            var laser4 = createSprite(this.balls[this.index-1].x, this.balls[this.index-1].y, 5, 15)

            laser1.shapeColor = "yellow"
            laser2.shapeColor = "yellow"
            laser3.shapeColor = "yellow"
            laser4.shapeColor = "yellow"

            laser1.velocityX = 7
            laser1.velocityY = 0
            laser2.velocityX = 0
            laser2.velocityY = 7
            laser3.velocityX = -7
            laser3.velocityY = 0
            laser4.velocityX = 0
            laser4.velocityY = -7

            laser1.lifetime = 200;
            laser2.lifetime = 200;
            laser3.lifetime = 200;
            laser4.lifetime = 200;

            laserArray.push(laser1);
            laserArray.push(laser2);
            laserArray.push(laser3);
            laserArray.push(laser4);
        }


    }
    spawnMonsters() {
        var Monster = createSprite(random(200, 500), random(200, 500), 20, 20)
        Monster.shapeColor = "Green";
        Monster.velocityX = (random(1, 5))
        Monster.velocityY = (random(1, 5))


        MonsterArray.push(Monster)
    }

    updateCount() {
        console.log("update count" + playercount);
        database.ref("/").update({
            playercount: playercount
        })

    }
    getCount() {
        database.ref("playercount").once("value").then((data) => {
            playercount = data.val();
            // console.log("getcount" + playercount);
        })
    }
    updateplayer() {
        // console.log("update player" + this.index);
        database.ref("players/player" + this.index).update({
            name: name,
            position: {
                x: this.balls[this.index-1].x,
                y: this.balls[this.index-1].y
            },
            index: this.index
        })
    }
    getPlayer() {
        database.ref("players/player" + this.index + "/position").once("value").then((data) => {
            var pos = data.val();
            this.x = pos.x;
            this.y = pos.y;
            this.balls[this.index-1].collide(edges);
        })
    }
    getPlayers() {
        database.ref("players").once("value").then((data) => {
            allPlayers = data.val();

        })
    }
    updateGameState(){
        console.log("update gs" + Gamestate);
        database.ref("/").update({
            Gamestate: Gamestate
        })

    }
    getGameState() {
        database.ref("Gamestate").once("value").then((data) => {
            Gamestate = data.val();
            // console.log("GameState" + Gamestate);
        })
    }

    destroyPlayers(){
        database.ref("/").update({
            players : null
        })

        
    }
}                                                                   