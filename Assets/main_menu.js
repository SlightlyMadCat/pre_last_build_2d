#pragma strict

function Start () {

}

function Update () {
    this.transform.Rotate(Vector3.up * Time.deltaTime*20);
    print(this.transform.rotation.y);
}

function OnGUI() {
    var guiMatrix : Matrix4x4 = GUI.matrix;

    GUI.Box ( new Rect(Screen.width/2 - 200,Screen.height/2 - 270,400,200), "Main Menu");

    if (GUI.Button (Rect (Screen.width/2 - 90,Screen.height/2 - 50 - 180,180,30), "Start")) { // наша кнопка 
        Application.LoadLevel("try in 2D");
    } 

    if (GUI.Button (Rect (Screen.width/2 - 90,Screen.height/2 - 180,180,30), "Tutorial")) {
       Application.LoadLevel("tutorial");
    }

    if (GUI.Button (Rect (Screen.width/2 - 90,Screen.height/2+50 - 180,180,30), "Exit Game")) {
        Application.Quit();
    }
}