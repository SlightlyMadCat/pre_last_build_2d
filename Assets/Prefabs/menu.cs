/// <summary>
/// Menu.
/// Главное меню игры
/// Создается отдельная сцена а там на любой объект вешается этот скрипт
/// </summary>
using UnityEngine;
using System.Collections;

public class menu : MonoBehaviour {
	
private int _window = 0;
	
void  OnGUI (){ 
					
if (_window == 0) { // теперь главное меню активировано при _window = 0 
	GUI.Box ( new Rect(Screen.width/2 - 100,Screen.height/2 - 100,200,180), "Main menu"); 
if (GUI.Button ( new Rect(Screen.width/2 - 90,Screen.height/2 - 80,180,30), "Play")) { 
    	Application.LoadLevel (1); 
    	} 
if (GUI.Button ( new Rect(Screen.width/2 - 90,Screen.height/2 - 40,180,30), "Help")) { 
            	_window = 2; // активируем окно "помощь" 
            } 
if (GUI.Button ( new Rect(Screen.width/2 - 90,Screen.height/2 - 0,180,30), "Options")) { 
            	_window = 2; //активируем окно "помощь" 
            }
if (GUI.Button ( new Rect(Screen.width/2 - 90,Screen.height/2 + 40,180,30), "Exit game")) { 
            	Application.Quit(); 
            } 
}

	// Настройки
if (_window == 1) {  
	GUI.Box ( new Rect(Screen.width/2 - 100,Screen.height/2 - 100,200,180), "Options"); 
	if (GUI.Button ( new Rect(Screen.width/2 - 90,Screen.height/2 + 40,180,30), "Back") || Input.GetKey ("escape")) { 
    	_window = 0; 
    } 
}
	// Помощь
if (_window == 2) { 
	GUI.Box ( new Rect(Screen.width/2 - 100,Screen.height/2 - 100,200,180), "Help"); 
	GUI.Label ( new Rect(Screen.width/2 - 100,Screen.height/2 - 80,180,140), "Trial project Sky Games."); // текст 
		if (GUI.Button ( new Rect(Screen.width/2 - 90,Screen.height/2 + 40,180,30), "Back") || Input.GetKey ("escape")) { 
        	_window = 0; 
    	} 
	}
}
}