import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

// --- Nav Icons (Outline) ---
export const HomeIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);
export const BriefcaseIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
);
export const MusicNoteIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v-3.75m0-6.553L3 9m7.5 4.5M3 9v3.75a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25V9" />
  </svg>
);
export const GlobeIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.95 9A9.002 9.002 0 0012 3m0 18a9.002 9.002 0 007.95-6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5h18M4.05 6h15.9M4.05 18h15.9" />
    </svg>
);
export const ShoppingCartIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.823-6.837a.75.75 0 00-.73-1.03H5.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18 20.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);
export const ChartBarIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);
export const PuzzleIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);

// --- Nav Icons (Solid) ---
export const HomeIconSolid = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
  </svg>
);
export const BriefcaseIconSolid = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M4.5 3.75A2.25 2.25 0 002.25 6v1.5c0 .552.448 1 1 1h17.5c.552 0 1-.448 1-1V6a2.25 2.25 0 00-2.25-2.25H4.5z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M3.25 10.5a.75.75 0 01.75-.75h16.5a.75.75 0 01.75.75v8.25a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25V10.5zM10 12.75a.75.75 0 00-1.5 0v2.25a.75.75 0 001.5 0v-2.25zM13.5 12.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
);
export const MusicNoteIconSolid = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 00.5.707A9.735 9.735 0 006 21a9.707 9.707 0 005.25-1.533v-1.29a.75.75 0 00-1.5 0v.634a8.23 8.23 0 01-3.75.967 8.25 8.25 0 01-3.75-1.5A.75.75 0 012.25 18V6a.75.75 0 01.75-1.5c1.25 0 2.5.333 3.75 1a.75.75 0 001.5 0V4.533z" />
    <path d="M21.75 3.555A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533V16.5a.75.75 0 001.5 0v-.634a8.23 8.23 0 013.75-.967 8.25 8.25 0 013.75 1.5.75.75 0 00.75.75V5.25a.75.75 0 00-.5-.707z" />
  </svg>
);
export const GlobeIconSolid = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
        <path fillRule="evenodd" d="M.75 12a11.25 11.25 0 0111.25-11.25A11.25 11.25 0 0123.25 12c0 6.213-5.037 11.25-11.25 11.25A11.25 11.25 0 01.75 12zM12 21a9 9 0 100-18 9 9 0 000 18z" clipRule="evenodd" />
    </svg>
);
export const ShoppingCartIconSolid = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.46-7.171.75.75 0 00-.729-.929H9.252a.75.75 0 01-.674-.421L6.168 4.5H3a.75.75 0 00-.75-.75z" />
    <path d="M15.75 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8.25 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);
export const ChartBarIconSolid = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 9a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm3.75-3.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zM12 9a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H12.75a.75.75 0 01-.75-.75V9zm3.75 3.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zM7.5 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H8.25a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
  </svg>
);
export const PuzzleIconSolid = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.75-1.5a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM6 9a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5H6.75A.75.75 0 016 9zm.75 2.25a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM9 6a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5H9.75A.75.75 0 019 6zm.75 2.25a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM9 12a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5H9.75A.75.75 0 019 12zm.75 2.25a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM12 6a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75A.75.75 0 0112 6zm.75 2.25a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm.75 3.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);


