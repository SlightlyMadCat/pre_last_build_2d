#pragma strict
var phase = 0;
var fall = false;
var count = 0;
var cur_y = 0;
var dh = 0;

function Start () {

}

function Update () {
    phase = GameObject.Find("plane42").GetComponent(diss_2).phase;
    fall = GameObject.Find("plane42").GetComponent(diss_2).fall;

    if (phase == 1 && fall == true) {
        if (dh > 0){
            this.transform.position.y += 0.008;
        } else {
            this.transform.position.y -= 0.008; 
        }
        count++;
    } else if (phase !=1 && phase != 2 && count > 0) {
        if (dh > 0){
            this.transform.position.y -= 0.008;
        } else {
            this.transform.position.y += 0.008; 
        }
        count--;
    }
}