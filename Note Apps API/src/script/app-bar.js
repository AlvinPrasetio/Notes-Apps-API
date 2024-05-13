class AppBar extends HTMLElement {
    _shadowRoot = null;
  
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          header {
            background-color: #FF204E;
            color: #fff;
            padding: 10px;
            text-align: center;
          }
        </style>
        <header>
          <h1>Notes App</h1>
        </header>
      `;
    }
  }
  
  customElements.define('app-bar', AppBar);
  