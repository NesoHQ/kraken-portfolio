"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 lg:top-8 lg:right-10 z-[60] flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-card border-2 border-foreground sketch-border transition-all duration-500 hover:scale-110 active:scale-95 group overflow-hidden grayscale hover:grayscale-0"
            aria-label="Toggle theme"
        >
            <div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <span className="text-xl lg:text-3xl relative z-10 flex items-center justify-center w-full h-full transform group-hover:-translate-y-1 transition-transform duration-500">
                {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
            </span>
        </button>
    );
}
