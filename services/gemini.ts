
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { CardTheme } from '../types';
import { deobfuscate } from '../utils/crypto';

const getAI = () => new GoogleGenAI({ apiKey: deobfuscate(process.env.API_KEY || '') });

/**
 * AI로 상황에 맞는 새해 인사말을 생성합니다.
 */
export const generateNewYearMessage = async (recipient: string, sender: string, theme: CardTheme): Promise<string> => {
  const ai = getAI();
  const prompt = `
    2026년 병오년(붉은 말의 해) 새해 연하장에 들어갈 인사말을 작성해줘.
    받는 사람: ${recipient}
    보내는 사람: ${sender}
    테마: ${theme}
    조건:
    1. 한국어 정중한 표현을 사용할 것. 만약 테마가 'cartoon'이면 조금 더 발랄하고 친근한 말투를 사용할 것.
    2. 너무 길지 않게(150자 내외) 작성할 것.
    3. '2026년', '병오년', '붉은 말' 같은 키워드를 적절히 섞어줘.
    4. 오직 인사말 텍스트만 출력해줘.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "인사말 생성에 실패했습니다. 다시 시도해 주세요.";
  } catch (error) {
    console.error("Gemini Text Error:", error);
    return "새해 복 많이 받으시고 건강한 2026년 되세요!";
  }
};

/**
 * AI로 연하장 배경 이미지를 생성합니다.
 */
export const generateCardBackground = async (theme: CardTheme): Promise<string | null> => {
  const ai = getAI();
  let themePrompt = "";

  switch (theme) {
    case 'traditional':
      themePrompt = "Traditional Korean painting style, Hanbok patterns, soft watercolor mountains and pine trees, festive red and gold accents, high quality, artistic.";
      break;
    case 'horse':
      themePrompt = "A majestic, artistic red horse running through a sunrise, 2026 Year of the Red Horse theme, dynamic energy, warm light, stylized illustration.";
      break;
    case 'modern':
      themePrompt = "Modern minimalist abstract art for New Year 2026, sunrise horizon, clean lines, professional graphic design style, elegant typography background.";
      break;
    case 'minimalist':
      themePrompt = "Ultra minimalist aesthetic, soft cream background, a single blooming plum flower branch, Zen style, peaceful, high end design.";
      break;
    case 'elegant':
      themePrompt = "Luxurious black and gold background, New Year celebration theme, sparkles, premium abstract patterns, elegant and sophisticated.";
      break;
    case 'warm':
      themePrompt = "Soft pastel colors, cozy winter home scene, warm fireplace, cute small decorations, New Year atmosphere, gentle and friendly illustration.";
      break;
    case 'cartoon':
      themePrompt = "Vibrant 2D cartoon style, a cute smiling red horse character, fireworks, bright colors, bold outlines, webtoon aesthetic, fun and energetic for 2026.";
      break;
  }

  const fullPrompt = `Create a beautiful background for a New Year's card. Style: ${themePrompt} Aspect ratio 4:3, no text, no characters, empty space for message overlay.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ text: fullPrompt }],
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Error:", error);
    return null;
  }
};
