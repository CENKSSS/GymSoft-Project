import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.getElementById("registerBtn").addEventListener("click", async () => {
  const isim = document.getElementById("isim").value.trim();
  const soyisim = document.getElementById("soyisim").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const telefon = document.getElementById("telefon").value.trim();

  if (!isim || !soyisim || !email || !password || !telefon) {
    alert("Lütfen tüm alanları doldurunuz.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const docRef = doc(db, "kullanicilar", email);
    await setDoc(docRef, {
      isim: isim,
      soyisim: soyisim,
      email: email,
      cepTelefonu: telefon,
      rol: "uye"
    });

    alert("Kayıt başarılı!");
    window.location.href = "giris.html";
  } catch (error) {
    alert("Hata: " + error.message);
  }
});
