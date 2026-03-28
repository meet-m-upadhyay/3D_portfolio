"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  {
    href: '/',
    hash: '#home',
    label: 'Home',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    ),
  },
  {
    href: '/projects',
    hash: '#projects',
    label: 'Projects',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    ),
  },
  {
    href: '/dashboard',
    hash: '#dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    ),
  },
  {
    href: '/contact',
    hash: '#contact',
    label: 'Contact',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileVisible, setMobileVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const lastScrollY = useRef(0);
  const isHomePage = pathname === '/';

  // Mobile: auto-hide on scroll down, show on scroll up
  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      
      // Mobile auto-hide logic
      if (currentY > lastScrollY.current && currentY > 100) {
        setMobileVisible(false);
      } else {
        setMobileVisible(true);
      }
      lastScrollY.current = currentY;

      // Track active section on home page (mobile scroll)
      if (isHomePage) {
        const sections = ['contact', 'dashboard', 'projects', 'home'];
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
              setActiveSection(id);
              break;
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Mobile: show nav on tap anywhere
  useEffect(() => {
    function handleTouch() {
      setMobileVisible(true);
    }
    window.addEventListener('touchstart', handleTouch, { passive: true });
    return () => window.removeEventListener('touchstart', handleTouch);
  }, []);

  function handleMobileNavClick(e: React.MouseEvent, item: typeof NAV_ITEMS[0]) {
    if (isHomePage) {
      e.preventDefault();
      const el = document.getElementById(item.hash.replace('#', ''));
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function isDesktopActive(item: typeof NAV_ITEMS[0]) {
    if (item.href === '/') return pathname === '/';
    return pathname === item.href;
  }

  function isMobileActive(item: typeof NAV_ITEMS[0]) {
    if (isHomePage) return activeSection === item.hash.replace('#', '');
    return pathname === item.href;
  }

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      {/* ═══════════ DESKTOP: Always-visible top nav ═══════════ */}
      <nav className="fixed top-0 left-0 w-full z-50 hidden md:block">
        <div className="bg-background/70 backdrop-blur-xl border-b border-white/5 shadow-xl">
          <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
            <Link href="/" className="font-display text-primary font-bold text-2xl tracking-tight hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.4)] transition-all">
              Meet<span className="text-on-surface">.dev</span>
            </Link>

            <div className="flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-label text-sm font-medium transition-all duration-300
                    ${isDesktopActive(item) 
                      ? 'text-primary bg-primary/10 shadow-[0_0_15px_rgba(0,229,255,0.15)]' 
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                    }`}
                >
                  <span className={`transition-all ${isDesktopActive(item) ? 'drop-shadow-[0_0_6px_rgba(0,229,255,0.5)]' : ''}`}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════ MOBILE: Floating bottom nav with auto-hide ═══════════ */}
      <nav className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-400 ${mobileVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="mx-4 mb-4">
          <div className="bg-surface-container/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_-4px_30px_rgba(0,0,0,0.4)] px-2 py-2 flex items-center justify-around">
            {NAV_ITEMS.map(item => (
              <Link 
                key={item.href} 
                href={isHomePage ? item.hash : item.href}
                onClick={(e) => handleMobileNavClick(e, item)}
                className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300
                  ${isMobileActive(item) 
                    ? 'text-primary bg-primary/15' 
                    : 'text-on-surface-variant active:bg-white/5'
                  }`}
              >
                {isMobileActive(item) && (
                  <span className="absolute -top-1 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(0,229,255,0.8)]"></span>
                )}
                <span className={`transition-all ${isMobileActive(item) ? 'drop-shadow-[0_0_8px_rgba(0,229,255,0.6)] scale-110' : ''}`}>
                  {item.icon}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
