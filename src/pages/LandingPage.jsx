import { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';

import './LandingPage.css';

const DEFAULT_YEAR = 2024;
const START_YEAR = 1986;
const END_YEAR = 2024

function renderYearOptions(year) {
    /**
     * list of options where year is in beginning and excluded
     * from remainder of list
     */
    const output = [];
    output.push(<option key={year}>{year}</option>);
    for (let yr = END_YEAR; yr >= START_YEAR; yr--) {
        if (yr == year) {
            continue
        }
        output.push(<option key={yr} value={yr}>{yr}</option>);
    }
    return output;
}

function LandingPage() {
    const [year, setYear] = useState(DEFAULT_YEAR);
    let navigate = useNavigate();
    return (
        <>
            <Header />
            <div className="card">
                <div className="card-body">
                    <div className="card-step-1">
                        <h3>Paso 1: Elige el año</h3>
                    </div>
                    <div className="card-selector">
                        <select
                            defaultValue={DEFAULT_YEAR}
                            onChange={e => setYear(e.target.value)}
                        >
                            {renderYearOptions(year)}
                        </select>
                    </div>

                    <div className="card-step-1">
                        <h3>Paso 2: Escucha</h3>
                    </div>

                    <button
                        id="letsgo"
                        className="butn butn--stripe"
                        onClick={_ => navigate(`/year/${year}`)}
                    >
                        Vamos
                    </button>
                </div>
            </div>
        </>
    );
}

export default LandingPage;