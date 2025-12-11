const uploadBtn = document.getElementById("uploadBtn");
const uploadModal = document.getElementById("uploadModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const savePdfBtn = document.getElementById("savePdfBtn");
const pdfGallery = document.getElementById("pdfGallery");
const searchInput = document.getElementById("searchInput");

const titleInput = document.getElementById("pdfTitle");
const catInput = document.getElementById("pdfCategory");
const descInput = document.getElementById("pdfDescription");
const fileInput = document.getElementById("pdfFile");

const previewContainer = document.getElementById("previewContainer");
const pdfIframe = document.getElementById("pdfIframe");
const closePreview = document.getElementById("closePreview");

const confirmDeleteModal = document.getElementById("confirmDeleteModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

let db;
let editingId = null;
let allPDFs = []; // in-memory for search
let pendingDeleteId = null;

// ✅ 1. Initialize IndexedDB
const request = indexedDB.open("PDFManagerDB", 1);

request.onupgradeneeded = function (e) {
  db = e.target.result;
  db.createObjectStore("pdfs", { keyPath: "id", autoIncrement: true });
};

request.onsuccess = function (e) {
  db = e.target.result;
  loadPDFs(); // Load all PDFs on success
};

request.onerror = function (e) {
  console.error("DB Error:", e.target.error);
};

// ✅ 2. Load All PDFs from DB
function loadPDFs() {
  const tx = db.transaction("pdfs", "readonly");
  const store = tx.objectStore("pdfs");
  const request = store.getAll();

  request.onsuccess = function () {
    allPDFs = request.result;
    renderPDFs(allPDFs);
  };
}

// ✅ 3. Render PDFs
function renderPDFs(data) {
  pdfGallery.innerHTML = "";
  data.forEach((pdf) => {
    const card = document.createElement("div");
    card.className = "card animate";
    card.innerHTML = `
      <div class="actions">
        <button class="edit-btn" onclick="event.stopPropagation(); editPDF(${pdf.id})">
          
        </button>
        <button class="delete-btn" onclick="event.stopPropagation(); deletePDF(${pdf.id})">
          
        </button>
      </div>
      <h3>${pdf.title}</h3>
      <small>${pdf.category}</small>
      <p>${pdf.description}</p>
    `;

    card.addEventListener("click", () => {
      const blobURL = URL.createObjectURL(pdf.blob);
      pdfIframe.src = blobURL;
      previewContainer.style.display = "flex";
    });

    pdfGallery.appendChild(card);
  });
}

// ✅ 4. Handle Upload
uploadBtn.onclick = () => {
  editingId = null;
  clearModal();
  uploadModal.style.display = "flex";
};

closeModalBtn.onclick = () => {
  uploadModal.style.display = "none";
};

savePdfBtn.onclick = () => {
  const title = titleInput.value.trim();
  const category = catInput.value.trim();
  const description = descInput.value.trim();
  const file = fileInput.files[0];

  if (!title || !category || !description || (!file && editingId === null)) {
    alert("Please fill all fields and upload a PDF.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const blob = file ? new Blob([e.target.result], { type: "application/pdf" }) : null;
    const tx = db.transaction("pdfs", "readwrite");
    const store = tx.objectStore("pdfs");

    if (editingId === null) {
      // Create new PDF
      store.add({ title, category, description, blob });
    } else {
      // Update existing
      const getReq = store.get(editingId);
      getReq.onsuccess = function () {
        const existing = getReq.result;
        existing.title = title;
        existing.category = category;
        existing.description = description;
        if (blob) existing.blob = blob;
        store.put(existing);
      };
    }

    tx.oncomplete = () => {
      loadPDFs();
      uploadModal.style.display = "none";
    };
  };

  if (file) {
    reader.readAsArrayBuffer(file);
  } else {
    // If no new file selected while editing
    const tx = db.transaction("pdfs", "readwrite");
    const store = tx.objectStore("pdfs");
    const getReq = store.get(editingId);
    getReq.onsuccess = function () {
      const existing = getReq.result;
      existing.title = title;
      existing.category = category;
      existing.description = description;
      store.put(existing);
    };

    tx.oncomplete = () => {
      loadPDFs();
      uploadModal.style.display = "none";
    };
  }
};

// ✅ 5. Preview Controls
closePreview.onclick = () => {
  previewContainer.style.display = "none";
  pdfIframe.src = "";
};

// ✅ 6. Search
searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();
  const filtered = allPDFs.filter(
    (pdf) =>
      pdf.title.toLowerCase().includes(q) ||
      pdf.category.toLowerCase().includes(q) ||
      pdf.description.toLowerCase().includes(q)
  );
  renderPDFs(filtered);
});

// ✅ 7. Edit PDF
window.editPDF = function (id) {
  editingId = id;
  const pdf = allPDFs.find((p) => p.id === id);
  if (!pdf) return;
  titleInput.value = pdf.title;
  catInput.value = pdf.category;
  descInput.value = pdf.description;
  fileInput.value = ""; // File inputs can't be prefilled
  uploadModal.style.display = "flex";
};

// ✅ 8. Delete PDF
window.deletePDF = function (id) {
  pendingDeleteId = id;
  confirmDeleteModal.style.display = "flex";
};

cancelDeleteBtn.onclick = () => {
  pendingDeleteId = null;
  confirmDeleteModal.style.display = "none";
};

confirmDeleteBtn.onclick = () => {
  if (pendingDeleteId !== null) {
    const tx = db.transaction("pdfs", "readwrite");
    const store = tx.objectStore("pdfs");
    store.delete(pendingDeleteId);
    tx.oncomplete = () => {
      loadPDFs();
      confirmDeleteModal.style.display = "none";
      pendingDeleteId = null;
    };
  }
};

// ✅ 9. Clear Modal
function clearModal() {
  titleInput.value = "";
  catInput.value = "";
  descInput.value = "";
  fileInput.value = "";
}
