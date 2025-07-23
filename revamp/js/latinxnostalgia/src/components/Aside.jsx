import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepForward, faTimes } from '@fortawesome/free-solid-svg-icons'
import './Aside.css';

function Aside(props) {
    const { aVidHasBeenPlayed, currentVideo } = props;
    return (
        <aside>
            <div id="player"></div>
            <h2 id="now-playing"><strong>{currentVideo.title}</strong> - {currentVideo.artist}</h2>
            <div id="share-buttons"></div>
            <div className="g-bar">
                <h3>Up Next</h3>
                <div
                    className="button"
                    onClick={() => console.log('clicked skip')}
                >
                    Skip current song{' '}
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