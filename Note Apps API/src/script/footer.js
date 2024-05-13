class FooterBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background-color: #00224D;
          color: #fff;
          padding: 10px;
          text-align: center;
        }
        footer h3{
          font-size: 17px;
        }
      </style>
      <footer>
        <h3>Dicoding Note Apps by: Alvin Prasetio</h3>
      </footer>
    `;
  }
}

customElements.define('footer-bar', FooterBar);
