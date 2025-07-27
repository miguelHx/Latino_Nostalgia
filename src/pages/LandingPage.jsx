import { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';

import './LandingPage.css';

const DEFAULT_YEAR = '2015';

function LandingPage() {
    const [year, setYear] = useState(DEFAULT_YEAR);
    let navigate = useNavigate();
    return (
        <>
            <Header />
            <div className="card">
                <div className="card-body">
                    <div className="card-step-1">
                        <h3>Step 1: Choose Year</h3>
                    </div>
                    <div className="card-selector">
                        <select
                            defaultValue={DEFAULT_YEAR}
                            onChange={e => setYear(e.target.value)}
                        >
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                            <option value="1989">1989</option>
                            <option value="1988">1988</option>
                            <option value="1987">1987</option>
                            <option value="1986">1986</option>
                            <option value="1985">1985</option>
                        </select>
                    </div>

                    <div className="card-step-1">
                        <h3>Step 2: Listen</h3>
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