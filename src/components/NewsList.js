import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard'; // Ensure this is pointing to NewsCard.js correctly
import ArticlePreview from './ArticlePreview'; // Ensure this is pointing to ArticlePreview.js correctly

function NewsList() {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [category, setCategory] = useState('business');
    
    const apiKey = '1aa5e86640804513828afe0f54864980'; // Ensure your API key is correct

    // Fetch news based on selected category
    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`)
            .then((response) => {
                setNewsData(response.data.articles);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching news:', error);
                setLoading(false);
            });
    }, [category]);

    // Handle clicking on a news card
    const handleCardClick = (article) => {
        setSelectedArticle(article);
    };

    // Handle category selection
    const handleCategoryClick = (category) => {
        setCategory(category);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="news-container">
            {/* Categories Section */}
            <div className="categories">
                <button onClick={() => handleCategoryClick('business')}>Business</button>
                <button onClick={() => handleCategoryClick('entertainment')}>Entertainment</button>
                <button onClick={() => handleCategoryClick('general')}>General</button>
                <button onClick={() => handleCategoryClick('health')}>Health</button>
                <button onClick={() => handleCategoryClick('science')}>Science</button>
                <button onClick={() => handleCategoryClick('sports')}>Sports</button>
                <button onClick={() => handleCategoryClick('technology')}>Technology</button>
            </div>

            {/* News Section */}
            <div className="news-list">
                <div className="news-cards">
                    {newsData.map((news, index) => (
                        <NewsCard
                            key={index}
                            title={news.title}
                            description={news.description}
                            onClick={() => handleCardClick(news)} // Handle card click
                        />
                    ))}
                </div>

                {/* Article Preview */}
                {selectedArticle && (
                    <div className="article-preview">
                        <ArticlePreview
                            title={selectedArticle.title}
                            content={selectedArticle.content}
                            url={selectedArticle.url}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default NewsList;
