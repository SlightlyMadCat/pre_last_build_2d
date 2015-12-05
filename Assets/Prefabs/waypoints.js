#pragma strict
var wayPoints = [
[364, 8,20, 0,90,0],
[364, 8,150, 0,90,0],
[364, 8,330, 0,90,0],
[364, 8,555, 0,90,0],
[364, 20,677, 0,90,-6],
[364, 42,888, 0,90,-6],

[364, 67,1125, 0,90,-6],
[391, 69,1178, 7,99,-3],
[412, 73,1261, 6,113,0],
[464, 73,1296, 6,123,0],
[464, 73,1296, 6,123,0],
[464, 73,1296, 6,123,0],
[464, 73,1296, 6,123,0],
[364, 42,888, 0,90,-6],
[364, 42,888, 0,90,-6],
[364, 42,888, 0,90,-6]
];

var angX:float;
var angY:float;
var angZ:float;

var lambda:float;
var currentPointId:int;
function Start () {
	currentPointId = 0;
	lambda = 0;
	angX = 0;
	angY = 90;
	angZ = 0;
	
}

function Update () {
	lambda+=0.01;
	if (lambda>=1){
		lambda-=1;
		currentPointId++;
	}
	
	this.transform.position.x = wayPoints[currentPointId][0]*(1-lambda)+wayPoints[currentPointId+1][0]*lambda;
	this.transform.position.y = wayPoints[currentPointId][1]*(1-lambda)+wayPoints[currentPointId+1][1]*lambda;
	this.transform.position.z = wayPoints[currentPointId][2]*(1-lambda)+wayPoints[currentPointId+1][2]*lambda;
	
	var newangX:float = wayPoints[currentPointId][3]*(1-lambda)+wayPoints[currentPointId+1][3]*lambda;
	var newangY:float = wayPoints[currentPointId][4]*(1-lambda)+wayPoints[currentPointId+1][4]*lambda;
	var newangZ:float = wayPoints[currentPointId][5]*(1-lambda)+wayPoints[currentPointId+1][5]*lambda;
	
	
	
	this.transform.Rotate(newangX-angX,newangY-angY,newangZ-angZ);
	
	
}
