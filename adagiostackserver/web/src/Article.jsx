import './Article.css';
import { useParams } from 'react-router-dom';
import { hostName } from './serverConfig';
import { useEffect, useState } from "react";
import Entity from './Entity';

export default function Article() {

    let { articleId } = useParams();
    const [data, setData] = useState({});
    const [responseStatus, setResponseStatus] = useState('');

    useEffect(() => {
        fetch(`${hostName}/itemview/${articleId}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then(res => res.json())
            .then(response => {
                setData(response);
                setResponseStatus('');
            })
            .catch(() =>
                setResponseStatus(`Not able to load article for ${articleId}`));
    }, [articleId]);

    return (
        <div className="article-container">
            {responseStatus &&
                <div>{responseStatus}</div>
            }
            <div>Article ID: {data["articleId"]}</div>
            <div className="article-title">Article title: {data["title"]}</div>
            <div className="developer-id">
                Entry developer: {data["client"]}
            </div>
            <div className="article-content">
                <h3>Article content</h3>
                {data["content"]}
            </div>

            {data["result"] && data["result"]["entities"].map((entity, index) =>
                <Entity key={entity["name"] + index} props={{ entity }}></Entity>
            )}
        </div>
    )
}