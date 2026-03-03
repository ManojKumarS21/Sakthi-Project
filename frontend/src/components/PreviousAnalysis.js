export default function PreviousAnalysis({ analyses, onSelect }) {
    if (!analyses || analyses.length === 0) return null;

    return (
        <div className="glass-card animate-fade-in mt-12 bg-white/40">
            <h3 className="text-2xl font-bold mb-6 text-green-800 flex items-center">
                <span className="mr-2">🕒</span> Previous Analyses
            </h3>
            <div className="flex flex-col gap-3">
                {analyses.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => onSelect(item.result)}
                        className="p-4 bg-white/80 rounded-2xl cursor-pointer flex justify-between items-center shadow-sm border border-transparent hover:border-green-200 hover:shadow-md transition-all group"
                    >
                        <div>
                            <span className="font-bold text-slate-700 group-hover:text-green-700 transition-colors">{item.cropType}</span>
                            <span className="mx-2 text-slate-400">in</span>
                            <span className="font-bold text-slate-700 group-hover:text-green-700 transition-colors">{item.soilType}</span>
                        </div>
                        <div className={`text-sm font-black px-3 py-1 rounded-full ${item.result.suitability.toLowerCase().includes('not')
                                ? 'bg-red-50 text-red-500'
                                : 'bg-green-50 text-green-500'
                            }`}>
                            {item.result.suitability}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
