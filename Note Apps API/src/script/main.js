import { notesData } from "./note.js";
function main() {
    const baseUrl = "https://notes-api.dicoding.dev/v2";
    const noteListElement = document.querySelector("note-list");
    const filterNotes = document.querySelector("note-form").querySelector("select");
  
    const getUnArchived = async () => {
      try {
        showLoadingSpinner();
        const response = await fetch(`${baseUrl}/notes`);
        const responseJson = await response.json();
  
        if (responseJson.data.length > 0) {
          noteListElement.renderNotes(responseJson.data);
        } else {
          showResponseMessage("Note Empty");
          noteListElement.renderNotes([]);
        }
      } catch (error) {
        showResponseMessage(error);
      } finally {
        hideLoadingSpinner();
      }
    };
  
    const getArchived = async () => {
      try {
        showLoadingSpinner();
        const response = await fetch(`${baseUrl}/notes/archived`);
        const responseJson = await response.json();
  
        if (responseJson.data.length > 0) {
          noteListElement.renderNotes(responseJson.data);
        } else {
          showResponseMessage("Note Empty");
          noteListElement.renderNotes([]);
        }
      } catch (error) {
        showResponseMessage(error);
      } finally {
        hideLoadingSpinner();
      }
    };
  
    const addNote = async (note) => {
      try {
        showLoadingSpinner();
        const responseJson = await response.json();
        const response = await fetch(`${baseUrl}/notes`, options);
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        };
        showResponseMessage(responseJson.message);
        getUnArchived();
      } catch (error) {
        showResponseMessage(error);
      } finally {
        hideLoadingSpinner();
      }
    };
  
    const removeNote = (noteId) => {
      showLoadingSpinner();
      fetch(`${baseUrl}/notes/${noteId}`, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          showResponseMessage(responseJson.message);
          if (filterNotes.selectedIndex == 0) {
            getUnArchived();
          } else {
            getArchived();
          }
        })
        .catch((error) => {
          showResponseMessage(error);
        })
        .finally(() => {
          hideLoadingSpinner();
        });
    };
  
    const archiveNote = async (id) => {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(`${baseUrl}/notes/${id}/archive`, options);
        const responseJson = await response.json();
        showResponseMessage(responseJson.message);
        getUnArchived();
      } catch (error) {
        showResponseMessage(error);
      }
    };
  
    const unArchiveNote = async (id) => {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(`${baseUrl}/notes/${id}/unarchive`, options);
        const responseJson = await response.json();
        showResponseMessage(responseJson.message);
        getArchived();
      } catch (error) {
        showResponseMessage(error);
      }
    };
  
    const showResponseMessage = (message = "Check your internet connection") => {
      alert(message);
    };
  
    document.addEventListener("DOMContentLoaded", () => {
      getUnArchived();
    });
  
    document.addEventListener("addNote", function (event) {
      const { title, body } = event.detail;
  
      const newNote = {
        title: title,
        body: body,
      };
  
      addNote(newNote);
    });
  
    const showLoadingSpinner = () => {
      document.getElementById("loadingSpinner").style.display = "block";
    };
  
    const hideLoadingSpinner = () => {
      document.getElementById("loadingSpinner").style.display = "none";
    };
  
    filterNotes.addEventListener("change", function () {
      if (filterNotes.selectedIndex == 0) {
        getUnArchived();
      } else {
        getArchived();
      }
    });
  }
  
  export default main;
  