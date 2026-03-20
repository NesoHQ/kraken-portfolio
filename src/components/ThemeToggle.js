"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState, useRef } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [pos, setPos] = useState({ x: null, y: null });
    const [dragging, setDragging] = useState(false);
    const [snapping, setSnapping] = useState(false);
    const dragStart = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (mounted && btnRef.current && pos.x === null) {
            const rect = btnRef.current.getBoundingClientRect();
            setPos({ x: rect.left, y: rect.top });
        }
    }, [mounted]);

    const getSize = () => ({ w: btnRef.current?.offsetWidth ?? 64, h: btnRef.current?.offsetHeight ?? 32 });

    const snapToSide = (currentX, currentY) => {
        const { w, h } = getSize();
        const midX = window.innerWidth / 2;
        const snappedX = currentX + w / 2 < midX ? 12 : window.innerWidth - w - 12;
        const clampedY = Math.min(Math.max(currentY, 12), window.innerHeight - h - 12);
        setSnapping(true);
        setPos({ x: snappedX, y: clampedY });
        setTimeout(() => setSnapping(false), 400);
    };

    const onPointerDown = (e) => {
        dragStart.current = {
            startX: e.clientX, startY: e.clientY,
            originX: pos.x, originY: pos.y,
            moved: false,
        };
        setDragging(true);
        btnRef.current.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
        if (!dragStart.current) return;
        const dx = e.clientX - dragStart.current.startX;
        const dy = e.clientY - dragStart.current.startY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragStart.current.moved = true;
        const { w, h } = getSize();
        setPos({
            x: Math.min(Math.max(dragStart.current.originX + dx, 0), window.innerWidth - w),
            y: Math.min(Math.max(dragStart.current.originY + dy, 0), window.innerHeight - h),
        });
    };

    const onPointerUp = () => {
        if (!dragStart.current) return;
        const moved = dragStart.current.moved;
        dragStart.current = null;
        setDragging(false);
        if (!moved) toggleTheme();
        else snapToSide(pos.x, pos.y);
    };

    if (!mounted) return null;

    const isDark = theme === 'dark';

    const style = pos.x !== null ? {
        left: pos.x, top: pos.y, right: 'auto', bottom: 'auto',
        transition: snapping
            ? 'left 0.4s cubic-bezier(0.34,1.56,0.64,1), top 0.4s cubic-bezier(0.34,1.56,0.64,1)'
            : 'none',
    } : {};

    return (
        <div
            ref={btnRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            style={style}
            role="button"
            aria-label="Toggle theme"
            className={`fixed top-5 right-5 lg:top-8 lg:right-10 z-[60] select-none touch-none outline-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
            {/* Pill track */}
            <div className={`relative flex items-center w-16 h-8 rounded-full p-1 transition-colors duration-300 ${isDark ? 'bg-foreground' : 'bg-foreground/10 border border-foreground/20'}`}>
                {/* Icons */}
                <Sun
                    size={13}
                    className={`absolute left-2 transition-opacity duration-300 ${isDark ? 'opacity-30 text-background' : 'opacity-0'}`}
                />
                <Moon
                    size={13}
                    className={`absolute right-2 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-40 text-foreground'}`}
                />
                {/* Sliding knob */}
                <div
                    className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isDark
                            ? 'translate-x-8 bg-background text-foreground'
                            : 'translate-x-0 bg-foreground text-background'
                    }`}
                >
                    {isDark ? <Sun size={12} /> : <Moon size={12} />}
                </div>
            </div>
        </div>
    );
}
