#pragma strict

 var w:float = 0;	//скорость ветра
 var v:float = 0;	//скорость самолета
 var vs:float = 0;	//скорость ветра
 var us:float = 0;	//угол сноса
 var width: float = 0; //х координата
 var speed : float;
 var angle : float; 
 var vSpeed : float;
 var hPlane : float;
 var new_height : float = 0;    //изменение высоты
 var distance : float = 0;      //дистанция обнаружения
 var d : float = 0;             //диагональ
 var fall : boolean = false;
 var rotate_angle : float = 0;
 var count : float = 0;
 var phase : int = 1; //фаза движения \\\\////переставил на 4 фазу для равномерного снижения
 var start_height : float = 4500; //начальная высота полета
 var dif : float = 0; //разница в высотах
 var ugol: float = 0; //угол набора высоты
 //var i:int = 0;
 //var mas=[2000,3000,3900,2000,3800,3300,2500,2100,3400];
 var altmetr : Texture2D;
 var alt_arrow : Texture2D;
 var alt_long_arrow : Texture2D;
 var air_speed : Texture2D;
 var air_speed_arrow : Texture2D;
 var curr_angle : float = 0;
 var speedFactor : float = speed/1.852/810/1.852*2000;//4100 - топовая высота
 var rotation_angle_1 = Mathf.Lerp(0,360,speedFactor);
 var pivotPoint : Vector2;
 var variometer : Texture2D;
 var var_arrow : Texture2D;
 var vert_speed : float = 0; //виртуальная верт скорость
 var max_vert_speed : float = 15; //максимальная верт. скорость
 var mous_x : float = 0;
 var mous_y : float = 0;
 var angle_var : float = 0; //угол на вариометре
 var varPoint : Vector2;
 var cur_var_angle : float = 0;
 var heightFactor : float = 0;
 var rotation_angle : float = 0;
 var point_visotomer : Vector2;
 var alt_angle : float = 0;
 var vect_rotate = Vector3; //вектор поворота
 var yoba_angle = 0; //угол поворота стрелки вариометра
 var current_vert = 0; //текущая вертикальная скорость
 var timer = false;

function Start () { //тестовые значения
    w = 10; //скорость ветра
    angle = 37;	//угол под которым дуют ветер
    speed = 0.2; //скорость горизонтального перемещения самолета 
    vSpeed = 0.01;	//вертикальная скорость
    distance = 1000;	//дистанция обнаружения
    new_height = 2200;	//новая высота самолета
    v = 240; //условная скорость самолета
    //fall = true;	//изменение высоты
    count = 1;	//счетчик угла
}

