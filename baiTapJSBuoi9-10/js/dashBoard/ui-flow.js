import { el, errorEl, state } from "./core.js";

// hàm render danh sách nhân viên
export const renderEmpList = (list = state.empList) => {
  el.empListTable.innerHTML = list
    .map(
      (emp) => `
        <tr>
            <td>${emp.acc}</td>
            <td>${emp.fullName}</td>
            <td>${emp.email}</td>
            <td>${emp.workday}</td>
            <td>${emp.position}</td>
            <td>${emp.totalSalary.toLocaleString()}</td>
            <td>${emp.rank}</td>
            <td class="d-flex justify-content-center">
                <button class="btn btn-info mr-1" onclick="editEmp('${emp.acc}')">Sửa</button>
                <button class="btn btn-danger" onclick="delEmp('${emp.acc}')">Xoá</button>
            </td>
        </tr>
    `,
    )
    .join("");
};

// hàm setup giao diện modal (dùng cho hàm openmodal và hàm sửa thông tin nhân viên)
export const setupModal = (title, isEdit = false) => {
  // Mở modal
  el.modal.style.display = "block";
  el.modal.classList.add("show");
  el.modalTitle.innerHTML = title;
  // Toggle nút bấm
  el.addEmpBtn.style.display = isEdit ? "none" : "inline-block";
  el.updateEmpBtn.style.display = isEdit ? "inline-block" : "none";
  // Quản lý ô tài khoản (Chỉ cho sửa khi Thêm mới)
  el.acc.readOnly = isEdit;
  // Dọn dẹp lỗi cũ (nếu có)
  Object.values(errorEl).forEach((span) => {
    span.innerHTML = "";
    span.style.display = "none";
  });
};

// hàm mở modal
export const openModal = () => {
  state.editingEmp = null; // Xóa trạng thái đang sửa (nếu có)
  // Gọi hàm giao diện
  setupModal("Thêm nhân viên", false);
  // Xóa trắng form
  if (el.form) el.form.reset();
};

// hàm đóng modal
export const closeModal = () => {
  el.modal.style.display = "none";
  el.modal.classList.remove("show");
};

// hàm toggle password
export const togglePassword = () => {
  const isPassword = el.password.type === "password";
  // Thay đổi trạng thái hiển thị
  el.password.type = isPassword ? "text" : "password";
  // Cập nhật Icon
  el.eyeIcon.classList.toggle("fa-eye");
  el.eyeIcon.classList.toggle("fa-eye-slash");
};

// hàm loại bỏ dấu của ô input search
const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD") // Tách các dấu ra khỏi chữ cái
    .replace(/[\u0300-\u036f]/g, "") // Xóa các ký tự dấu
    .replace(/đ/g, "d") // Xử lý riêng chữ đ
    .replace(/Đ/g, "D");
};

// hàm search nhân viên theo xếp loại
export const searchEmpByRank = () => {
  const keyword = removeVietnameseTones(el.searchInput.value.trim().toLowerCase());
  const filteredList = state.empList.filter((emp) => {
    const rank = removeVietnameseTones(emp.rank.toLowerCase());
    return rank.includes(keyword);
  });
  renderEmpList(filteredList);
};

// hàm sort list danh sách nhân viên theo acc
export const sortEmp = (dir) => {
  state.empList.sort((a, b) => dir * (a.acc - b.acc));
  renderEmpList();
  if (dir === 1) {
    el.sortUp.style.display = "none";
    el.sortDown.style.display = "inline-block";
  } else {
    el.sortDown.style.display = "none";
    el.sortUp.style.display = "inline-block";
  }
};
