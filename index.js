import { auth } from './firebase.js';
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  const dropdown = document.getElementById("userDropdown");
  const buttons = document.getElementById("authButtons");
  const emailBtn = document.getElementById("welcomeEmail");

  if (user) {
    dropdown.style.display = "block";
    buttons.style.display = "none";
    emailBtn.textContent = `Hoş geldin, ${user.email}`;
  } else {
    dropdown.style.display = "none";
    buttons.style.display = "block";
  }
});

document.getElementById("logoutBtn").addEventListener("click", async (e) => {
  e.preventDefault(); // 🔥 Sayfanın POST yapmasını engeller, 405 hatasını önler
  try {
    await signOut(auth);
    alert("Çıkış yapıldı");
    window.location.href = "index.html"; // ✅ GET ile yönlendirme
  } catch (error) {
    alert("Çıkış hatası: " + error.message);
  }
});




//**kontrol galiba */
import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔧 Admin e-posta adresi
const ADMIN_EMAIL = "admin@mail.com";

// Menü alanları
const welcomeBtn = document.getElementById("welcomeEmail");
const menuContent = document.getElementById("menuContent");

onAuthStateChanged(auth, (user) => {
  if (user) {
    welcomeBtn.textContent = `Hoş geldin,\n${user.email}`;

    // Admin kontrolü
    const menuItems = user.email === ADMIN_EMAIL
      ? `
        <a href="profilim.html">Profilim</a>
        <a href="admin.html">Program Yaz</a>
        <a href="ayarlar.html">Ayarlar</a>
        <a href="#" id="logoutBtn">Çıkış Yap</a>
      `
      : `
        <a href="profilim.html">Profilim</a>
        <a href="programlar.html">Programlarım</a>
        <a href="ayarlar.html">Ayarlar</a>
        <a href="#" id="logoutBtn">Çıkış Yap</a>
      `;

    menuContent.innerHTML = menuItems;
  }
});

// Çıkış
document.addEventListener("click", (e) => {
  if (e.target.id === "logoutBtn") {
    e.preventDefault();
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  }
});
