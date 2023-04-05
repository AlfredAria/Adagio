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
                <tbody>
                    <tr>
                        <td>Row 1, Column 1</td>
                        <td>Row 1, Column 2</td>
                        <td>Row 1, Column 3</td>
                    </tr>
                </tbody>
            </table></div>
            <div className="title">
                <h1>
                    All Saved Workflows
                </h1>
            </div>
            <div className = "workflows-page">
            <table>
                <thead>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                    </tr>
                </thead>
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
            <div className = "number-page">
            <table>
                <thead>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                        <th>Column 3</th>
                        <th>Column 4</th>
                        <th>Column 5</th>
                        <th>Column 6</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Row 1, Column 1</td>
                        <td>Row 1, Column 2</td>
                        <td>Row 1, Column 3</td>
                        <td>Row 1, Column 4</td>
                        <td>Row 1, Column 5</td>
                        <td>Row 1, Column 6</td>
                    </tr>
                </tbody>
            </table></div>
            </>

    );
}