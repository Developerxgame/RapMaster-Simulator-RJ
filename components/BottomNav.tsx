import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HomeIcon, BriefcaseIcon, MusicNoteIcon, GlobeIcon, ShoppingCartIcon, ChartBarIcon, PuzzleIcon, HomeIconSolid, BriefcaseIconSolid, MusicNoteIconSolid, GlobeIconSolid, ShoppingCartIconSolid, ChartBarIconSolid, PuzzleIconSolid } from './Icons';

const NavItem: React.FC<{ to: string; icon: React.ReactNode; activeIcon: React.ReactNode; label: string }> = ({ to, icon, activeIcon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (location.pathname === '/' && to === '/home');
  
  return (
    <NavLink
      to={to}
      className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? 'text-ios-blue' : 'text-ios-label'}`}
    >
      {isActive ? activeIcon : icon}
      <span className={`text-xs mt-1 font-medium ${isActive ? 'text-ios-blue' : 'text-ios-gray'}`}>{label}</span>
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
    <nav className="fixed bottom-4 left-0 right-0 max-w-md mx-auto h-24 px-4 z-10">
        <div className="flex justify-around items-center h-full bg-ios-bg-secondary/70 backdrop-blur-lg rounded-3xl border border-white/10 shadow-lg">
            {navItems.map(item => <NavItem key={item.to} {...item} />)}
        </div>
    </nav>
  );
};

export default BottomNav;