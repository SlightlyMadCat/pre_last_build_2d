#pragma strict
var phase = 0;
var fall = false;
var count = 0;
var cur_y = 0;

function Start () {

}

function Update () {
    phase = GameObject.Find("plane42").GetComponent(diss_2).phase;
    fall = GameObject.Find("plane42").GetComponent(diss_2).fall;

    var hPlane = GameObject.Find("plane42").GetComponent(diss_2).hPlane;
    var new_height = GameObject.Find("plane42").GetComponent(diss_2).new_height;

    if (phase == 1 && fall == true) {
        if (hPlane > new_height){
            this.transform.position.y += 0.008;
        } else {
            this.transform.position.y -= 0.008; 
        }
        count++;
    } else if (phase ==3 || count > 0) {
        if (hPlane > new_height){
            this.transform.position.y -= 0.008;
        } else {
            this.transform.position.y += 0.008; 
        }
        count--;
        //print(count);
    }
}