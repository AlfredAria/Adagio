import './Entity.css';

function getMid(props) {
    if (!props["metadata"] || !props["metadata"]["mid"]) {
        return '[mid not found]';
    }
    return props["metadata"]["mid"];
}

export default function Entity({props}) {
    return (
        <div className="entity-container">
            <div className="entity-name">{props["name"]}</div>
            <div className="entity-mid">{getMid(props)}</div>
        </div>
    )
}