// --- UI Icons ---
export const StarIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);
export const UserGroupIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM5.25 9.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zM15 12a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
        <path fillRule="evenodd" d="M1.5 15a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h15a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75H1.5z" clipRule="evenodd" />
    </svg>
);
export const ShieldCheckIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.927 0l-8.25 4.5a.75.75 0 00-.437.695v9.302c0 .414.214.79.558.992l7.75 4.5a.75.75 0 00.866 0l7.75-4.5a.75.75 0 00.558-.992V7.481a.75.75 0 00-.437-.695l-8.25-4.5zM12 9.75a.75.75 0 00-.75.75v4.5a.75.75 0 101.5 0v-4.5a.75.75 0 00-.75-.75z" clipRule="evenodd" />
    </svg>
);
export const CashIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
        <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
);
export const LightningBoltIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
    </svg>
);
export const CalendarIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M5.25 2.25A.75.75 0 016 3v1.5h12V3a.75.75 0 011.5 0v1.5h1.5a3 3 0 013 3v12a3 3 0 01-3-3H3.75a3 3 0 01-3-3v-12a3 3 0 013-3H6V3a.75.75 0 01-.75-.75zM6 6h12v1.5H6V6zm0 3h12v9H6v-9z" clipRule="evenodd" />
    </svg>
);
export const CogIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.26.713.53.954l.976.86c.49.43.823 1.05.823 1.731v2.247c0 .682-.333 1.301-.823 1.731l-.976.86a1.507 1.507 0 01-.53.954l-.213 1.281c-.09.543-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.507 1.507 0 01-.53-.954l-.976-.86c-.49-.43-.823-1.05-.823-1.731v-2.247c0 .682.333-1.301.823-1.731l.976-.86c.27-.24.467-.58.53-.954l.213-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
export const CollectionIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);
export const VideoCameraIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" />
    </svg>
);
export const HeartIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);
export const HeartIconSolid = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.344-.688 15.182 15.182 0 01-2.06-1.717 15.154 15.154 0 01-2.57-2.617c-1.223-1.543-1.92-3.32-1.92-5.117 0-3.11 2.54-5.65 5.65-5.65 1.954 0 3.652 1.01 4.5 2.583 1.04-1.986 2.93-3.235 5.09-3.235 3.22 0 5.84 2.61 5.84 5.84 0 1.79-1.045 3.48-2.67 5.174a15.15 15.15 0 01-4.72 4.311l-.062.042-.018.012-.006.004-.007.003-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
);
export const ChatBubbleIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.257c-.247.017-.49.034-.731.051l-1.48.082a6.736 6.736 0 01-3.465 0l-1.48-.082a12.724 12.724 0 01-.731-.051l-3.722-.257A2.25 2.25 0 013 15.25v-4.286c0-.97.616-1.813 1.5-2.097" />
    </svg>
);
export const SaveIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);
export const RapGramIcon = (props: IconProps) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <radialGradient id="paint0_radial_rapgram" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11.24 59.8) rotate(-58.12) scale(80.58)">
                <stop stopColor="#FEDA77"/>
                <stop offset="0.3" stopColor="#F58529"/>
                <stop offset="0.6" stopColor="#DD2A7B"/>
                <stop offset="1" stopColor="#8134AF"/>
            </radialGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#paint0_radial_rapgram)"/>
        <rect x="7" y="7" width="50" height="50" rx="12" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
        <rect x="14" y="14" width="36" height="36" rx="8" stroke="white" strokeWidth="3"/>
        <circle cx="32" cy="32" r="9" stroke="white" strokeWidth="3"/>
        <circle cx="45" cy="19" r="3" fill="white"/>
    </svg>
);

export const RapifyIcon = (props: IconProps) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="paint0_linear_rapify" x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1ED760"/>
                <stop offset="1" stopColor="#1DB954"/>
            </linearGradient>
            <filter id="shadow_rapify" x="-2" y="-2" width="68" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                <feOffset dy="2"/>
                <feGaussianBlur stdDeviation="2"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
        </defs>
        <g filter="url(#shadow_rapify)">
            <rect width="64" height="64" rx="32" fill="url(#paint0_linear_rapify)"/>
        </g>
        <circle cx="32" cy="32" r="20" fill="#191414" stroke="#121212" strokeWidth="2"/>
        <path d="M23 30.5H41" stroke="white" strokeWidth="4" strokeLinecap="round"/>
        <path d="M23 38.5H35" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);

export const RapTubeIcon = (props: IconProps) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="paint0_linear_raptube" x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF3B30"/>
                <stop offset="1" stopColor="#FF0000"/>
            </linearGradient>
            <filter id="shadow_raptube" x="-2" y="-2" width="68" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                <feOffset dy="2"/>
                <feGaussianBlur stdDeviation="2"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
        </defs>
        <g filter="url(#shadow_raptube)">
            <rect x="4" y="10" width="56" height="44" rx="12" fill="url(#paint0_linear_raptube)"/>
        </g>
        <path d="M28 26L42 32L28 38V26Z" fill="white"/>
    </svg>
);

export const ChevronRightIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);
export const TrashIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);
export const PlayIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
    </svg>
);
export const MegaphoneIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
  );
export const PaintBrushIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v.01M12 8.25v.01M12 12v.01M12 15.75v.01M12 19.5v.01" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.125 4.5v.01M16.125 8.25v.01M16.125 12v.01M16.125 15.75v.01M16.125 19.5v.01" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.875 4.5v.01M7.875 8.25v.01M7.875 12v.01M7.875 15.75v.01M7.875 19.5v.01" />
    </svg>
);