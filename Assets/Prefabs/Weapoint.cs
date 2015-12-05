/// <summary>
/// Weapoint.
/// "Ведет" объект по точкам
/// Вешается на сам объект
/// </summary>
using UnityEngine;
using System.Collections;

public class Weapoint : MonoBehaviour {
	
	//точки
	public GameObject point_0;
    public GameObject point_1;
    public GameObject point_2;
    public GameObject plane42;
	
	//массив для хранения координат точек
	Transform[] all_Point=new Transform[3];
	//позиция конкретной точки 
	private Vector3 target_Pos;
	//номер элемента массива
    private int i = 0;
	//скорость точки
    public float speed_move = 5f;

	// Use this for initialization
	void Start () {
		//присвоение точки по тегу
		point_0 = GameObject.FindWithTag("Point1");
		point_1 = GameObject.FindWithTag("Point2");
		point_2 = GameObject.FindWithTag("Point3");
        plane42 = GameObject.FindWithTag("main_plain");
        //присвоение элементов массива
        all_Point[0] = point_0.transform;
        all_Point[1] = point_1.transform;
        all_Point[2] = point_2.transform;
	}
	
	// Update is called once per frame
	void Update () {
		//цель объекта
		target_Pos = all_Point[i].transform.position;
        //print(target_Pos);
		//передвижение объекта
        //plane42.transform.Translate(Vector3.Normalize(target_Pos - plane42.transform.position)*Time.deltaTime*speed_move);
		//расстояние до цели
        float distans = Vector3.Distance(target_Pos, plane42.transform.position);
        //print("d"+distans);

        //plane42.transform.position.z += 0.01;

        if (distans < 0.5f)
        {
            print("works");
            if (i < all_Point.Length - 1)
            {
                i++;
            }
            else
            {
				Destroy(plane42);
            }
        }
	
	}
}

