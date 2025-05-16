import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { hareketler } from "./hareketler.js";

const programAlani = document.getElementById("programAlani");

const gifMap = Object.fromEntries(
  hareketler.map(h => [h.ad, h.img])
);

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    programAlani.innerHTML = "<p>Lütfen giriş yapın.</p>";
    return;
  }

  const email = user.email;
  const userRef = doc(db, "programlar", email);

  try {
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      programAlani.innerHTML = "<p>Henüz atanmış bir programınız yok.</p>";
      return;
    }

    const data = docSnap.data();
    const gunler = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
    let html = "";

    gunler.forEach(gun => {
      html += `<div class="gun-baslik">${gun}</div>`;

      const hareketStr = data[gun];
      if (typeof hareketStr === "string" && hareketStr.trim()) {
        const liste = hareketStr.split(",").map(h => h.trim());
        html += `<div class="hareketler-alani">`;

        liste.forEach(item => {
          const ad = item.split("(")[0].trim();

          let setNot = "";
          const open = item.indexOf("(");
          const close = item.lastIndexOf(")");
          if (open !== -1 && close !== -1 && close > open) {
            setNot = item.substring(open + 1, close).trim();
          }

          const gifSrc = gifMap[ad] || "fotograflar/resim.gif";

          html += `
            <div class="hareket-kart">
              <img src="${gifSrc}" alt="${ad}">
              <p>${ad}</p>
              <p style="font-size:13px; color:#666;">${setNot}</p>
            </div>
          `;
        });

        html += `</div>`;
      } else {
        html += `<p class="bos-gun">Bu güne ait program yok.</p>`;
      }
    });

    programAlani.innerHTML = html;

  } catch (err) {
    programAlani.innerHTML = `<p>Hata: ${err.message}</p>`;
  }
});
