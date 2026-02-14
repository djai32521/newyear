
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
          container: "border-[12px] border-double border-[#8b1a1a] bg-[#fffcf5] text-[#4a0404]",
          font: "font-brush",
          accent: "#8b1a1a",
          decor: "cloud"
        };
      case 'horse':
        return {
          container: "bg-gradient-to-br from-[#d32f2f] to-[#ff6f00] text-white shadow-2xl",
          font: "font-hahmlet",
          accent: "#ffd700",
          decor: "sun"
        };
      case 'elegant':
        return {
          container: "bg-[#0f172a] text-[#fde68a] border-4 border-[#b45309] shadow-inner",
          font: "font-myeongjo",
          accent: "#b45309",
          decor: "frame"
        };
      case 'warm':
        return {
          container: "bg-[#fff1f2] text-[#9f1239] border-4 border-white shadow-lg",
          font: "font-flower",
          accent: "#fb7185",
          decor: "petal"
        };
      case 'modern':
        return {
          container: "bg-[#f8fafc] text-[#1e293b] border-t-[12px] border-[#2563eb] shadow-2xl",
          font: "font-myeongjo",
          accent: "#2563eb",
          decor: "line"
        };
      case 'minimalist':
        return {
          container: "bg-white text-gray-700 border border-gray-100 shadow-sm",
          font: "font-gowun",
          accent: "#94a3b8",
          decor: "none"
        };
      case 'cartoon':
        return {
          container: "bg-[#fefce8] text-[#1e3a8a] border-4 border-dashed border-[#60a5fa] shadow-lg",
          font: "font-dongle",
          accent: "#60a5fa",
          decor: "star"
        };
      default:
        return {
          container: "bg-white",
          font: "font-main",
          accent: "#000",
          decor: "none"
        };
    }
  };

  const themeStyle = getThemeStyles();

  return (
    <div className="relative w-full max-w-md aspect-[3/4] mx-auto overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-700 transform hover:scale-[1.02]">

      {/* 1. Background Layer */}
      {data.backgroundImageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 scale-105"
          style={{ backgroundImage: `url(${data.backgroundImageUrl})` }}
        />
      ) : (
        <div className={`absolute inset-0 ${themeStyle.container}`} />
      )}

      {/* 2. Artistic Texture Overlay (Hanji pattern) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>

      {/* 3. Thematic Art Decorations */}
      {!isLoading && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {themeStyle.decor === 'cloud' && (
            <>
              <div className="absolute top-4 left-4 w-32 h-32 opacity-20 rotate-[-10deg]">
                <svg viewBox="0 0 100 100" fill="currentColor" className="text-red-900"><path d="M10,50 Q25,30 40,50 T70,50 T90,50" stroke="currentColor" fill="none" strokeWidth="2" /></svg>
              </div>
              <div className="absolute bottom-10 right-[-20px] w-48 h-48 opacity-10">
                <svg viewBox="0 0 100 100" fill="currentColor" className="text-red-800"><circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" strokeWidth="1" strokeDasharray="4 2" /></svg>
              </div>
            </>
          )}
          {themeStyle.decor === 'sun' && (
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/20 blur-3xl rounded-full animate-pulse"></div>
          )}
          {themeStyle.decor === 'petal' && (
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`absolute w-3 h-3 bg-rose-300/40 rounded-full blur-[1px] transform rotate-45 animate-bounce`} style={{ top: `${i * 15}%`, left: `${(i * 23) % 100}%`, animationDelay: `${i * 0.5}s` }}></div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. Content Overlay */}
      <div className={`absolute inset-0 ${data.backgroundImageUrl ? 'bg-gradient-to-b from-black/50 via-black/20 to-black/70' : ''} flex flex-col p-10 md:p-14 justify-between z-10`}>

        {/* Recipient Art Section */}
        <div className="text-center relative">
          {/* 브러쉬 터치 효과 뒤배경 */}
          {!data.backgroundImageUrl && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-12 bg-current opacity-[0.05] rounded-full blur-xl pointer-events-none"></div>
          )}
          <div className={`text-2xl md:text-3xl font-bold tracking-tight mb-2 ${themeStyle.font} ${data.backgroundImageUrl ? 'text-white drop-shadow-lg' : ''}`}>
            {data.recipient ? `${data.recipient} 님께` : "소중한 분께"}
          </div>
          <div className={`h-0.5 w-12 mx-auto rounded-full bg-current opacity-30 mt-2`}></div>
        </div>

        {/* Message Art Section */}
        <div className="relative group">
          <div className={`text-xl md:text-2xl leading-[1.9] md:leading-[2.2] text-center whitespace-pre-wrap ${themeStyle.font} ${data.backgroundImageUrl ? 'text-white drop-shadow-xl font-medium' : ''}`}>
            {isLoading ? (
              <div className="flex justify-center space-x-3 py-10">
                <div className="w-3 h-3 bg-current rounded-full animate-bounce opacity-40" style={{ animationDelay: '0s' }}></div>
                <div className="w-3 h-3 bg-current rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-current rounded-full animate-bounce opacity-40" style={{ animationDelay: '0.4s' }}></div>
              </div>
            ) : (
              data.message || "2026년 새해 복 많이 받으세요!"
            )}
          </div>
          {/* 말풍선/인용구 아트 */}
          {!isLoading && (
            <div className="absolute -top-6 -left-2 text-4xl opacity-10 pointer-events-none select-none">❝</div>
          )}
        </div>

        {/* Sender & Date Art Section */}
        <div className="flex flex-col items-end space-y-3">
          <div className="flex items-center gap-3">
            <p className={`text-xs md:text-sm opacity-60 font-light tracking-[0.3em] ${themeStyle.font} ${data.backgroundImageUrl ? 'text-white' : ''}`}>
              二千二十六年 丙午年
            </p>
            <div className="w-8 h-[1px] bg-current opacity-20"></div>
          </div>

          <div className="relative inline-block">
            <p className={`text-2xl md:text-4xl font-extrabold tracking-widest ${themeStyle.font} ${data.backgroundImageUrl ? 'text-white drop-shadow-2xl' : 'text-current'}`}>
              {data.sender ? `${data.sender} 올림` : "보내는 이"}
            </p>
            {/* 낙관(Stamp) 아트 */}
            {!isLoading && (
              <div className="absolute -right-12 top-0 w-8 h-8 border-2 border-red-600/60 rounded-sm flex items-center justify-center text-[10px] font-bold text-red-600/70 rotate-[15deg] select-none pointer-events-none font-sans">
                <span className="leading-none">誠心<br />謹賀</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Special Decorations */}
      {data.theme === 'traditional' && !isLoading && (
        <div className="absolute top-10 right-10 w-20 h-20 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="fill-current text-red-900">
            <path d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z" />
          </svg>
        </div>
      )}

      {data.theme === 'cartoon' && !isLoading && (
        <div className="absolute top-6 left-6 text-5xl animate-bounce select-none pointer-events-none drop-shadow-md">
          🧧
        </div>
      )}
    </div>
  );
};

export default Card;
