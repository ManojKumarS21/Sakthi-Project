"use client";
import { useState } from 'react';

export default function SoilForm({ onAnalyze, loading }) {
    const [formData, setFormData] = useState({
        soilType: '',
        cropType: '',
        nitrogen: '',
        phosphorus: '',
        potassium: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAnalyze(formData);
    };

    return (
        <div className="glass-card animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-green-800">Soil & Crop Analysis</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Soil Type</label>
                    <input
                        type="text"
                        name="soilType"
                        className="form-input"
                        placeholder="e.g. Clay, Sandy, Loamy"
                        required
                        value={formData.soilType}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Crop Type</label>
                    <input
                        type="text"
                        name="cropType"
                        className="form-input"
                        placeholder="e.g. Rice, Wheat, Cotton"
                        required
                        value={formData.cropType}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="form-group mb-0">
                        <label className="form-label">Nitrogen (N)</label>
                        <input
                            type="number"
                            name="nitrogen"
                            className="form-input"
                            placeholder="N"
                            required
                            min="0"
                            max="1000"
                            value={formData.nitrogen}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-0">
                        <label className="form-label">Phosphorus (P)</label>
                        <input
                            type="number"
                            name="phosphorus"
                            className="form-input"
                            placeholder="P"
                            required
                            min="0"
                            max="1000"
                            value={formData.phosphorus}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-0">
                        <label className="form-label">Potassium (K)</label>
                        <input
                            type="number"
                            name="potassium"
                            className="form-input"
                            placeholder="K"
                            required
                            min="0"
                            max="1000"
                            value={formData.potassium}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type="submit" className="btn-primary w-full" disabled={loading}>
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                            Analyzing...
                        </span>
                    ) : (
                        'Analyze Suitability'
                    )}
                </button>
            </form>
        </div>
    );
}
