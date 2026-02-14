
import React, { useState, useEffect } from 'react';
import { CardData, CardTheme, CardPreset } from './types';
import { THEMES, PRESETS } from './constants';
import { generateNewYearMessage, generateCardBackground } from './services/gemini';
import Card from './components/Card';

const App: React.FC = () => {
  const [cardData, setCardData] = useState<CardData>({
    recipient: PRESETS[0].recipient,
    message: PRESETS[0].message,
    sender: PRESETS[0].sender,
    theme: PRESETS[0].theme,
    backgroundImageUrl: null
  });

  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  useEffect(() => {
    handleGenerateImage();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const handleThemeChange = (theme: CardTheme) => {
    setCardData(prev => ({ ...prev, theme }));
  };

  const applyPreset = async (preset: CardPreset) => {
    setCardData({
      recipient: preset.recipient,
      message: preset.message,
      sender: preset.sender,
      theme: preset.theme,
      backgroundImageUrl: null
    });
    // 프리셋 적용 시 배경 자동 생성 시도
    setIsLoadingImage(true);
    const imgUrl = await generateCardBackground(preset.theme);
    setCardData(prev => ({ ...prev, backgroundImageUrl: imgUrl }));
    setIsLoadingImage(false);
  };

  const handleGenerateMessage = async () => {
    if (!cardData.recipient || !cardData.sender) {
      alert("받는 분과 보내는 분의 성함을 입력해주세요!");
      return;
    }
    setIsLoadingMessage(true);
    const msg = await generateNewYearMessage(cardData.recipient, cardData.sender, cardData.theme);
    setCardData(prev => ({ ...prev, message: msg }));
    setIsLoadingMessage(false);
  };

  const handleGenerateImage = async () => {
    setIsLoadingImage(true);
    const imgUrl = await generateCardBackground(cardData.theme);
    if (imgUrl) {
      setCardData(prev => ({ ...prev, backgroundImageUrl: imgUrl }));
    }
    setIsLoadingImage(false);
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-red-100 font-main">
      <header className="bg-red-950 text-white py-16 md:py-24 px-4 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-title tracking-tighter mb-4 drop-shadow-2xl">2026 병오년</h1>
          <p className="text-red-200 text-xl font-gowun font-medium max-w-2xl mx-auto leading-relaxed">
            기운찬 붉은 말의 해, AI 아트로 전하는 따뜻한 진심.<br />
            소중한 분들께 특별한 감동을 선물하세요.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto -mt-12 md:-mt-16 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-20">
        {/* Editor & Samples (Left) */}
        <div className="lg:col-span-7 space-y-8">

          {/* Quick Presets Section */}
          <section className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
              <span className="mr-3 bg-orange-100 p-2 rounded-lg text-orange-600 text-sm font-bold uppercase">Ready-to-use</span>
              빠른 완성 샘플
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p)}
                  className="group relative flex flex-col items-center p-4 rounded-2xl border-2 border-gray-50 hover:border-red-400 hover:bg-red-50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="text-3xl mb-2 group-hover:scale-125 transition-transform">{p.title.split(' ')[0]}</div>
                  <div className="text-xs font-bold text-gray-700 text-center leading-tight">{p.title.split(' ')[1]}</div>
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-400 text-center">원하는 상황을 클릭하면 문구와 테마가 즉시 적용됩니다.</p>
          </section>

          {/* Configuration Section */}
          <section className="bg-white rounded-3xl shadow-xl p-8 space-y-10 border border-gray-100">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
                <span className="mr-3 bg-red-100 p-2 rounded-lg text-red-600">🎨</span> 테마 디테일
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id)}
                    className={`py-3 px-1 rounded-xl border-2 transition-all duration-300 text-xs font-bold ${cardData.theme === t.id
                        ? 'border-red-600 bg-red-600 text-white shadow-lg'
                        : 'border-gray-50 bg-gray-50 hover:border-red-200 text-gray-500'
                      }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <button
                onClick={handleGenerateImage}
                disabled={isLoadingImage}
                className="mt-6 w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center disabled:opacity-50"
              >
                {isLoadingImage ? (
                  <span className="flex items-center"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div> 예술가 AI가 배경 작업 중...</span>
                ) : (
                  <>✨ 테마에 맞춘 AI 배경 새로고침</>
                )}
              </button>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
                <span className="mr-3 bg-red-100 p-2 rounded-lg text-red-600">✍️</span> 텍스트 편집
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Recipient</label>
                  <input
                    type="text"
                    name="recipient"
                    value={cardData.recipient}
                    onChange={handleInputChange}
                    placeholder="누구에게 보낼까요?"
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white transition-all outline-none text-base font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Sender</label>
                  <input
                    type="text"
                    name="sender"
                    value={cardData.sender}
                    onChange={handleInputChange}
                    placeholder="보내는 사람"
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white transition-all outline-none text-base font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Message</label>
                <textarea
                  name="message"
                  value={cardData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white transition-all outline-none resize-none text-lg font-gowun leading-relaxed shadow-inner"
                />
                <button
                  onClick={handleGenerateMessage}
                  disabled={isLoadingMessage}
                  className="mt-4 w-full py-4 bg-red-50 hover:bg-red-100 text-red-800 rounded-2xl font-bold border-2 border-red-100 transition-all flex items-center justify-center gap-3 group"
                >
                  <span className="group-hover:rotate-12 transition-transform">🪄</span>
                  {isLoadingMessage ? "AI가 문장을 다듬고 있어요..." : "AI에게 문구 추천 받기 (현재 입력 기반)"}
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Preview (Right - Sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-10 space-y-6">
          <div className="bg-slate-900 p-6 rounded-t-[2.5rem] flex justify-between items-center">
            <h2 className="font-bold text-amber-500 text-xs tracking-widest uppercase">Byeong-Oh-Nyeon 2026</h2>
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="bg-white p-8 md:p-12 rounded-b-[2.5rem] shadow-2xl border-x border-b border-gray-100">
            <Card data={cardData} isLoading={isLoadingMessage} />

            <div className="mt-12 space-y-4">
              <button
                onClick={() => alert("스크린샷(캡처)을 통해 카드를 저장해 보세요!")}
                className="w-full bg-red-800 hover:bg-red-900 text-white font-title text-2xl py-5 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                카드 이미지 저장
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("연하장 만들기 링크가 복사되었습니다!");
                }}
                className="w-full bg-white border-2 border-gray-200 hover:border-red-500 hover:text-red-700 text-gray-700 font-bold py-4 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-3"
              >
                링크 복사해서 공유하기
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-32 text-center pb-20 opacity-60 hover:opacity-100 transition-opacity">
        <div className="flex justify-center gap-4 mb-6">
          <span className="w-2 h-2 rounded-full bg-red-800"></span>
          <span className="w-2 h-2 rounded-full bg-red-600"></span>
          <span className="w-2 h-2 rounded-full bg-red-400"></span>
        </div>
        <p className="text-gray-600 font-gowun text-lg px-4">
          당신의 마음이 붉은 말처럼 힘차게 전달되길 바랍니다.<br />
          <span className="text-sm font-sans mt-2 block">© 2026 AI New Year Card Service</span>
        </p>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default App;
