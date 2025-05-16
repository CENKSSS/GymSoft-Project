import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // ❗ Formun POST yapmasını engeller

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Giriş başarılı!");
    window.location.replace("index.html"); // ❗ Güvenli yönlendirme (405 hatası vermez)
  } catch (error) {
    alert("Giriş hatası: " + error.message);
  }
});
