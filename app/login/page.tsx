"use client";
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './LoginForm.module.css'; // Ensure this points to your CSS module

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your login logic here
    console.log('Logging in with:', { username, password, rememberMe });
  };

  return (
    <>
      <Head>
        <title>Staff Login</title>
      </Head>
      <main className={styles.loginContainer}>
        <h1 className={styles.title}>Staff Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
              />
              Remember me
            </label>
          </div>
          <button type="submit" className={styles.loginButton}>Login</button>
          <Link href="/" className={styles.homeButton}>
            Back to Home
          </Link>
        </form>
      </main>
    </>
  );
}
