
const BASE_URL = "https://webapp-production-8c17.up.railway.app/api/documents";

// ================= LOAD =================
async function loadData() {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) throw new Error("API lỗi");

    const data = await res.json();
    render(data);
  } catch (err) {
    console.error("LOAD ERROR:", err);
  }
}

// ================= RENDER =================
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
        <td>
          <a href="${file.file_url}" target="_blank">${file.title}</a>
        </td>
        <td>${file.id}</td>
        <td>
          <button onclick="deleteFile(${file.id})">Xóa</button>
        </td>
      </tr>
    `;
  });
}

// ================= UPLOAD =================
async function uploadFile() {
  const input = document.getElementById("fileInput");
  const file = input.files[0];

  if (!file) return alert("Chọn file!");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", file.name);

  try {
    const res = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(errText);
      throw new Error("Upload lỗi");
    }

    await res.json();

    alert("Upload thành công ✅");
    input.value = "";
    loadData();
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    alert("Upload lỗi!");
  }
}

// ================= DELETE =================
async function deleteFile(id) {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    loadData();
  } catch (err) {
    console.error("DELETE ERROR:", err);
  }
}

// ================= SEARCH =================
let timeout;

function search() {
  clearTimeout(timeout);

  timeout = setTimeout(async () => {
    const keyword = document.getElementById("searchInput").value;

    try {
      const res = await fetch(`${BASE_URL}?keyword=${keyword}`);
      const data = await res.json();
      render(data);
    } catch (err) {
      console.error("SEARCH ERROR:", err);
    }
  }, 300);
}

// ================= INIT =================
loadData();