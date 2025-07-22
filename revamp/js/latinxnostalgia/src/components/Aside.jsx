import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepForward, faTimes } from '@fortawesome/free-solid-svg-icons'

function Aside() {
    return (
        <aside>
            <div id="player"></div>
            <h2 id="now-playing">Now Playing</h2>
            <div id="share-buttons"></div>
            <div className="g-bar">
                <h3>Up Next</h3>
                <div
                    className="button"
                    onClick={() => console.log('clicked skip')}
                >
                    Skip current song
                    <FontAwesomeIcon icon={faStepForward} />
                </div>
            </div>
            <div id="queue"></div>

            <div id="close" onClick={() => console.log('closeNowPlaying')}>
                <FontAwesomeIcon icon={faTimes} />
                Back
            </div>
        </aside>
    )
}

export default Aside;