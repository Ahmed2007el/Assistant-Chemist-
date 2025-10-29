
import React, { useState, useEffect } from 'react';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Dashboard from './components/Dashboard';
import { initializeGenAI } from './services/geminiClient';
import Section4 from './components/Section4';
import ApiKeyModal from './components/ApiKeyModal';

export type SectionId = 'dashboard' | 'expert' | 'search' | 'troubleshoot' | 'locked';

const API_KEY_STORAGE_KEY = 'google_ai_api_key';

const App: React.FC = () => {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [isKeyChecked, setIsKeyChecked] = useState(false);
    const [activeSection, setActiveSection] = useState<SectionId>('dashboard');

    useEffect(() => {
        const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
        if (storedApiKey) {
            handleApiKeySubmit(storedApiKey);
        } else if (process.env.API_KEY) {
            // As a fallback, check for an environment variable.
            handleApiKeySubmit(process.env.API_KEY);
        }
        setIsKeyChecked(true);
    }, []);

    const handleApiKeySubmit = (key: string) => {
        try {
            initializeGenAI(key);
            setApiKey(key);
            localStorage.setItem(API_KEY_STORAGE_KEY, key);
        } catch (error) {
            console.error("Failed to set API key:", error);
            // This could happen if the key is invalid, but we'll let the user proceed
            // and they will see errors on API calls.
        }
    };
    
    const renderContent = () => {
        if (!isKeyChecked) {
            return null; // Or a loading spinner
        }

        if (!apiKey) {
            return <ApiKeyModal onApiKeySubmit={handleApiKeySubmit} />;
        }

        switch (activeSection) {
            case 'expert':
                return <Section1 onBack={() => setActiveSection('dashboard')} />;
            case 'search':
                return <Section2 onBack={() => setActiveSection('dashboard')} />;
            case 'troubleshoot':
                return <Section3 onBack={() => setActiveSection('dashboard')} />;
            case 'locked':
                 return <Section4 onBack={() => setActiveSection('dashboard')} />;
            case 'dashboard':
            default:
                return <Dashboard onSectionSelect={(section) => setActiveSection(section)} />;
        }
    };
    
    const isDashboard = activeSection === 'dashboard';

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-cyan-900/20 opacity-50 z-0"></div>
            <main className={`w-full max-w-7xl mx-auto relative z-10 ${isDashboard ? 'p-4 sm:py-8' : 'h-screen p-2 sm:p-4'}`}>
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
