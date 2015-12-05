#pragma strict

var wingHeight: float = 0; //z координата крыла
var wingWidth: float = 0; //x координата крыла

var wingHeightRight: float = 0; //z координата крыла
var wingWidthRight: float = 0; //x координата крыла

var left : GameObject;
var right : GameObject;

function Start () {

}

function Update () {
    wingHeight = left.transform.position.z;	//высота крыла
    //print(wingHeight);
	
    wingWidth = left.transform.position.x;	//х координата крыла
    //print(wingWidth);	

    wingHeight = right.transform.position.z;	//высота крыла
    //print(wingHeightRight);
	
    wingWidth = right.transform.position.x;	//х координата крыла
   // print(wingWidthRight);	
}
