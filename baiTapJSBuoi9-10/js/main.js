import { el, errorEl, state } from "./dashBoard/core.js";
import { getStorage, submitEmpForm, validateField } from "./dashBoard/crud-flow.js";
import { closeModal, openModal, renderEmpList, searchEmpByRank, sortEmp, togglePassword } from "./dashBoard/ui-flow.js";

// hàm xử lý form
const handleFormAction = (e, callback) => {
  e.preventDefault();
  callback();
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("Hệ thống quản lý nhân viên sẵn sàng");
  getStorage()

  // render danh sách nhân viên
  renderEmpList();

  // mở modal thêm nhân viên
  el.openAddModalBtn.addEventListener("click", openModal);

  // đóng modal
  el.closeModalBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === el.modal) closeModal();
  });

  // validation khi user nhập input
  const inputFields = ["acc", "fullName", "email", "password", "workday", "basicSalary", "position", "workingHours"];
  inputFields.forEach((field) => {
    if (el[field]) {
      el[field].addEventListener("input", () => validateField(field));
      if (field === "workday" || field === "position") {
        el[field].addEventListener("change", () => validateField(field));
      }
    }
  });

  // Khi chọn ngày từ lịch, gọi hàm kiểm tra để xóa lỗi
  $("#datepicker").on("change", () => {
    validateField("workday");
  });

  // ẩn/hiện password
  el.togglePassword.addEventListener("click", togglePassword);

  // thêm nhân viên
  el.addEmpBtn.addEventListener("click", (e) => handleFormAction(e, submitEmpForm));
  el.form.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleFormAction(e, submitEmpForm);
    }
  });

  // cập nhật thông tin nhân viên
  el.updateEmpBtn.addEventListener("click", (e) => handleFormAction(e, submitEmpForm));

  // search nhân viên theo xếp loại
  el.searchInput.addEventListener("input", searchEmpByRank);
  el.searchBtn.addEventListener("click", searchEmpByRank);

  // sort list nhân viên theo acc
  el.sortUp.addEventListener("click", () => sortEmp(1));
  el.sortDown.addEventListener("click", () => sortEmp(-1));
});
