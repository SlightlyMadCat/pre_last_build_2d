#pragma strict
var baseAngle = 0.0;
var rot_angle = 0.1; //угол поворота в градусах
var timer = 0;      //таймер
var timer_on = false; 
var delay = false;
var td = 0;     //счетчик таймера
var cur_vy : float;     //текущая вертикальная
var max_vy = 20;    //максимальня вертикальная
var k = 0.111; //коэфициент на шкале вариометра
var max_time = 300;
var fall = false;
var last = 0;
//var mas=[2000,3000,3900,2000,3800,3300,2500,2100,3400];
//var i = 0;
var new_height = 0;
var vyr : float;
var zero = true;
var dist = 0;
var dh = 0;
var hPlane = 0;
var real_vert_speed : float;
var score : float = 0;

function OnMouseDown(){
    var pos = Camera.main.WorldToScreenPoint(transform.position);
    pos = Input.mousePosition - pos;
    baseAngle = Mathf.Atan2(pos.y, pos.x) * Mathf.Rad2Deg;
    baseAngle -= Mathf.Atan2(transform.right.y, transform.right.x) *Mathf.Rad2Deg;
    //print("najal strelku");

    if (timer_on == false && fall == false) {
        timer_on = true;
        //timer = 0;
        //GameObject.Find("plane42").GetComponent(diss_2).fall = true;
        //getCords();
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

/*function delay_time() {
    td++;
    if (td == 100){
        delay = false;
        td = 0;
    }
    //print(td);
    print("delay here"+delay);
}*/

function Update() {
    fall = GameObject.Find("plane42").GetComponent(diss_2).fall;
    cur_vy = rot_angle*k;

    if (timer_on == true) {
        timer++;
    }

    if (timer >= max_time) {
        timer_on = false;
        //delay = true;
        timer = 0;
        GameObject.Find("plane42").GetComponent(diss_2).speed = 0.2;
        GameObject.Find("plane42").GetComponent(diss_2).fall = true;
        calculateSpeed();

        //if (vyr > 0) {
        //real_vert_speed = vyr/200;  
        real_vert_speed = cur_vy/200; 
       // } else if (vyr < 0) {
         //   real_vert_speed = vyr/200;
       // }
        
        GameObject.Find("plane42").GetComponent(diss_2).vSpeed = real_vert_speed;
        print(real_vert_speed);
    }

    if (timer_on == false && fall == false) {
        //print(rot_angle);
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
    GUI.Label(new Rect(Screen.width/2-1.5*Screen.width/5,40,500,30), "Time: "+last);
    GUI.Label(new Rect(Screen.width/2-1.5*Screen.width/4,70,500,30), "Расчетная Vy: "+vyr+" Реальная Vy: "+cur_vy);
    //GUI.Label(new Rect(Screen.width/2-1.5*Screen.width/4,100,500,30), "Score: "+score);
}

function calculateSpeed() {
    new_height = GameObject.Find("plane42").GetComponent(massiv_cubov).new_height;
    dist = GameObject.Find("plane42").GetComponent(massiv_cubov).dist;
    hPlane = GameObject.Find("plane42").GetComponent(diss_2).hPlane;
    dh = hPlane - new_height;

    if (cur_vy > 0 && new_height+500 <= 9000) {
        new_height+=1000;
    } else if (cur_vy < 0 && new_height-500 >= 2000) {
        new_height-=1000;   
    }

    GameObject.Find("plane42").GetComponent(diss_2).new_height = new_height;
    dh = hPlane - new_height;

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

    print("dist "+dist);

    var mVYR = Mathf.Abs(vyr);
    var mCUR = Mathf.Abs(cur_vy);

    if (mVYR >= mCUR) {
        score += cur_vy/vyr*10;
        print("s "+cur_vy/vyr*10);
    } else if (mVYR < mCUR){
        score += vyr/cur_vy*10;
        print("s "+vyr/cur_vy*10);
    } 

    //print("score "+score);
}