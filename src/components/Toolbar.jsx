import React from 'react';
import { 
  FaBold, 
  FaItalic, 
  FaUnderline, 
  FaAlignLeft, 
  FaAlignCenter, 
  FaAlignRight,
  FaFont,
  FaLock,
  FaUnlock
} from 'react-icons/fa';

const Toolbar = ({ onEncryptNote, onDecryptNote }) => {
  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const fontSizes = ['1', '2', '3', '4', '5', '6', '7'];

  return (
    <div className="flex items-center space-x-1 md:space-x-2 p-2 overflow-x-auto">
      {/* Make buttons smaller on mobile */}
      <button
        onClick={() => handleFormat('bold')}
        className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 text-sm md:text-base"
        title="Bold"
      >
        <FaBold />
      </button>
      
      <button
        onClick={() => handleFormat('italic')}
        className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 text-sm md:text-base"
        title="Italic"
      >
        <FaItalic />
      </button>
      
      <button
        onClick={() => handleFormat('underline')}
        className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 text-sm md:text-base"
        title="Underline"
      >
        <FaUnderline />
      </button>
      
      <div className="h-6 w-px bg-gray-300 mx-1 md:mx-2 shrink-0" /> {/* Divider */}
      
      <button
        onClick={() => handleFormat('justifyLeft')}
        className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 text-sm md:text-base"
        title="Align Left"
      >
        <FaAlignLeft />
      </button>
      
      <button
        onClick={() => handleFormat('justifyCenter')}
        className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 text-sm md:text-base"
        title="Align Center"
      >
        <FaAlignCenter />
      </button>
      
      <button
        onClick={() => handleFormat('justifyRight')}
        className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 text-sm md:text-base"
        title="Align Right"
      >
        <FaAlignRight />
      </button>
      
      <div className="h-6 w-px bg-gray-300 mx-1 md:mx-2 shrink-0" /> {/* Divider */}
      
      <div className="flex items-center space-x-1 shrink-0">
        <FaFont className="text-gray-600 text-sm md:text-base" />
        <select
          onChange={(e) => handleFormat('fontSize', e.target.value)}
          className="p-1 border rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {fontSizes.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      
      <div className="h-6 w-px bg-gray-300 mx-1 md:mx-2" />
      
      <button
        onClick={() => {
          console.log('Encrypt button clicked'); // Add this for debugging
          onEncryptNote();
        }}
        className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 text-sm md:text-base"
        title="Encrypt Note"
      >
        <FaLock />
      </button>
      
      <button
        onClick={() => {
          console.log('Decrypt button clicked'); // Add this for debugging
          onDecryptNote();
        }}
        className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 text-sm md:text-base"
        title="Decrypt Note"
      >
        <FaUnlock />
      </button>
    </div>
  );
};

export default Toolbar;