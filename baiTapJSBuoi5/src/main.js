const showPage = (id) => {
  // Ẩn tất cả page
  document.querySelectorAll(".page").forEach((page) => page.classList.add("hidden"));

  // Hiện page được chọn
  document.getElementById(id).classList.remove("hidden");

  // Lưu page hiện tại
  localStorage.setItem("currentPage", id);

  // Reset màu tất cả button
  document.querySelectorAll(".menu-btn").forEach((btn) => {
    btn.classList.remove("bg-[#9CAB84]");
    btn.classList.add("bg-[#F6F0D7]");
  });

  // Active button tương ứng
  const activeBtn = document.querySelector(`[data-page="${id}"]`);

  if (activeBtn) {
    activeBtn.classList.remove("bg-[#F6F0D7]");
    activeBtn.classList.add("bg-[#9CAB84]");
  }
};

// Khi load trang
window.onload = () => {
  const savedPage = localStorage.getItem("currentPage") || "bai1";
  showPage(savedPage);
};

// Expand buttons
const allExpandBtns = document.querySelectorAll(".expand-btn");
allExpandBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const arrow = btn.querySelector(".arrow-icon");
    const isClosed = !content.style.maxHeight || content.style.maxHeight === "0px";
    if (isClosed) {
      content.style.maxHeight = `${content.scrollHeight}px`;
      if (arrow) arrow.style.transform = "rotate(90deg)";
    } else {
      content.style.maxHeight = "0px";
      if (arrow) arrow.style.transform = "rotate(0deg)";
    }
  });
});

// Dropdown buttons
const dropdownLists = document.querySelectorAll(".dropdown-list");

dropdownLists.forEach((list) => {
  const btn = list.previousElementSibling;
  const btnText = btn.querySelector("span");
  const options = list.querySelectorAll("li");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownLists.forEach((other) => {
      if (other !== list) other.classList.add("hidden");
    });
    list.classList.toggle("hidden");
  });

  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      btnText.textContent = opt.textContent;
      list.classList.add("hidden");
    });
  });
});

document.addEventListener("click", () => {
  dropdownLists.forEach((list) => list.classList.add("hidden"));
});

// Bài 1
document.getElementById("form-xet-tuyen").addEventListener("submit", (e) => {
  e.preventDefault();
  // input
  const scoreResult = document.getElementById("score-result");
  const diemChuan = parseFloat(document.getElementById("diem-chuan").value);
  const d1 = parseFloat(document.getElementById("diem-1").value);
  const d2 = parseFloat(document.getElementById("diem-2").value);
  const d3 = parseFloat(document.getElementById("diem-3").value);
  const txtKV = document.querySelector("#khu-vuc button span").textContent.trim();
  const txtDT = document.querySelector("#doi-tuong button span").textContent.trim();
  // validation
  scoreResult.classList.add("text-red-700", "font-semibold");
  if ([diemChuan, d1, d2, d3].some(isNaN) || txtKV === "Chọn khu vực" || txtDT === "Chọn đối tượng") {
    scoreResult.textContent = "Lỗi: Vui lòng nhập đầy đủ và chọn khu vực/đối tượng!";
    return;
  }
  if (diemChuan < 0 || diemChuan > 30) {
    scoreResult.textContent = "Lỗi: Điểm chuẩn phải từ 0 đến 30!";
    return;
  }
  const dsDiemMon = [d1, d2, d3];
  if (dsDiemMon.some((d) => d < 0 || d > 10)) {
    scoreResult.textContent = "Lỗi: Điểm mỗi môn phải từ 0 đến 10!";
    return;
  }
  // process
  const DIEM_KV = { A: 2, B: 1, C: 0.5, X: 0 };
  const DIEM_DT = { 1: 2.5, 2: 1.5, 3: 1, 0: 0 };
  const maKV = txtKV.charAt(0);
  const maDT = txtDT.charAt(0);
  const diemKV = DIEM_KV[maKV] || 0;
  const diemDT = DIEM_DT[maDT] || 0;
  const tongDiem = d1 + d2 + d3 + diemKV + diemDT;
  // output
  scoreResult.classList.remove("text-red-700", "font-semibold");
  if (dsDiemMon.includes(0)) {
    scoreResult.textContent = `Bạn đã rớt do có môn điểm 0`;
  } else if (tongDiem >= diemChuan) {
    scoreResult.textContent = `Bạn đã đậu! Tổng điểm: ${tongDiem}`;
  } else {
    scoreResult.textContent = `Bạn đã rớt. Tổng điểm: ${tongDiem}`;
  }
});

// Bài 2
document.getElementById("form-tien-dien").addEventListener("submit", (e) => {
  e.preventDefault();
  // input
  const electricityResult = document.getElementById("electricity-result");
  const hoTen = document.getElementById("ho-ten").value;
  const soKw = parseFloat(document.getElementById("so-kw").value);
  // validation
  electricityResult.classList.add("text-red-700", "font-semibold");
  if (hoTen === "") {
    electricityResult.textContent = "Lỗi: Vui lòng nhập họ tên";
    return;
  }
  if (isNaN(soKw) || soKw <= 0) {
    electricityResult.textContent = "Lỗi: Số kw phải lớn hơn 0";
    return;
  }
  // process
  let tienDien = 0;
  if (soKw <= 50) {
    tienDien = soKw * 500;
  } else if (soKw <= 100) {
    tienDien = 50 * 500 + (soKw - 50) * 650;
  } else if (soKw <= 200) {
    tienDien = 50 * 500 + 50 * 650 + (soKw - 100) * 850;
  } else if (soKw <= 350) {
    tienDien = 50 * 500 + 50 * 650 + 100 * 850 + (soKw - 200) * 1100;
  } else {
    tienDien = 50 * 500 + 50 * 650 + 100 * 850 + 150 * 1100 + (soKw - 350) * 1300;
  }
  // output
  electricityResult.classList.remove("text-red-700", "font-semibold");
  electricityResult.textContent = `Họ tên: ${hoTen}; Tiền điện: ${tienDien.toLocaleString()} VND`;
});

