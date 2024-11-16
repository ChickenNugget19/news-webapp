import React from 'react';

function ArticlePreview({ title, content, url }) {
    return (
        <div>
            <h2>{title}</h2>
            <p>{content}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">Read Full Article</a>
        </div>
    );
}

export default ArticlePreview;
