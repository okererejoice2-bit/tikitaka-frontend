import { useState, useEffect } from 'react';
import './App.css';

const API = 'https://tikitaka-backend-x467.onrender.com';

export default function App() {
  const [screen, setScreen] = useState('chats');
  const [theme, setTheme] = useState('system');
  const [showSplash, setShowSplash] = useState(true);

  const testBackend = async () => {
    try {
      const res = await fetch(`${API}/`);
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Backend connection failed');
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('tikitaka-theme') || 'system';
    setTheme(saved);
    applyTheme(saved);

    const timer = setTimeout(() => setShowSplash(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const applyTheme = mode => {
    if (
      mode === 'dark' ||
      (mode === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const changeTheme = mode => {
    setTheme(mode);
    localStorage.setItem('tikitaka-theme', mode);
    applyTheme(mode);
  };

  if (showSplash) {
    return (
      <div className="splash">
        <div className="sparkle sparkle1"></div>
        <div className="sparkle sparkle2"></div>
        <div className="sparkle sparkle3"></div>

        <div className="logo">TT</div>
        <h1>TikiTaka</h1>
        <p className="typing">Chat • Pay • Stream • Shop</p>

        <div className="loader">
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>
          {screen === 'chats'
            ? 'Chats'
            : screen === 'cinema'
            ? 'TikiCinema'
            : screen === 'services'
            ? 'Services'
            : screen === 'pay'
            ? 'TikiPay'
            : 'Profile'}
        </h1>

        {screen === 'chats' && (
  <button className="new-chat-btn" onClick={testBackend}>
    + New Chat
  </button>
)}
      </header>

      <main className="content">
        {screen === 'chats' && (
          <>
            <input
              className="search"
              placeholder="Search conversations"
            />

            <div className="empty">
              <div className="icon">💬</div>
              <h2>No conversations yet</h2>
              <p>
                Real conversations will appear here when your backend is
                connected.
              </p>
            </div>
          </>
        )}

        {screen === 'cinema' && (
          <div className="empty">
            <div className="icon">🎬</div>
            <h2>No movies available yet</h2>
            <p>Upload movies from the backend later.</p>
          </div>
        )}

        {screen === 'services' && (
          <div className="grid">
            <div className="card">
              <div className="card-icon">🍽️</div>
              <h3>TikiEats</h3>
            </div>

            <div className="card">
              <div className="card-icon">🚗</div>
              <h3>TikiRides</h3>
            </div>

            <div className="card">
              <div className="card-icon">🛍️</div>
              <h3>TikiMart</h3>
            </div>

            <div className="card">
              <div className="card-icon">🏨</div>
              <h3>TikiStay</h3>
            </div>
          </div>
        )}

        {screen === 'pay' && (
          <div className="wallet">
            <div className="balance-card">
              <small>Total Balance</small>
              <h2>₦0.00</h2>
              <p>0 linked accounts</p>
            </div>

            <div className="pay-actions">
              <button>+ Add Money</button>
              <button>↗ Send</button>
              <button>↙ Withdraw</button>
              <button>⌁ Pay QR</button>
            </div>
          </div>
        )}

        {screen === 'profile' && (
          <div className="profile">
            <div className="avatar">T</div>
            <h2>TikiTaka User</h2>
            <p>user@tikitaka.app</p>

            <div className="theme-switch">
              <button
                className={theme === 'light' ? 'active' : ''}
                onClick={() => changeTheme('light')}
              >
                ☀ Light
              </button>

              <button
                className={theme === 'dark' ? 'active' : ''}
                onClick={() => changeTheme('dark')}
              >
                🌙 Dark
              </button>

              <button
                className={theme === 'system' ? 'active' : ''}
                onClick={() => changeTheme('system')}
              >
                💻 System
              </button>
            </div>
          </div>
        )}
      </main>

      <nav className="nav">
        <button
          className={screen === 'chats' ? 'active' : ''}
          onClick={() => setScreen('chats')}
        >
          💬
          <br />
          Chats
        </button>

        <button
          className={screen === 'cinema' ? 'active' : ''}
          onClick={() => setScreen('cinema')}
        >
          🎬
          <br />
          Cinema
        </button>

        <button
          className={screen === 'services' ? 'active' : ''}
          onClick={() => setScreen('services')}
        >
          ⬜
          <br />
          Services
        </button>

        <button
          className={screen === 'pay' ? 'active' : ''}
          onClick={() => setScreen('pay')}
        >
          💳
          <br />
          TikiPay
        </button>

        <button
          className={screen === 'profile' ? 'active' : ''}
          onClick={() => setScreen('profile')}
        >
          👤
          <br />
          Profile
        </button>
      </nav>
    </div>
  );
}