import React from 'react';

export default ({ file, upload }) => (
    <div>
        <video src={URL.createObjectURL(file.data)} controls />
        <button onClick={upload}>Upload</button>
    </div>
);
