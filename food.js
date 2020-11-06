class Food{
    constructor(){
        this.foodStock=0;
        this.lastFed;
        this.image=loadImage("Milk.png");
    }
    updateFoodStock(foodStock){
        this.foodStock=foodStock;

    }
    getFedTime(lastFed){
        this.lastfed=lastfed;
    }
getFoodStock(){
    return this.foodStock;
}
    display(){
        var x=80,y=100;
        //console.log("iam in display")
        imageMode(CENTER);

        image(this.image,400,100,70,70)
        console.log("outside if:"+this.foodStock)
        if(this.foodStock!=0){
            console.log(this.foodStock)
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=50
                    y=y+50
                }
                image(this.image,x,y,50,50)
                x=x+30;
            }
        }
    }
}