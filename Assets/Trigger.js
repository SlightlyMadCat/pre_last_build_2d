#pragma strict
var stolk = false;
var i = 0;

function OnTriggerEnter (other : Collider) {
    print("ept");
    stolk = true;
    i++;
}

function OnTriggerExit(other: Collider) {
    stolk = false; 
}