import React, { useState, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, GameStatus } from '../types';

const predefinedAvatars = [
    // 1. Pink Dreads, Goggles
    `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" fill="#F7B2AD"/><path d="M22 23c0 1.11-.89 2-2 2h-8c-1.11 0-2-.89-2-2v-1h12v1Z" fill="#896455"/><path d="M25 22H11c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1Z" fill="#333"/><path d="M24 20h-2c0-2.21-1.79-4-4-4s-4 1.79-4 4h-2c0-3.31 2.69-6 6-6s6 2.69 6 6Z" fill="#F7B2AD"/><path d="M29 18v-2c0-3.31-2.69-6-6-6h-2v2h2c2.21 0 4 1.79 4 4v2h2Zm-16 0v-2c0-2.21 1.79-4 4-4h2v-2h-2c-3.31 0-6 2.69-6 6v2h2Z" fill="#333"/><path d="M24.33 13.52c.22-.61-.17-1.29-.79-1.44l-11-4c-.61-.22-1.29.17-1.44.79-.22.61.17 1.29.79 1.44l11 4c.61.22 1.29-.17 1.44-.79Z" fill="#222"/><path d="M24 10c0-1.1-.9-2-2-2h-1c-1.1 0-2 .9-2 2v2h2v-1h1v1h2v-2Z" fill="#FF69B4"/><path d="M22 12v-2c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2v2h-2v-1h-1v1h-2Z" fill="#FF69B4" transform="translate(56) scale(-1 1)"/><path d="M12 25h12v1H12z" fill="#333"/><path d="M15 12v3h-1v-3h1Zm-2-2v2h-1v-2h1Zm2-1v1h-1v-1h1Zm2-1v1h-1v-1h1Zm-3 6h-2v-1h2v1Zm-1-2h-1v-1h1v1Z" fill="#FF69B4"/><path d="M23 12v3h-1v-3h1Zm-2-2v2h-1v-2h1Zm2-1v1h-1v-1h1Zm2-1v1h-1v-1h1Zm-3 6h-2v-1h2v1Zm-1-2h-1v-1h1v1Z" fill="#FF69B4" transform="translate(43) scale(-1 1)"/></svg>`,
    // 2. Female, Space Buns, Chain
    `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" fill="#A56A49"/><path d="M22 23c0 1.11-.89 2-2 2h-8c-1.11 0-2-.89-2-2v-1h12v1Z" fill="#6D4C41"/><path d="M24.5 20a4.5 4.5 0 0 1-9 0h-2a6.5 6.5 0 0 0 13 0h-2Z" fill="#A56A49"/><circle cx="26" cy="12" r="4" fill="#333"/><circle cx="10" cy="12" r="4" fill="#333"/><path d="M26 19H10c-1.66 0-3-1.34-3-3v-2c0-1.66 1.34-3 3-3h16c1.66 0 3 1.34 3 3v2c0 1.66-1.34 3-3 3Z" fill="#A56A49"/><path d="M16 16.5c0 .28-.22.5-.5.5h-3a.5.5 0 0 1-.5-.5v-1c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5v1Zm8 0c0 .28-.22.5-.5.5h-3a.5.5 0 0 1-.5-.5v-1c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5v1Z" fill="#333"/><path d="M15 25h6v1h-6z" fill="#222"/><path d="M21 27a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1Z" fill="#FFD700"/><path d="M18 29.5c-1.66 0-3-1.12-3-2.5h1c0 .83.89 1.5 2 1.5s2-.67 2-1.5h1c0 1.38-1.34 2.5-3 2.5Z" fill="#FFD700"/></svg>`,
    // 3. Bucket Hat
    `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" fill="#C19A6B"/><path d="M22 23c0 1.11-.89 2-2 2h-8c-1.11 0-2-.89-2-2v-1h12v1Z" fill="#8C5B3F"/><path d="M24.5 20a4.5 4.5 0 0 1-9 0h-2a6.5 6.5 0 0 0 13 0h-2Z" fill="#C19A6B"/><path d="M16.5 16a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2c.28 0 .5.22.5.5Zm5 0a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2c.28 0 .5.22.5.5Z" fill="#333"/><path d="M23 25h-2v1h2v-1Zm-6 0h-2v1h2v-1Z" fill="#54321a"/><path d="M20 26h-4v1h4v-1Z" fill="#C19A6B"/><path d="M31 16H5c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2h26c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2Z" fill="#2C5F2D"/><path d="M26 11H10c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2Z" fill="#2C5F2D"/><path d="M28 11v5h-2v-5h2Zm-18 0v5H8v-5h2Z" fill="#2C5F2D"/><path d="M22 17h-8v1h8v-1Z" fill="#8C5B3F"/></svg>`,
    // 4. Afro, vintage jacket
    `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" fill="#6A4E42"/><path d="M23 33H13a1 1 0 0 1-1-1v-7h12v7a1 1 0 0 1-1 1Z" fill="#F4A261"/><path d="M26 25H10a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1Z" fill="#2A9D8F"/><path d="M22 23h-8v-2h8v2Z" fill="#E9C46A"/><path d="M27 12a9 9 0 0 1-18 0" fill="#3A3A3A"/><path d="M27 12H9" stroke="#3A3A3A" stroke-width="2" stroke-linecap="round"/><path d="M18 20a8 8 0 0 0 8-8h-2a6 6 0 0 1-6 6Zm0 0a8 8 0 0 1-8-8h2a6 6 0 0 0 6 6Z" fill="#6A4E42"/><path d="M16.5 16a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2c.28 0 .5.22.5.5Zm5 0a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2c.28 0 .5.22.5.5Z" fill="#fff"/><path d="M20.5 19a.5.5 0 0 1-5 0" fill="none" stroke="#fff" stroke-linecap="round"/><path d="M14 13h1v1h-1zM21 13h1v1h-1z" fill="#442D24"/><circle cx="18" cy="10" r="10" fill="#3A3A3A"/><path d="M24 10a6 6 0 0 0-12 0" fill="#6A4E42"/></svg>`,
    // 5. Side Shave, Tattoos
    `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" fill="#D7B696"/><path d="M22 23c0 1.11-.89 2-2 2h-8c-1.11 0-2-.89-2-2v-1h12v1Z" fill="#A17C5E"/><path d="M24.5 20a4.5 4.5 0 0 1-9 0h-2a6.5 6.5 0 0 0 13 0h-2Z" fill="#D7B696"/><path d="M27 20H9c-1.66 0-3-1.34-3-3v-2c0-1.66 1.34-3 3-3h18c1.66 0 3 1.34 3 3v2c0 1.66-1.34 3-3 3Z" fill="#D7B696"/><path d="M24 16.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2c.28 0 .5.22.5.5Zm-11 0a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2c.28 0 .5.22.5.5Z" fill="#333"/><path d="M20 25h-4v1h4v-1Z" fill="#A17C5E"/><path d="M25 12V8c0-1.66-1.34-3-3-3H14c-1.66 0-3 1.34-3 3v13h14V12Z" fill="#E91E63"/><path d="M11 21V8c0-1.66-1.34-3-3-3s-3 1.34-3 3v13h6Z" fill="#D7B696"/><path d="M11 8c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1Z" fill="#222"/><path d="M24 23.5l-2.5-1.5-2.5 1.5.95-3-2.45-1.5h3l.95-3 .95 3h3l-2.45 1.5.95 3Z" fill="#111"/><path d="M12.5 25l.5-1.5-1.5-.5.5-1.5-1.5-.5.5-1.5-1.5-.5" stroke="#111" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    // 6. Grill, Snapback
    `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" fill="#8D5524"/><path d="M22 23c0 1.11-.89 2-2 2h-8c-1.11 0-2-.89-2-2v-1h12v1Z" fill="#5D3A1A"/><path d="M24.5 20a4.5 4.5 0 0 1-9 0h-2a6.5 6.5 0 0 0 13 0h-2Z" fill="#8D5524"/><path d="M24 16.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2c.28 0 .5.22.5.5Zm-11 0a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2c.28 0 .5.22.5.5Z" fill="#333"/><path d="M29 15H7c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2h22c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2Z" fill="#D32F2F"/><path d="M17 10h-8c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h8v5Z" fill="#D32F2F"/><path d="M21 25H15v1h6v-1Z" fill="#5D3A1A"/><path d="M21 27H15v2h6v-2Z" fill="#BDBDBD"/><path d="M16 27h-1v2h1v-2Zm2 0h-1v2h1v-2Zm2 0h-1v2h1v-2Zm2 0h-1v2h1v-2Z" fill="#757575"/></svg>`,
    // 7. Bandana, West Coast
    `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" fill="#4E342E"/><path d="M23 23c0 1.11-.89 2-2 2h-1v-1H16v1h-2c-1.11 0-2-.89-2-2v-2h11v2Z" fill="#3E2723"/><path d="M24.5 20a4.5 4.5 0 0 1-9 0h-2a6.5 6.5 0 0 0 13 0h-2Z" fill="#4E342E"/><path d="M24 16.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2c.28 0 .5.22.5.5Zm-11 0a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2c.28 0 .5.22.5.5Z" fill="#fff"/><path d="M22 25h-8v1h8v-1Z" fill="#3E2723"/><path d="M29 11c0-3.87-3.13-7-7-7H14c-3.87 0-7 3.13-7 7v4h22v-4Z" fill="#1565C0"/><path d="M18 11a1.5 1.5 0 0 0 0 3 1.5 1.5 0 0 0 0-3Z" fill="#FFF"/><path d="M22 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="#FFF" opacity=".5"/><path d="M14 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="#FFF" opacity=".5"/><path d="M26 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="#FFF" opacity=".5"/><path d="M10 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="#FFF" opacity=".5"/><path d="M19.5 20a1.5 1.5 0 0 1-3 0" stroke="#fff" stroke-width="1" fill="none" stroke-linecap="round"/></svg>`,
    // 8. Pop Rap Girl
    `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" fill="#FFC0CB"/><path d="M24 33H12a1 1 0 0 1-1-1v-8h14v8a1 1 0 0 1-1 1Z" fill="#FFF"/><path d="M18 24l-4 4h8l-4-4Z" fill="#F06292"/><path d="M27 24H9a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1Z" fill="#90CAF9"/><path d="M29 13c0-4.97-4.03-9-9-9h-4c-4.97 0-9 4.03-9 9v8h22v-8Z" fill="#F06292"/><path d="M27 21H9" fill="#FFC0CB"/><path d="M18 19.5a6.5 6.5 0 0 0 6.5-6.5h-2a4.5 4.5 0 0 1-4.5 4.5Zm0 0a6.5 6.5 0 0 1-6.5-6.5h2a4.5 4.5 0 0 0 4.5 4.5Z" fill="#FFC0CB"/><path d="M13.5 16a.5.5 0 0 1 1 0 .5.5 0 0 1-1 0Zm9 0a.5.5 0 0 1 1 0 .5.5 0 0 1-1 0Z" fill="#333"/><path d="M20.5 18a2.5 2.5 0 0 1-5 0h-1a3.5 3.5 0 0 0 7 0h-1Z" fill="#fff"/></svg>`,
    // 9. Mumble Rap
    `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" fill="#F3E5AB"/><path d="M26 31H10c-1.1 0-2-.9-2-2v-7h20v7c0 1.1-.9 2-2 2Z" fill="#607D8B"/><path d="M30 22H6c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2h24c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2Z" fill="#607D8B"/><path d="M23.5 18a3.5 3.5 0 0 1-7 0h-2a5.5 5.5 0 0 0 11 0h-2Z" fill="#F3E5AB"/><path d="M14.5 16a.5.5 0 0 1-1 0 .5.5 0 0 1 1 0Zm7 0a.5.5 0 0 1-1 0 .5.5 0 0 1 1 0Z" fill="#333"/><path d="M22 25H14v1h8v-1Z" fill="#B0BEC5"/><path d="M26 16H10c-2.21 0-4-1.79-4-4V7c0-1.66 1.34-3 3-3h18c1.66 0 3 1.34 3 3v5c0 2.21-1.79 4-4 4Z" fill="#81C784"/><path d="M12.5 12l2-1 1 2-1-2 2-1" stroke="#333" stroke-width="0.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 10.5a.5.5 0 0 1 1 0 .5.5 0 0 1-1 0Z" fill="#333"/><path d="M24 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" fill="#333"/></svg>`,
    // 10. Drake-like
    `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" fill="#A1887F"/><path d="M24 33H12a1 1 0 0 1-1-1v-8h14v8a1 1 0 0 1-1 1Z" fill="#333"/><path d="M27 24H9a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1Z" fill="#333"/><path d="M22 21h-8v1h8v-1Z" fill="#FFD700"/><path d="M27 12c0-2.76-2.24-5-5-5H14c-2.76 0-5 2.24-5 5v8h18v-8Z" fill="#A1887F"/><path d="M24 16.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2c.28 0 .5.22.5.5Zm-11 0a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2c.28 0 .5.22.5.5Z" fill="#333"/><path d="M20.5 19a.5.5 0 0 1-5 0" fill="none" stroke="#333" stroke-width="0.5" stroke-linecap="round"/><path d="M22 20H14v-2c0-2.21 1.79-4 4-4s4 1.79 4 4v2Z" fill="#795548"/><path d="M21 7h-6a1 1 0 0 0-1 1v2h8V8a1 1 0 0 0-1-1Z" fill="#4E342E"/></svg>`,
    // 11. 90s Queen
    `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" fill="#5D4037"/><path d="M23 23c0 1.11-.89 2-2 2h-8c-1.11 0-2-.89-2-2v-1h12v1Z" fill="#4E342E"/><path d="M27 20H9c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h18c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1Z" fill="#5D4037"/><path d="M22 17H14v1h8v-1Z" fill="#BCAAA4"/><path d="M20.5 19.5a2.5 2.5 0 0 1-5 0" fill="none" stroke="#BCAAA4" stroke-linecap="round"/><path d="M12.5 16a.5.5 0 0 1 1 0 .5.5 0 0 1-1 0Zm11 0a.5.5 0 0 1 1 0 .5.5 0 0 1-1 0Z" fill="#BCAAA4"/><path d="M28 14H8c-2.21 0-4-1.79-4-4s1.79-4 4-4h20c2.21 0 4 1.79 4 4s-1.79 4-4 4Z" fill="#212121"/><path d="M28 27a4 4 0 0 1-8 0h-4a4 4 0 0 1-8 0" fill="none" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/><path d="M28 27v-3h1v3a5 5 0 0 1-10 0v-3h1v3a4 4 0 0 0 8 0Z" fill="#FFD700"/><path d="M8 27v-3H7v3a5 5 0 0 0 10 0v-3H16v3a4 4 0 0 1-8 0Z" fill="#FFD700"/></svg>`,
    // 12. Lyrical Miracle
    `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" fill="#FFE0B2"/><path d="M22 23c0 1.11-.89 2-2 2h-8c-1.11 0-2-.89-2-2v-1h12v1Z" fill="#A1887F"/><path d="M24.5 20a4.5 4.5 0 0 1-9 0h-2a6.5 6.5 0 0 0 13 0h-2Z" fill="#FFE0B2"/><path d="M29 12H7c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h22c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2Z" fill="#455A64"/><path d="M24 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" fill="#333"/><path d="M14 16h8v1h-8v-1Z" stroke="#333" stroke-width="0.5"/><path d="M20.5 19a.5.5 0 0 1-5 0" fill="none" stroke="#333" stroke-width="0.5" stroke-linecap="round"/><path d="M22 25h-8v1h8v-1Z" fill="#A1887F"/></svg>`
];

