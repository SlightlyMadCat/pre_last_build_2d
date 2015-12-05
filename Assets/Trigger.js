#pragma strict
var stolk = false;

function OnTriggerEnter (other : Collider) {
    print("ept");
    stolk = true;
}

function OnTriggerExit(other: Collider) {
    stolk = false; 
}