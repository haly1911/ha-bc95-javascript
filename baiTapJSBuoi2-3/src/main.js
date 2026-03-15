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

// Bài 1
document.getElementById("btn-salary").addEventListener("click", () => {
  // input
  const dayOfWork = Number(document.getElementById("dayOfWork").value);
  const salaryPerDay = 100000;
  // process
  const totalSalary = dayOfWork * salaryPerDay;
  // output
  document.getElementById("salaryResult").innerText = `${totalSalary.toLocaleString()} VND`;
});

// Bài 2
document.getElementById("btn-average").addEventListener("click", () => {
  // input
  const number1 = Number(document.getElementById("number1").value);
  const number2 = Number(document.getElementById("number2").value);
  const number3 = Number(document.getElementById("number3").value);
  const number4 = Number(document.getElementById("number4").value);
  const number5 = Number(document.getElementById("number5").value);
  // process
  const avg = (number1 + number2 + number3 + number4 + number5) / 5;
  // output
  document.getElementById("averageResult").innerText = avg;
});

// Bài 3
document.getElementById("btn-exchange").addEventListener("click", () => {
  // input
  const exchangeAmount = Number(document.getElementById("dollarAmount").value);
  const exchangeRate = 23500;
  // process
  const totalExchange = exchangeAmount * exchangeRate;
  const formattedMoney = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalExchange);
  // output
  document.getElementById("exchangeResult").innerText = formattedMoney;
});

// Bài 4
document.getElementById("btn-rectangle").addEventListener("click", () => {
  // input
  const chieuDai = Number(document.getElementById("length").value);
  const chieuRong = Number(document.getElementById("width").value);
  // process
  const dienTich = chieuDai * chieuRong;
  const chuVi = (chieuDai + chieuRong) * 2;
  // output
  document.getElementById("rectangleResult").innerText = `Diện tích: ${dienTich}; Chu vi: ${chuVi}`;
});

// Bài 5
document.getElementById("btn-calc").addEventListener("click", () => {
  // input
  const number = Number(document.getElementById("input-number").value);
  // process
  const soHangChuc = Math.floor(number / 10);
  const soHangDonVi = number % 10;
  const sum = soHangChuc + soHangDonVi;
  // output
  document.getElementById("calcResult").innerText = sum;
});
