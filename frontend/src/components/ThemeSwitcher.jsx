import React, { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    return (
        <select
            value={theme}
            onChange={handleThemeChange}
            className="w-24 select select-bordered "
        >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="cupcake">Cupcake</option>
        </select>
    );
};

export default ThemeSwitcher;
