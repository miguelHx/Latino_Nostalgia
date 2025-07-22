import { useParams, useNavigate } from 'react-router'
import Videos from '../components/Videos'
import Aside from '../components/Aside'
import './YearPage.css'

const START_YEAR = 1985;
const END_YEAR = 2015;

function renderYearOptions(year) {
    /**
     * list of options where year is in beginning and excluded
     * from remainder of list
     */
    const output = [];
    output.push(<option key={year}>{year}</option>);
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
    let navigate = useNavigate();
    return (
        <>
            <header id="reduced">
                <div id="header-home-content">
                    <p
                        id="header-home-title-reduced"
                        onClick={e => navigate('/')}
                    >
                        Latino<br/>Nostalgia
                    </p>
                </div>
                <div className="selector">
                    <select onChange={e => navigate(`/year/${e.target.value}`)}>
                        {renderYearOptions(year)}
                    </select>
                </div>
            </header>
            <Aside />
            <Videos />
        </>
    )
}
export default YearPage;