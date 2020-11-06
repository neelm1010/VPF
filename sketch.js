var dog, happyDog, database, foodS, foodStock,happyDogImg,dogImg;
var buttonFeed,buttonAdd,fedTime,lastFed,foodObj

function preload()
{
  dogImg=loadImage("dogImg.png");
  happyDogImg=loadImage("dogImg1.png")
}

function setup() 
{
  createCanvas(1000, 400);
  database=firebase.database();
  console.log("dog image")
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
  
  foodObj=new Food();

  buttonFeed=createButton("Feed the dog");
  buttonFeed.position(700,95);
buttonFeed.mousePressed(feedDog);

  buttonAdd=createButton("Add Food")
  buttonAdd.position(800,95);
 buttonAdd.mousePressed(addFoods);

  fill(255,255,254)
  textSize(15);
 

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw()
{  

   
    background(46, 139, 87);
   // console.log("I am in draw");
    foodObj.display();
    fedTime=database.ref('FeedTime'); 
    fedTime.on("value",function(data){ 
      lastFed=data.val(); 
    }
      );
    if(lastFed>=12){
      text("Last Fed :"+lastFed%12+"PM",350,30)
      
        }else if(lastFed===0){
      text("Last Fed : 12 AM",350,30)
        }else{
          text("Last Fed :"+lastFed+"PM",350,30)
        }

  drawSprites();
}
function writeStock(x)
{
    if(x<=0){
  x=0
    }else{
      x=x-1
    }
  database.ref('/').update({
    Food:x
  })  
}

function readStock(data){
foodS=data.val();
 foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDogImg)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
