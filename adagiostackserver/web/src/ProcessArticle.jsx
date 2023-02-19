import './ProcessArticle.css';
import { useState } from "react";
import { hostName } from "./serverConfig.js";
import Entity from './Entity';

function displayResults(results) {
    if (results.errorMessage) {
        return (
            <div>Got error message from the backend: {
                JSON.stringify(results.errorMessage)}</div>
        )
    }
    else if (!results.highlightedResponse) {
        return (
            <div>No entities found.</div>
        )
    }
    return results.highlightedResponse.map(entity => (
        <Entity props={entity} key={entity["name"]}></Entity>
    ));
}

export default function ProcessArticle() {
    const [articleName, setArticleName] = useState('');
    const [articleBody, setArticleBody] = useState('');
    const [responseStatus, setResponseStatus] = useState('');
    const [results, setResults] = useState('');
    const [shouldSave, setShouldSave] = useState(false);

    const handleProcess = (e) => {
        e.preventDefault();

        fetch(`${hostName}/process`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                articleName: articleName,
                articleBody: articleBody,
                shouldSave: shouldSave ? 'True' : 'False',
            })
        }).then(res => res.json())
            .then(data => {
                setResults(data);
                // TODO: Find the proper way to refresh frontend on data response.
                setResponseStatus(200);
            })
            .catch(() => setResponseStatus(
                "Something was wrong with the processing. Please check server console."));
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
                        <label>Should save to database?</label>
                        <input
                            type="checkbox"
                            onChange={() => setShouldSave(!shouldSave)}
                            checked={shouldSave}></input>
                    </li>
                    <li>
                        <input type="submit" value="Process Article"></input>
                    </li>
                </ul>
            </form>

            {/* If status is set, then there should be results to display. */}
            <div>{responseStatus === 200 ? displayResults(results) : ''}</div>
        </div>
    );
}