import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const History = ({ user }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const ref = doc(db, "histories", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setHistory(snap.data().movies || []);
      }
    };
    fetchHistory();
  }, [user]);

  const addHistory = async (movieTitle) => {
    const newList = [...history, movieTitle];
    setHistory(newList);
    await setDoc(doc(db, "histories", user.uid), { movies: newList });
  };

  return (
    <div className="history">
      <h3>{user.displayName || user.email}'s History</h3>
      <button onClick={() => addHistory("The Matrix")}>Add The Matrix</button>
      <ul>
        {history.map((movie, idx) => (
          <li key={idx}>{movie}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;