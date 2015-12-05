#pragma strict
var speed = 0.2;

function Update () {
    speed = GameObject.Find("plane42").GetComponent(diss_2).speed;
    this.transform.position.x+=speed;
}