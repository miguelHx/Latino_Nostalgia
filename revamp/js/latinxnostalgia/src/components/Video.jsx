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
                onClick={(e) => videoClick(props)}
            />
            <div
                className="addToQueue"
                onClick={(e) => props.addToQueue({title, artist, dataId})}
            >
                <FontAwesomeIcon icon={faPlus} />
            </div>
            <p><strong>{artist}</strong> - {title}</p>
        </div>
    )

}
export default Video;