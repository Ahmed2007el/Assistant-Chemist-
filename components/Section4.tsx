

import React from 'react';
import { LockIcon, ArrowRightIcon } from './Icons';

interface SectionProps {
    onBack: () => void;
}


const Section4: React.FC<SectionProps> = ({ onBack }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center bg-gray-800/50 rounded-lg p-4 sm:p-6 shadow-xl border border-gray-700 text-center relative">
             <button onClick={onBack} className="absolute top-4 right-4 text-gray-400 hover:text-white transition z-10 p-2 rounded-full hover:bg-gray-700" title="عودة إلى لوحة التحكم">
                <ArrowRightIcon className="h-6 w-6" />
                <span className="sr-only">عودة إلى لوحة التحكم</span>
            </button>
            <div className="bg-gray-700 p-6 rounded-full mb-4">
                <LockIcon className="h-12 w-12 sm:h-16 sm:h-16" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">القسم الرابع مغلق</h2>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">هذا القسم مخصص للتحديثات المستقبلية. ترقبوا الميزات الجديدة!</p>
        </div>
    );
};

export default Section4;
