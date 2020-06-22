import React from "react";


const output = (props) => {
    const text = props.userName.length > 5 ? "Text too long": "Text too short";
    return (
        <div>
            <p>{text}</p>
        </div>
    );
};

export default output;