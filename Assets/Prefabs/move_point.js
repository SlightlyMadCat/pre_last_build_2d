/*#pragma strict
var wayPoints = //new Array();
[
//x, y, z, v
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]

];
//
var moveMode:int;//1 - прямо, 2 - по дуге
var v:float;
var turnRad:float;

var currentCourse:float;
var currentBank:float;

var targetPointId:int;
var nextPointId:int;

var x0:float;
var y0:float;
var z0:float;
var v0:float;
            
var x1:float;
var y1:float;
var z1:float;
var v1:float;
            
var x2:float;
var y2:float;
var z2:float;
var v2:float;


var vecNow:Vector3;
var vecNext:Vector3;

var dist:float;
var turnAngle:float;
var LUR:float; 

var lambda: float;
var timePassed: float;
var endLambda: float;//когда заканчиваем текущий режим двидения

function Start () {
	moveMode = 1;
	currentCourse = 0;
	currentBank = 0;
	v = 50;
	turnRad = 500;
	
	for (var i=1; i<=5; i++){		
		var pos = GameObject.Find("Cube"+i).transform.position;
		var ar = new Array();
		ar.length = 4;
		wayPoints[i-1][0] = pos.x;
		wayPoints[i-1][1] = pos.y;
		wayPoints[i-1][2] = pos.z;
		wayPoints[i-1][3] = 50;//20*i;		
		wayPoints[i-1] = ar;
	}	
	
	
	StartMoving2Point(0, true);
}


function moveLine () {
	lambda+=v*Time.deltaTime/dist;
	timePassed+=Time.deltaTime;
	
	this.transform.position.x = x0*(1-lambda)+x1*lambda;
	this.transform.position.y = y0*(1-lambda)+y1*lambda;
	this.transform.position.z = z0*(1-lambda)+z1*lambda;
	
	//v = v0+acceleration*timePassed;	
	if (lambda >= endLambda){
		//StartTurning();
		StartMoving2Point(nextPointId, true);
	}
}

function moveCircle () {
	
}

function Update () {
	if (moveMode==1){
		moveLine();
	}
	else{
		moveCircle();
	}
}

function StartTurning () {
	
}
function StartMoving2Point (pid:int, fromCurrentPos:boolean) {
	//TODO: сделать автоматический перенос на предыдущую точку в ребре
	x0 = this.transform.position.x;
	y0 = this.transform.position.y;
	z0 = this.transform.position.z;
	v0 = this.transform.position.v;
	

	targetPointId = pid;
	nextPointId = (pid+1)%wayPoints.length;
	x1 = wayPoints[targetPointId][0];
	y1 = wayPoints[targetPointId][1];
	z1 = wayPoints[targetPointId][2];
	v1 = wayPoints[targetPointId][3];
	
	x2 = wayPoints[nextPointId][0];
	y2 = wayPoints[nextPointId][1];	
	z2 = wayPoints[nextPointId][2];	
	v2 = wayPoints[nextPointId][3];	
	
	vecNow = new Vector3(x1-x0,y1-y0,z1-z0);
	vecNext = new Vector3(x2-x1,y2-y1,z2-z1);
	
	dist = vecNow.magnitude;
	turnAngle = Vector3.Angle(vecNow, vecNext);
	LUR = turnRad/Mathf.Tan(turnAngle*Mathf.Deg2Rad);
	//TODO: деление на 0
	
	endLambda = (dist-LUR)/dist;
	
	moveMode = 1;
	lambda = 0;
}*/