const ChevronLeftIcon: React.FC = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
);
const ChevronRightIcon: React.FC = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

const CharacterCreationScreen: React.FC = () => {
  const { dispatch } = useGame();
  const [stageName, setStageName] = useState('');
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(() => 
      Math.floor(Math.random() * predefinedAvatars.length)
  );

  const avatarUrl = useMemo(() => {
    const svgString = predefinedAvatars[selectedAvatarIndex];
    // Use btoa for Base64 encoding, which is supported in all target browsers.
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
  }, [selectedAvatarIndex]);
  
  const handleAvatarChange = (direction: 1 | -1) => {
    setSelectedAvatarIndex(prev => {
        let nextIndex = prev + direction;
        if (nextIndex < 0) {
            nextIndex = predefinedAvatars.length - 1;
        } else if (nextIndex >= predefinedAvatars.length) {
            nextIndex = 0;
        }
        return nextIndex;
    });
  };
  
  const handleStartCareer = () => {
    if (stageName.trim() && avatarUrl) {
      dispatch({ type: ActionType.START_GAME, payload: { stageName: stageName.trim(), avatarUrl: avatarUrl } });
    }
  };

  const handleBack = () => {
    dispatch({ type: ActionType.SET_STATUS, payload: GameStatus.MAIN_MENU });
  }

  return (
    <div className="w-full h-full max-w-md mx-auto bg-ios-bg flex flex-col p-6 space-y-6">
      <h1 className="text-3xl font-bold text-ios-label text-center flex-shrink-0">Create Your Rapper</h1>
      
      <div className="flex flex-col items-center space-y-4 flex-shrink-0">
        <div className="flex items-center justify-center space-x-2">
            <button onClick={() => handleAvatarChange(-1)} className="p-2 text-ios-label-secondary hover:text-ios-blue transition-colors rounded-full hover:bg-ios-bg-secondary"><ChevronLeftIcon /></button>
            <div className="w-40 h-40 rounded-full border-4 border-ios-blue bg-ios-bg-secondary flex items-center justify-center overflow-hidden">
                <img 
                  src={avatarUrl} 
                  alt="Selected Avatar" 
                  className="w-full h-full object-cover"
                />
            </div>
            <button onClick={() => handleAvatarChange(1)} className="p-2 text-ios-label-secondary hover:text-ios-blue transition-colors rounded-full hover:bg-ios-bg-secondary"><ChevronRightIcon /></button>
        </div>
        <p className="font-semibold text-ios-label-secondary">{`Style ${selectedAvatarIndex + 1} of ${predefinedAvatars.length}`}</p>
      </div>

      <div className="w-full space-y-4 flex-shrink-0">
        <div>
          <label htmlFor="stageName" className="block text-sm font-medium text-ios-label-secondary mb-2">Stage Name</label>
          <input
            type="text"
            id="stageName"
            value={stageName}
            onChange={(e) => setStageName(e.target.value)}
            placeholder="e.g. MC Flow"
            className="w-full bg-ios-bg-secondary text-ios-label p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-ios-blue focus:outline-none"
          />
        </div>

        <button
          onClick={handleStartCareer}
          disabled={!stageName.trim()}
          className="w-full py-4 bg-ios-blue text-white font-bold rounded-lg shadow-md disabled:bg-ios-gray disabled:cursor-not-allowed transition-colors"
        >
          Start Career
        </button>
        <button
          onClick={handleBack}
          className="w-full py-3 bg-ios-gray text-white font-semibold rounded-lg"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CharacterCreationScreen;
