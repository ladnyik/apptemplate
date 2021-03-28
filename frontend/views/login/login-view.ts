import '!style-loader!css-loader!./login-view.css';
import { customElement, html } from 'lit-element';
import { View } from '../../views/view';

@customElement('login-view')
export class LoginView extends View {
  render() {
    return html`<div>Please login</div>`;
  }
}
