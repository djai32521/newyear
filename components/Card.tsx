
import React from 'react';
import { CardData } from '../types';

interface CardProps {
  data: CardData;
  isLoading: boolean;
}

const Card: React.FC<CardProps> = ({ data, isLoading }) => {
  const getThemeStyles = () => {
    switch (data.theme) {
      case 'traditional':
        return {
          container: "border-8 border-double border-red-800 bg-[#fff9f0] text-red-900",
          font: "font-song"
        };
      case 'horse':
        return {
          container: "bg-gradient-to-br from-red-600 to-orange-500 text-white shadow-xl",
          font: "font-gowun"
        };
      case 'elegant':
        return {
          container: "bg-slate-900 text-amber-200 border-4 border-amber-500 shadow-2xl",
          font: "font-myeongjo"
        };
      case 'warm':
        return {
          container: "bg-rose-50 text-rose-800 border-4 border-white shadow-lg",
          font: "font-gowun"
        };
      case 'modern':
        return {
          container: "bg-slate-100 text-slate-800 border-t-8 border-blue-600 shadow-xl",
          font: "font-myeongjo"
        };
      case 'minimalist':
        return {
          container: "bg-white text-gray-700 border border-gray-100 shadow-sm",
          font: "font-gowun"
        };
      case 'cartoon':
        return {
          container: "bg-yellow-100 text-blue-900 border-4 border-dashed border-blue-400 shadow-lg",
          font: "font-title" // Black Han Sans를 만화풍 폰트로 활용
        };
      default:
        return {
          container: "bg-white",
          font: "font-main"
        };
    }
  };

  const themeStyle = getThemeStyles();

  return (
    <div className="relative w-full max-w-md aspect-[3/4] mx-auto overflow-hidden rounded-2xl shadow-2xl transition-all duration-700 transform hover:scale-[1.03]">
      {/* Background Image Layer */}
      {data.backgroundImageUrl ? (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 scale-105"
          style={{ backgroundImage: `url(${data.backgroundImageUrl})` }}
        />
      ) : (
        <div className={`absolute inset-0 ${themeStyle.container}`} />
      )}

      {/* Content Overlay */}
      <div className={`absolute inset-0 ${data.backgroundImageUrl ? 'bg-black/30' : ''} flex flex-col p-10 md:p-14 justify-between z-10`}>
        <div className="text-center space-y-8">
          <div className={`text-xl md:text-2xl font-bold tracking-tight opacity-95 ${themeStyle.font}`}>
            {data.recipient ? `${data.recipient} 님께` : "소중한 분께"}
          </div>
          
          <div className={`text-lg md:text-xl leading-relaxed whitespace-pre-wrap ${themeStyle.font} ${data.backgroundImageUrl ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : ''}`}>
            {isLoading ? (
              <div className="flex justify-center space-x-3 py-4">
                <div className="w-2.5 h-2.5 bg-current rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                <div className="w-2.5 h-2.5 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2.5 h-2.5 bg-current rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            ) : (
              data.message || "2026년 새해 복 많이 받으세요!"
            )}
          </div>
        </div>

        <div className="text-right">
          <p className={`text-sm opacity-80 mb-2 font-light ${themeStyle.font}`}>2026년 병오년 새해 아침</p>
          <p className={`text-xl font-bold tracking-wider ${themeStyle.font}`}>
            {data.sender ? `${data.sender} 올림` : "보내는 이"}
          </p>
        </div>
      </div>

      {/* Decorations */}
      {(data.theme === 'traditional' || data.theme === 'horse' || data.theme === 'elegant') && !isLoading && (
        <div className="absolute top-6 right-6 w-14 h-14 border-4 border-current/20 rounded-sm flex items-center justify-center text-xl font-bold rotate-12 select-none pointer-events-none opacity-40 font-song">
          福
        </div>
      )}
      
      {data.theme === 'cartoon' && !isLoading && (
        <div className="absolute top-4 left-4 text-4xl animate-pulse select-none">
          ✨
        </div>
      )}
    </div>
  );
};

export default Card;
