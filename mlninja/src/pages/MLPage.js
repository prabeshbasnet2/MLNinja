import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function MLPage() {
  const [terms, setTerms] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [badgeColors, setBadgeColors] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getCategories()
      .then(({ categories, badgeColors }) => {
        setCategories(categories);
        setBadgeColors(badgeColors);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    setLoading(true);
    api.getTerms({ cat: activeCategory, search })
      .then((data) => {
        setTerms(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [activeCategory, search]);

  return (
    <>
      <div className="page-hero">
        <h2 className="page-title">🤖 Machine Learning</h2>
        <p className="page-desc">Master your machine learning terms — click any card to expand.</p>
      </div>

      <div className="controls">
        <input
          className="search"
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="empty">Error: {error}</div>}

      {!error && (
        <>
          <div className="count">{loading ? '…' : `${terms.length} terms`}</div>

          <div className="grid">
            {terms.map((t) => {
              const isOpen = expanded === t.term;
              const badge = badgeColors[t.cat] || { bg: '#222', color: '#ccc' };
              return (
                <div
                  key={t.term}
                  className={`card ${isOpen ? 'open' : ''}`}
                  onClick={() => setExpanded(isOpen ? null : t.term)}
                >
                  <div className="card-top">
                    <span className="badge" style={{ background: badge.bg, color: badge.color }}>
                      {t.cat}
                    </span>
                    <span className="chevron">{isOpen ? '▲' : '▼'}</span>
                  </div>
                  <h3 className="term">{t.term}</h3>
                  <p className="tagline">{t.tagline}</p>
                  {isOpen && (
                    <div className="detail">
                      <p>{t.detail}</p>
                      <div className="example">
                        <span className="example-label">Example</span>
                        <p>{t.example}</p>
                      </div>
                      <a
                        className="learn-link"
                        href={t.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Official docs →
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!loading && terms.length === 0 && (
            <div className="empty">No terms found. Try a different search.</div>
          )}
        </>
      )}
    </>
  );
}
