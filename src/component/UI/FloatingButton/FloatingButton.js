import React from 'react';
import { Mail } from 'lucide-react';

const FloatingButton = () => {
 return (
   <button 
     className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500 transition-colors"
     onClick={() => console.log('Mail button clicked')}
   >
     <Mail className="w-6 h-6" />
   </button>
 );
};

export default FloatingButton;