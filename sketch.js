const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world, cenario;
var canvas, angle, torreIMG, torre, solo, canhao;
var balas = [];
var barco;
var barcos = [];

function preload() {
    cenario = loadImage("./assets/background.gif");
    torreIMG = loadImage("./assets/tower.png");
}

function setup() {
    canvas = createCanvas(1200, 600);
    engine = Engine.create();
    world = engine.world;
    angleMode(DEGREES)
    angle = 15;

    var parado = { isStatic: true };

    solo = Bodies.rectangle(0, height - 1, width * 2, 1,parado);
    World.add(world, solo);

    torre = Bodies.rectangle(160, 350, 160, 310,parado);
    World.add(world, torre);

    canhao = new Canhao(180, 110, 130, 100, angle);

}


function draw() {
    background(189);
    image(cenario, 0, 0, width, height);
    Engine.update(engine);

    rect(solo.position.x, solo.position.y, width * 2, 1);

    push();
    imageMode(CENTER);
    image(torreIMG, torre.position.x, torre.position.y, 160, 310);
    pop();

    for (var i = 0; i < balas.length; i++) {
        if (balas[i]) {
            balas[i].display();
        }
    }
    

    canhao.display();
    mostrarBarcos()
    

}

function keyPressed() {
    if (keyCode === 32) {
        var bala = new BalaCanhao(canhao.x, canhao.y);
        bala.trajectory = [];
        Matter.Body.setAngle(bala.body, canhao.angle);
        bala.atirar();
        balas.push(bala);
    }
}

function mostrarBarcos(){
    
    if(barcos.length>0){

        if(barcos[barcos.length-1].body.position.x < width - 400){
            var barco = new Barco(width - 70, height - 60);
            barcos.push(barco);
        }
            
        for(var i =0; i < barcos.length; i++ ){ 
            barcos[i].exibir();
            Body.setVelocity(barcos[i].body, {x:-1, y:0});
        }

    }
        else{
            var barco = new Barco(width - 70, height - 60);
            barcos.push(barco);
        }

}
