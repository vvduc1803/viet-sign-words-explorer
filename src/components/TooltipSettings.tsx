
import React from 'react';
import { Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface TooltipSettingsProps {
  settings: {
    showDescription: boolean;
    showImage: boolean;
    showVideo: boolean;
    showSignVideo: boolean;
  };
  onSettingsChange: (settings: any) => void;
}

const TooltipSettings: React.FC<TooltipSettingsProps> = ({ settings, onSettingsChange }) => {
  const handleToggle = (key: keyof typeof settings) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key]
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300">
          <Settings className="w-4 h-4" />
          <span className="text-sm">Cài đặt hiển thị</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-white border shadow-lg">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 mb-3">Hiển thị trong tooltip</h4>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showDescription}
              onChange={() => handleToggle('showDescription')}
              className="w-4 h-4 text-education-blue"
            />
            <span className="text-sm text-gray-700">Nghĩa</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showImage}
              onChange={() => handleToggle('showImage')}
              className="w-4 h-4 text-education-blue"
            />
            <span className="text-sm text-gray-700">Hình ảnh</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showVideo}
              onChange={() => handleToggle('showVideo')}
              className="w-4 h-4 text-education-blue"
            />
            <span className="text-sm text-gray-700">Video minh họa</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showSignVideo}
              onChange={() => handleToggle('showSignVideo')}
              className="w-4 h-4 text-education-blue"
            />
            <span className="text-sm text-gray-700">Video ngôn ngữ ký hiệu</span>
          </label>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TooltipSettings;
