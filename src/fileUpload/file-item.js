import React from 'react';

export default ({ name, size, type }) => (
    <li className="file-content">
        <span className="name">{name}</span>
        <span className="type">{type}</span>
        <span className="size">{(size / 1024 / 1024).toFixed(3)}mb</span>
    </li>
);
