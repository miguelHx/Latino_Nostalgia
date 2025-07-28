import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './Video.css'

function videoClick({ dataId, title, artist, loadVideo }) {
    loadVideo({dataId, title, artist})

}

function Video(props) {
    const { dataId, title, artist } = props;
    return (
        <div className="video">
            <img
                src={`http://img.youtube.com/vi/${dataId}/mqdefault.jpg`}
                onClick={(_) => {
                    videoClick(props)
                    const animatedText = document.getElementById('open-now-playing')
                    animatedText.classList.add('animation-zoom')
                    setTimeout(() => {
                        animatedText.classList.remove('animation-zoom')
                    }, 1000)
                }}
            />
            <div
                className="addToQueue"
                onClick={(_) => {
                    props.addToQueue({title, artist, dataId})
                    const animatedText = document.getElementById('open-now-playing')
                    animatedText.classList.add('animation-bounce')
                    setTimeout(() => {
                        animatedText.classList.remove('animation-bounce');
                    }, 1000)
                }}
            >
                <FontAwesomeIcon icon={faPlus} />
            </div>
            <p><strong>{artist}</strong> - {title}</p>
        </div>
    );

}
export default Video;