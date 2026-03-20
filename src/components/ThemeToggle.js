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

    const snapToSide = (currentX, currentY) => {
        const w = btnRef.current?.offsetWidth ?? 72;
        const h = btnRef.current?.offsetHeight ?? 36;
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
        const w = btnRef.current?.offsetWidth ?? 72;
        const h = btnRef.current?.offsetHeight ?? 36;
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
            className={`group fixed top-5 right-5 lg:top-8 lg:right-10 z-[60] select-none touch-none outline-none ${dragging ? 'cursor-grabbing scale-95' : 'cursor-grab hover:scale-105 active:scale-95'} transition-all duration-300`}
        >
            {/* Premium Pill Track */}
            <div className={`relative flex items-center w-[76px] h-10 rounded-full p-1 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                isDark 
                    ? 'bg-[#171717] border border-[#333333] shadow-[inset_0px_2px_8px_rgba(0,0,0,0.5)]' 
                    : 'bg-[#F0F0F0] border border-[#E5E5E5] shadow-[inset_0px_2px_8px_rgba(200,200,200,0.3)]'
            } group-hover:shadow-[0_0_15px_rgba(150,150,150,0.2)] dark:group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>

                {/* Sliding Pill Indicator */}
                <div className={`absolute left-1 top-1 bottom-1 w-[32px] rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    isDark 
                        ? 'translate-x-[34px] bg-[#333333] shadow-black/80 border border-[#404040]' 
                        : 'translate-x-0 bg-white shadow-gray-300/80 border border-white'
                }`} />

                {/* Icons Container */}
                <div className="relative z-10 flex items-center justify-between w-full px-[5px] pointer-events-none">
                    <Sun
                        size={15}
                        className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                            isDark ? 'text-gray-500 scale-90 opacity-60' : 'text-[#333333] scale-110 opacity-100 drop-shadow-sm'
                        }`}
                        strokeWidth={isDark ? 2 : 2.5}
                    />
                    <Moon
                        size={15}
                        className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                            isDark ? 'text-white scale-110 opacity-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]' : 'text-gray-400 scale-90 opacity-60'
                        }`}
                        strokeWidth={isDark ? 2.5 : 2}
                    />
                </div>
                
                {/* Glow Ring effect on drag */}
                <div className={`absolute inset-0 rounded-full opacity-0 pointer-events-none transition-opacity duration-300 ${
                    dragging ? 'opacity-100 ring-2 ring-primary/30' : ''
                }`} />
            </div>
        </div>
    );
}
