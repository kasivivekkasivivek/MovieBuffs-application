import React, { useRef, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import './header.scss';

import logo from '../../assets/movieBuffs.png';

import Cookies from "js-cookie";

import { Component } from 'react';

const headerNav = [
    {
        display: 'Home', // navigate to /home 
        path: '/' // navigate to /home 
    },
    {
        display: 'Movies', // navigate to /movuies
        path: '/movie' // navigate to /movie
    },
    {
        display: 'TV Series', // navigate to /Tv shows
        path: '/tv' // navigate to /tv shows
    },
];

const Header = () => {

    const { pathname } = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) { // on scroll the slide bar 
                headerRef.current.classList.add('shrink');  // id scrolled above 100  add shrink
            } else {
                headerRef.current.classList.remove('shrink'); // if scrolled below 100 remove shrink
            }
        }
        window.addEventListener('scroll', shrinkHeader); // add the scoll feature to the entire window
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    const onClickLogoutButton = (props)=>{
        Cookies.remove('jwt_token');
        
    }

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <Link to="/"><img src={logo} alt="" /></Link>
                    <Link to="/"><p className="logo_title">
                        <span className="logo_title_1">M</span>
                        <span className="logo_title_2">o</span>
                        <span className="logo_title_3">v</span>
                        <span className="logo_title_4">i</span>
                        <span className="logo_title_5">e</span>
                        <span className="logo_title_6">B</span>
                        <span className="logo_title_7">u</span>
                        <span className="logo_title_8">f</span>
                        <span className="logo_title_9">f</span>
                        <span className="logo_title_10">s</span>
                        </p></Link>
                </div>
                <ul className="header__nav">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>
                            </li>
                        ))
                    }
                    <button type="button" className="logout_button" onClick={onClickLogoutButton}>Logout</button>
                </ul>
            </div>
        </div>
    );
}

export default Header;
