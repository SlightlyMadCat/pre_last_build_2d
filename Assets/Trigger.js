#pragma strict
var stolk = false;
var i = 0;
var big_boom : ParticleSystem;
var count = 0;

function OnTriggerEnter (other : Collider) {
    print("ept");
    stolk = true;
    i++;
}

function OnTriggerExit(other: Collider) {
    stolk = false; 
}

function OnCollisionEnter (Col: Collision) {    //ядреный взрыв
    if (Col.gameObject.name == "Terrain Left" || Col.gameObject.name == "Terrain right") {
        big_boom.transform.position.x = this.transform.position.x;
        if (count == 0) {
            big_boom.Play();
            count+=1;
            GameObject.Find("plane42").GetComponent(diss_2).speed = 0;
        } else {
            big_boom.Stop();
        }
    }
}