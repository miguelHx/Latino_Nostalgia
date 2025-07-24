import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepForward, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'
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
    return output
}

function Aside(props) {
    const { currentVideo, queue, onInQueueClick, playNextSong } = props;
    let nowPlayingText = 'Now Playing'
    if (currentVideo) {
        nowPlayingText = <>
            <strong>{currentVideo.title}</strong> - {currentVideo.artist}
        </>
    }
    const isIphone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    return (
        <aside>
            <div id="player"></div>
            <h2 id="now-playing">{nowPlayingText}</h2>
            <div id="share-buttons"></div>
            {!isIphone ? (
                <div className="g-bar">
                    <h3>Up Next</h3>
                    <div
                        className="button"
                        onClick={() => playNextSong()}
                    >
                        Skip current song <FontAwesomeIcon icon={faStepForward} />
                    </div>
                </div>
            ) : (
                <></>
            )}

            <div id="queue">
                {isIphone ? (
                    <p>Tap video to play. No queue for iPhone sorry</p>
                ) : (
                    <div className="queued-videos">
                        {renderQueue(queue, onInQueueClick)}
                        {queue.length === 0 && (
                            <>
                                <p>Your queue is empty.<br />Click a <FontAwesomeIcon icon={faPlus} /> button to add a song to your queue.</p>
                                <img src={addPic} />
                            </>
                        )}
                    </div>
                )}
            </div>

            <div id="close" onClick={() => {
                const elem = document.querySelector('aside')
                elem.classList.add('closed')
            }}>
                <FontAwesomeIcon icon={faTimes} />
                Back
            </div>
        </aside>
    )
}

export default Aside;