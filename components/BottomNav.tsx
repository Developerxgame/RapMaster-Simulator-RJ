import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HomeIcon, BriefcaseIcon, MusicNoteIcon, GlobeIcon, ShoppingCartIcon, ChartBarIcon, PuzzleIcon, HomeIconSolid, BriefcaseIconSolid, MusicNoteIconSolid, GlobeIconSolid, ShoppingCartIconSolid, ChartBarIconSolid, PuzzleIconSolid } from './Icons';

const NavItem: React.FC<{ to: string; icon: React.ReactNode; activeIcon: React.ReactNode; label: string }> = ({ to, icon, activeIcon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (location.pathname === '/' && to === '/home');
  
  return (
    <NavLink
      to={to}
      className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? 'text-ios-blue' : 'text-ios-gray'}`}
    >
      {isActive ? activeIcon : icon}
      <span className="text-xs mt-1 font-medium">{label}</span>
    </NavLink>
  );
};

const BottomNav: React.FC = () => {
  const iconClass = "w-7 h-7";
  const navItems = [
    { to: "/home", icon: <HomeIcon className={iconClass} />, activeIcon: <HomeIconSolid className={iconClass} />, label: "Home" },
    { to: "/job", icon: <BriefcaseIcon className={iconClass} />, activeIcon: <BriefcaseIconSolid className={iconClass} />, label: "Job" },
    { to: "/studio", icon: <MusicNoteIcon className={iconClass} />, activeIcon: <MusicNoteIconSolid className={iconClass} />, label: "Studio" },
    { to: "/social", icon: <GlobeIcon className={iconClass} />, activeIcon: <GlobeIconSolid className={iconClass} />, label: "Social" },
    { to: "/shop", icon: <ShoppingCartIcon className={iconClass} />, activeIcon: <ShoppingCartIconSolid className={iconClass} />, label: "Shop" },
    { to: "/stats", icon: <ChartBarIcon className={iconClass} />, activeIcon: <ChartBarIconSolid className={iconClass} />, label: "Stats" },
    { to: "/skills", icon: <PuzzleIcon className={iconClass} />, activeIcon: <PuzzleIconSolid className={iconClass} />, label: "Skills" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-24 bg-ios-bg-secondary bg-opacity-80 backdrop-blur-md border-t border-gray-700 z-10">
      <div className="flex justify-around items-start h-full pt-2">
        {navItems.map(item => <NavItem key={item.to} {...item} />)}
      </div>
    </nav>
  );
};

export default BottomNav;