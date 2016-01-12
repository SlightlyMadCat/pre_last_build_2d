#pragma strict
var count = 1;

function Start () {
    
}

function Update () {

}

function OnGUI() {
    var guiMatrix : Matrix4x4 = GUI.matrix;

    if (GUI.Button (Rect (Screen.width/2,Screen.height/2+250 - 80,90,30), "Next")) { 
        if (count == 1){
            this.transform.position.x = GameObject.Find("second nax").transform.position.x; 
            count+=1;
            print("1");
        } else if (count == 2){
            this.transform.position.x = GameObject.Find("third nax").transform.position.x; 
            count+=1;
            print("2");
        } else if (count == 3) {
            this.transform.position.x = GameObject.Find("first nax").transform.position.x; 
            count = 1;
            print("3");
        }
    } 

    if (GUI.Button (Rect (Screen.width/2-90,Screen.height/2+250 - 80,90,30), "Prev")) { 
        if (count == 3){
            this.transform.position.x = GameObject.Find("second nax").transform.position.x; 
            count-=1;
        } else if (count == 2){
            this.transform.position.x = GameObject.Find("first nax").transform.position.x; 
            count-=1;
        } else if (count == 1) {
            this.transform.position.x = GameObject.Find("third nax").transform.position.x; 
            count = 3;
        }
    } 

    if (GUI.Button (Rect (Screen.width/2 - 90,Screen.height/2+300 - 80,180,30), "Back to main menu")) {
            Application.LoadLevel("main menu");
        }
}