import './SearchWorkflow.css';
import { useEffect, useState } from "react";
import { hostName } from "./serverConfig";
import PaginationBar from "./PaginationBar";

export default function SearchWorkflow() {
    const [page, setPage] = useState(1);  // Pagination is 1-based.
    const [listResults, setListResults] = useState([]);
    const [responseStatus, setResponseStatus] = useState('');
    const [paginationData, setPaginationData] = useState({
        totalArticles: 0,
        totalPages: 0
    });

    function renderPaginationBar() {
        if (paginationData.totalArticles > 0) {
            return <div className="pagination-container">
                <PaginationBar
                    props={{
                        currentPage: page,
                        maxPage: paginationData.totalPages,
                        onPageSelect: (page) => {
                            setPage(page);
                        }
                    }}></PaginationBar>
            </div>
        } else {
            return "";
        }
    }
    
    function renderResult(result) {
        return (
            <a key={result._id} 
                className="item-link" 
                href={'/browse/' + result._id}>
                <div className="item-title">{result.title}</div>
                <div className="item-timestamp">{result.timestamp}</div>
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
            <h2>Search for a previous workflow</h2>

            {listResults.length > 0 && (
                <div>
                    Total articles: {paginationData.totalArticles}
                </div>
            )}

            {renderPaginationBar()}

            {listResults.length > 0 && (
                <ul className="list-container">
                    {listResults.map(renderResult)}
                </ul>
            )}

            {renderPaginationBar()}

            
        </div>
    );
}