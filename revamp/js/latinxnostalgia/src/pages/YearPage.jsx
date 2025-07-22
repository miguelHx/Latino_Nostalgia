import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router'
import Videos from '../components/Videos'
import Aside from '../components/Aside'
import './YearPage.css'

const START_YEAR = 1985;
const END_YEAR = 2015;

let player;

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

    const onPlayerReady = () => {
        player.stopVideo();
    }
    
    const onPlayerStateChange = (event) => {
        if (event.data === YT.PlayerState.ENDED) {
            // song's ended, try to get new one from queue
        }
    }

    const onYouTubeIframeAPIReady = () => {
        console.log('ON YOUTUBE IFRAME API READY CALLED')
        player = new YT.Player('player', {
            height: '270',
            width: '480',
            videoId: 'y6y_4_b6RS8',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    useEffect(() => {
        if (!window.YT) {
            console.log('LOADING YT IFRAME API')
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    }, []);
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