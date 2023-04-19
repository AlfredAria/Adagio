import './BrowseWorkflows.css';

export default function PreviousWorkflows() {
    return (
        <><div className="title-table">
            <table>
                <thead>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                        <th>Column 3</th>
                    </tr>
                </thead>
            </table></div>
            <div className="title">
                <h1>
                All Workflows Saved
                </h1>
            </div>
            <div className="workflows-page">
                <table>
                    <tbody>
                        <tr>
                            <td>Row 1, Column 1</td>
                            <td>Row 1, Column 2</td>
                        </tr>
                        <tr>
                            <td>Row 2, Column 1</td>
                            <td>Row 2, Column 2</td>
                        </tr>
                        <tr>
                            <td>Row 3, Column 1</td>
                            <td>Row 3, Column 2</td>
                        </tr>
                    </tbody>
                </table></div>
            <div className="number-page">
                <table>
                    <tbody>
                        <tr>
                            <td>1,</td>
                            <td>2,</td>
                            <td>3,</td>
                            <td>4,</td>
                            <td>5,</td>
                            <td>...</td>
                        </tr>
                    </tbody>
                </table></div>
        </>
    );
}