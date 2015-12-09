var mas : GameObject[];
var i = 0;
var distX = 0;
var distY = 0;
var score = 0;
var stolk = false;
var new_height = 0;
var dist =  0;
var vert_speed_r : float;
var dh = 0;
var base_h = 0;
var gameOver = false;
var n = 0;

function Start() {      //ГЕНЕРАТОР ОБЛАКОВ
    var rand:float;

    for (i=0;i<mas.length;i++){
        rand = Random.Range(-15.5, 23.6);
        print(rand);   //коордианта облаков по у
        mas[i].transform.position.y = rand;
    }

    i=0;
}

function Update () { 
    base_h = GameObject.Find("plane42").GetComponent(diss_2).start_height;
    if (i < mas.length) {
        distX = mas[i].transform.position.x - transform.position.x; // расстояние по горизонтали
        distY = mas[i].transform.position.y - transform.position.y; //расстояние по вертикали
        var hPlane = GameObject.Find("plane42").GetComponent(diss_2).hPlane;

        new_height = base_h+mas[i].transform.position.y*120;
        print(new_height);
        dist = distX*200;
    }

    stolk = GameObject.Find("plane42").GetComponent(Trigger).stolk;

    if (distX <=0) {
        i++;
        if (stolk == false && i < mas.length) {
            score +=10;
        }
        //print(i);
    }
    score = GameObject.Find("cursor").GetComponent(Rotate).score;

    if (i == mas.length){
        gameOver = true;
        n = GameObject.Find("plane42").GetComponent(Trigger).i;
    }
}

function OnGUI() {
    GUI.Box(new Rect(Screen.width/6.5,40,150,30), "Score: "+Mathf.Round(score * 100)/100);

    if (gameOver == true){
        GUI.Box( new Rect(Screen.width/2 - 200,Screen.height/2 - 160,400,300), "You get "+score+" points of "+GameObject.Find("cursor").GetComponent(Rotate).count_clouds+". "+n+" barrier(s) touched.");
    }
}