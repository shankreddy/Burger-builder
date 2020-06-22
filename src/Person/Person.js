import React from 'react';

const person = (props) => {
    return (
        <div>
            <p>Im a Person {props.name}</p>
            <p>{props.children} {props.age}</p>
            <input onChange={props.changed}/>
        </div>
    );
};

export default person;