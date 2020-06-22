import React from "react";

const input = (props) => {
    return (
        <div>
            <input value={props.userName} onChange={props.changed}/>
            <p>{props.userName.length}</p>
        </div>
    );
}

export default input;