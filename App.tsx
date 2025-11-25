import React, { useState } from 'react';
import Header from './components/Header';
import AnalysisCard from './components/AnalysisCard';
import { analyzeThreat } from './services/geminiService';
import { DefenseAnalysis, AppState } from './types';
import { ShieldAlert, BrainCircuit, MessageSquareWarning, Skull, Terminal, Shuffle } from 'lucide-react';

// Predefined random funny responses
const RANDOM_PROTECTIONS: DefenseAnalysis[] = [
  {
    tags: ["RAKHI ALERT", "BHAI ZONED", "SAFE"],
    threat_analysis: "Subject is attempting a high-level emotional maneuver known as 'The Bestie Trap'. This is usually followed by a request for a free ride or payment for golgappas.",
    defense_strategy: "Immediately ask her about her brother. If she doesn't have one, offer to become one. Produce a Rakhi from your pocket (always carry emergency Rakhi).",
    verbal_counter: "Didi, you remind me so much of my cousin sister.",
    survival_probability_text: "High, if you can maintain the 'Bhaiya' energy for 15 minutes."
  },
  {
    tags: ["WALLET DANGER", "MONTH END", "POOR"],
    threat_analysis: "Detected incoming request for 'Starbucks Date'. Your wallet heart rate is escalating. She is using the 'Puppy Eyes' algorithm.",
    defense_strategy: "Fake a UPI server failure. Show her your bank balance (if it's low, even better). Start complaining about inflation.",
    verbal_counter: "Yaar, I am on a spiritual journey. I only drink Tapri ki chai now.",
    survival_probability_text: "Moderate. Depends on your acting skills."
  },
  {
    tags: ["CLINGY VIBES", "SPACE NEEDED", "RUN"],
    threat_analysis: "She has texted 'Hiiiiii' with 6 'i's. This indicates a boredom level of 99% and a need for attention level of 100%.",
    defense_strategy: "Reply after 4 to 6 business days. Send a forwarded message about 'Benefits of Silence'.",
    verbal_counter: "Sorry, phone fell in daal. Speaker not working.",
    survival_probability_text: "Low. She will likely double text."
  },
  {
    tags: ["MARRIAGE TRAP", "RISHTA MODE", "CODE RED"],
    threat_analysis: "She mentioned her parents are looking for a 'Good Boy'. You are currently in the line of fire.",
    defense_strategy: "Start acting like a chapri. Chew imaginary gutka. Talk about how you want to become a DJ in Goa.",
    verbal_counter: "My kundali has 'Manglik' dosh. Whoever marries me turns into a frog.",
    survival_probability_text: "Critical. One wrong move and you are engaged."
  }
];

