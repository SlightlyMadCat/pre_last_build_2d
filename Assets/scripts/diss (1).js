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
 var phase : int = 1; //фаза движения
 var start_height : float = 2800; //начальная высота полета
 var dif : float = 0; //разница в высотах
 var ugol: float = 0; //угол набора высоты
 var i:int = 0;
 var mas=[2000,3000,3900,2000,3800,3300,2500,2100,3400];
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
    hPlane = start_height + this.transform.position.y*50; 
    print("hPlane "+hPlane);
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

    //МОДЕЛЬ ИЗМЕНЕНИЯ ВЫСОТЫ ПОЛЕТА

    if (fall == true) {
        this.transform.position.y+=vSpeed;

        ugol = this.transform.rotation.x*Mathf.Rad2Deg;
        if (ugol < 0) {
        	ugol = -ugol;
        }

        switch (phase) {
            case 1:
                print ("phase1");
                if (ugol < rotate_angle/10) {
                	if (hPlane > new_height){
                    	this.transform.Rotate(Vector3.right * Time.deltaTime*5); 
                    	count += 2;
                    	vSpeed = -0.04;
                    } else {
						this.transform.Rotate(Vector3.left * Time.deltaTime*5); 
                    	count += 2;
                    	vSpeed = 0.04;
                    }
                } else {
                    phase = 2;
                }
                break;
            case 2:
                print ("phase2 ");
                if (dif > count) {
					//count_back += 0.02;
                } else {
                    phase = 3;
                }
                break;
            case 3:
                print ("phase3");
                if (ugol > 1) {
                	if (hPlane > new_height) {
                    	this.transform.Rotate(Vector3.left * Time.deltaTime*5); 
                    } else {
                        this.transform.Rotate(Vector3.right * Time.deltaTime*5); 
                    }
                } else {
                    phase = 1;
                    count = 0; 
                    fall = false;
                    vSpeed = 0;
                    this.transform.rotation.x = 0;
                }
                break;
            default:
                print ("something went wrong");
                break;
        }
    }

    if(Input.GetKeyDown(KeyCode.Mouse0)){
     	if (fall == false) {
         	/*distance = Input.mousePosition.x-this.transform.position.x;
         	print("dis "+distance);
         	new_height = 2000 + Input.mousePosition.y*2;
         	print("hei "+new_height);*/
         	fall = true;
         	new_height = mas[i];
         	i++;
         }
	 }
}

function OnGUI() {
    //GUI.Label(new Rect(10,40,500,30), "Скорость: " + speed*2000 + " км/ч. Угол сноса: " + us + " град. Скорость ветра: "+w+" км/ч");
    //GUI.Label(new Rect(10,10,200,30), "Высота полета: "+hPlane);

    /*GUI.DrawTexture(Rect(0,0,383,300),altmetr);
    var heightFactor : float = hPlane/4100; //4100 - топовая высота
    var rotation_angle = Mathf.Lerp(0,360,heightFactor);*/

    GUI.DrawTexture(Rect(Screen.width/2-100,0,200,200),air_speed);
    GUI.DrawTexture(Rect(Screen.width/2-300,0,200,200),variometer);
    speedFactor = speed/1.852/260*2000;//4100 - топовая высота
    rotation_angle_1 = Mathf.Lerp(0,360,speedFactor);

    pivotPoint = Vector2(Screen.width/2,Screen.height/2-264);

    GUIUtility.RotateAroundPivot(curr_angle,pivotPoint);
    print(rotation_angle_1);
    print("cur "+curr_angle);
    GUI.DrawTexture(Rect(Screen.width/2-100,-30,200,200),air_speed_arrow);

    if (curr_angle < rotation_angle_1) {
        curr_angle += 1;
    } else {
        //curr_angle = 0;    
    }


}
