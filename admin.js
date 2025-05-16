import { db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { hareketler } from "./hareketler.js";

const hareketListesi = document.getElementById("hareketListesi");
const sepetListe = document.getElementById("sepetListe");
const tabloSatir = document.getElementById("tabloSatir");

let secilenHareketler = [];
let haftalikProgram = {
  Pazartesi: [],
  Salı: [],
  Çarşamba: [],
  Perşembe: [],
  Cuma: [],
  Cumartesi: [],
  Pazar: []
};

hareketler.forEach(h => {
  const div = document.createElement("div");
  div.className = "hareket-kart";

  const img = document.createElement("img");
  img.src = h.img;
  img.alt = h.ad;

  const p = document.createElement("p");
  p.textContent = h.ad;

  const setSelect = document.createElement("select");
  setSelect.style.margin = "4px 0";
  for (let i = 1; i <= 6; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${i} Set`;
    setSelect.appendChild(option);
  }

  const tekrarSelect = document.createElement("select");
  tekrarSelect.style.margin = "4px 0";
  for (let i = 4; i <= 20; i += 2) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${i} Tekrar`;
    tekrarSelect.appendChild(option);
  }

  const input = document.createElement("input");
  input.className = "set-input";
  input.placeholder = "örn: 3x12 (not)";

  const button = document.createElement("button");
  button.textContent = "Ekle";
  button.style.marginTop = "6px";
  button.onclick = () => {
    const set = setSelect.value;
    const tekrar = tekrarSelect.value;
    const not = input.value.trim();
    const setText = `${set}x${tekrar}${not ? ` (${not})` : ""}`;

    if (!secilenHareketler.some(x => x.ad === h.ad)) {
      secilenHareketler.push({ ad: h.ad, set: setText });

      const li = document.createElement("li");
      li.textContent = `${h.ad} - ${setText}`;

      const silBtn = document.createElement("span");
      silBtn.textContent = " ❌";
      silBtn.style.color = "red";
      silBtn.style.cursor = "pointer";
      silBtn.onclick = () => {
        secilenHareketler = secilenHareketler.filter(x => x.ad !== h.ad);
        sepetListe.removeChild(li);
      };

      li.appendChild(silBtn);
      sepetListe.appendChild(li);
    }
  };

  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(setSelect);
  div.appendChild(tekrarSelect);
  div.appendChild(input);
  div.appendChild(button);
  hareketListesi.appendChild(div);
});

document.getElementById("gunuTabloyaEkleBtn").addEventListener("click", () => {
  const gun = document.getElementById("gun").value;

  if (!gun || secilenHareketler.length === 0) {
    alert("Lütfen gün seçin ve hareket ekleyin.");
    return;
  }

  haftalikProgram[gun] = [...secilenHareketler];
  secilenHareketler = [];
  sepetListe.innerHTML = "";

  const gunler = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
  tabloSatir.innerHTML = "";
  gunler.forEach(g => {
    const td = document.createElement("td");
    const hareketler = haftalikProgram[g];

    if (hareketler && hareketler.length > 0) {
      hareketler.forEach(h => {
        const p = document.createElement("p");
        p.textContent = `${h.ad}${h.set ? ` - ${h.set}` : ""}`;
        td.appendChild(p);
      });
    } else {
      td.innerHTML = `<p style="color:#ccc;">—</p>`;
    }

    tabloSatir.appendChild(td);
  });
});

document.getElementById("gonderBtn").addEventListener("click", async () => {
  const email = document.getElementById("uyeSec").value; // GÜNCELLENEN KISIM

  if (!email) {
    alert("Lütfen bir üye seçin.");
    return;
  }

  const userRef = doc(db, "programlar", email);

  const veri = {};
  for (const gun in haftalikProgram) {
    const hareketler = haftalikProgram[gun];
    if (hareketler.length > 0) {
      veri[gun] = hareketler.map(h => `${h.ad}${h.set ? ` (${h.set})` : ""}`).join(", ");
    }
  }

  await setDoc(userRef, veri, { merge: true });
  alert("Tüm haftalık program kaydedildi!");
});
