import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
    const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <p className="dark:text-zinc-400 font-geistMonoVariable text-base">
            {time}
        </p>
    );
};

export default Clock;