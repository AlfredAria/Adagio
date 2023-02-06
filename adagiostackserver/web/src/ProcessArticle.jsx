import './ProcessArticle.css';
import { useState } from "react";

export default function ProcessArticle() {
    const [articleName, setArticleName] = useState('');
    const [articleBody, setArticleBody] = useState('');
    const [responseStatus, setResponseStatus] = useState('');
   
    const handleProcess = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/process', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                articleName: articleName,
                articleBody, articleBody,
            })
        }).then(res => res.json())
          .then(data => setResponseStatus(data));
    };

    return (
        <div className="process-page">
            <div className="title">Process a new article</div>

            <form onSubmit={handleProcess}>
                <ul className="process-form">
                    <li>
                        <label>Article name:</label>
                        
                        <input type="text"
                            required
                            value={articleName}
                            onChange={e => setArticleName(e.target.value)}
                        ></input>
                        </li>
                        <li>
                        <label>Article content:</label>
                        <textarea
                            required
                            value={articleBody}
                            onChange={e => setArticleBody(e.target.value)}
                        ></textarea>
                        </li>
                        <li>
                        <input type="submit" value="Process Article"></input>
                        </li>
                </ul>
            </form>

            <div>{JSON.stringify(responseStatus)}</div>
        </div>
    );
}