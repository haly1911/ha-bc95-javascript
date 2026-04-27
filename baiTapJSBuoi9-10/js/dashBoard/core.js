export const state = {
  empList: [
    {
      acc: "0001",
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      password: "Abcd@1234",
      workday: "04/25/2026",
      position: "Nhân viên",
      basicSalary: 15000000,
      workingHours: 120,
      totalSalary: 15000000,
      rank: "Trung bình",
    },
  ],
  editingEmp: null,
};

export const el = {
  acc: document.getElementById("tknv"),
  fullName: document.getElementById("name"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  togglePassword: document.getElementById("togglePassword"),
  eyeIcon: document.getElementById("eyeIcon"),
  workday: document.getElementById("datepicker"),
  position: document.getElementById("chucvu"),
  basicSalary: document.getElementById("luongCB"),
  workingHours: document.getElementById("gioLam"),
  searchInput: document.getElementById("searchName"),
  searchBtn: document.getElementById("btnTimNV"),
  sortUp: document.getElementById("SapXepTang"),
  sortDown: document.getElementById("SapXepGiam"),
  modal: document.getElementById("myModal"),
  modalTitle: document.getElementById("header-title"),
  empListTable: document.getElementById("tableDanhSach"),
  openAddModalBtn: document.getElementById("btnThem"),
  addEmpBtn: document.getElementById("btnThemNV"),
  updateEmpBtn: document.getElementById("btnCapNhat"),
  closeModalBtn: document.getElementById("btnDong"),
  form: document.querySelector(".modal-body form"),
};

export const errorEl = {
  acc: document.getElementById("tbTKNV"),
  fullName: document.getElementById("tbTen"),
  email: document.getElementById("tbEmail"),
  password: document.getElementById("tbMatKhau"),
  workday: document.getElementById("tbNgay"),
  position: document.getElementById("tbChucVu"),
  basicSalary: document.getElementById("tbLuongCB"),
  workingHours: document.getElementById("tbGiolam"),
};
