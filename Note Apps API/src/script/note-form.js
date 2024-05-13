class NoteForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          form {
            margin: 20px;
          }
          label {
            display: grid;
            margin-bottom: 5px;
          }
          input[type="text"],
          textarea {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            box-sizing: border-box;
          }
          input[type="submit"] {
            padding: 8px 16px;
            background-color: #A0153E;
            color: white;
            border: none;
            cursor: pointer;
          }
        </style>
        <form id="noteForm">
          <label for="title">Masukan Catatan</label>
          <input type="text" id="title" required>
          <label for="body">Isi Catatan</label>
          <textarea id="body" required></textarea>
          <input type="submit" value="Add Note">
        </form>
      `;
    }
  
    connectedCallback() {
      this.shadowRoot.getElementById('noteForm').addEventListener('submit', this.addNote.bind(this));
    }
  
    addNote(event) {
      event.preventDefault();
      const titleInput = this.shadowRoot.getElementById('title');
      const bodyInput = this.shadowRoot.getElementById('body');
      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();
      if (title === '' || body === '') {
        alert('Mohon untuk mengisi semua kolom');
        return;
      }
      this.dispatchEvent(new CustomEvent('noteAdded', { detail: { title, body } }));
      titleInput.value = '';
      bodyInput.value = '';
    }
  }
  
  customElements.define('note-form', NoteForm);
  