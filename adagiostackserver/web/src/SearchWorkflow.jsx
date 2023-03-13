import { useEffect, useState } from "react";
import { hostName } from "./serverConfig";
import PaginationBar from "./PaginationBar";

export default function SearchWorkflow() {
    const [page, setPage] = useState(0);
    const [listResults, setListResults] = useState([]);
    const [responseStatus, setResponseStatus] = useState('');
    const [paginationData, setPaginationData] = useState({
        totalArticles: 0,
        totalPages: 0
    });

    function renderResult(result) {
        return (
            <a key={result._id} className="item-link" href={'/browse/' + result._id}>
                <div>{result.title}</div>
                <div>{result.timestamp}</div>
            </a>);
    }

    useEffect(() => {
        fetch(`${hostName}/listview?p=${page}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then(res => res.json())
            .then(({
                data, // The article title and time returned by DB
                totalArticles,  // The total available articles returned by DB
                totalPages, // The total pages computed by backend
                currentPage // The current page as echoed from BE, ignored for now.
            }) => {
                setListResults(data);
                setResponseStatus('');
                setPaginationData({
                    totalArticles, totalPages
                });
            })
            .catch(() => setResponseStatus(
                "Something was wrong with the processing. Please check server console."));
    }, [page]);

    return (
        <div>
            <div>Search for a previous workflow</div>

            {listResults.length > 0 && (
                <ul>
                    {listResults.map(renderResult)}
                </ul>
            )}

            {paginationData.totalArticles > 0 && (
                <div className="pagination-container">
                    <PaginationBar
                        currentPage={paginationData.totalArticles}
                        maxPage={paginationData.totalPages}
                        onPageSelect={(page) => setPage(page)}
                    ></PaginationBar>
                </div>
            )}

            <div>
                {responseStatus ? responseStatus : ''}
            </div>
        </div>
    );
}