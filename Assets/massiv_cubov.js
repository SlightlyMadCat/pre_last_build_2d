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
 
function Update () { 
    base_h = GameObject.Find("plane42").GetComponent(diss_2).start_height;
    if (i < mas.length) {
        distX = mas[i].transform.position.x - transform.position.x; // расстояние по горизонтали
        distY = mas[i].transform.position.y - transform.position.y; //расстояние по вертикали
        var hPlane = GameObject.Find("plane42").GetComponent(diss_2).hPlane;

        new_height = base_h+mas[i].transform.position.y*150;
        dist = distX*200;
    }

    stolk = GameObject.Find("plane42").GetComponent(Trigger).stolk;

    if (distX <=0) {
        i++;
        if (stolk == false && i < mas.length) {
            score +=10;
        }
    }
    score = GameObject.Find("cursor").GetComponent(Rotate).score;
}

function OnGUI() {
    GUI.Label(new Rect(Screen.width/2-1.5*Screen.width/4,40,500,30), "Score: "+score);
}