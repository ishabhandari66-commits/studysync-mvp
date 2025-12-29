// ================= ELEMENTS =================
const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");
const searchInput = document.getElementById("searchInput");

// ================= NOTES STORAGE =================
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// ================= RENDER NOTES =================
function renderNotes(displayNotes = notes) {
  notesList.innerHTML = "";

  if (displayNotes.length === 0) {
    notesList.innerHTML = `<p style="text-align:center; color:#555;">No notes yet. Add something!</p>`;
    return;
  }

  displayNotes.forEach((note, index) => {
    const div = document.createElement("div");
    div.className = "card note-card";

    // Check if note is a URL
    if (note.startsWith("http")) {
      div.innerHTML = `
        <a href="${note}" target="_blank">${note}</a>
        <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
      `;
    } else {
      div.innerHTML = `
        <p>${note}</p>
        <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
      `;
    }

    notesList.appendChild(div);
  });
}

// ================= ADD NOTE =================
addNoteBtn.onclick = () => {
  const value = noteInput.value.trim();
  if (!value) return;

  notes.push(value);
  localStorage.setItem("notes", JSON.stringify(notes));
  noteInput.value = "";
  renderNotes();
};

// ================= DELETE NOTE =================
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

// ================= SEARCH NOTES =================
searchInput.oninput = () => {
  const value = searchInput.value.toLowerCase();
  renderNotes(notes.filter(n => n.toLowerCase().includes(value)));
};

// ================= INITIAL RENDER =================
renderNotes();