import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-wvBGzlYI9NHjVZBq7wbUHtEWrN3AFI8",
  authDomain: "pasarbarokah-56d6c.firebaseapp.com",
  projectId: "pasarbarokah-56d6c",
  storageBucket: "pasarbarokah-56d6c.appspot.com",
  messagingSenderId: "316348641371",
  appId: "1:316348641371:web:5ad38a561e7d73744acf7e"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarabsen() {
  const refDokumen = collection(db, "absen");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      tanggal:dok.data().tanggal,
      nis:dok.data().nis,
      nama:dok.data().nama,
      alamat:dok.data().alamat, 
      notlpon:dok.data().notlpon,
      kelas:dok.data().kelas,
      keterangan:dok.data().keterangan, 
    });
  });



  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahabsen(tanggal,nis,nama,alamat,notlpon,kelas,keterangan,) {
  try {
    const dokRef = await addDoc(collection(db, 'pembeli'), {
      tanggal:tanggal,
      nis:nis,
      nama:nama,
      alamat:alamat,
      notlpon:notlpon,
      kelas:kelas,
      keterangan:keterangan,
    });
    console.log('berhasil menembah absen' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah absen ' + e);
  }
}

export async function hapusabsen(docId) {
  await deleteDoc(doc(db, "pembeli", docId));
}

export async function ubahabsen(docId, tanggal,nis,nama,alamat,notlpon,kelas,keterangan,) {
  await updateDoc(doc(db, "absen", docId), {
    tanggal: tanggal,
    nis:nis,
    nama:nama,
    alamat:alamat,
    notlpon:notlpon,
    kelas:kelas,
    keterangan:keterangan,
  });
}

export async function ambilabsen(docId) {
  const docRef = await doc(db, "absen", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}