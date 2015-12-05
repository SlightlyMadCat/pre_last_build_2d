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
 var count_back : float = 0;
 var phase : int = 1; //фаза движения

function Start () { //тестовые значения
    speed = 0.2;
    vSpeed = 0.01;
    distance = 300;
    new_height = 230;
    v = 240;
    fall = true;
    count = 1;
}

function Update () {
    //Debug.Log ("кончились патроны");
    //w = 100;
    //var w:float = Math.arcsin();
    us = w/v*Mathf.Sin(angle);

    if (us < 0) {
        us = -us;
    }
	
    //print(us);
    //print(Mathf.Asin(us));
    //print("Скорость: " + v + " км/ч. Угол сноса: " + us + " град.");

    width = this.transform.position.x;	
    hPlane = 2000 + this.transform.position.y*10; 

    //print(width);

    //wingPlane.wing();
    /*if (width > 5 && width < 6) {
        //speed = 0.2;
        w = Random.Range(36,0);
        vSpeed = 0.01;
        angle = Random.Range(360,0);
    } else if (width > 60 && width< 61) {
        //speed = 0.3;
        vSpeed = -0.01;
        w = Random.Range(40,5);
        angle = Random.Range(180,0);
    } else if (width > 300 && width < 301) {
        //speed = 0.32;
        w = Random.Range(45,0);
        vSpeed = 0.01;
        angle = Random.Range(360,0);
    } else if (width > 606 && width < 607) {
        //speed = 0.27;
        w = Random.Range(47,5);
        vSpeed = -0.01;
        angle = Random.Range(360,0);
    } else if (width > 800 && width < 801) {
        // speed = 0.34;
        w = Random.Range(45,5);
        angle = Random.Range(360,0);
        vSpeed = 0.01;
    }  else if (width > 1000){
        //speed = 0.36;
        w = 32;
        angle = 56F;	    
        vSpeed = 0;
    } */

    this.transform.position.x+=speed;
   // if (vSpeed < 0) {
       //this.transform.Rotate(Vector3.right * Time.deltaTime*5);
    //} else if (vSpeed > 0) {
    //    this.transform.Rotate(Vector3.left * Time.deltaTime*5);    
   // } 
    //this.transform.position.y+=vSpeed;

    //МОДЕЛЬ ИЗМЕНИНИЯ ВЫСОТЫ САМОЛЕТА

    if (fall == true) {
        d = Mathf.Sqrt(new_height*new_height+distance*distance);
        //print(d);

        rotate_angle = Mathf.Asin(new_height/d)*Mathf.Rad2Deg;
        print(rotate_angle);

        vSpeed = -0.01;
        this.transform.position.y+=vSpeed;

        /*if (count < rotate_angle) {
            this.transform.Rotate(Vector3.right * Time.deltaTime*5); 
            count += 0.1;
        } else {
            if (count_back < rotate_angle) {
                this.transform.Rotate(Vector3.left * Time.deltaTime*5); 
                count_back += 0.1;
            } else {
                fall = false;
                count = 0;
                count_back = 0;
            }
        }*/

        print(count);

        switch (phase) {
            case 1:
                print ("phase1");
                if (count < rotate_angle) {
                    this.transform.Rotate(Vector3.right * Time.deltaTime*5); 
                    count += 0.1;
                } else {
                    phase = 2;
                    count_back = count;
                    count = 0;
                }
                break;
            case 2:
                print ("phase2");
                if (count_back < d/6) {
                    count_back += 0.1;
                } else {
                    phase = 3;
                    count_back = 0;
                }
                break;
            case 3:
                print ("phase3");
                if (count < rotate_angle) {
                    this.transform.Rotate(Vector3.left * Time.deltaTime*5); 
                    count += 0.1;
                } else {
                    phase = 1;
                    count = 0; 
                    fall = false;
                }
                break;
            default:
                print ("something went wrong");
                break;
        }
    }

}

function OnGUI() {
    GUI.Label(new Rect(10,40,500,30), "Скорость: " + speed*2000 + " км/ч. Угол сноса: " + us + " град. Скорость ветра: "+w+" км/ч");
    GUI.Label(new Rect(10,10,200,30), "Высота полета: "+hPlane);
}
