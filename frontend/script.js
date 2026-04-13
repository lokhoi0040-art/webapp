const BASE_URL = "http://127.0.0.1:3000/api/documents";

// ================= LOAD =================
async function loadData() {
  try {
    const res = await fetch(BASE_URL);
    const result = await res.json();

    render(result.data); // ✅ đúng
  } catch (err) {
    console.error("Không kết nối được backend", err);
  }
}

// ================= RENDER =================
function render(data) {
  const table = document.getElementById("tableBody");
  table.innerHTML = "";

  if (!data || data.length === 0) {
    table.innerHTML = `
      <tr>
        <td colspan="3">Không có dữ liệu</td>
      </tr>
    `;
    return;
  }

  data.forEach(file => {
    const id = file.id;
    const name = file.title; // ✅ đúng field backend

    table.innerHTML += `
      <tr>
        <td>📄 ${name}</td>
        <td>${id}</td>
        <td>
          <button class="delete-btn" onclick="deleteFile('${id}')">
            Xóa
          </button>
        </td>
      </tr>
    `;
  });
}

// ================= UPLOAD =================
async function uploadFile() {
  const file = document.getElementById("fileInput").files[0];

  if (!file) {
    alert("Chọn file!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", file.name);
  formData.append("category", "general");

  try {
    await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      body: formData
    });

    loadData();
  } catch (err) {
    alert("Upload lỗi!");
  }
}
// ================= DELETE =================
async function deleteFile(id) {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });

    loadData();
  } catch (err) {
    alert("Xóa lỗi!");
  }
}

// ================= SEARCH =================
async function search() {
  const keyword = document.getElementById("searchInput").value;

  try {
    const res = await fetch(`${BASE_URL}/search?keyword=${keyword}`);
    const result = await res.json();

    render(result.data); // ✅ đúng
  } catch (err) {
    alert("Search lỗi!");
  }
}

// ================= INIT =================
loadData();