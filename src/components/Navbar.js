"use client";

export function Navbar({ activePage, setActivePage }) {
    const navItems = ["About", "Resume", "Portfolio", "Blog", "Contact"];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-dashed border-foreground z-50 lg:static lg:border-t-0 lg:border-b-2 lg:border-dashed lg:mb-8 lg:bg-transparent">
            <ul className="flex justify-around items-center lg:justify-start lg:gap-10 px-1 lg:px-0">
                {navItems.map(item => {
                    const isActive = activePage === item.toLowerCase();
                    return (
                        <li key={item} className="flex-1 lg:flex-initial">
                            <button
                                className={`relative w-full lg:w-auto py-4 lg:py-4 px-1 lg:px-0 text-[11px] sm:text-sm lg:text-lg font-semibold transition-all duration-200 ${
                                    isActive 
                                        ? 'text-foreground' 
                                        : 'text-muted hover:text-foreground'
                                } focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 active:scale-95`}
                                onClick={() => setActivePage(item.toLowerCase())}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <span className="relative z-10">{item}</span>
                                {/* On mobile: indicator at top (above border); on desktop: indicator at bottom */}
                                {isActive && (
                                    <span className="absolute top-0 left-0 right-0 h-[3px] bg-foreground lg:top-auto lg:bottom-0 animate-[slideIn_0.3s_ease-out]" />
                                )}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
}
