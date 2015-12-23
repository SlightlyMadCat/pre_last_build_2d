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
var hPlane = 0;

function Start() {      //ГЕНЕРАТОР ОБЛАКОВ
    /*var rand:float;

    for (i=0;i<mas.length;i++){
        rand = Random.Range(-15.5, 23.6);
        print(rand);   //коордианта облаков по у
        mas[i].transform.position.y = rand;
    }

    i=0;*/
}

function Update () { 
    base_h = GameObject.Find("plane42").GetComponent(diss_2).start_height;
    if (i < mas.length) {
        distX = mas[i].transform.position.x - transform.position.x; // расстояние по горизонтали
        distY = mas[i].transform.position.y - transform.position.y; //расстояние по вертикали
        hPlane = GameObject.Find("plane42").GetComponent(diss_2).hPlane;

        new_height = base_h+mas[i].transform.position.y*120;
        //print(new_height);
        dist = distX*200;
    }

    stolk = GameObject.Find("plane42").GetComponent(Trigger).stolk;

    if (distX <=0) {
        if (i < mas.length){
            i++;
            if (i+1 < mas.length){
                mas[i].transform.position.y = (hPlane - base_h)/120;
                print(mas[i].transform.position.y*120+base_h);
            }
        }
    }
    score = GameObject.Find("cursor").GetComponent(Rotate).score;

    if (i == mas.length){
        gameOver = true;
        n = GameObject.Find("plane42").GetComponent(Trigger).i;
    }
}

function OnGUI() {
    GUI.Box(new Rect(Screen.width/5,Screen.height/20,150,30), "Score: "+Mathf.Round(score * 100)/100);

    if (gameOver == true){
        var style = GameObject.Find("cursor").GetComponent(Rotate).style;
        GUI.Box( new Rect(Screen.width/2 - 300,Screen.height/2 - 160,400,300), "You get "+score+" points of 100. "/*GameObject.Find("cursor").GetComponent(Rotate).count_clouds*/+n+" barrier(s) touched.",style);
    }
}