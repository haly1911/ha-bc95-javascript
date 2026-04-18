// hàm xử lý đóng/mở content
const slideToggle = (content, arrow, rotateDegree, shouldOpen) => {
  if (shouldOpen) {
    content.style.maxHeight = `${content.scrollHeight}px`;
    if (arrow) arrow.style.transform = `rotate(${rotateDegree})`;
    // Sau khi transition kết thúc, đặt maxHeight thành 'none' để nó tự co giãn theo nội dung con bên trong.
    const transitionEndHandler = () => {
      if (content.style.maxHeight !== "0px") {
        content.style.maxHeight = "none";
      }
      content.removeEventListener("transitionend", transitionEndHandler);
    };
    content.addEventListener("transitionend", transitionEndHandler);
  } else {
    if (content.style.maxHeight === "none") {
      content.style.maxHeight = `${content.scrollHeight}px`;
      content.offsetHeight;
    }
    content.style.maxHeight = "0px";
    if (arrow) arrow.style.transform = "rotate(0deg)";
  }
};

// đóng/mở content bài
const allTitles = document.querySelectorAll(".title");
allTitles.forEach((title) => {
  title.addEventListener("click", () => {
    const content = title.nextElementSibling;
    const arrow = title.querySelector(".title-arrow");
    const icon = title.querySelector(".num-icon");
    const isOpening = title.classList.contains("active");
    allTitles.forEach((title) => {
      title.classList.remove("active");
      if (icon) icon.classList.remove("active");
      slideToggle(title.nextElementSibling, title.querySelector(".title-arrow"), "0deg", false);
    });
    if (!isOpening) {
      title.classList.add("active");
      if (icon) icon.classList.add("active");
      slideToggle(content, arrow, "180deg", true);
    }
  });
});

// đóng/mở ô gợi ý
const expandBtns = document.querySelectorAll(".expand-btn");
expandBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const arrow = btn.querySelector(".expand-arrow");
    const isClosed = !content.style.maxHeight || content.style.maxHeight === "0px";
    isClosed ? slideToggle(content, arrow, "90deg", true) : slideToggle(content, arrow, "0deg", false);
  });
});

// phần xử lý bài tập
const el = {
  // input area
  input: document.getElementById("input"),
  addBtn: document.getElementById("add-btn"),
  delBtn: document.getElementById("del-btn"),
  inputResult: document.getElementById("input-result"),
  // bài 1
  sumBtn: document.getElementById("sum-btn"),
  sumResult: document.getElementById("sum-result"),
  // bài 2
  countBtn: document.getElementById("count-btn"),
  countResult: document.getElementById("count-result"),
  // bài 3
  minBtn: document.getElementById("min-btn"),
  minResult: document.getElementById("min-result"),
  // bài 4
  minPosBtn: document.getElementById("min-pos-btn"),
  minPosResult: document.getElementById("min-pos-result"),
  // bài 5
  lastEvenBtn: document.getElementById("last-even-btn"),
  lastEvenResult: document.getElementById("last-even-result"),
  // bài 6
  index1: document.getElementById("index-1"),
  index2: document.getElementById("index-2"),
  swapBtn: document.getElementById("swap-btn"),
  swapResult: document.getElementById("swap-result"),
  // bài 7
  sortBtn: document.getElementById("sort-btn"),
  sortResult: document.getElementById("sort-result"),
  // bài 8
  firstPrimeBtn: document.getElementById("first-prime-btn"),
  firstPrimeResult: document.getElementById("first-prime-result"),
  // bài 9
  floatInput: document.getElementById("float-input"),
  floatAddBtn: document.getElementById("float-add-btn"),
  floatDelBtn: document.getElementById("float-del-btn"),
  floatInputResult: document.getElementById("float-input-result"),
  intCountBtn: document.getElementById("int-count-btn"),
  intCountResult: document.getElementById("int-count-result"),
  // bài 10
  compareBtn: document.getElementById("compare-btn"),
  compareResult: document.getElementById("compare-result"),
};

// hàm xử lý phần input
const handleAddToArray = (inputEl, targetArray, resultEl, isIntOnly) => {
  const value = parseFloat(inputEl.value);
  const errorEl = inputEl.nextElementSibling;
  const isInvalid = isIntOnly ? !Number.isInteger(value) : Number.isNaN(value);
  if (isInvalid) {
    errorEl.classList.remove("hidden");
    errorEl.textContent = isIntOnly ? "Số n nhập vào không hợp lệ, n phải là số nguyên!" : "Số n nhập vào không hợp lệ!";
    inputEl.focus();
    return;
  }
  errorEl.classList.add("hidden");
  targetArray.push(value);
  resultEl.textContent = targetArray.join(", ");
  inputEl.value = "";
  inputEl.focus();
};

// event cho button add và delete
let array = [];
el.addBtn.addEventListener("click", () => {
  handleAddToArray(el.input, array, el.inputResult, true);
});
el.delBtn.addEventListener("click", () => {
  array.pop();
  el.inputResult.textContent = array.join(", ");
  el.input.focus();
});

