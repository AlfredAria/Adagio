import './Entity.css';

function getMid(result) {
    if (!result["metadata"] || !result["metadata"]["mid"]) {
        return '[mid not found]';
    }
    return result["metadata"]["mid"];
}

export default function Entity({props}) {
    return (
        // Usually, using indexes as key is an antipattern. However, in this
        // scenario, the list is part of a read-only object from the database.
        // Therefore, it's safe to use unless there are other options for an
        // object identifier that don't overlap.
        <div>
            {props.entity &&
                <div className='entity-container'>
                    <div className="entity-name">{props.entity["name"]}</div>
                    <div className="entity-mid">{getMid(props.entity)}</div>
                </div>
            }
        </div>);
}
