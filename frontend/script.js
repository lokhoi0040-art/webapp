const BASE_URL = "http://127.0.0.1:3000/api/documents";

// LOAD
async function loadData() {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    render(data); // ✅ FIX
  } catch (err) {
    console.error(err);
  }
}

// RENDER
function render(data) {
  const table = document.getElementById("tableBody");
  table.innerHTML = "";

  if (!data || data.length === 0) {
    table.innerHTML = `<tr><td colspan="3">Không có dữ liệu</td></tr>`;
    return;
  }

  data.forEach(file => {
    table.innerHTML += `
      <tr>
        <td>${file.title}</td>
        <td>${file.id}</td>
        <td>
          <button onclick="deleteFile(${file.id})">Xóa</button>
        </td>
      </tr>
    `;
  });
}

// UPLOAD
async function uploadFile() {
  const input = document.getElementById("fileInput");
  const file = input.files[0];

  if (!file) return alert("Chọn file!");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", file.name);
  formData.append("category", "general");

  try {
    const res = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Upload lỗi");

    await res.json();

    input.value = "";
    loadData();
  } catch (err) {
    console.error(err);
    alert("Upload lỗi!");
  }
}

// DELETE
async function deleteFile(id) {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  loadData();
}

// SEARCH
async function search() {
  const keyword = document.getElementById("searchInput").value;

  const res = await fetch(`${BASE_URL}/search?keyword=${keyword}`);
  const data = await res.json();

  render(data);
}

loadData();