// hàm kiểm tra mảng
const isArrayEmpty = (arr, resultEl) => {
  if (arr.length === 0) {
    resultEl.classList.add("text-red-500", "font-semibold");
    resultEl.textContent = "Mảng đang rỗng!";
    return true;
  }
  resultEl.classList.remove("text-red-500", "font-semibold");
  return false;
};

// bài 1
el.sumBtn.addEventListener("click", () => {
  if (isArrayEmpty(array, el.sumResult)) return;
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > 0) {
      sum += array[i];
    }
  }
  el.sumResult.textContent = `Tổng số dương: ${sum}`;
});

// bài 2
el.countBtn.addEventListener("click", () => {
  if (isArrayEmpty(array, el.countResult)) return;
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > 0) {
      count++;
    }
  }
  el.countResult.textContent = `Số dương: ${count}`;
});

// bài 3
el.minBtn.addEventListener("click", () => {
  if (isArrayEmpty(array, el.minResult)) return;
  let min = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
    }
  }
  el.minResult.textContent = `Số nhỏ nhất: ${min}`;
});

// bài 4
el.minPosBtn.addEventListener("click", () => {
  el.minPosResult.classList.remove("text-red-500", "font-semibold");
  let posArr = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > 0) {
      posArr.push(array[i]);
    }
  }
  if (posArr.length === 0) {
    el.minPosResult.classList.add("text-red-500", "font-semibold");
    el.minPosResult.textContent = "Không có số dương trong mảng!";
    return;
  }
  let minPos = posArr[0];
  for (let i = 0; i < posArr.length; i++) {
    if (posArr[i] < minPos) {
      minPos = posArr[i];
    }
  }
  el.minPosResult.textContent = `Số dương nhỏ nhất: ${minPos}`;
});

// bài 5
el.lastEvenBtn.addEventListener("click", () => {
  if (isArrayEmpty(array, el.lastEvenResult)) return;
  let lastEven = null;
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] % 2 === 0) {
      lastEven = array[i];
      break;
    }
  }
  el.lastEvenResult.textContent = lastEven === null ? "Không có số chẵn trong mảng" : `Số chẵn cuối cùng: ${lastEven}`;
});

// bài 6
el.swapBtn.addEventListener("click", () => {
  const idx1 = parseFloat(el.index1.value);
  const idx2 = parseFloat(el.index2.value);
  if (isArrayEmpty(array, el.swapResult)) return;
  if (!Number.isInteger(idx1) || idx1 < 0 || idx1 >= array.length || !Number.isInteger(idx2) || idx2 < 0 || idx2 >= array.length) {
    el.index2.nextElementSibling.classList.remove("hidden");
    el.index2.nextElementSibling.textContent = "Vị trí (index) nhập vào không hợp lệ!";
    return;
  } else {
    el.index2.nextElementSibling.classList.add("hidden");
    el.index2.nextElementSibling.textContent = "";
  }
  let swapArray = [...array];
  let temp = swapArray[idx1];
  swapArray[idx1] = swapArray[idx2];
  swapArray[idx2] = temp;
  el.swapResult.textContent = `Mảng sau khi đổi: ${swapArray.join(", ")}`;
});

// bài 7
el.sortBtn.addEventListener("click", () => {
  if (isArrayEmpty(array, el.sortResult)) return;
  const sortArray = [...array].sort((a, b) => a - b);
  el.sortResult.textContent = `Mảng sau khi sắp xếp: ${sortArray.join(", ")}`;
});

// bài 8
el.firstPrimeBtn.addEventListener("click", () => {
  if (isArrayEmpty(array, el.firstPrimeResult)) return;
  let firstPrime = null;
  for (let i = 0; i < array.length; i++) {
    if (array[i] < 2) continue;
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(array[i]); j++) {
      if (array[i] % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      firstPrime = array[i];
      break;
    }
  }
  el.firstPrimeResult.textContent = firstPrime === null ? "Không có số nguyên tố trong mảng!" : `Số nguyên tố đầu tiên: ${firstPrime}`;
});

// bài 9
let floatArray = [];
el.floatAddBtn.addEventListener("click", () => {
  handleAddToArray(el.floatInput, floatArray, el.floatInputResult, false);
});
el.floatDelBtn.addEventListener("click", () => {
  floatArray.pop();
  el.floatInputResult.textContent = floatArray.join(", ");
  el.floatInput.focus();
});
el.intCountBtn.addEventListener("click", () => {
  if (isArrayEmpty(floatArray, el.intCountResult)) return;
  const intCount = floatArray.filter((num) => num % 1 === 0).length;
  el.intCountResult.textContent = intCount === 0 ? "Mảng không có số nguyên" : `Số nguyên: ${intCount}`;
});

// bài 10
el.compareBtn.addEventListener("click", () => {
  if (isArrayEmpty(array, el.compareResult)) return;
  const posCount = array.filter((num) => num > 0).length;
  const negCount = array.filter((num) => num < 0).length;
  el.compareResult.textContent = posCount === negCount ? "Số dương = Số âm" : posCount > negCount ? "Số dương > Số âm" : "Số dương < Số âm";
});