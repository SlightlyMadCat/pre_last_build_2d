#pragma strict
var stolk = false;

function OnTriggerEnter (other : Collider) {
    /**if (other.collider() == "main_plane") {
        print("privet yoba");
    }*/
    print("ept");
    stolk = true;
}

function OnTriggerExit(other: Collider) {
    stolk = false; 
}