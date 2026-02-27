"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { axiosInstance } from "@/lib/axiosInstance";

const Home = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const instance = axiosInstance();

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const endpoint = "/sort";

    await instance
      .post(endpoint, { data: input })

      .then((res) => {
        setResponse(res.data.word);
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("An error occurred while processing your request.");
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.centerBox}>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter a word..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button className={styles.button} onClick={handleSubmit}>
            {loading ? "Sending..." : "Submit"}
          </button>

          {response !== null && (
            <div className={styles.result}>
              <strong>Result:</strong> {JSON.stringify(response)}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;