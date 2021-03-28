import '!style-loader!css-loader!./template1-view.css';
import { customElement, html } from 'lit-element';
import { View } from '../../views/view';
import '@vaadin/vaadin-checkbox'
import { appStore } from '../../stores/app-store';

@customElement('template1-view')
export class Template1View extends View {
  render() {
    return html`
		<div>Template 1</div>
		<vaadin-checkbox value="loggedin" .checked=${!appStore.loggedIn}>Logged In 1</vaadin-checkbox>
	`;
  }
}