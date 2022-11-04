// import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { getDocs, doc } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCSfPVoSFsdskHPv9qLwonKtaQKdy6o3_Y",
  authDomain: "facebook-with-database.firebaseapp.com",
  projectId: "facebook-with-database",
  storageBucket: "facebook-with-database.appspot.com",
  messagingSenderId: "287155094336",
  appId: "1:287155094336:web:cf93e76dc20a1c353f70a5",
  measurementId: "G-6D913L5E12",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

function App() {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  // ==========================================================================================/

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "user post"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => `, doc.data());

        setPosts((prev) => {
          let arry = [...prev, doc.data()];
          return arry;
        });
      });
    };

    getData();
  }, []);

  // =================================================================================================

  const savePost = async (event) => {
    event.preventDefault();
    console.log("postText", postText);

    try {
      const docRef = await addDoc(collection(db, "user post"), {
        title: posts,
        createdOn: new Date().getTime,
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // ============================================================================================

  return (
    <div>
      <form action="#" onSubmit={savePost}>
        <input
          type="text"
          placeholder="What's in your mind"
          onChange={(e) => {
            setPostText(e.target.value);
          }}
        />
<br />

        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map((eachPost,i) => (
          <div key={i} className={"news"}>
            <h3>{eachPost?.title}</h3>
            <p>{eachPost?.createdOn}</p>
            {/* <p>
              {moment(eachPost?.datePublished).format(" Do MMMM YYYY, h:mm:")}
            </p>

            <a href={eachPost?.url} target="_blank" rel="noreferrer">
              <button className="btn btn-success">Read more...</button>
            </a>

            <div className="image">
              <img
                className="img-fluid my-3"
                src={eachPost?.image?.thumbnail?.contentUrl
                  ?.replace("&pid=News", "")
                  .replace("pid=News&", "")
                  .replace("pid=News", "")}
                alt=""
              />
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
