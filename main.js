// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8fATlfsPCSj5OSCOt3XHki3za861n2J4",
  authDomain: "dairy-report-92b1f.firebaseapp.com",
  projectId: "dairy-report-92b1f",
  storageBucket: "dairy-report-92b1f.firebasestorage.app",
  messagingSenderId: "1077948526497",
  appId: "1:1077948526497:web:bf7f72f388388c080565e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cloud Firestoreの初期化
const db = getFirestore(app);

// Could Firestoreから取得したデータを表示する
const fetchHistoryData = async () => {
    let tags = "";

    // reportsコレクションデータの取得
    const querySnapshot = await getDocs(collection(db, "reports"))

    // データをテーブル表の形式に合わせてHTMLを挿入
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tags += `<tr><td>${doc.data().date}</td><td>${doc.data().name}</td><td>${doc.data().work}</td><td>${doc.data().comment}</td></tr>`
    });
    document.getElementById("js-history").innerHTML = tags;
};

// Cloud Firestoreから取得したデータを表示する
if(document.getElementById("js-history")) {
    fetchHistoryData();
}

// Could Firestoreにデータを送信する
const submitData = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  try {
      const docRef = await addDoc(collection(db, "reports"), {
          date: new Date(),
          name: formData.get("name"),
          work: formData.get("work"),
          comment: formData.get("comment")
      });
      console.log("Document written with ID: ", docRef.id);
  } catch (e) {
      console.error("Error adding document: ", e);
  }
}

// Cloud Firestoreにデータを送信する
if(document.getElementById("js-form")) {
    document.getElementById("js-form").addEventListener("submit", (e) => submitData(e));
};