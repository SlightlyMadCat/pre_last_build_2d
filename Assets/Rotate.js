#pragma strict
var baseAngle = 0.0;
var rot_angle = 0.1; //угол поворота в градусах
var timer = 0;      //таймер
var timer_on = false; 
var delay = false;
var td = 0;     //счетчик таймера
var cur_vy : float;     //текущая вертикальная
//var max_vy = 20;    //максимальня вертикальная
var k = 0.111; //коэфициент на шкале вариометра
var max_time = 300;
var fall = false;
var last = 0;
var new_height = 0;
var vyr : float;
var zero = true;
var dist = 0;
var dh = 0;
var hPlane = 0;
var real_vert_speed : float;
var score : float = 0;
var max_vy = false;
var style : GUIStyle;
var count_clouds = 0;
var fire : ParticleSystem;

function Start() {
    //fire.Play();
}

function OnMouseDown(){
    var pos = Camera.main.WorldToScreenPoint(transform.position);
    pos = Input.mousePosition - pos;
    baseAngle = Mathf.Atan2(pos.y, pos.x) * Mathf.Rad2Deg;
    baseAngle -= Mathf.Atan2(transform.right.y, transform.right.x) *Mathf.Rad2Deg;

    if (timer_on == false && fall == false) {
        timer_on = true;
    }
}

function OnMouseDrag(){
    var pos = Camera.main.WorldToScreenPoint(transform.position);
    pos = Input.mousePosition - pos;
    var ang = Mathf.Atan2(pos.y, pos.x) *Mathf.Rad2Deg - baseAngle;

    if (timer_on == true) {
        GameObject.Find("plane42").GetComponent(diss_2).speed = 0;
        transform.rotation = Quaternion.AngleAxis(ang, Vector3.forward);
        if (transform.rotation.eulerAngles.z > 0 && transform.rotation.eulerAngles.z < 180){
            rot_angle = -transform.rotation.eulerAngles.z;
        } else {
            rot_angle = 360 - transform.rotation.eulerAngles.z;   
        }

        zero = false;
    }
}

function Update() {
    fall = GameObject.Find("plane42").GetComponent(diss_2).fall;
    cur_vy = rot_angle*k;

    if (timer_on == true) {
        timer++;
    }

    if (timer >= max_time) {
        timer_on = false;
        timer = 0;
        GameObject.Find("plane42").GetComponent(diss_2).speed = 0.2;
        GameObject.Find("plane42").GetComponent(diss_2).fall = true;
        calculateSpeed();

        real_vert_speed = cur_vy/200; 
        if (max_vy != true) {
            GameObject.Find("plane42").GetComponent(diss_2).vSpeed = real_vert_speed;
        } else {
            if (real_vert_speed < 0) {
                GameObject.Find("plane42").GetComponent(diss_2).vSpeed = real_vert_speed;
            } else {
                GameObject.Find("plane42").GetComponent(diss_2).vSpeed = -real_vert_speed;
            }
        }

    }

    if (timer_on == false && fall == false) {
        if (rot_angle > 0 && zero == false) {
            transform.rotation = Quaternion.AngleAxis(rot_angle, Vector3.back); 
            rot_angle--;
        } else if (rot_angle < 0 && zero == false) {
            transform.rotation = Quaternion.AngleAxis(rot_angle, Vector3.back); 
            rot_angle++;
        }

        if (rot_angle > -1 && rot_angle < 1){
            zero = true;
            rot_angle = 0;
            transform.rotation = Quaternion.AngleAxis(rot_angle, Vector3.back);
            vyr = 0;
        }
    }
}

function OnGUI() {
    last = max_time - timer;
    //GUI.Box(new Rect(Screen.width/6.5,40,150,30), "Score: "+Mathf.Round(score * 100)/100);
    GUI.Box(new Rect(70+Screen.width/10,Screen.height/22+30,150,30),"Time: "+last);
    GUI.Box(new Rect(70+Screen.width/10,Screen.height/22+60,150,30),"Calculated Vy: "+Mathf.Round(vyr * 100)/100);
    GUI.Box(new Rect(70+Screen.width/10,Screen.height/22+90,150,30),"Real Vy: "+Mathf.Round(cur_vy * 100)/100);

    if (max_vy == true){
        GUI.Box ( new Rect(Screen.width/2 - 300,Screen.height/2,100,100), "Здесь будет финишный экран", style);
    }
}

function calculateSpeed() {
    new_height = GameObject.Find("plane42").GetComponent(massiv_cubov).new_height;
    dist = GameObject.Find("plane42").GetComponent(massiv_cubov).dist;
    hPlane = GameObject.Find("plane42").GetComponent(diss_2).hPlane;
    dh = hPlane - new_height;

    if (cur_vy > 0 && new_height+500 <= 9000) {
        new_height+=1200;
    } else if (cur_vy < 0 && new_height-500 >= 2000) {
        new_height-=1200;   
    }
    print(new_height);

    GameObject.Find("plane42").GetComponent(diss_2).new_height = new_height;
    dh = hPlane - new_height;

    //ограничение по высоте
    if (new_height < 2000){
        GameObject.Find("plane42").GetComponent(diss_2).fall = false; 
    } else if (new_height > 8000){
        GameObject.Find("plane42").GetComponent(diss_2).fall = false; 
    }

    if (Mathf.Abs(cur_vy) >=1 ) {
        if (cur_vy > 0 && dh > 0) {
            GameObject.Find("plane42").GetComponent(diss_2).fall = false;  
            print("otboi");
        } else if (cur_vy < 0 && dh < 0) {
            GameObject.Find("plane42").GetComponent(diss_2).fall = false;
            print("otboi");
        } else {
            GameObject.Find("Rotate").GetComponent(rot_vis).dh = dh;
            count_clouds += 10;

            if (dh < 0) {
                dh = -dh;
            }

            vyr = dh * 240/3.6/dist;

            if (hPlane < new_height) {
                vyr = dh * 240/3.6/dist;
            } else if (hPlane > new_height) {
                vyr = dh * 240/3.6/dist;
                vyr = -vyr;
            }

            var mVYR = Mathf.Abs(vyr);
            var mCUR = Mathf.Abs(cur_vy);

            if (mVYR >= mCUR) {
                score += cur_vy/vyr*10;
            } else if (mVYR < mCUR){
                score += vyr/cur_vy*10;
            }     
        }
    } else {
        GameObject.Find("plane42").GetComponent(diss_2).fall = false;  
    }

    if (Mathf.Abs(cur_vy) >= 15) {
        max_vy = true;
        fire.Play();
    }
}