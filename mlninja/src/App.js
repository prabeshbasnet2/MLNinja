import { useState } from 'react';
import AWSPage from './pages/AWSPage';
import MLPage from './pages/MLPage';
import TerraformPage from './pages/TerraformPage';
import './App.css';

const nav = [
  { id: 'aws',       label: '☁️ AWS',       },
  { id: 'ml',        label: '🤖 ML',        },
  { id: 'terraform', label: '🏗️ Terraform', },
];

function App() {
  const [page, setPage] = useState('ml');

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <span className="logo">⚔️</span>
          <div>
            <h1 className="title">Learning Ninja</h1>
            <p className="subtitle">Your personal tech learning reference</p>
          </div>
        </div>
        <nav className="nav">
          {nav.map((n) => (
            <button
              key={n.id}
              className={`nav-btn ${page === n.id ? 'active' : ''}`}
              onClick={() => setPage(n.id)}
            >
              {n.label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {page === 'aws'       && <AWSPage />}
        {page === 'ml'        && <MLPage />}
        {page === 'terraform' && <TerraformPage />}
      </main>
    </div>
  );
}

export default App;
