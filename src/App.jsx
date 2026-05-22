// src/App.jsx
import React, { useState } from 'react';
import { initialTasks } from './tasks';

export default function App() {
  const [step, setStep] = useState(0);
  const [tasks, setTasks] = useState(
    initialTasks.map(task => ({ ...task, checked: false }))
  );
  
  // 💡 가이드 모달 오픈 및 내부 탭 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('common'); // 'common', 'albino', 'macao'

  const handleToggle = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, checked: !task.checked } : task));
  };

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
  const currentCategoryTitle = currentTasks.length > 0 ? currentTasks[0].category : '';
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
    <div className="fixed inset-0 flex flex-col bg-slate-50 max-w-md mx-auto shadow-2xl h-[100svh] overflow-hidden">
      
      {/* 상단 헤더 고정 */}
      <header className="flex-shrink-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center z-10 shadow-sm">
        <div>
          <span className="text-xs font-bold text-slate-400 tracking-wider">STEP {step} / 8</span>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-800">{currentCategoryTitle} 마감</h2>
            {/* 💡 장치 리셋 가이드 모달 오픈 버튼 (6, 7, 8단계가 아닐 때만 노출) */}
            {step <= 5 && (
              <button
                onClick={() => {
                  // 현재 스텝에 맞는 탭을 기본값으로 열어주기
                  if (step === 4) setActiveTab('albino');
                  else if (step === 3) setActiveTab('macao');
                  else setActiveTab('common');
                  setIsModalOpen(true);
                }}
                className="text-xs bg-amber-500 hover:bg-amber-600 text-white font-bold px-2 py-1 rounded-lg transition shadow-sm animate-pulse"
              >
                ❓ 가이드
              </button>
            )}
          </div>
        </div>
        <button 
          onClick={resetApp}
          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-3 py-2 rounded-xl transition"
        >
          🏠 홈 (리셋)
        </button>
      </header>

      {/* 본문 스크롤 영역 */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-6 scrollbar-thin">
        {subCategoriesInCurrentStep.map((subCat) => {
          const isGroupAllChecked = currentTasks
            .filter(task => task.subCategory === subCat)
            .every(task => task.checked);

          return (
            <div key={subCat} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
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

      {/* 하단 고정 바 */}
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
                  const remainingTasks = tasks.filter(task => !task.checked);
                  const firstIncompleteStep = Math.min(...remainingTasks.map(task => task.step));
                  const incompleteCategory = remainingTasks.find(t => t.step === firstIncompleteStep)?.category || '';

                  alert(`⚠️ 아직 완료되지 않은 마감 항목이 다른 단계에 ${totalRemaining}개 남아있습니다!\n[STEP ${firstIncompleteStep}: ${incompleteCategory}] 화면으로 이동합니다.`);
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

      {/* 💡 팝업 모달 (Modal) UI 레이어 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            
            {/* 모달 상단 헤더 */}
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
              <h3 className="font-extrabold text-lg"> 마그네틱/서랍 개방 매뉴얼</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white font-bold text-sm bg-slate-800 px-3 py-1 rounded-xl transition"
              >
                닫기
              </button>
            </div>

            {/* 모달 탭 바 */}
            <div className="flex bg-slate-100 p-1 border-b border-slate-200">
              <button
                onClick={() => setActiveTab('common')}
                className={`flex-1 text-center text-xs font-bold py-2 rounded-xl transition ${
                  activeTab === 'common' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                호빗/레테/비폴로
              </button>
              <button
                onClick={() => setActiveTab('albino')}
                className={`flex-1 text-center text-xs font-bold py-2 rounded-xl transition ${
                  activeTab === 'albino' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                알비노
              </button>
              <button
                onClick={() => setActiveTab('macao')}
                className={`flex-1 text-center text-xs font-bold py-2 rounded-xl transition ${
                  activeTab === 'macao' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                마카오
              </button>
            </div>

            {/* 모달 내부 콘텐츠 (스크롤 가능 영역) */}
            <div className="flex-1 overflow-y-auto p-4 text-sm text-slate-700 space-y-4 leading-relaxed">
              
              {/* 탭 1: 공통 테마 */}
              {activeTab === 'common' && (
                <div className="space-y-3">
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-600 font-medium">
                    <li>단계 이름 옆 숫자 <span className="text-amber-600 font-bold">1번</span>을 꾹 눌러 재진입한다.</li>
                    <li>마지막 문제까지 단계 이름을 눌러서 풀어준다.</li>
                    <li>전부 열림</li>
                  </ul>
                </div>
              )}

              {/* 탭 2: 알비노 */}
              {activeTab === 'albino' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">1. E 서랍 여는법</span>
                    <p className="text-slate-600 font-medium">키패드에 <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono font-bold">B 9835 B</span> 입력 ➡️ 열림</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">2. D 서랍 여는법</span>
                    <p className="text-slate-600 font-medium">키패드에 <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono font-bold">D 112617 D</span> 입력 ➡️ 열림</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">3. 중문 (SSCP) 여는법</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 font-medium">
                      <li>SSCP_switch 옆 <span className="text-amber-600 font-bold">7번</span>을 꾹 눌러 재진입한다.</li>
                      <li>단계이름(SSCP_switch)을 눌러 넘긴다.</li>
                      <li>열린다.</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">4. A파일 나오는 곳 서랍 여는 방법</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 font-medium">
                      <li>FinalStage 옆 <span className="text-amber-600 font-bold">12번</span>을 꾹 눌러 재진입한다.</li>
                      <li>영상이 끝날 때까지 기다린다. ➡️ 열린다.</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 text-red-700 p-3 rounded-xl border border-red-200 text-xs font-bold">
                    ⚠️ 경고: 이 때 8645 정답이 맞춰져 있으면 엔딩이 나서 A파일을 꺼낼 수 없습니다!
                  </div>
                </div>
              )}

              {/* 탭 3: 마카오 */}
              {activeTab === 'macao' && (
                <div className="space-y-3">
                  <div className="border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 block">1. mgf 노란종이 서랍</span>
                    <p className="text-slate-600 text-xs font-medium">Sunglass 옆 <span className="text-amber-600 font-bold">2번</span> 꾹 눌러 재진입 ➡️ <span className="font-mono font-bold text-slate-900">8523</span> 정답 입력</p>
                  </div>

                  <div className="border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 block">2. 미닫이 문</span>
                    <p className="text-slate-600 text-xs font-medium">TAG3 옆 <span className="text-amber-600 font-bold">6번</span> 꾹 눌러 재진입 ➡️ 5초 기다린 후 직접 밀어 열기</p>
                  </div>

                  <div className="border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 block">3. 첫번째방 편지 넣는 왼쪽 서랍</span>
                    <p className="text-slate-600 text-xs font-medium">오른쪽 자물쇠(<span className="font-mono font-bold">4283</span>) 오픈 ➡️ 스위치 조작 정답 매칭  <br/>[ (오)상상중 / (왼)하중하 ] ➡️ 열림</p>
                  </div>

                  <div className="border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 block">4. 책상 오른쪽 키패드 서랍</span>
                    <p className="text-slate-600 text-xs font-medium">키패드에 <span className="bg-slate-100 font-mono px-1.5 py-0.5 rounded font-bold">5947#</span> 입력 ➡️ 열림</p>
                  </div>

                  <div className="border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 block">5. 카메라 서랍</span>
                    <p className="text-slate-600 text-xs font-medium">Camera 단계 옆 <span className="text-amber-600 font-bold">10번</span> 꾹 눌러 재진입 ➡️ 약 30초 대기 후 자동 개방</p>
                    <div className="bg-amber-50 text-amber-800 text-[11px] p-2 rounded-lg border border-amber-200 mt-1 font-bold">
                      ※ 주의: 4283 서랍이 열려있으면 카메라 진입 불가! <br/>서랍을 닫아두어야 합니다.
                    </div>
                  </div>

                  <div className="border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 block">6. 마지막 방 문</span>
                    <p className="text-slate-600 text-xs font-medium">TAG4 옆 <span className="text-amber-600 font-bold">13번</span> 꾹 눌러 재진입  <br/>➡️ 약 30초 대기 후 자동 개방 (CCTV 확인 가능)</p>
                  </div>

                  <div className="border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 block">7. USB 서랍</span>
                    <p className="text-slate-600 text-xs font-medium">USB 단계 옆 <span className="text-amber-600 font-bold">15번</span> 꾹 눌러 재진입 ➡️ 열림</p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900 block">8. 에코얼리스 서랍 (책상 아래 파일)</span>
                    <p className="text-slate-600 text-xs font-medium">Eco-Uliss 단계 옆 <span className="text-amber-600 font-bold">18번</span> 꾹 눌러 재진입 ➡️ 열림</p>
                  </div>
                </div>
              )}

            </div>

            {/* 모달 하단 푸터 고정 */}
            <div className="bg-slate-50 border-t border-slate-200 p-3.5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition text-sm"
              >
                가이드 확인 완료 닫기
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}