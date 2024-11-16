import React from 'react';

function NewsCard({ title, description, onClick }) {
    return (
        <div className="news-card" onClick={onClick}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default NewsCard;
