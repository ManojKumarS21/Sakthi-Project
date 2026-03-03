export default function ResultCard({ result }) {
    if (!result) return null;

    const isInvalid = result.isValid === false || result.suitability.toLowerCase().includes('invalid');
    const isSuitable = !isInvalid && result.suitability.toLowerCase().includes('suitable') && !result.suitability.toLowerCase().includes('not');

    return (
        <div
            className={`glass-card animate-fade-in border-l-8 ${isInvalid ? 'border-amber-500' : isSuitable ? 'border-green-500' : 'border-red-500'}`}
        >
            <div className={`status-badge ${isInvalid ? 'bg-amber-100 text-amber-700' : isSuitable ? 'status-suitable' : 'status-unsuitable'}`}>
                {result.suitability}
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {isInvalid ? 'Validation Message' : 'Analysis Result'}
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">{result.reason}</p>
            </div>

            {!isInvalid && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white/50 p-6 rounded-2xl border border-white/50 shadow-sm">
                            <h4 className="text-green-600 font-bold mb-2 flex items-center">
                                <span className="mr-2 text-xl">🌱</span> Fertilizers
                            </h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{result.fertilizerRecommendation}</p>
                        </div>
                        <div className="bg-white/50 p-6 rounded-2xl border border-white/50 shadow-sm">
                            <h4 className="text-orange-500 font-bold mb-2 flex items-center">
                                <span className="mr-2 text-xl">🛡️</span> Pesticides
                            </h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{result.pesticideRecommendation}</p>
                        </div>
                    </div>

                    {result.improvementSuggestions && (
                        <div className="mt-6 bg-blue-50/50 p-6 rounded-2xl border border-blue-100 shadow-sm">
                            <h4 className="text-blue-600 font-bold mb-2 flex items-center">
                                <span className="mr-2 text-xl">💡</span> Improvement Suggestions
                            </h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{result.improvementSuggestions}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
