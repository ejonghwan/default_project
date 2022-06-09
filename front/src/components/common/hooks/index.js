import React, { useState, useCallback } from 'react';

export const useInput = initialState => {
    const [val, setVal] = useState(initialState)
    const handler = useCallback(e => {
        setVal(e.target.value)
    }, [])
    return [val, handler]
};