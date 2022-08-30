import React, { useEffect } from 'react';

const Main = ({children}) => {

    return (
        <main id="contents">
            <div className='wrap'>
                {children}
            </div>
        </main>
    );
};

export default Main;