import React from 'react';
import logo from './logo.svg';
import './Home.css'

export default function Home() {
    return (
    <div>
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
      </header>
    </div>
    )
}
