package com.apptemplate.application.endpoints;

import org.json.JSONArray;
import org.json.JSONObject;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

@Endpoint
@AnonymousAllowed
public class MenuEndPoint {
	
  @AnonymousAllowed	
  public String getMenu() {
	  
	  JSONObject projectMenu = new JSONObject();
	  projectMenu.put("text", "Project");
	  
	  JSONObject userMenu = new JSONObject();
	  userMenu.put("text", "User");	
	  JSONObject listMenu = new JSONObject();
	  listMenu.put("text", "List");
	  JSONObject addMenu = new JSONObject();
	  addMenu.put("text", "Add");
	  JSONArray userMenuArray = new JSONArray();
	  userMenuArray.put(listMenu);
	  userMenuArray.put(addMenu);
	  userMenu.put("children", userMenuArray);
	  
	  JSONArray projectMenuArray = new JSONArray();
	  projectMenuArray.put(userMenu);
	  projectMenu.put("children", projectMenuArray);
	  JSONArray mainMenuArray = new JSONArray();
	  mainMenuArray.put(projectMenu);	  
	  	  
	  JSONObject mainBack = new JSONObject();
	  mainBack.put("menu", mainMenuArray);
	  	  
	  JSONObject viewObject = new JSONObject();
	  viewObject.put("List", "template");
	  viewObject.put("Add", "template1");
	  mainBack.put("views", viewObject);
	  	  
	  return mainBack.toString();

  }
}