function Update () {
    us = w/v*Mathf.Sin(angle);

    if (us < 0) { // убираем минусовое значение угла
        us = -us;
    }

    width = this.transform.position.x;	
    hPlane = start_height + this.transform.position.y*100; 
    //print("hPlane "+hPlane);
    //print("new_height"+new_height);

    this.transform.position.x+=speed;

    //print("screen "+Screen.width);//разрешение экрана

    dif = hPlane - new_height; //выставляем диапазон высот
    if (dif < 0) {
    	dif = -dif;
    }
    //print("dif "+dif);

	d = Mathf.Sqrt(dif*dif+distance*distance);
	rotate_angle = Mathf.Asin(dif/d)*Mathf.Rad2Deg;

	yoba_angle = GameObject.Find("cursor").GetComponent(Rotate).rot_angle;
    //МОДЕЛЬ ИЗМЕНЕНИЯ ВЫСОТЫ ПОЛЕТА

	if (fall == true) {
	    if (phase == 0) {
	        phase = 1;
	    }
        this.transform.position.y+=vSpeed;
        //print("2 "+hPlane);

        ugol = this.transform.rotation.x*Mathf.Rad2Deg;
        if (ugol < 0) {
        	ugol = -ugol;
        }

        switch (phase) {
            case 1:
                //print ("phase1");
                if (ugol < rotate_angle/10) {
                	if (hPlane > new_height){
                    	this.transform.Rotate(Vector3.right * Time.deltaTime*5); 
                    	count += 2;
                    	//vSpeed = -0.04;
                    	ugol+=5;
                    } else {
						this.transform.Rotate(Vector3.left * Time.deltaTime*5); 
                    	count += 2;
                    	//vSpeed = 0.04;
                    	ugol+=5;
                    }
                } else {
                    phase = 2;
                }
                break;
            case 2:
                //print ("phase2 ");
                if (dif > count+10) {
					//count_back += 0.02;
                } else {
                    phase = 3;
                }
                break;
            case 3:
                //print ("phase3");
                if (ugol > 2) {
                	if (hPlane > new_height) {
                	    this.transform.Rotate(Vector3.left * Time.deltaTime*5); 
                	    ugol-=5;
                    } else {
                	    this.transform.Rotate(Vector3.right * Time.deltaTime*5); 
                	    ugol-=5;
                    }
                } else {
                    phase = 0;
                    count = 0; 
                    fall = false;
                    vSpeed = 0;
                    this.transform.rotation.x = 0;
                    //speed = 0.1;
                    ugol = 0;
                }
                break;
            /*case 4: //движение по горизонтальной  оси
                print("phase4");
                //print("1 "+hPlane);
                if (hPlane > new_height && dif > count){
                    vSpeed = -0.04;   
                    count += 2;
                    print("count "+count);
                } else if (hPlane < new_height && dif > count) {
                    vSpeed = 0.04;
                    count += 2;
                } else {
                    vSpeed = 0;
                    fall = false;
                }
                phase++;
                break;*/
            default:
                print ("something went wrong");
                break;
        }
    }

    if(Input.GetKeyDown(KeyCode.Mouse0)){
     	/*if (fall == false) {
         	//distance = Input.mousePosition.x-this.transform.position.x;
         	//print("dis "+distance);
         	//new_height = 2000 + Input.mousePosition.y*2;
         	//print("hei "+new_height);
         	fall = true;
         	new_height = mas[i];
         	i++;
         	if (i>mas.length-1) {
         	    i=0;
         	}
         }*/
	 }
}

function OnGUI() {
    //GUI.Label(new Rect(10,40,500,30), "Скорость: " + speed*2000 + " км/ч. Угол сноса: " + us + " град. Скорость ветра: "+w+" км/ч");
    //GUI.Label(new Rect(10,10,200,30), "Высота полета: "+hPlane);

    var guiMatrix : Matrix4x4 = GUI.matrix;

    GUI.DrawTexture(Rect(Screen.width/2-100,0,200,200),air_speed);
    //GUI.DrawTexture(Rect(Screen.width/2-300,0,200,200),variometer);
    GUI.DrawTexture(Rect(Screen.width/2+100,0,200,200),altmetr);

    speedFactor = speed/1.852/260*2000;
    rotation_angle_1 = Mathf.Lerp(0,360,speedFactor);

    pivotPoint = Vector2(Screen.width/2,100);
    GUIUtility.RotateAroundPivot(curr_angle,pivotPoint);

    GUI.DrawTexture(Rect(Screen.width/2-100,-30,200,200),air_speed_arrow);
    GUI.matrix = guiMatrix;
    //guiMatrix = GUI.matrix;
    timer = GameObject.Find("cursor").GetComponent(Rotate).timer_on;

    if (timer == false) {
        if (curr_angle < rotation_angle_1) {
            curr_angle += 3;
        } else if (curr_angle > rotation_angle_1){
            curr_angle -= 3;    
        } 
    }

    guiMatrix = GUI.matrix;

    heightFactor = hPlane/10000; //4100 - топовая высота
    rotation_angle = Mathf.Lerp(0,360,heightFactor);
    //print("visrot"+rotation_angle);
    point_visotomer = Vector2(Screen.width/2+200,100);
    GUIUtility.RotateAroundPivot(alt_angle,point_visotomer);
    GUI.DrawTexture(Rect(Screen.width/2+100,-30,200,200),alt_long_arrow);

    if (alt_angle < rotation_angle) {
        alt_angle += 1;
    } else  if (alt_angle > rotation_angle){
        alt_angle -= 1;  
    } 
    	//alt_angle = 0;

    /*varPoint = Vector2(Screen.width/2-200,100);
    GUIUtility.RotateAroundPivot(angle_var, varPoint); 
    if (GUI.Button(Rect(Screen.width/2-25, Screen.height/2-25, 50, 50),"Rotate")) {
    	angle_var += 10;
    }*/
     
    current_vert = GameObject.Find("cursor").GetComponent(Rotate).cur_vy;
    //print("Vy"+current_vert);
}
