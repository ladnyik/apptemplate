import '!style-loader!css-loader!./app-view.css';
import { customElement, html, internalProperty, query, property } from 'lit-element';
import { View } from '../../views/view';
import { appStore } from '../../stores/app-store';
import '@polymer/iron-pages'
import '@vaadin/vaadin-icons'

@customElement('app-view')
export class AppView extends View {
								
  @property()
  selectedPage!: number ;								
								
  render() {
    return html`
			<vaadin-tabs id="maintabs" @selected-changed="${this.selectedChanged}">
			</vaadin-tabs>
			<iron-pages id="pages" selected="${this.selectedPage}">
			</iron-pages>
	`;
  }
  
  firstUpdated(){
	this.selectedPage = 0; 
	if (appStore.firstLoggedIn){
		appStore.firstLoggedIn = false;    
		document.addEventListener("menuselected", (e) => this.menuSelected(e));
		document.addEventListener("click", (e) => this.closeClick(e));
	}	
  }	

  connectedCallback() {
    super.connectedCallback();

  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
	
  selectedChanged(e: any){
	this.selectedPage = e.detail.value;
  }

  closeClick(e: any){

	var myid = e.target.id;
	if (myid.search('closeironicon__') >=	 0){
		var n = myid.search('__');
		var mytab = document.getElementById('tab__'+myid.substring(n+2));		
    	mytab?.remove();		
		var mypage = document.getElementById('page__'+myid.substring(n+2));		
    	mypage?.remove();
		var tabs = document.getElementById('maintabs');		
		var idNumber = tabs?.childNodes.length;
		tabs?.setAttribute("selected","0");
		this.selectedPage = 0;
		
	}
  }	

  menuSelected(e: any){
	
	var tabs = document.getElementById('maintabs');
	var tab = document.createElement('vaadin-tab');
	var idNumber = tabs?.childNodes.length;
	tab.setAttribute('id','tab__'+ idNumber);
	
	var t = document.createTextNode(e.detail);	
	tab.appendChild(t);
	
	var icon = document.createElement('iron-icon');
	icon.setAttribute('icon','vaadin:close-small');	
    icon.setAttribute('id','closeironicon__' + idNumber);
	tab.appendChild(icon);	
	tabs?.appendChild(tab);
	var ids:string;
	if (idNumber){
	 	ids =  String(idNumber-1);
		tabs?.setAttribute("selected",ids);
	}  	
		
    var pages = document.getElementById('pages');
	var page = document.createElement('page');	
	page.setAttribute('id','page__'+ idNumber);
	var template = appStore.views[e.detail];	
	import('../' + template +'/' + template + '-view');
	var view = document.createElement(template+'-view');
	page.appendChild(view);
	pages?.appendChild(page);
	console.log('select', this.selectedPage , idNumber);
	if (idNumber){		
		this.selectedPage = idNumber-1;
	}
  }
}
