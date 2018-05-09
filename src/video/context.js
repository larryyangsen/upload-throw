import React from 'react';

const initState = {
    files: []
};

export default React.createContext({ ...initState });
