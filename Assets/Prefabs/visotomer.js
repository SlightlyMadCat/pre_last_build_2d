#pragma strict
import UnityEngine;
import System.Collections;

var height: float = 0; //высота полета
var width: float = 0; //х координата
var Plane : GameObject;
var wingHeight: float = 0; //z координата крыла
var wingWidth: float = 0; //x координата крыла
var speed : float;

function Start () {
    speed = 0.1;
}

function Update () {
	//height = GetComponent.<UnityEngine.Plane>.transform.position.z*3.6;
	//print(height);
	height = this.transform.position.y;	//высота самолета
	//print(height);
	height = height * -200;

	//transform.position = Plane.transform.position;

	//print(transform.position.y);
	
	width = this.transform.position.x;	
	//print(width);

    //wingPlane.wing();
	/*if (width <= 60) {
	    speed = 0.2;
	} else if (width > 60 && width < 200) {
	    speed = 0.3;
	}

	this.transform.position.x+=speed;*/
}

function OnGUI() {
    //GUI.Label(new Rect(10,10,200,30), "Высота полета: "+height);
}