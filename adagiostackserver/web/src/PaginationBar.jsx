
function pageNumber(page, onPageSelect, isSelected = false) {
    return (
        <span key={page}>
            <div
                className="page-number"
                onClick={
                    isSelected ? () => { } : () => onPageSelect(page)
                }>{page}</div>
        </span>
    );
}

// A pagination bar that accepts data and renders the widget.
// It also accepts a callback to react to user's click on
// a certain page.
export default function PaginationBar({ props: {
    currentPage, // The highlighted page displayed, 0-based index.
    maxPage,     // The total number of pages available.
    onPageSelect // The callback function called when
    // a page is selected and when it is not the
    // currentPage.
} }) {
    return (
        <div>
            {[...Array(maxPage).keys()].map(
                (page) => pageNumber(
                    page,
                    onPageSelect,
                    page === currentPage
                ))}
        </div>
    );
}