import React from 'react';

const Card = (props) => {
    return (
        <div className='bg-white shadow-md rounded-lg'>
            {props.children}
        </div>
    );
};

export default Card;