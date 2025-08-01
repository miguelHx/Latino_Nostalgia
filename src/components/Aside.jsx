import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faStepForward,
    faTimes,
    faPlus,
    faClipboard
} from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import addPic from '../assets/add.png';
import './Aside.css';

function renderQueue(queue, onInQueueClick) {
    const output = []
    for (let i = 0; i < queue.length; i++) {
        const song = queue[i]
        output.push(
            <p onClick={() => onInQueueClick(i)}>
                <strong>{song.title}</strong> - {song.artist}
            </p>
        )
    }
    return output;
}

function Aside(props) {
    const [isMaxWidth1024, setIsMaxWidth1024] = useState(
        window.matchMedia("(max-width: 1024px)").matches
    );
    useEffect(() => {
        window
        .matchMedia("(max-width: 1024px)")
        .addEventListener('change', e => setIsMaxWidth1024(e.matches))
    }, [])
    const { currentVideo, queue, onInQueueClick, playNextSong, doRenderQueueList, setDoRenderQueueList } = props;
    let nowPlayingText = 'Now Playing'
    if (currentVideo) {
        nowPlayingText = <>
            <strong>{currentVideo.title}</strong> - {currentVideo.artist}
        </>
    }
    return (
        <aside>
            <div id="player"></div>
            <h2 id="now-playing">{nowPlayingText}</h2>
            <div id="share-buttons">
                {currentVideo && (
                    <>
                        <div
                            className="button"
                            id="copy-url"
                            onClick={() => {
                                navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${currentVideo.yt_id}`);
                                const animatedText = document.getElementById('copy-url')
                                animatedText.classList.add('animation-bounce')
                                setTimeout(() => {
                                    animatedText.classList.remove('animation-bounce');
                                }, 1000)
                            }}
                        >
                            <FontAwesomeIcon icon={faClipboard} /> Copiar enlace de YouTube
                        </div>
                        <div
                            className="button"
                            onClick={() => console.log('fb share')}
                        >
                            <FontAwesomeIcon icon={faFacebook} /> Compartir
                        </div>
                        <a
                            href={`https://x.com/intent/tweet?url=https://www.youtube.com/watch?v=${currentVideo.yt_id}&text=${currentVideo.title} - ${currentVideo.artist} via https://www.latinxnostalgia.com YouTube link:&hashtags=latinxnostalgia`}
                            target="_blank"
                            className="button"
                        >
                            <FontAwesomeIcon icon={faXTwitter} /> X
                        </a>
                    </>
                )}
            </div>
            <div className="g-bar">
                <h3>Arriba Siguiente</h3>
                <div
                    className="button"
                    onClick={() => playNextSong()}
                >
                    Saltar esta canción <FontAwesomeIcon icon={faStepForward} />
                </div>
            </div>
            <div id="queue">
                <div className="queued-videos">
                    {/* anything under 1024px of width then now playing button will render if a vid has been clicked */}
                    {!isMaxWidth1024 ? (
                        <>
                            {renderQueue(queue, onInQueueClick)}
                            {queue.length === 0 && (
                                <>
                                    <p>Tu cola está vacía.<br />Haga clic en un <FontAwesomeIcon icon={faPlus} /> botón para añadir una canción a tu cola</p>
                                    <img src={addPic} />
                                </>
                            )}
                        </>
                    ) : (doRenderQueueList && (
                            <>
                                {renderQueue(queue, onInQueueClick)}
                                {queue.length === 0 && (
                                    <>
                                        <p>Tu cola está vacía.<br />Haga clic en un <FontAwesomeIcon icon={faPlus} /> botón para añadir una canción a tu cola</p>
                                        <img src={addPic} />
                                    </>
                                )}
                            </>
                        )
                    )}
                </div>
            </div>
            <div id="close" onClick={() => {
                const elem = document.querySelector('aside')
                elem.classList.add('closed')
                setDoRenderQueueList(false)
            }}>
                <FontAwesomeIcon icon={faTimes} />
                Atras
            </div>
        </aside>
    );
}

export default Aside;