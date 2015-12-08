/// <summary>
/// Pause.
/// Вешается на любой игровой объект
/// Вызывает меню с настройками и останавливает игру
/// </summary>
using UnityEngine; 
using System.Collections; 

public class Pause : MonoBehaviour { 

// Игровая пауза
private bool _paused = false;
// Окна меню
private int _window = 100;
// Звук (пока не работает)
private float _FloatVolume = 50;
private int IntVolume;
// Разрешение экрана
private float _FloatResolution = 2;
private int IntResolution;
// Для вывода значений на экран
private string StringWidth;
private string StringHeight;
	
//Переменные для расширения экрана
private int width = 1440;
private int height = 900;
private bool FullScreen = true;
	
// Для настроек управления
private bool Mouse;
private bool Keyboard;
public GameObject go;

  
  // Update выполняется на каждый кадр 
	void Update () { 
	
	// Ставим игру на паузу
	if(Input.GetKeyUp(KeyCode.Escape)){
			
		if(!_paused){  
			Time.timeScale = 0;  
			_paused = true; 
			_window = 0;
            }
		else{  
			Time.timeScale = 1;  
			_paused = false;
			_window = 100;
			} 
		} 
	} 
	
	void  OnGUI (){ 
					
		if (_window == 0) { // Главное меню активировано при _window = 0 
			GUI.Box ( new Rect(Screen.width/2 - 200,Screen.height/2 - 160,400,300), "Game menu");
			
		if (GUI.Button ( new Rect(Screen.width/2 - 120,Screen.height/2 - 140,240,60), "Continue")) { // Продолжить
    			Time.timeScale = 1;
				_paused=false;
				_window = 100; 
    		} 
		if (GUI.Button ( new Rect(Screen.width/2 - 120,Screen.height/2 - 70,240,60), "Options")) { // Опции
            	_window = 1; // активируем окно "настройки" 
            }
		if (GUI.Button ( new Rect(Screen.width/2 - 120,Screen.height/2 - 0,240,60), "Restart Game")) { // Главное меню 
				Time.timeScale = 1;  
				_paused = false;
				_window = 100;
            	Application.LoadLevel (0);   
            } 
		if (GUI.Button ( new Rect(Screen.width/2 - 120,Screen.height/2 + 70,240,60), "Exit game")) { // Выход из игры
            	Application.Quit(); 
            } 
		}

		// Настройки
		if (_window == 1) {  
			GUI.Box ( new Rect(Screen.width/2 - 200, Screen.height/2 - 160, 400, 300), "Options"); 
			
			if (GUI.Button ( new Rect(Screen.width/2 - 120, Screen.height/2 - 140, 240, 60), "Video")) { // Видео
    			_window = 3;
    		} 
			if (GUI.Button ( new Rect(Screen.width/2 - 120, Screen.height/2 - 70, 240, 60), "Audio")) { // Звук
            	_window = 2;
            }
			if (GUI.Button ( new Rect(Screen.width/2 - 120, Screen.height/2 - 0, 240, 60), "Control")) { // Управление
				_window = 4;   
            }
			if (GUI.Button ( new Rect(Screen.width/2 - 120,Screen.height/2 + 70, 240, 60), "Back") || Input.GetKeyUp(KeyCode.Escape)) {
    			_window = 0; 
    		} 
		}
		// Звук
		if (_window == 2) { 
			GUI.Box ( new Rect(Screen.width/2 - 200, Screen.height/2 - 160, 400, 300), "Audio"); 
			GUI.Label ( new Rect(Screen.width/2 - 120, Screen.height/2 - 70, 240, 60), "Volume:" ); // текст 
			
			_FloatVolume = GUI.HorizontalSlider ( new Rect(Screen.width/2+50 - 120,Screen.height/2+6 - 120, 140, 30), _FloatVolume, 0, 100);
			IntVolume = (int)_FloatVolume;
			//audio.volume = IntVolume;
			
			if (GUI.Button ( new Rect(Screen.width/2 - 120,Screen.height/2 + 60,200,40), "Back") || Input.GetKeyUp(KeyCode.Escape)) { 
        		_window = 1; 
    		} 
		}
		// Видео
		if (_window == 3) { 
			GUI.Box ( new Rect(Screen.width/2 - 200, Screen.height/2 - 160, 400, 300), "Video"); 
			GUI.Label ( new Rect(Screen.width/2 - 120,Screen.height/2 - 100,240,50), "Resolution:"); // текст 
			
			_FloatResolution = GUI.HorizontalSlider ( new Rect(Screen.width/2 - 40,Screen.height/2 - 95,120,40), _FloatResolution, 0, 2);
			// Расчеты расширения
			IntResolution = (int)_FloatResolution;
			if (IntResolution == 0){
				width = 640;
				height = 480;
				StringWidth = width.ToString();
				StringHeight = height.ToString();
			}
			if (IntResolution == 1){
				width = 1024;
				height = 768;
				StringWidth = width.ToString();
				StringHeight = height.ToString();
			}
			if (IntResolution == 2){
				width = 1600;
				height = 900;
				StringWidth = width.ToString();
				StringHeight = height.ToString();
			}
			// Вывод на экран выбираемого расширения
			GUI.Label ( new Rect(Screen.width/2 - 90,Screen.height/2 - 40,180,30), StringWidth); // ширина
			GUI.Label ( new Rect(Screen.width/2 - 50,Screen.height/2 - 40,180,30), StringHeight); // высота
			
			FullScreen = GUI.Toggle ( new Rect(Screen.width/2 - 90,Screen.height/2 - 0,180,30), FullScreen, "Full screen"); 
			//if (FullScreen == true) {}
			
			if (GUI.Button ( new Rect(Screen.width/2 - 90,Screen.height/2 + 40,180,30), "Save and back")) { 
				Screen.SetResolution (width, height, FullScreen);//A - ширина. B - высота. С - полноэкранный или оконный.
				_window = 1;
    		} 
			if (Input.GetKeyUp(KeyCode.Escape)) { 
				_window = 1;
    		}
		}
		if (_window == 4){
			GUI.Box ( new Rect(Screen.width/2 - 200,Screen.height/2 - 160, 400, 300), "Type control");
			Mouse = GUI.Toggle ( new Rect(Screen.width/2 - 120,Screen.height/2 - 100,240,50), Mouse, "Mouse");
			if (Mouse)
				Keyboard = false;
			Keyboard = GUI.Toggle ( new Rect(Screen.width/2 - 120,Screen.height/2 - 60,240,50), Keyboard, "Keyboard");
			if (Keyboard)
				Mouse = false;
			if (!Mouse && !Keyboard)
				Mouse = true;
			if (GUI.Button ( new Rect(Screen.width/2 - 120,Screen.height/2 + 60,240,50), "Save and back")) {
				// Присвоение скриптам переменных
				MoveMousePlayer mp = (MoveMousePlayer) go.GetComponent<MoveMousePlayer>();
				MoveKeyboardPlayer kp = (MoveKeyboardPlayer) go.GetComponent<MoveKeyboardPlayer>();
				// Проверка и перерасчет изменений
				if(Mouse && mp == enabled){
					mp.enabled = enabled;
					kp.enabled = !enabled;
         		}
				if(Keyboard && kp == enabled){
					kp.enabled = enabled;
					mp.enabled = !enabled;
         		}
        		_window = 1; 
    		}
			if (Input.GetKeyUp(KeyCode.Escape))
				_window = 1;
		}
	}
}