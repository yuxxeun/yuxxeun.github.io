"use client"

import React, { useState, useEffect } from 'react';

const ScreenSizeDetector: React.FC = () => {
    const [screenSize, setScreenSize] = useState<string>('');
    const handleResize = () => {
        setScreenSize(`${window.innerWidth} ×  ${window.innerHeight}`);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {screenSize}
        </>
    );
};

export default ScreenSizeDetector;