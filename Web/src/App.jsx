/* eslint-disable no-unused-vars */
import './App.css';
import React, { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

import { auth, googleProvider } from './firebase/firebase';
import ImageGallery from './Project/ImageGallery';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(''); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setAuthError('');
    });
    return () => unsubscribe();
  }, []);

  const handleEmailPasswordSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (isLoginView) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        setAuthError(error.message);
      }
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        setAuthError("email-already-in-use");
      }
    }
  };
  
  const handleGoogleLogin = async () => {
    setAuthError('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return <div>
<div class="dot-spinner">
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
</div>
    </div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Similarity Gallery</h1>
        {user && (
          <div>
            <p>Welcome, {user.displayName || user.email}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>

      <main>
        {user ? (
          <ImageGallery />
        ) : (
          <div className="auth-container">
            <h2>{isLoginView ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleEmailPasswordSubmit} className="auth-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (6+ characters)"
                required
              />
              <button type="submit">{isLoginView ? 'Login' : 'Sign Up'}</button>
            </form>
            
            {authError && <p className="auth-error">{authError}</p>}

            <button onClick={() => setIsLoginView(!isLoginView)}>
              {isLoginView ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </button>

            <div className="divider">OR</div>
            
            <button onClick={handleGoogleLogin} className="google-btn">
              Sign in with Google
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;