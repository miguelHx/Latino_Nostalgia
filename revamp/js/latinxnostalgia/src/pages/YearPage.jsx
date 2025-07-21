import { useParams } from 'react-router'
import './YearPage.css';

const START_YEAR = 1985;
const END_YEAR = 2015;

function renderYearOptions(year) {
    /**
     * list of options where year is in beginning and excluded
     * from remainder of list
     */
    const output = [];
    output.push(<option>{year}</option>);
    for (let yr = START_YEAR; yr <= END_YEAR; yr++) {
        if (yr == year) {
            continue
        }
        output.push(<option key={yr} value={yr}>{yr}</option>);
    }
    return output;
}

function YearPage() {
    const { year } = useParams();
    return (
        <>
            <header id="reduced">
                <div id="header-home-content">
                    <p id="header-home-title-reduced">
                        Latino<br/>Nostalgia
                    </p>
                </div>
                <div className="selector">
                    <select>
                        {renderYearOptions(year)}
                    </select>
                </div>
            </header>
        </>
    )
}
export default YearPage;