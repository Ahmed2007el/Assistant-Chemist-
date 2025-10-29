
import React, { useState, useEffect } from 'react';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Dashboard from './components/Dashboard';
import { getGenAI } from './services/geminiClient';
import Section4 from './components/Section4';

export type SectionId = 'dashboard' | 'expert' | 'search' | 'troubleshoot' | 'locked';

const App: React.FC = () => {
    const [isApiKeyMissing, setIsApiKeyMissing] = useState(false);
    const [activeSection, setActiveSection] = useState<SectionId>('dashboard');

    useEffect(() => {
        try {
            // This will throw an error if process.env.API_KEY is not set.
            getGenAI();
            setIsApiKeyMissing(false);
        } catch (error) {
            console.error(error);
            setIsApiKeyMissing(true);
        }
    }, []);

    const renderContent = () => {
        if (isApiKeyMissing) {
            return (
                 <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 border border-red-500/50 rounded-lg shadow-2xl p-6 sm:p-8 max-w-md w-full text-center">
                        <h2 className="text-xl sm:text-2xl font-bold text-red-400 mb-4">خطأ في الإعداد</h2>
                        <p className="text-gray-400">
                            مفتاح API غير موجود. يرجى التأكد من تكوين متغير البيئة 
                            <code className="bg-gray-700 text-cyan-400 p-1 rounded mx-1 font-mono">API_KEY</code>
                            &nbsp;بشكل صحيح.
                        </p>
                    </div>
                </div>
            );
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
