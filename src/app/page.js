"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { About } from "@/components/sections/About";
import { Resume } from "@/components/sections/Resume";
import { Portfolio } from "@/components/sections/Portfolio";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";

const sections = {
  about: About,
  resume: Resume,
  blog: Blog,
  contact: Contact,
};

export default function PortfolioPage() {
  const [activePage, setActivePage] = useState("about");
  const [portfolioFilter, setPortfolioFilter] = useState("All");

  const renderSection = () => {
    if (activePage === "portfolio") {
      return <Portfolio filter={portfolioFilter} setFilter={setPortfolioFilter} />;
    }
    const Section = sections[activePage];
    return Section ? <Section /> : null;
  };

  return (
    <>
      <main className="w-full max-w-[1200px] mt-[30px] mx-auto flex flex-col gap-5 relative pb-[80px] lg:flex-row lg:items-start lg:mt-[60px] lg:pb-[60px] lg:gap-[25px]">
        <Sidebar />
        <div className="flex-1 w-full relative min-h-0 lg:min-h-[calc(100vh-120px)]">
          <Navbar activePage={activePage} setActivePage={setActivePage} />
          {renderSection()}
        </div>
        <ThemeToggle />
      </main>
      <Footer />
    </>
  );
}
