#pragma strict
var speed = 0.2;
var gameOver = false;

function Update () {
    speed = GameObject.Find("plane42").GetComponent(diss_2).speed;
    this.transform.position.x+=speed;
}

function Start () {
    print(Screen.height);
    print(Screen.width);
}