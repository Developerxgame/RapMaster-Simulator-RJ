import React from 'react';

const SettingsScreen: React.FC = () => {
    const SettingRow: React.FC<{label: string, children: React.ReactNode}> = ({label, children}) => (
        <div className="flex justify-between items-center py-2">
            <span className="text-ios-label">{label}</span>
            <div>{children}</div>
        </div>
    );

    const CreditRow: React.FC<{label: string, value: string}> = ({label, value}) => (
         <div className="flex justify-between items-center py-1 text-sm">
            <span className="text-ios-label-secondary">{label}</span>
            <span className="text-ios-label">{value}</span>
        </div>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            
            <div className="bg-ios-bg-secondary rounded-xl">
                 <div className="p-4 space-y-2">
                    <SettingRow label="Language">
                        <span className="text-ios-label-secondary">English</span>
                    </SettingRow>
                    <div className="border-t border-gray-700 -mx-4"></div>
                     <SettingRow label="Sound">
                        <span className="text-ios-label-secondary">On</span>
                    </SettingRow>
                    <div className="border-t border-gray-700 -mx-4"></div>
                     <SettingRow label="Graphics">
                        <span className="text-ios-label-secondary">High</span>
                    </SettingRow>
                </div>
            </div>

            <div className="bg-ios-bg-secondary p-4 rounded-xl space-y-2">
                <h2 className="text-lg font-semibold text-ios-label mb-2">Credits</h2>
                <CreditRow label="Publisher" value="FHX STUDIOS" />
                <CreditRow label="Concept" value="Fahim" />
                <CreditRow label="Developer" value="Fhx Studios" />
                <CreditRow label="UI/UX" value="Fahim" />
            </div>

             <div className="bg-ios-bg-secondary p-4 rounded-xl space-y-2">
                <h2 className="text-lg font-semibold text-ios-label mb-2">Support Us</h2>
                <a href="#" className="flex justify-between items-center text-ios-blue py-1 text-sm">
                    <span>Twitter (X)</span>
                    <span>@FHX_Studios</span>
                </a>
                <a href="#" className="flex justify-between items-center text-ios-blue py-1 text-sm">
                    <span>Patreon</span>
                    <span>FHX Studios</span>
                </a>
            </div>
        </div>
    );
};

export default SettingsScreen;