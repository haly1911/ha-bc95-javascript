import { el, errorEl, state } from "./core.js";
import { closeModal, renderEmpList, setupModal } from "./ui-flow.js";

// xử lý lưu dữ liệu vào localstorage
export const saveStorage = () => {
  localStorage.setItem("EMPLIST_STORAGE", JSON.stringify(state.empList));
};

export const getStorage = () => {
  const data = localStorage.getItem("EMPLIST_STORAGE");
  if (data) {
    state.empList = JSON.parse(data);
  }
};

// hàm tính tổng lương
const calcTotalSalary = (pos, salary) => {
  if (pos === "Sếp") return salary * 3;
  if (pos === "Trưởng phòng") return salary * 2;
  return salary;
};

// hàm xếp loại nhân viên
const calcRank = (hours) => {
  if (hours >= 192) return "Xuất sắc";
  if (hours >= 176) return "Giỏi";
  if (hours >= 160) return "Khá";
  return "Trung bình";
};

const getFormData = () => {
  const pos = el.position.value.trim();
  const salary = parseFloat(el.basicSalary.value);
  const hours = parseFloat(el.workingHours.value);
  return {
    acc: el.acc.value.trim(),
    fullName: el.fullName.value.trim(),
    email: el.email.value.trim(),
    password: el.password.value.trim(),
    workday: el.workday.value.trim(),
    position: pos,
    basicSalary: salary,
    workingHours: hours,
    totalSalary: calcTotalSalary(pos, salary),
    rank: calcRank(hours),
  };
};

const validationRules = {
  acc: { pattern: /^\d{4,6}$/, msg: "Tài khoản phải từ 4-6 ký số" },
  fullName: { pattern: /^[a-zA-ZÀ-ỹ\s]+$/, msg: "Tên phải là chữ" },
  email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: "Email không đúng định dạng" },
  password: {
    pattern: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,10}$/,
    msg: "Mật khẩu phải có 6-10 ký tự, có ít nhất 1 ký tự in hoa, 1 ký tự số, 1 ký tự đặc biệt",
  },
  workday: { pattern: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/, msg: "Ngày làm phải có định dạng mm/dd/yyyy" },
  basicSalary: { min: 1000000, max: 20000000, msg: "Lương cơ bản phải từ 1.000.000 - 20.000.000" },
  workingHours: { min: 80, max: 200, msg: "Số giờ làm phải từ 80 - 200" },
  position: { msg: "Vui lòng chọn chức vụ hợp lệ" },
};

// hàm validate cho từng field
export const validateField = (field) => {
  const input = el[field];
  const errorTag = errorEl[field];
  const rule = validationRules[field];
  if (!input || !rule) return true;

  const rawValue = input.value.trim();
  let errorMessage = "";
  // kiểm tra field trống
  if (rawValue === "" || rawValue === "Chọn chức vụ") {
    errorMessage = "Không được để trống";
  }
  // kiểm tra Regex
  else if (rule.pattern && !rule.pattern.test(rawValue)) {
    errorMessage = rule.msg;
  }
  // kiểm tra khoảng số (lương, giờ làm)
  else if (rule.min !== undefined) {
    const numValue = Number(rawValue);
    if (isNaN(numValue) || numValue < rule.min || numValue > rule.max) {
      errorMessage = rule.msg;
    }
  }
  // kiểm tra trùng lặp acc
  if (field === "acc" && !errorMessage) {
    const isDuplicate = state.empList.some((emp) => emp.acc === rawValue && state.editingEmp !== rawValue);
    if (isDuplicate) {
      errorMessage = "Tài khoản này đã tồn tại trong hệ thống";
    }
  }
  errorTag.innerHTML = errorMessage;
  errorTag.style.display = errorMessage ? "block" : "none";
  // nếu tất cả hợp lệ
  return errorMessage === "";
};

// hàm validate toàn bộ form
export const validateForm = () => {
  const fields = Object.keys(validationRules);
  let isValid = true;
  fields.forEach((field) => {
    const result = validateField(field);
    if (!result) isValid = false;
  });
  return isValid;
};

// hàm thêm nhân viên
const addEmp = () => {
  if (!validateForm()) return;
  const newEmp = getFormData();
  state.empList.push(newEmp);
  saveStorage();
  renderEmpList();
  el.form.reset();
  closeModal();
  alert("Thêm nhân viên thành công!");
};

// hàm xoá nhân viên
const delEmp = (acc) => {
  const isConfirm = confirm(`Bạn có chắc chắn muốn xóa nhân viên có tài khoản ${acc} không?`);
  if (isConfirm) {
    const index = state.empList.findIndex((emp) => emp.acc === acc);
    if (index !== -1) {
      state.empList.splice(index, 1);
      saveStorage();
      renderEmpList();
    }
  }
};

// hàm submit form
export const submitEmpForm = () => {
  if (!validateForm()) return;
  if (state.editingEmp) {
    updateEmp();
  } else {
    addEmp();
  }
};

// hàm sửa thông tin (lấy thông tin lên form)
export const editEmp = (acc) => {
  const emp = state.empList.find((item) => item.acc === acc);
  if (!emp) return;
  state.editingEmp = acc;
  // Gọi hàm giao diện
  setupModal("Cập nhật thông tin", true);
  // Đổ dữ liệu
  const fields = ["acc", "fullName", "email", "password", "workday", "basicSalary", "position", "workingHours"];
  fields.forEach((field) => {
    el[field].value = emp[field];
  });
};

// hàm cập nhật (lưu thay đổi)
export const updateEmp = () => {
  if (!validateForm()) return;
  const index = state.empList.findIndex((emp) => emp.acc === state.editingEmp);
  if (index !== -1) {
    const updatedData = getFormData();
    state.empList[index] = updatedData;
    saveStorage();
    renderEmpList();
    closeModal();
    alert("Cập nhật thành công!");
  }
};

// đưa hàm xoá/sửa ra window để HTML gọi được (Xóa/Sửa nằm trong chuỗi HTML render)
window.delEmp = delEmp;
window.editEmp = editEmp;
