import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router'
import Videos from '../components/Videos'
import Aside from '../components/Aside'
import './YearPage.css'

const START_YEAR = 1986;
const END_YEAR = 2024;

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

function YearPage() {
    const [aVidHasBeenPlayed, setaVidHasBeenPlayed] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const playerRef = useRef(null);
    const [queue, setQueue] = useState([]);
    const [doRenderQueueList, setDoRenderQueueList] = useState(false);
    const queueRef = useRef([]);
    const { year } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [songs, setSongs] = useState([])

    const addToQueue = ({yt_id, title, artist}) => {
        setQueue([
            ...queue,
            {title, artist, yt_id}
        ])
        queueRef.current.push({title, artist, yt_id})
        // if nothings playing, play the queued song
        if (playerRef.current.getPlayerState() === YT.PlayerState.CUED ||
            playerRef.current.getPlayerState() === YT.PlayerState.ENDED) {
            playNextSong();
        }
    }

    const loadVideo = ({yt_id, title, artist}) => {
        // load video into youtube player
        playerRef.current.loadVideoById(yt_id, 0, "large");

        // populate #now-playing in Aside with current video name and artist

        // render share buttons (save for later)
        setCurrentVideo({
            title,
            artist,
            yt_id
        });

        // update aVidHasBeenPlayed state and add className to root
        if (!aVidHasBeenPlayed) {
            document.getElementById('root').classList.add("active");
            setaVidHasBeenPlayed(true);
        }

        // if iPhone remove aside closed
    }
    const onInQueueClick = (index) => {
        loadVideo(queue[index])
        setQueue(queue.filter((_, i) => i !== index))
        queueRef.current.splice(index, 1)
    }
    const onPlayerReady = (event) => {
        event.target.stopVideo();
    }
    const playNextSong = () => {
        if (queueRef.current.length > 0) {
            const song = queueRef.current[0]
            loadVideo(song)
            const copy = [...queueRef.current.slice(1)]
            setQueue(copy)
            queueRef.current = copy
        }
    }
    const onPlayerStateChange = (event) => {
        if (event.data === YT.PlayerState.ENDED) {
            // song's ended, try to get new one from queue
            playNextSong()
        }
    }

    const onYouTubeIframeAPIReady = () => {
        playerRef.current = new YT.Player('player', {
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
        setSongs(window[`_${year}`])
    }, [location.key])

    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        return () => {
            // clean up player and window.YT on unmount
            if (playerRef.current) {
                playerRef.current.destroy()
            }
            if (window.YT) {
                window.YT = null
            }
            const root = document.getElementById('root')
            root.classList.remove('active')
        }
    }, []);
    return (
        <>
            <header id="reduced">
                <div id="header-home-content">
                    <p id="header-home-title-reduced">
                        Latinx<br/>Nostalgia
                    </p>
                </div>
                <div className="selector">
                    <select key={location.key} onChange={e => navigate(`/year/${e.target.value}`)}>
                        {renderYearOptions(year)}
                    </select>
                </div>
                <div className="button" id="open-now-playing" onClick={() => {
                    let elem = document.querySelector('aside')
                    elem.classList.remove('closed')
                    setDoRenderQueueList(true)
                }}>Ahora Jugando</div>
            </header>
            <Aside
                currentVideo={currentVideo}
                queue={queue}
                onInQueueClick={onInQueueClick}
                playNextSong={playNextSong}
                doRenderQueueList={doRenderQueueList}
                setDoRenderQueueList={setDoRenderQueueList}
            />
            <Videos year={year} songs={songs} addToQueue={addToQueue} loadVideo={loadVideo} />
        </>
    )
}
export default YearPage;