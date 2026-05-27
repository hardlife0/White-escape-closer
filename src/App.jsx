// src/App.jsx
import { useState } from 'react';
import { initialTasks } from './tasks';
import ChecklistPage from './pages/ChecklistPage';

export default function App() {
  const [step, setStep] = useState(0);
  const [tasks, setTasks] = useState(
    initialTasks.map((task) => ({ ...task, checked: false }))
  );

  const resetApp = () => {
    setTasks(initialTasks.map((task) => ({ ...task, checked: false })));
    setStep(0);
  };

  // --- 시작 화면 ---
  if (step === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 p-6 text-white">
        <div className="text-center space-y-3 mb-12">
          <span className="text-sm font-semibold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full">
            Escape Room Closer
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight">
            룸익스케이프 화이트
            <br />
            참고 메뉴얼
          </h1>
          <p className="text-slate-400 text-sm">
            도움이 필요하시면 참고해주세요!
          </p>
        </div>
        <button
          onClick={() => setStep(1)}
          className="w-full max-w-sm bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-bold py-5 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all text-xl"
        >
          마감 작업 체크리스트 🚀
        </button>
      </div>
    );
  }

  // --- 단계별 체크리스트 화면 ---
  return (
    <ChecklistPage
      step={step}
      setStep={setStep}
      tasks={tasks}
      setTasks={setTasks}
      resetApp={resetApp}
    />
  );
}