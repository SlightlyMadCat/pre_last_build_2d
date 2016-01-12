#pragma strict

 var speed = 0f; //скорость горизонтального перемещения самолета 
 var vSpeed = 0.01;	//вертикальная скорость
 var hPlane : float;
 var new_height : float = 0;    //изменение высоты
 var distance = 1000;	//дистанция обнаружения - костыль для угла поворота
 var d : float = 0;             //диагональ
 var fall : boolean = false;
 var rotate_angle : float = 0;
 var count : float = 0;
 var phase : int = 1; //фаза движения \\\\////переставил на 4 фазу для равномерного снижения
 var start_height : float = 4500; //начальная высота полета
 var dif : float = 0; //разница в высотах
 var ugol: float = 0; //угол набора высоты
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
 var k_screen : float;
 var start = true;

function Start () { //тестовые значения
    k_screen = Screen.height/4.4f; //разрешение экрана для корректного масштаба gui текстур
    speed = 0.2;
}

function Update () {
    hPlane = start_height + this.transform.position.y*120; 

    this.transform.position.x+=speed;

    dif = hPlane - new_height; //выставляем диапазон высот
    if (dif < 0) {
    	dif = -dif;
    }

    d = GameObject.Find("cursor").GetComponent(Rotate).dist;
	rotate_angle = Mathf.Asin(dif/d)*Mathf.Rad2Deg;
	yoba_angle = GameObject.Find("cursor").GetComponent(Rotate).rot_angle;
	//max_vy = GameObject.Find("cursor").GetComponent(Rotate).max_vy;

	if (GameObject.Find("cursor").GetComponent(Rotate).max_vy == true) {
	    gameOver();
	    GameObject.Find("plane42").GetComponent(diss_2).speed = 0;
	}

    //МОДЕЛЬ ИЗМЕНЕНИЯ ВЫСОТЫ ПОЛЕТА

	if (fall == true) {
	    if (phase == 0) {
	        phase = 1;
	    }
        this.transform.position.y+=vSpeed;

        ugol = this.transform.rotation.x*Mathf.Rad2Deg;
        if (ugol < 0) {
        	ugol = -ugol;
        }

        switch (phase) {
            case 1:
                //print ("phase1");
                if (ugol < rotate_angle) {
                	if (hPlane > new_height){
                    	this.transform.Rotate(Vector3.right * Time.deltaTime*5); 
                    	count += 2;
                    	ugol+=5;
                    } else {
						this.transform.Rotate(Vector3.left * Time.deltaTime*5); 
                    	count += 2;
                    	ugol+=5;
                    }
                } else {
                    phase = 2;
                }
                break;
            case 2:
                //print ("phase2 ");
                if (dif > count+10) {
                } else {
                    phase = 3;
                }
                break;
            case 3:
                //print ("phase3");
                if (ugol > 1) {
                	if (hPlane > new_height) {
                	    this.transform.Rotate(Vector3.left * Time.deltaTime*5); 
                	    ugol-=5;
                    } else {
                	    this.transform.Rotate(Vector3.right * Time.deltaTime*5); 
                	    ugol-=5;
                    }
                } else {
                    gameOver();        
                }

                if (vSpeed < 0 && hPlane < new_height) {
                    gameOver();
                } else if (vSpeed > 0 && hPlane > new_height) {
                    gameOver();
                }
                break;
            default:
                print ("something went wrong");
                break;
        }
    }
}

function gameOver() {
    phase = 0;
    count = 0; 
    fall = false;
    vSpeed = 0;
    this.transform.rotation.x = 0;
    ugol = 0;
}

function OnGUI() {
    var guiMatrix : Matrix4x4 = GUI.matrix;

    /*if (start == false){
        if (GUI.Button (Rect (Screen.width/2 - 90,Screen.height/2 - 80,180,30), "Start")) { // наша кнопка 
            start = true;
            speed = 0.2;

            var audio : AudioSource = GetComponent.<AudioSource>(); //запускаем звук
            audio.Play();
        } 

        if (GUI.Button (Rect (Screen.width/2 - 90,Screen.height/2+50 - 80,180,30), "Tutorial")) {
            //print("tut");
            Application.LoadLevel("tutorial");
        }
    }*/

    GUI.DrawTexture(Rect(Screen.width/2-k_screen/2,0,k_screen,k_screen),air_speed);   //было 100,0,200,200
    GUI.DrawTexture(Rect(Screen.width/2+k_screen/2,0,k_screen,k_screen),altmetr);

    //меняем горизонтальную скорость на разных эшелонах
    if (start == true){
        if (hPlane > 1200 && hPlane < 2400) {
            if (speedFactor >= 560/1.852/410) {
                speedFactor -= 0.005;
            } else {
                speedFactor += 0.005;
            }
        } else if (hPlane >=2400 && hPlane < 4200) {
            if (speedFactor >= 580/1.852/410) {
                speedFactor -= 0.005;
            } else {
                speedFactor += 0.005;
            }
        } else if (hPlane >= 4200 && hPlane < 6600) {
            if (speedFactor >= 660/1.852/410) {
                speedFactor -= 0.005;
            } else {
                speedFactor += 0.005;
            }
        } else if (hPlane >= 6600 && hPlane < 9000) {
            if (speedFactor >= 700/1.852/410) {
                speedFactor -= 0.005;
            } else {
                speedFactor += 0.005;
            }
        } else if (hPlane >=9000 && hPlane <= 9100) {
            if (speedFactor >= 710/1.852/410) {
                speedFactor -= 0.005;
            } else {
                speedFactor += 0.005;
            }
        }
    } else {
        speedFactor = 660/1.852/410;
    }

    rotation_angle_1 = Mathf.Lerp(0,360,speedFactor);

    //высталяем стрелки сразу при запуске программы
    if (start == false){
        alt_angle = rotation_angle;
        curr_angle = rotation_angle_1;
        //print(rotation_angle_1);
    }

    pivotPoint = Vector2(Screen.width/2,k_screen/2);
    GUIUtility.RotateAroundPivot(curr_angle,pivotPoint);

    GUI.DrawTexture(Rect(Screen.width/2-k_screen/2,-30,k_screen,k_screen),air_speed_arrow);
    GUI.matrix = guiMatrix;

    timer = GameObject.Find("cursor").GetComponent(Rotate).timer_on;

    if (timer == false) {
        if (curr_angle < rotation_angle_1) {
            curr_angle += 3;
        } else if (curr_angle > rotation_angle_1){
            curr_angle -= 3;    
        } 
    }

    guiMatrix = GUI.matrix;

    heightFactor = hPlane/10000; //9100 - топовая высота
    rotation_angle = Mathf.Lerp(0,360,heightFactor);
    point_visotomer = Vector2(Screen.width/2+k_screen, k_screen/2);
    GUIUtility.RotateAroundPivot(alt_angle,point_visotomer);
    GUI.DrawTexture(Rect(Screen.width/2+k_screen/2,-30,k_screen,k_screen),alt_long_arrow);

    if (alt_angle < rotation_angle) {
        alt_angle += 1;
    } else  if (alt_angle > rotation_angle){
        alt_angle -= 1;  
    } 
     
    current_vert = GameObject.Find("cursor").GetComponent(Rotate).cur_vy;
}
