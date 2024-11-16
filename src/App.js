import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [categories, setCategories] = useState([
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ]);
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Business");
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewArticle, setPreviewArticle] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?category=${selectedCategory.toLowerCase()}&country=us&apiKey=1aa5e86640804513828afe0f54864980`
    )
      .then((response) => response.json())
      .then((data) => setArticles(data.articles))
      .catch((error) => console.error("Error fetching articles:", error));
  }, [selectedCategory]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const closePreview = () => {
    setPreviewArticle(null); // Close the preview by setting it to null
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <header className="header">
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? "✖ Close" : "☰ Menu"}
        </button>
        <h1 className="title">NewZ Line</h1>
        <label className="dark-mode-toggle" onClick={toggleDarkMode}>
         {darkMode ? "🌙 Dark" : "☀️ Light"} {/* Moon for dark mode, Sun for light mode */}
         <span className="sr-only">Toggle Dark Mode</span> {/* For screen readers */}
        </label>
      </header>

      <div className={`categories ${menuOpen ? "open" : ""}`}>
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => {
              setSelectedCategory(category);
              setPreviewArticle(null); // Clear preview when switching categories
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="content">
        <div className="news-articles">
          {articles.map((article, index) => (
            <div
              key={index}
              className="news-card"
              onClick={() => setPreviewArticle(article)}
            >
              <img
                src={article.urlToImage}
                alt="News"
                className="news-image"
              />
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </div>
          ))}
        </div>

        {previewArticle && (
          <div className="article-preview">
            <button className="close-preview-btn" onClick={closePreview}>
              ✖ Close Preview
            </button>
            <h2>{previewArticle.title}</h2>
            <img
              src={previewArticle.urlToImage}
              alt="Preview"
              className="preview-image"
            />
            <p>{previewArticle.content}</p>
            <a href={previewArticle.url} target="_blank" rel="noreferrer">
              Read full article
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
