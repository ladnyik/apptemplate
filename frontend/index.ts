import { Router } from '@vaadin/router';
import { routes } from './routes';
import { appStore } from './stores/app-store';

export const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);

window.addEventListener('vaadin-router-location-changed', (e) => {
  
  let path: string = ((e as CustomEvent).detail.location.pathname); 		
  if (!appStore.loggedIn && path != '/' &&!path.includes('login') ){
		console.log('back to login');
		Router.go({
  			pathname: router.baseUrl
		});
		return;
  }
  appStore.setLocation((e as CustomEvent).detail.location);
  const title = appStore.currentViewTitle;
  if (title) {
    document.title = title + ' | ' + appStore.applicationName;
  } else {
    document.title = appStore.applicationName;
  }
});
