import './PaginationBar.css';

function pageNumber(page, onPageSelect, isSelected = false) {
    return (
        <td className='pageNumberContainer'><span key={page}
            className={
                "page-number "
                + (isSelected ? "selected" : "")
            }
            onClick={
                isSelected ? () => { } : () => onPageSelect(page)
            }>
            {page}
            </span></td>
    );
}

// A pagination bar that accepts data and renders the widget.
// It also accepts a callback to react to user's click on
// a certain page.
export default function PaginationBar({ props: {
    currentPage, // The highlighted page displayed, 0-based index.
    maxPage,     // The total number of pages available.
    onPageSelect // The callback function called when
} }) {
    return (
        <table className="bar">
            <tbody>
                <tr>
                {[...Array(maxPage).keys()].map(
                    i => i + 1   /** Display converted to 1-based index. */
                ).map((page) => pageNumber(
                    page,
                    onPageSelect,
                    page === currentPage
                ))}
                </tr>
                </tbody>
        </table>
    );
}