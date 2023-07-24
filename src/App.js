// Código JavaScript que se ejecuta cuando se carga completamente el DOM
document.addEventListener('DOMContentLoaded', () => {
  const noteForm = document.getElementById('note-form');
  const titleInput = document.getElementById('title-input');
  const descriptionInput = document.getElementById('description-input');
  const importantCheckbox = document.getElementById('important-checkbox');
  const notesContainer = document.getElementById('notes-container');
  
  // Añadiendo un evento de envío (submit) al formulario de notas
  noteForm.addEventListener('submit', e => {
    e.preventDefault();
    addNote();
  });
  
  // Mostrando las notas existentes al cargar la página
  displayNotes();
  
  // Función para agregar una nueva nota
  function addNote() {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const isImportant = importantCheckbox.checked;
    
    // Verificando si la descripción está vacía
    if (description === '') {
      alert('Please enter a description.');
      return;
    }
    
    // Creando un objeto de nota
    const note = {
      title,
      description,
      isImportant
    };
    
    // Guardando la nota en el almacenamiento local
    saveNoteToLocalStorage(note);
    // Mostrando la lista actualizada de notas
    displayNotes();
    // Limpiando los campos del formulario
    clearForm();
  }
  
  // Función para guardar una nota en el almacenamiento local
  function saveNoteToLocalStorage(note) {
    let notes = [];
    if (localStorage.getItem('notes')) {
      notes = JSON.parse(localStorage.getItem('notes'));
    }
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
  }
  
  // Función para mostrar todas las nota
  function displayNotes() {
    notesContainer.innerHTML = '';
    let notes = [];
    if (localStorage.getItem('notes')) {
      notes = JSON.parse(localStorage.getItem('notes'));
    }
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      if (note.isImportant) {
        noteElement.classList.add('important');
      }
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.description}</p>
      `;
      notesContainer.appendChild(noteElement);
    });
  }
  
  // Función para limpiar los campos del formulario
  function clearForm() {
    titleInput.value = '';
    descriptionInput.value = '';
    importantCheckbox.checked = false;
  }
});