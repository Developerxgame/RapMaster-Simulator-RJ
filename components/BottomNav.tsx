
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, BriefcaseIcon, MusicNoteIcon, GlobeIcon, ShoppingCartIcon, ChartBarIcon, PuzzleIcon } from './Icons';

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
  const activeClass = 'text-ios-blue';
  const inactiveClass = 'text-ios-gray';

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`
      }
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

const BottomNav: React.FC = () => {
  const iconClass = "w-6 h-6";
  const navItems = [
    { to: "/home", icon: <HomeIcon className={iconClass} />, label: "Home" },
    { to: "/job", icon: <BriefcaseIcon className={iconClass} />, label: "Job" },
    { to: "/studio", icon: <MusicNoteIcon className={iconClass} />, label: "Studio" },
    { to: "/social", icon: <GlobeIcon className={iconClass} />, label: "Social" },
    { to: "/shop", icon: <ShoppingCartIcon className={iconClass} />, label: "Shop" },
    { to: "/stats", icon: <ChartBarIcon className={iconClass} />, label: "Stats" },
    { to: "/skills", icon: <PuzzleIcon className={iconClass} />, label: "Skills" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-ios-bg-secondary bg-opacity-80 backdrop-blur-md border-t border-gray-700 z-10">
      <div className="flex justify-around items-start h-full pt-2">
        {navItems.map(item => <NavItem key={item.to} {...item} />)}
      </div>
    </nav>
  );
};

export default BottomNav;
