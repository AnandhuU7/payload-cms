'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoPath from "../assets/images/seed.jpg"

const Navbar = () => {
    const [currentPath, setCurrentPath] = useState('/');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Desktop Navbar */}
            <header
                id="navbar"
                className="bg-white text-black backdrop-blur transition-all duration-300 shadow-lg h-24 hidden lg:flex sticky top-0 z-50 px-8"
            >
                <Link
                    href="/"
                    className="border-0 flex-shrink-0 flex items-center justify-center"
                >
                    <Image
                        className="mx-auto w-32 h-10"
                        src={logoPath}
                        alt="Dubai Hikvision"
                        loading={"eager"}
                    />
                </Link>
                <nav className="header-links contents font-semibold text-base lg:text-lg z-50">
                    <ul className="flex items-center ml-4 xl:ml-8 mr-auto">
                        {[
                            { path: '/', name: 'Home' },
                            { path: '/plants', name: 'Plants' },
                            { path: '/gardening', name: 'Gardening' },
                            { path: '/blog', name: 'Blog' },
                            { path: '/about', name: 'About' },
                            { path: '/contact', name: 'Contact' },
                            { path: '/dvrs', name: 'Dvr'}
                        ].map((item) => (
                            <li key={item.path} className="p-3 xl:p-6 relative group">
                                <a
                                    href={item.path}
                                    className={`relative inline-block overflow-hidden py-1 px-2 transition-all duration-300 ${currentPath === item.path ? 'text-cyan-600' : 'hover:text-cyan-600'
                                        }`}
                                >
                                    <span className="relative z-10">{item.name}</span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Social Media Icons */}
                <nav className="hidden sm:block xl:contents">
                    <ul className="flex items-center mr-4 lg:mr-6 xl:mr-8 md:mt-8 lg:mb-6 flex-nowrap justify-center gap-6 md:gap-8">
                        {[
                            {
                                href: 'https://www.facebook.com/',
                                color: 'hover:text-blue-600',
                                iconPath: 'M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z',
                                label: 'Facebook'
                            },
                            {
                                href: 'https://x.com/',
                                color: 'hover:text-gray-900',
                                iconPath: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
                                label: 'X'
                            },
                            {
                                href: 'https://www.instagram.com/',
                                color: 'hover:text-pink-500',
                                iconPath: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
                                label: 'Instagram'
                            },
                            {
                                href: 'https://wa.me/+971552929644',
                                color: 'hover:text-green-500',
                                iconPath: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z',
                                label: 'WhatsApp'
                            },
                        ].map((social) => (
                            <li key={social.href}>
                                <a
                                    href={social.href}
                                    className={`text-gray-600 ${social.color} transition-all duration-300 hover:scale-125`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    title={`Visit us on ${social.label}`}
                                >
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.iconPath} />
                                    </svg>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            {/* Mobile Navbar */}
            <nav className="w-screen lg:hidden px-2 bg-white shadow-md fixed top-0 z-50 h-16 flex items-center">
                <div className="flex justify-between items-center w-full px-3">
                    <Link
                        href="/"
                        className="border-0 flex-shrink-0 flex items-center"
                    >
                        <Image
                            className="w-28 h-8 object-contain"
                            src={logoPath}
                            alt="Dubai Hikvision"
                            width={112}
                            height={32}
                            priority
                        />
                    </Link>
                    <div className="lg:hidden">
                        <button
                            id="collapseBtn"
                            onClick={toggleMenu}
                            aria-expanded={isMenuOpen}
                            aria-label="Open menu navigation"
                            className="p-2 rounded-full bg-cyan-50 hover:bg-cyan-100 transition-colors duration-300 focus:outline-none"
                        >
                            <svg width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-cyan-600">
                                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div
                    id="collapseContent"
                    className={`${isMenuOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white shadow-lg z-50 transition-all duration-300 rounded-b-lg overflow-hidden`}
                    style={{ maxHeight: isMenuOpen ? '1000px' : '0px' }}
                >
                    <ul className="flex flex-col">
                        {[
                            { path: '/', name: 'Home' },
                            { path: '/plants', name: 'Plants' },
                            { path: '/gardening', name: 'Gardening' },
                            { path: '/blog', name: 'Blog' },
                            { path: '/about', name: 'About' },
                            { path: '/contact', name: 'Contact' },
                        ].map((item) => (
                            <li key={item.path}>
                                <a
                                    href={item.path}
                                    className={`block py-3 px-4 ${currentPath === item.path ? 'text-cyan-600 bg-cyan-50' : 'hover:text-cyan-600 hover:bg-cyan-50'} transition-colors duration-200`}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <div className="h-16 lg:hidden"></div>
        </>
    );
};

export default Navbar;