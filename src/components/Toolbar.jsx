import React from 'react';
import { 
  FaBold, 
  FaItalic, 
  FaUnderline, 
  FaAlignLeft, 
  FaAlignCenter, 
  FaAlignRight,
  FaFont
} from 'react-icons/fa';

const Toolbar = () => {
  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const fontSizes = ['1', '2', '3', '4', '5', '6', '7'];

  return (
    <div className="flex items-center space-x-2 p-2">
      <button
        onClick={() => handleFormat('bold')}
        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
        title="Bold"
      >
        <FaBold />
      </button>
      
      <button
        onClick={() => handleFormat('italic')}
        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
        title="Italic"
      >
        <FaItalic />
      </button>
      
      <button
        onClick={() => handleFormat('underline')}
        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
        title="Underline"
      >
        <FaUnderline />
      </button>
      
      <div className="h-6 w-px bg-gray-300 mx-2" /> {/* Divider */}
      
      <button
        onClick={() => handleFormat('justifyLeft')}
        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
        title="Align Left"
      >
        <FaAlignLeft />
      </button>
      
      <button
        onClick={() => handleFormat('justifyCenter')}
        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
        title="Align Center"
      >
        <FaAlignCenter />
      </button>
      
      <button
        onClick={() => handleFormat('justifyRight')}
        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
        title="Align Right"
      >
        <FaAlignRight />
      </button>
      
      <div className="h-6 w-px bg-gray-300 mx-2" /> {/* Divider */}
      
      <div className="flex items-center space-x-1">
        <FaFont className="text-gray-600" />
        <select
          onChange={(e) => handleFormat('fontSize', e.target.value)}
          className="p-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {fontSizes.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Toolbar;