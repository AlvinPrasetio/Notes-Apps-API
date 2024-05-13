class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.notesData = [];
  }

  connectedCallback() {
    this.render();
  }

  setNotes(notes) {
    this.notesData = notes;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .list {
          margin: 20px;
        }
        .note {
          background-color: #5D0E41;
          padding: 20px;
          margin-bottom: 10px;
          border-radius: 5px;
          color: white;
          position: relative;
        }
        .note h3 {
          margin-top: 0;
        }
        .note p {
          margin-bottom: 0;
        }
        .delete-button {
          position: absolute;
          top: 5px;
          right: 5px;
          background-color: #A0153E;
          color: white;
          border: none;
          padding: 5px;
          border-radius: 3px;
          cursor: pointer;
        }
        #notesContainer {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
      </style>
      <div class="list">
        <h2>Notes List</h2>
        <div id="notesContainer"></div>
      </div>
    `;
    const notesContainer = this.shadowRoot.getElementById('notesContainer');
    this.notesData.forEach(note => {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
      noteDiv.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <button class="delete-button">Delete</button>
      `;
      noteDiv.querySelector('.delete-button').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('deleteNote', { detail: note.id }));
      });
      
      notesContainer.appendChild(noteDiv);
    });
  }
}

customElements.define('note-list', NoteList);
