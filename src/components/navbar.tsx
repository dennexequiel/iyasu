'use client';

import { useScrollTo } from '@/app/hooks/useScrollTo';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = useScrollTo();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    if (isMenuOpen) {
      // If closing, fade out backdrop first
      const backdrop = document.querySelector('.bg-black.bg-opacity-50');
      if (backdrop) {
        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0');
      }
      // Then close menu after a short delay
      setTimeout(() => setIsMenuOpen(false), 300);
    } else {
      // If opening, show menu immediately
      setIsMenuOpen(true);
    }
  };

  const handleNavClick = (section: string, offset: number = 0) => {
    scrollTo(section, offset);
    setIsMenuOpen(false);
  };

  const Logo = () => (
    <svg
      width='90'
      viewBox='0 0 145 54'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`w-auto h-12 transition-colors duration-300 ${
        isScrolled || isMenuOpen ? 'fill-teal-500' : 'fill-white'
      }`}
      aria-label='Iyasu Logo'
    >
      <g clipPath='url(#a)'>
        <path d='M7.184 12.977H.977v22.9h6.207v-22.9ZM33.392 29.823h-6.284c-2.49 0-4.61-.881-6.386-2.657-1.775-1.775-2.657-3.908-2.657-6.424V5.377h-6.207v15.365c0 2.823.69 5.39 2.057 7.701a15.505 15.505 0 0 0 5.53 5.53c2.312 1.367 4.866 2.057 7.663 2.057h6.284v1.047c0 2.516-.881 4.65-2.644 6.425-1.763 1.775-3.895 2.656-6.399 2.656v6.207c2.823 0 5.377-.69 7.689-2.056 2.299-1.367 4.138-3.218 5.518-5.53 1.366-2.312 2.056-4.88 2.056-7.702V5.416h-6.207v24.407h-.013ZM100.457 17.524H88.541c-.804 0-1.494-.281-2.082-.856-.587-.575-.868-1.264-.868-2.095 0-.83.294-1.532.868-2.094.588-.575 1.278-.856 2.082-.856h19.873V5.416H88.541c-2.516 0-4.662.894-6.462 2.682-1.801 1.788-2.695 3.947-2.695 6.475 0 2.53.894 4.7 2.695 6.489 1.8 1.788 3.959 2.682 6.462 2.682h11.916c.831 0 1.533.293 2.121.868.587.588.868 1.29.868 2.12 0 .83-.294 1.495-.868 2.082-.575.588-1.29.869-2.121.869H80.623v6.207h19.834c2.529 0 4.7-.894 6.501-2.695 1.801-1.8 2.695-3.947 2.695-6.463s-.894-4.7-2.695-6.5c-1.801-1.801-3.959-2.695-6.501-2.695M70.481 42.199c-.025.128-.191.243-.396.255a24.407 24.407 0 0 0-.332 3.985c0 4.049 1.329 4.917 2.082 4.917.55-.012 1.252-1.52 1.66-2.937.294.268.856.728 1.214.907-.843 2.643-1.801 3.627-2.963 3.627-2.095 0-3.295-2.606-3.462-5.198a20.863 20.863 0 0 1-.063-1.84c0-1.302.076-2.745.242-4.086l2.005.383.013-.013Zm9.056 7.05c-.435-2.63-1.712-4.355-3.628-5.454l.933-1.11c2.12 1.149 3.793 3.243 4.24 6.079l-1.545.485ZM91.861 43.17h.37c1.802.05 3.283 1.11 3.283 3.065 0 2.12-1.469 3.218-3.448 3.218a4.714 4.714 0 0 1-2.912-1.06c.115-.32.268-.843.37-1.251.843.651 1.75.932 2.465.932 1.2 0 1.993-.651 1.993-1.84 0-1.047-.805-1.723-2.057-1.723-1.162 0-2.886.549-4.508 1.123.728 2.517 1.66 5.671 2.184 7.804l-1.61.345c-.395-2.082-1.328-5.351-1.992-7.612-.92.345-2.133.754-2.937 1.06a.453.453 0 0 1-.256.345l-.613-1.584a474.07 474.07 0 0 0 3.423-1.124c-.434-1.43-.817-2.695-1.111-3.64l1.98-.345c.012.18-.077.269-.307.37.255.959.536 1.968.856 3.117 1.481-.51 2.81-.92 3.857-1.098-.69-.69-1.75-1.546-2.478-1.98l.958-.907c1.009.511 2.363 1.571 3.014 2.325l-.536.46h.012ZM96.817 42.684c.932-.025 5.505-.153 6.526-.191 0-.205-.063-1.801-.089-2.197l2.018.09c-.013.127-.153.28-.421.319 0 .383.012 1.098.025 1.75 1.89-.064 3.819-.103 4.777-.116v1.392c-1.15-.012-2.912 0-4.739.064.013.55.013 1.086.026 1.456.025.524.051.907.064 1.38.191.575.204 1.277.204 1.635 0 3.052-2.094 4.827-4.47 5.734-.255-.345-.754-.856-1.086-1.162 1.916-.69 3.142-1.673 3.576-2.823h-.012a1.518 1.518 0 0 1-1.163.524c-1.328 0-2.567-1.073-2.567-2.657 0-1.583 1.341-2.822 2.785-2.822.447 0 .881.115 1.175.332 0-.064-.013-.115-.013-.166-.013-.281-.026-.881-.051-1.392-2.452.076-4.892.127-6.527.217l-.05-1.367h.012Zm6.846 5.16c0-1.073-.447-1.61-1.303-1.61-.856 0-1.52.652-1.52 1.636 0 .894.664 1.481 1.418 1.481.907 0 1.417-.715 1.417-1.52M.977 7.076h6.207V.87L.977 3.973v3.103ZM135.352 5.8h6.168l2.631-3.64h-8.799V5.8ZM135.312 12.977v9.426c0 2.018-.728 3.742-2.171 5.185-1.443 1.443-3.18 2.159-5.198 2.159-2.018 0-3.793-.716-5.237-2.159-1.456-1.43-2.171-3.167-2.171-5.185v-9.426h-6.207v9.426c0 2.49.613 4.738 1.839 6.769a13.95 13.95 0 0 0 4.93 4.866c2.057 1.213 4.343 1.826 6.846 1.826s4.751-.613 6.807-1.826a13.941 13.941 0 0 0 4.93-4.866c1.226-2.03 1.84-4.291 1.84-6.77v-9.425h-6.208ZM120.522.87h-6.233v6.206h6.233V.87ZM72.665 12.977a15.5 15.5 0 0 0-5.517-5.505c-2.3-1.366-4.866-2.056-7.689-2.056-2.823 0-5.339.69-7.65 2.056a15.568 15.568 0 0 0-5.505 5.505c-1.367 2.299-2.056 4.853-2.056 7.65 0 2.797.69 5.352 2.056 7.664a15.505 15.505 0 0 0 5.53 5.53c2.312 1.366 4.866 2.056 7.663 2.056h3.283l5.185-6.207h-8.48c-2.491 0-4.611-.881-6.386-2.657-1.776-1.775-2.657-3.895-2.657-6.386 0-2.49.881-4.61 2.644-6.36 1.762-1.763 3.883-2.644 6.36-2.644 2.478 0 4.65.881 6.399 2.644 1.763 1.762 2.644 3.895 2.644 6.399v15.211h6.207V20.666c0-2.823-.69-5.377-2.056-7.689' />
      </g>
      <defs>
        <clipPath id='a'>
          <path transform='translate(.977 .87)' d='M0 0h143.173v53.131H0z' />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto px-4 md:px-8 py-4 flex justify-between items-start'>
        <Link href='/' className='inline-block'>
          <Logo />
        </Link>

        {/* Hamburger menu for mobile */}
        <button
          className={`lg:hidden focus:outline-none transition-colors duration-300 ${
            isScrolled || isMenuOpen ? 'text-teal-500' : 'text-white'
          }`}
          onClick={toggleMenu}
          aria-label='Toggle menu'
        >
          <IoMdMenu size={30} />
        </button>

        {/* Navigation links */}
        <div
          className={`
            lg:flex
            ${
              isMenuOpen
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-full'
            }
            fixed lg:static top-0 right-0 w-full h-full lg:w-auto lg:h-auto
            bg-white lg:bg-transparent
            z-50 lg:z-auto
            transition-all duration-300 ease-in-out
            lg:opacity-100 lg:translate-x-0
          `}
        >
          <div className='container mx-auto px-4 md:px-8 py-4 lg:py-0 h-full lg:h-auto overflow-y-auto'>
            <div className='flex justify-between items-start lg:hidden mt-4 mb-8'>
              <Link href='/' onClick={() => setIsMenuOpen(false)}>
                <Logo />
              </Link>
              <button
                className='text-neutral-400 focus:outline-none'
                onClick={toggleMenu}
                aria-label='Close menu'
              >
                <IoMdClose size={30} />
              </button>
            </div>
            <ul className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6'>
              <li>
                <button
                  onClick={() => handleNavClick('shop', 100)}
                  className={`font-medium text-md font-poppins hover:underline ${
                    isScrolled || isMenuOpen
                      ? 'text-teal-500'
                      : 'text-neutral-200 hover:text-white'
                  }`}
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('testimonials')}
                  className={`font-medium text-md font-poppins hover:underline ${
                    isScrolled || isMenuOpen
                      ? 'text-teal-500'
                      : 'text-neutral-200 hover:text-white'
                  }`}
                >
                  Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className={`font-medium text-md font-poppins hover:underline ${
                    isScrolled || isMenuOpen
                      ? 'text-teal-500'
                      : 'text-neutral-200 hover:text-white'
                  }`}
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ease-in-out'
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
}
