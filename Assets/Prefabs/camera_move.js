#pragma strict
var speed = 0.2;

function Update () {
    speed = GameObject.Find("plane42").GetComponent(diss_2).speed;
    this.transform.position.x+=speed;
}

function Start () {
    print(Screen.height);
    print(Screen.width);

    /*var scale : float;
    scale  = Screen.width/349f;

    GameObject.Find("variometr").transform.localScale.x=scale;
    GameObject.Find("variometr").transform.localScale.y=scale;
    GameObject.Find("variometr").transform.localScale.z=scale;

    GameObject.Find("Aviahor").transform.localScale.x=scale;
    GameObject.Find("Aviahor").transform.localScale.y=scale;
    GameObject.Find("Aviahor").transform.localScale.z=scale;

    var m = GameObject.Find("variometr").transform.localScale;
    print(m);*/
}