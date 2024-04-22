import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      const fetchNews = async () => {
        if (!searchTerm) return;

        setIsLoading(true);

        try {
          const encodedSearchTerm = encodeURIComponent(searchTerm);
          const response = await axios.get(`https://newsdata.io/api/1/news?apikey=pub_416358c21c61b713dbdd944273143ec3ff48a&q=${encodedSearchTerm}&language=en`);
          setNews(response.data.results);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }

        setIsLoading(false);
      };

      fetchNews();
    }, 1000);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className="news-container">
      <h1 className="news-header">Latest News</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search news"
        className="search-input"
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="news-list">
          {news.map((article, index) => (
            <li key={index} className="news-item">
              <h2 className="news-title">{article.title}</h2>
              <p className="news-pub-date">Published: {article.pubDate}</p>
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt="Thumbnail"
                  className="news-thumbnail"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              )}
              <p className="news-description">{truncateText(article.description, 150)}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="read-more-link">Read more</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default News;