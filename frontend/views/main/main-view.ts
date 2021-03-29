import '@vaadin/vaadin-app-layout';
import { AppLayoutElement } from '@vaadin/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-menu-bar';
import type {MenuBarElement} from '@vaadin/vaadin-menu-bar';
import { customElement, html, internalProperty, query } from 'lit-element';
import { router } from '../../index';
import { views } from '../../routes';
import { appStore } from '../../stores/app-store';
import { Layout } from '../view';
import styles from './main-view.css';
import { Router } from '@vaadin/router';
import { getMenu } from "../../generated/MenuEndPoint";
//import '@vaadin/vaadin-login/vaadin-login-overlay';
//import {LoginOverlayElement, LoginI18n } from '@vaadin/vaadin-login'
import { userLogin } from "../../generated/LoginEndPoint";
import '../../mycomponent/my-vaadin-login/vaadin-login-overlay';
import {LoginOverlayElement, LoginI18n } from '../../mycomponent/my-vaadin-login'

interface RouteInfo {
  path: string;
  title: string;
}

@customElement('main-view')
export class MainView extends Layout {
				
  @internalProperty()
  abbrevation!: String;

  @query('#mainmenu')
  private mainMenu!: MenuBarElement;

  @internalProperty()
  private loginOpened = false;

  @query('#login')
  private login!: LoginOverlayElement;

  @internalProperty()	
  private i18n: LoginI18n = 
	{
    	"form": {
    	    "title": "Log in",
        	"username": "Username",
        	"password": "Password",
        	"submit": "Log in",
        	"forgotPassword": "Cancel"
    	},
    	"errorMessage": {
        	"title": "Incorrect username or password",
        	"message": "Check that you have entered the correct username and password and try again."
    	},
		"additionalInformation":"Here comes the additional description"
	};
	
  @internalProperty()
  private loginDescription = "loginDescription";

  @internalProperty()
  private header = "Header";

  @internalProperty()
  errorTitle: String = 'Incorrect username or password';

  @internalProperty()
  errorMessage: String = 'Check that you have entered the correct username and password and try again.';
		
  static get styles() {
    return [styles];
  }
	
  render() {
    return html`
      <vaadin-login-overlay id="login" .opened=${this.loginOpened} .i18n=${this.i18n} 
			description=${this.loginDescription} 
			errortitle=${this.errorTitle} 
			errormessage=${this.errorMessage} 
			>
       <h1 slot="title">${this.header}</h1> 
      </vaadin-login-overlay>
      <vaadin-app-layout primary-section="drawer">
        <header slot="navbar" theme="dark">
          <!-- <h1>${appStore.currentViewTitle}</h1> -->
          <vaadin-menu-bar .hidden=${!appStore.loggedIn} id ="mainmenu" ></vaadin-menu-bar>
          <vaadin-avatar abbr="${this.abbrevation}" @click="${this.avatarClick}"></vaadin-avatar>
        </header>
        <slot></slot>
      </vaadin-app-layout>

    `;
  }

  async firstUpdated(){
	
	var menu = await getMenu(); 
	this.mainMenu.items = JSON.parse(menu).menu;
	appStore.views = JSON.parse(menu).views;
    this.mainMenu.addEventListener('item-selected', (e) => this.menuItemSelected(e));
	this.login.addEventListener("login", (e) => {this.userLogin(e)});
	this.login.addEventListener("forgot-password", (e) => 
		{
			this.loginOpened=false;
			this.login.error = false;
		}
	);	
  }

  async userLogin(e: CustomEvent){
	var loginSuccess = await userLogin(e.detail.username, e.detail.password);
	if (!loginSuccess){
		this.loginOpened = true;			
		this.login.error = true;
		//this.errorTitle = 'Error Title ' + this.counter;
		//this.errorMessage ='Error Message ' + this.counter; 

	}
	else{
        this.loginOpened = false;
		appStore.loggedIn = true;
		Router.go({
  			pathname: router.baseUrl + 'app',
		});
		this.abbrevation = 'LI';
	}
  }

  menuItemSelected(e: CustomEvent){
	let event = new CustomEvent("menuselected", {bubbles: true, detail:e.detail.value.text});
	this.dispatchEvent(event);
  }

  constructor(){
	super();
	this.abbrevation = 'NO';
  }

  connectedCallback() {
    super.connectedCallback();
    this.reaction(
      () => appStore.location,
      () => {
        AppLayoutElement.dispatchCloseOverlayDrawerEvent();
      }
    );
  }
   
  avatarClick(){
	
	if (appStore.loggedIn){
		appStore.loggedIn = false;
		Router.go({
  			pathname: router.baseUrl + 'login',
		});
		this.abbrevation = 'NO';
		// here may come additional logout logic
	}
	else{
        this.loginOpened = true;				
	}	
  }	

  private getMenuRoutes(): RouteInfo[] {
    return views.filter((route) => route.title) as RouteInfo[];
    //return views.filter((route) => route.title) as RouteInfo[];
  }

  private getSelectedViewRoute(): number {
    return this.getMenuRoutes().findIndex((viewRoute) => viewRoute.path == appStore.location);
  }
}
