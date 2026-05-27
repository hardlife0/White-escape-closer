// src/components/GuideModal.jsx
export default function GuideModal({ activeTab, setActiveTab, onClose }) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
        <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
            <h3 className="font-extrabold text-lg">🎛️ 마그네틱/서랍 개방 매뉴얼</h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white font-bold text-sm bg-slate-800 px-3 py-1 rounded-xl transition"
            >
              닫기
            </button>
          </div>
  
          <div className="flex bg-slate-100 p-1 border-b border-slate-200">
            {['common', 'albino', 'macao'].map((tab) => {
              const labels = { common: '호빗/레테/비폴로', albino: '알비노', macao: '마카오' };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-center text-xs font-bold py-2 rounded-xl transition ${
                    activeTab === tab
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>
  
          <div className="flex-1 overflow-y-auto p-4 text-sm text-slate-700 space-y-4 leading-relaxed">
            {activeTab === 'common' && (
              <div className="space-y-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1 text-base text-emerald-600">
                    🔓 공통 개방 방법
                  </span>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-600 font-medium">
                    <li>
                      단계 이름 옆 숫자 <span className="text-amber-600 font-bold">1번</span>을 꾹 눌러 재진입한다.
                    </li>
                    <li>마지막 문제까지 단계 이름을 눌러서 풀어준다.</li>
                    <li>전부 열림</li>
                  </ul>
                </div>
              </div>
            )}
  
            {activeTab === 'albino' && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">1. E 서랍 여는법</span>
                  <p className="text-slate-600 font-medium">
                    키패드에{' '}
                    <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono font-bold">
                      B 9835 B
                    </span>{' '}
                    입력 ➡️ 열림
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">2. D 서랍 여는법</span>
                  <p className="text-slate-600 font-medium">
                    키패드에{' '}
                    <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono font-bold">
                      D 112617 D
                    </span>{' '}
                    입력 ➡️ 열림
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">3. 중문 (SSCP) 여는법</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 font-medium">
                    <li>
                      SSCP_switch 옆 <span className="text-amber-600 font-bold">7번</span>을 꾹 눌러 재진입한다.
                    </li>
                    <li>단계이름(SSCP_switch)을 눌러 넘긴다.</li>
                    <li>열린다.</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">4. A파일 나오는 곳 서랍 여는 방법</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 font-medium">
                    <li>
                      FinalStage 옆 <span className="text-amber-600 font-bold">12번</span>을 꾹 눌러 재진입한다.
                    </li>
                    <li>영상이 끝날 때까지 기다린다. ➡️ 열린다.</li>
                  </ul>
                </div>
                <div className="bg-red-50 text-red-700 p-3 rounded-xl border border-red-200 text-xs font-bold">
                  ⚠️ 경고: 이 때 8645 정답이 맞춰져 있으면 엔딩이 나서 A파일을 꺼낼 수 없습니다!
                </div>
              </div>
            )}
  
            {activeTab === 'macao' && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">1. mgf 노란종이 서랍</span>
                  <p className="text-slate-600 text-xs font-medium">
                    Sunglass 옆 <span className="text-amber-600 font-bold">2번</span> 꾹 눌러 재진입 ➡️{' '}
                    <span className="font-mono font-bold text-slate-900">8523</span> 입력
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">2. 미닫이 문</span>
                  <p className="text-slate-600 text-xs font-medium">
                    TAG3 옆 <span className="text-amber-600 font-bold">6번</span> 꾹 눌러 재진입 ➡️ 5초 기다린 후 직접 밀어
                    열기
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">3. 첫번째방 편지 넣는 왼쪽 서랍</span>
                  <p className="text-slate-600 text-xs font-medium">
                    오른쪽 자물쇠(<span className="font-mono font-bold">4283</span>) 오픈 ➡️ 스위치 조작 정답 매칭 [
                    (오)상상중 / (왼)하중하 ] ➡️ 열림
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">4. 책상 오른쪽 키패드 서랍</span>
                  <p className="text-slate-600 text-xs font-medium">
                    키패드에{' '}
                    <span className="bg-slate-100 font-mono px-1.5 py-0.5 rounded font-bold">5947#</span> 입력 ➡️ 열림
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">5. 카메라 서랍</span>
                  <p className="text-slate-600 text-xs font-medium">
                    Camera 단계 옆 <span className="text-amber-600 font-bold">10번</span> 꾹 눌러 재진입 ➡️ 약 30초 대기 후
                    자동 개방
                  </p>
                  <div className="bg-amber-50 text-amber-800 text-[11px] p-2 rounded-lg border border-amber-200 mt-1 font-bold">
                    ※ 주의: 4283 서랍이 열려있으면 카메라 진입 불가! 서랍을 닫아두어야 합니다.
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">6. 마지막 방 문</span>
                  <p className="text-slate-600 text-xs font-medium">
                    TAG4 옆 <span className="text-amber-600 font-bold">13번</span> 꾹 눌러 재진입 ➡️ 약 30초 대기 후 자동
                    개방 (CCTV 확인)
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">7. USB 서랍</span>
                  <p className="text-slate-600 text-xs font-medium">
                    USB 단계 옆 <span className="text-amber-600 font-bold">15번</span> 꾹 눌러 재진입 ➡️ 열림
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">8. 에코얼리스 서랍 (책상 아래 파일)</span>
                  <p className="text-slate-600 text-xs font-medium">
                    Eco-Uliss 단계 옆 <span className="text-amber-600 font-bold">18번</span> 꾹 눌러 재진입 ➡️ 열림
                  </p>
                </div>
              </div>
            )}
          </div>
  
          <div className="bg-slate-50 border-t border-slate-200 p-3.5">
            <button
              onClick={onClose}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition text-sm"
            >
              가이드 확인 완료 닫기
            </button>
          </div>
        </div>
      </div>
    );
  }