export default function App() {
  const [input, setInput] = useState('');
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [data, setData] = useState<DefenseAnalysis | null>(null);

  const handleDeconstruct = async () => {
    if (!input.trim()) return;
    
    setState(AppState.ANALYZING);
    const result = await analyzeThreat(input);
    setData(result);
    setState(AppState.RESULTS);
  };

  const handleRandom = () => {
    setState(AppState.ANALYZING);
    // Simulate slight delay for effect
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * RANDOM_PROTECTIONS.length);
      setData(RANDOM_PROTECTIONS[randomIndex]);
      setState(AppState.RESULTS);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-[#E5E5E5] flex items-center justify-center p-4 md:p-8 font-sans">
      
      {/* Main Container - WIDER NOW */}
      <div className="w-full max-w-[95%] xl:max-w-[1600px] bg-[#F0F0F0] rounded-xl shadow-2xl overflow-hidden border border-gray-300 relative flex flex-col">
        
        {/* Top bar dots decoration */}
        <div className="absolute top-4 right-4 flex gap-1">
             {/* Integrated into Header component, but kept here for spacing logic context */}
        </div>

        <div className="p-6 md:p-10">
          <Header />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Input & Controls */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              
              {/* Input Area */}
              <div className="relative aspect-[4/3] bg-white border border-gray-300 p-2 shadow-sm flex flex-col">
                 <div className="bg-sys-black text-white px-2 py-1 flex justify-between items-center mb-1">
                    <span className="font-mono text-[10px] tracking-widest uppercase">Input Stream</span>
                    <Terminal size={12} />
                 </div>
                 <div className="flex-grow relative bg-gray-50 border border-gray-200">
                    <textarea
                      className="w-full h-full p-4 bg-transparent resize-none focus:outline-none font-mono text-sm text-gray-800 placeholder-gray-400"
                      placeholder="DESCRIBE DEEKSHA'S ACTIONS HERE...&#10;&#10;Examples:&#10;> She asked for my Netflix password.&#10;> She wants to meet my parents.&#10;> She is calling me 'Babu'."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={state === AppState.ANALYZING}
                    />
                    {state === AppState.ANALYZING && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 backdrop-blur-sm">
                        <div className="flex flex-col items-center">
                          <div className="animate-spin w-8 h-8 border-2 border-accent-red border-t-transparent rounded-full mb-2"></div>
                          <span className="font-mono text-xs text-accent-red animate-pulse">COMPUTING THREAT VECTORS...</span>
                        </div>
                      </div>
                    )}
                 </div>
                 {/* Visual decoration corners */}
                 <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-sys-black"></div>
                 <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-sys-black"></div>
                 <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-sys-black"></div>
                 <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-sys-black"></div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleDeconstruct}
                  disabled={state === AppState.ANALYZING || !input.trim()}
                  className={`w-full py-4 font-mono font-bold text-lg tracking-widest uppercase transition-all duration-200 shadow-md border-2 border-transparent
                    ${state === AppState.ANALYZING 
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                      : 'bg-accent-red text-white hover:bg-red-700 hover:shadow-lg active:translate-y-0.5'
                    }`}
                >
                  {state === AppState.ANALYZING ? 'PROCESSING...' : 'INITIATE PROTECTION'}
                </button>

                <button 
                  onClick={handleRandom}
                  disabled={state === AppState.ANALYZING}
                  className="w-full py-3 font-mono font-bold text-sm tracking-widest uppercase transition-all duration-200 shadow-sm border-2 border-sys-black text-sys-black hover:bg-sys-black hover:text-white flex items-center justify-center gap-2 group"
                >
                  <Shuffle size={16} className="group-hover:rotate-180 transition-transform duration-500"/>
                  GET RANDOM PROTECTION
                </button>
              </div>

              <div className="bg-red-50 border border-red-200 p-4 rounded-sm flex items-start gap-3">
                 <ShieldAlert className="text-accent-red shrink-0" size={20}/>
                 <p className="font-mono text-[10px] text-red-800 leading-tight">
                    WARNING: SYSTEM OPERATING ON EMERGENCY PROTOCOLS. HUMOR LEVELS MAY EXCEED SOCIAL SAFETY STANDARDS.
                 </p>
              </div>

            </div>

            {/* RIGHT COLUMN: Results */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              {/* Tags Row */}
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {data?.tags.map((tag, idx) => (
                  <span key={idx} className="bg-sys-black text-white px-3 py-1 text-[10px] font-mono uppercase tracking-wider animate-fade-in border-l-2 border-accent-red">
                    {tag}
                  </span>
                ))}
                {!data && (
                   <span className="bg-gray-300 text-gray-500 px-3 py-1 text-[10px] font-mono uppercase tracking-wider">
                    SYSTEM READY
                  </span>
                )}
              </div>

              {/* Grid of Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {data ? (
                  <>
                    <div className="col-span-1 md:col-span-2">
                        <AnalysisCard 
                        icon={BrainCircuit}
                        title="THREAT ANALYSIS"
                        content={data.threat_analysis}
                        delay={100}
                        />
                    </div>
                    
                    <AnalysisCard 
                      icon={ShieldAlert}
                      title="DEFENSE PROTOCOL"
                      content={data.defense_strategy}
                      delay={200}
                    />
                    <AnalysisCard 
                      icon={MessageSquareWarning}
                      title="VERBAL COUNTERMEASURE"
                      content={`"${data.verbal_counter}"`}
                      delay={300}
                    />
                     <div className="col-span-1 md:col-span-2">
                        <AnalysisCard 
                        icon={Skull}
                        title="SURVIVAL PROBABILITY"
                        content={data.survival_probability_text}
                        delay={400}
                        />
                     </div>
                  </>
                ) : (
                  <div className="col-span-1 md:col-span-2 h-64 flex flex-col items-center justify-center text-gray-400 space-y-4 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg">
                    <ShieldAlert size={48} strokeWidth={1} className="text-gray-300" />
                    <p className="font-mono text-sm text-center max-w-xs uppercase tracking-wider">
                      Awaiting Input Data...
                    </p>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

        {/* Footer Status Bar */}
        <div className="bg-[#1A1A1A] text-white py-2 px-6 flex justify-between items-center mt-auto border-t-4 border-accent-red">
          <div className="flex space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-red animate-ping"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
          </div>
          <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">
             SYSTEM STATUS: {state === AppState.ANALYZING ? 'CRITICAL PROCESSING' : 'ARMED & READY'}
          </span>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}