// src/components/ImageModal.jsx
import { useState } from 'react';
import answerKeyImage from '../assets/각방정답코드.png';

export default function ImageModal({ onClose }) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">

        {/* 상단바 */}
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center flex-shrink-0 z-20">
          <h3 className="font-extrabold text-base flex items-center gap-1.5">
            📸 각 방 정답코드 스크린샷
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-bold text-sm bg-slate-800 px-3 py-1 rounded-xl transition"
          >
            닫기
          </button>
        </div>

        {/* 캡션 */}
        {!isZoomed && (
          <div className="bg-slate-950 text-center p-2.5 border-b border-slate-800 flex-shrink-0 z-10">
            <p className="text-[11px] text-slate-400 select-none">
              🔍 글씨가 작나요? 이미지를{' '}
              <span className="text-sky-300 font-bold">터치</span>하면 1.5배 크게 확대됩니다.
            </p>
          </div>
        )}

        {/* 이미지 영역 */}
        <div
          className={`flex-1 bg-slate-950 p-2 overflow-hidden relative ${
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <div
            className={`w-full h-full ${
              isZoomed ? 'overflow-auto' : 'flex items-center justify-center'
            } scrollbar-thin scrollbar-thumb-slate-700`}
          >
            <img
              src={answerKeyImage}
              alt="각방 정답코드"
              className={`rounded-xl object-contain h-auto transition-all duration-300 ${
                isZoomed
                  ? 'w-[150%] max-w-none max-h-none py-10 px-4 origin-top-left'
                  : 'w-full max-h-[55vh]'
              }`}
            />
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="bg-slate-50 border-t border-slate-200 p-3.5 flex-shrink-0 z-20">
          <button
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition text-sm"
          >
            정답표 닫기
          </button>
        </div>

      </div>
    </div>
  );
}