// Bài 3
document.getElementById("form-tien-thue").addEventListener("submit", (e) => {
  e.preventDefault();
  // input
  const taxResult = document.getElementById("tax-result");
  const hoTenThue = document.getElementById("ho-ten-thue").value;
  const thuNhap = parseFloat(document.getElementById("thu-nhap").value);
  const nguoiPhuThuoc = Number(document.getElementById("phu-thuoc").value);
  // validation
  taxResult.classList.add("text-red-700", "font-semibold");
  if (hoTenThue === "") {
    taxResult.textContent = "Lỗi: Vui lòng nhập họ tên";
    return;
  }
  if (isNaN(thuNhap) || thuNhap <= 0) {
    taxResult.textContent = "Lỗi: Tổng thu nhập phải lớn hơn 0";
    return;
  }
  // process
  let thuNhapChiuThue = thuNhap - 4e6 - nguoiPhuThuoc * 1.6e6;
  let tienThue = 0;
  if (thuNhapChiuThue > 0) {
    if (thuNhapChiuThue <= 60e6) {
      tienThue = thuNhapChiuThue * 0.05;
    } else if (thuNhapChiuThue <= 120e6) {
      tienThue = 60e6 * 0.05 + (thuNhapChiuThue - 60e6) * 0.1;
    } else if (thuNhapChiuThue <= 210e6) {
      tienThue = 60e6 * 0.05 + 60e6 * 0.1 + (thuNhapChiuThue - 120e6) * 0.15;
    } else if (thuNhapChiuThue <= 384e6) {
      tienThue = 60e6 * 0.05 + 60e6 * 0.1 + 90e6 * 0.15 + (thuNhapChiuThue - 210e6) * 0.2;
    } else if (thuNhapChiuThue <= 624e6) {
      tienThue = 60e6 * 0.05 + 60e6 * 0.1 + 90e6 * 0.15 + 174e6 * 0.2 + (thuNhapChiuThue - 384e6) * 0.25;
    } else if (thuNhapChiuThue <= 960e6) {
      tienThue = 60e6 * 0.05 + 60e6 * 0.1 + 90e6 * 0.15 + 174e6 * 0.2 + 240e6 * 0.25 + (thuNhapChiuThue - 624e6) * 0.3;
    } else {
      tienThue = 60e6 * 0.05 + 60e6 * 0.1 + 90e6 * 0.15 + 174e6 * 0.2 + 240e6 * 0.25 + 336e6 * 0.3 + (thuNhapChiuThue - 960e6) * 0.35;
    }
  }
  // output
  taxResult.classList.remove("text-red-700", "font-semibold");
  taxResult.textContent = `Họ tên: ${hoTenThue}; Thuế thu nhập cá nhân: ${tienThue.toLocaleString()} VND`;
});

// Bài 4
// Ẩn/hiện input số kết nối
const listKhachHang = document.querySelector("#khach-hang .dropdown-list");
const inputKetNoi = document.getElementById("so-ket-noi");
if (listKhachHang) {
  const options = listKhachHang.querySelectorAll("li");
  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      const text = opt.textContent.trim();
      if (text === "Doanh nghiệp") {
        inputKetNoi.classList.remove("hidden");
      } else {
        inputKetNoi.classList.add("hidden");
        inputKetNoi.value = "";
      }
    });
  });
}
// Xử lý tính tiền cáp
document.getElementById("form-tien-cap").addEventListener("submit", (e) => {
  e.preventDefault();
  // input
  const cableResult = document.getElementById("cable-result");
  const btnSpan = document.querySelector("#khach-hang button span");
  const loaiKhachHang = btnSpan.textContent.trim();
  const maKhachHang = document.getElementById("ma-khach-hang").value.trim();
  const soKenh = Number(document.getElementById("so-kenh").value);
  const soKetNoi = Number(document.getElementById("so-ket-noi").value);
  // validation
  cableResult.classList.add("text-red-700", "font-semibold");
  if (loaiKhachHang === "Chọn loại khách hàng") {
    cableResult.textContent = "Lỗi: Vui lòng chọn loại khách hàng!";
    return;
  }
  if (maKhachHang === "") {
    cableResult.textContent = "Lỗi: Vui lòng nhập mã khách hàng!";
    return;
  }
  if (soKenh < 0) {
    cableResult.textContent = "Lỗi: Số kênh cao cấp không hợp lệ!";
    return;
  }
  if (loaiKhachHang === "Doanh nghiệp") {
    if (soKetNoi < 0) {
      cableResult.textContent = "Lỗi: Số kết nối không hợp lệ!";
      return;
    }
  }
  // process
  let tongTien = 0;
  if (loaiKhachHang === "Nhà Dân") {
    tongTien = 4.5 + 20.5 + 7.5 * soKenh;
  } else if (loaiKhachHang === "Doanh nghiệp") {
    let phiDichVuCoBan = 75;
    if (soKetNoi > 10) {
      phiDichVuCoBan += (soKetNoi - 10) * 5;
    }
    tongTien = 15 + phiDichVuCoBan + 50 * soKenh;
  }
  // output
  cableResult.classList.remove("text-red-700", "font-semibold");
  cableResult.textContent = `Mã khách hàng: ${maKhachHang}; Tiền cáp: $${tongTien.toFixed(2)}`;
});
