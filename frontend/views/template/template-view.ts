import '!style-loader!css-loader!./template-view.css';
import { customElement, html } from 'lit-element';
import { View } from '../../views/view';
import '@vaadin/vaadin-checkbox'
import { appStore } from '../../stores/app-store';

@customElement('template-view')
export class TemplateView extends View {
  render() {
    return html`
		<div>Template</div>
		<vaadin-checkbox value="loggedin" .checked=${appStore.loggedIn}>Logged In</vaadin-checkbox>
	`;
  }
}