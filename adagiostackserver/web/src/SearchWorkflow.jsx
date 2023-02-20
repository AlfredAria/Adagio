import { useEffect, useState } from "react";
import { hostName } from "./serverConfig";

export default function SearchWorkflow() {
    const [page, setPage] = useState(0);
    const [listResults, setListResults] = useState([]);
    const [responseStatus, setResponseStatus] = useState('');

    function renderResult(result) {
        return (
            <div key={result._id}>
                <div>{result.title}</div>
                <div>{result.timestamp}</div>
            </div>);
    }

    useEffect(() => {
        fetch(`${hostName}/listview?p=${page}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then(res => res.json())
            .then(response => {
                setListResults(response.data);
                setResponseStatus('');
            })
            .catch(() => setResponseStatus(
                "Something was wrong with the processing. Please check server console."));
    });

    return (
        <div>
            <div>Search for a previous workflow</div>

            <ul>
                {listResults.map(renderResult)}
            </ul>
            <div>
                {responseStatus ? responseStatus : ''}
            </div>
        </div>
    );
}