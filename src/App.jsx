// src/App.jsx
import React, { useState } from 'react';
import { initialTasks } from './tasks';

export default function App() {
  const [step, setStep] = useState(0);
  const [tasks, setTasks] = useState(
    initialTasks.map(task => ({ ...task, checked: false }))
  );

  const handleToggle = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, checked: !task.checked } : task));
  };

  // 특정 서브 카테고리 전체 선택 / 전체 해제 기능
  const handleSelectAllSubCategory = (subCat, currentTasksInStep) => {
    const targetIds = currentTasksInStep
      .filter(task => task.subCategory === subCat)
      .map(task => task.id);

    const isAllChecked = currentTasksInStep
      .filter(task => task.subCategory === subCat)
      .every(task => task.checked);

    setTasks(tasks.map(task => {
      if (targetIds.includes(task.id)) {
        return { ...task, checked: !isAllChecked };
      }
      return task;
    }));
  };

  const resetApp = () => {
    setTasks(initialTasks.map(task => ({ ...task, checked: false })));
    setStep(0);
  };

  const totalRemaining = tasks.filter(task => !task.checked).length;
  const currentTasks = tasks.filter(task => task.step === step);

  // 현재 Step의 메인 카테고리 제목 가져오기 (예: "호빗", "비폴로" 등)
  const currentCategoryTitle = currentTasks.length > 0 ? currentTasks[0].category : '';

  // 현재 Step에 포함된 하위 작업(subCategory)들의 중복 없는 리스트 추출
  const subCategoriesInCurrentStep = [...new Set(currentTasks.map(t => t.subCategory))];

  // --- 1. 메인 시작 화면 ---
  if (step === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 p-6 text-white">
        <div className="text-center space-y-3 mb-12">
          <span className="text-sm font-semibold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full">
            Escape Room Closer
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight">방탈출 카페<br/>마감 체크리스트</h1>
          <p className="text-slate-400 text-sm">매일 안전하고 깔끔한 마감을 위해 단계를 진행해 주세요.</p>
        </div>
        <button 
          onClick={() => setStep(1)}
          className="w-full max-w-sm bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-bold py-5 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all text-xl"
        >
          마감 작업 시작하기 🚀
        </button>
      </div>
    );
  }

  // --- 2. 단계별 마감 체크 화면 (Step 1 ~ 8) ---
  return (
    // 전체 화면을 모바일 뷰포트에 꽉 차게 고정 (스크롤 바운스 방지)
    <div className="fixed inset-0 flex flex-col bg-slate-50 max-w-md mx-auto shadow-2xl h-[100svh] overflow-hidden">
      
      {/* 상단 헤더 고정 (높이 고정) */}
      <header className="flex-shrink-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center z-10 shadow-sm">
        <div>
          <span className="text-xs font-bold text-slate-400 tracking-wider">STEP {step} / 8</span>
          <h2 className="text-xl font-bold text-slate-800">{currentCategoryTitle} 마감</h2>
        </div>
        <button 
          onClick={resetApp}
          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-3 py-2 rounded-xl transition"
        >
          🏠 홈 (리셋)
        </button>
      </header>

      {/* 본문 스크롤 영역: 독립적으로 스크롤이 발생하도록 설정 */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-6 scrollbar-thin">
        {subCategoriesInCurrentStep.map((subCat) => {
          const isGroupAllChecked = currentTasks
            .filter(task => task.subCategory === subCat)
            .every(task => task.checked);

          return (
            <div key={subCat} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              {/* 2번째 카테고리(중분류) 타이틀 바 */}
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  {subCat}
                </h3>
                <button
                  type="button"
                  onClick={() => handleSelectAllSubCategory(subCat, currentTasks)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition ${
                    isGroupAllChecked 
                      ? 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100' 
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {isGroupAllChecked ? '전체 해제' : '전체 선택'}
                </button>
              </div>

              {/* 중분류에 속하는 세부 할일 목록들 */}
              <div className="divide-y divide-slate-100">
                {currentTasks
                  .filter(task => task.subCategory === subCat)
                  .map((task) => (
                    <label 
                      key={task.id} 
                      className={`flex items-start p-4 transition-all cursor-pointer active:bg-slate-50 ${
                        task.checked ? 'bg-emerald-50/40 opacity-50' : ''
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={task.checked} 
                        onChange={() => handleToggle(task.id)}
                        className="mt-0.5 mr-3 h-5 w-5 rounded-md text-emerald-500 focus:ring-emerald-400 border-slate-300 transition"
                      />
                      <p className={`text-sm md:text-base font-medium text-slate-700 ${task.checked ? 'line-through text-slate-400' : ''}`}>
                        {task.text}
                      </p>
                    </label>
                  ))}
              </div>
            </div>
          );
        })}
      </main>

      {/* 하단 고정 바 (높이 고정, 맨 아래 배치) */}
      <footer className="flex-shrink-0 bg-white border-t border-slate-200 p-4 flex flex-col gap-3 shadow-lg z-10">
        <div className="text-center text-xs font-bold text-slate-500 tracking-wide">
          전체 남은 마감 리스트: <span className="text-red-500 text-sm font-extrabold">{totalRemaining}</span>개
        </div>

        <div className="flex justify-between gap-3">
          <button 
            onClick={() => setStep(step - 1)}
            className="flex-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold py-3.5 rounded-xl transition text-sm"
          >
            이전 단계로
          </button>
          
          {step < 8 ? (
            <button 
              onClick={() => setStep(step + 1)}
              className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl transition text-sm shadow-md"
            >
              다음 단계
            </button>
          ) : (
            <button 
              onClick={() => {
                if (totalRemaining > 0) {
                  // 💡 변경된 로직: 체크되지 않은 항목들 중 가장 작은 step(앞쪽 페이지)을 찾습니다.
                  const remainingTasks = tasks.filter(task => !task.checked);
                  const firstIncompleteStep = Math.min(...remainingTasks.map(task => task.step));
                  
                  // 해당 누락 아이템의 카테고리 명칭 찾기
                  const incompleteCategory = remainingTasks.find(t => t.step === firstIncompleteStep)?.category || '';

                  alert(`⚠️ 아직 완료되지 않은 마감 항목이 다른 단계에 ${totalRemaining}개 남아있습니다!\n[STEP ${firstIncompleteStep}: ${incompleteCategory}] 화면으로 이동합니다.`);
                  
                  // 누락된 가장 앞선 페이지 스텝으로 이동 유도
                  setStep(firstIncompleteStep);
                } else {
                  alert("🎉 완벽하게 마감되었습니다! 오늘 하루도 고생 많으셨습니다. 퇴근하십시오!");
                  resetApp();
                }
              }}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 rounded-xl transition text-sm shadow-md"
            >
              최종 마감 완료
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}