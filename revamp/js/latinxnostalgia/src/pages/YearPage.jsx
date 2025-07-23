import { useEffect, useState} from 'react';
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
    const [aVidHasBeenPlayed, setaVidHasBeenPlayed] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [player, setPlayer] = useState(null);
    console.log(player);

    const loadVideo = ({dataId, title, artist}) => {
        console.log('LOAD VID CALLED')
        // load video into youtube player
        player.loadVideoById(dataId, 0, "large");

        // populate #now-playing in Aside with current video name and artist

        // render share buttons (save for later)
        setCurrentVideo({
            title,
            artist,
            dataId
        });

        // update aVidHasBeenPlayed state and add className to root
        if (!aVidHasBeenPlayed) {
            document.getElementById('root').classList.add("active");
            setaVidHasBeenPlayed(true);
        }

        // if iPhone remove aside closed
    }
    const onPlayerReady = (event) => {
        event.target.stopVideo();
    }
    
    const onPlayerStateChange = (event) => {
        if (event.data === YT.PlayerState.ENDED) {
            // song's ended, try to get new one from queue
        }
    }

    const onYouTubeIframeAPIReady = () => {
        setPlayer(new YT.Player('player', {
            height: '270',
            width: '480',
            videoId: 'y6y_4_b6RS8',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        }));
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
            <Aside currentVideo={currentVideo} />
            <Videos loadVideo={loadVideo} />
        </>
    )
}
export default YearPage;