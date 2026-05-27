// src/pages/ChecklistPage.jsx
import { useState } from 'react';
import GuideModal from '../components/GuideModal';
import ImageModal from '../components/ImageModal';

export default function ChecklistPage({ step, setStep, tasks, setTasks, resetApp }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('common');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleToggle = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, checked: !task.checked } : task)));
  };

  const handleSelectAllSubCategory = (subCat, currentTasksInStep) => {
    const targetIds = currentTasksInStep
      .filter((task) => task.subCategory === subCat)
      .map((task) => task.id);

    const isAllChecked = currentTasksInStep
      .filter((task) => task.subCategory === subCat)
      .every((task) => task.checked);

    setTasks(
      tasks.map((task) => {
        if (targetIds.includes(task.id)) {
          return { ...task, checked: !isAllChecked };
        }
        return task;
      })
    );
  };

  const totalRemaining = tasks.filter((task) => !task.checked).length;
  const currentTasks = tasks.filter((task) => task.step === step);
  const currentCategoryTitle = currentTasks.length > 0 ? currentTasks[0].category : '';
  const subCategoriesInCurrentStep = [...new Set(currentTasks.map((t) => t.subCategory))];

  const handleOpenGuide = () => {
    if (step === 4) setActiveTab('albino');
    else if (step === 3) setActiveTab('macao');
    else setActiveTab('common');
    setIsModalOpen(true);
  };

  const handleFinalComplete = () => {
    if (totalRemaining > 0) {
      const remainingTasks = tasks.filter((task) => !task.checked);
      const firstIncompleteStep = Math.min(...remainingTasks.map((task) => task.step));
      const incompleteCategory =
        remainingTasks.find((t) => t.step === firstIncompleteStep)?.category || '';
      alert(
        `⚠️ 아직 완료되지 않은 마감 항목이 다른 단계에 ${totalRemaining}개 남아있습니다!\n[STEP ${firstIncompleteStep}: ${incompleteCategory}] 화면으로 이동합니다.`
      );
      setStep(firstIncompleteStep);
    } else {
      alert('🎉 완벽하게 마감되었습니다! 오늘 하루도 고생 많으셨습니다. 퇴근하십시오!');
      resetApp();
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-50 max-w-md mx-auto shadow-2xl h-[100svh] overflow-hidden">

      {/* 상단 헤더 */}
      <header className="flex-shrink-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center z-10 shadow-sm">
        <div>
          <span className="text-xs font-bold text-slate-400 tracking-wider">STEP {step} / 8</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <h2 className="text-xl font-bold text-slate-800 mr-1">{currentCategoryTitle}</h2>

            {step <= 5 && (
              <div className="flex gap-1">
                <button
                  onClick={handleOpenGuide}
                  className="text-[11px] bg-amber-500 hover:bg-amber-600 text-white font-bold px-2 py-1 rounded-lg transition shadow-sm whitespace-nowrap"
                >
                  ❓ 가이드
                </button>
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="text-[11px] bg-sky-500 hover:bg-sky-600 text-white font-bold px-2 py-1 rounded-lg transition shadow-sm whitespace-nowrap"
                >
                  📸 정답표
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={resetApp}
          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-3 py-2 rounded-xl transition flex-shrink-0"
        >
          🏠 홈 (리셋)
        </button>
      </header>

      {/* 본문 */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-6 scrollbar-thin">
        {subCategoriesInCurrentStep.map((subCat) => {
          const isGroupAllChecked = currentTasks
            .filter((task) => task.subCategory === subCat)
            .every((task) => task.checked);

          return (
            <div
              key={subCat}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden"
            >
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
                  .filter((task) => task.subCategory === subCat)
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
                      <p
                        className={`text-sm md:text-base font-medium text-slate-700 ${
                          task.checked ? 'line-through text-slate-400' : ''
                        }`}
                      >
                        {task.text}
                      </p>
                    </label>
                  ))}
              </div>
            </div>
          );
        })}
      </main>

      {/* 하단 바 */}
      <footer className="flex-shrink-0 bg-white border-t border-slate-200 p-4 flex flex-col gap-3 shadow-lg z-10">
        <div className="text-center text-xs font-bold text-slate-500 tracking-wide">
          전체 남은 마감 리스트:{' '}
          <span className="text-red-500 text-sm font-extrabold">{totalRemaining}</span>개
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
              onClick={handleFinalComplete}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 rounded-xl transition text-sm shadow-md"
            >
              최종 마감 완료
            </button>
          )}
        </div>
      </footer>

      {/* 모달들 */}
      {isModalOpen && (
        <GuideModal
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isImageModalOpen && (
        <ImageModal onClose={() => setIsImageModalOpen(false)} />
      )}
    </div>
  );
}