import './Video.css';

function videoClick(data) {
    console.log('clicked, ', data);
}

function Video(props) {
    const { dataId, title, artist } = props;
    return (
        <div className="video">
            <img
                src={`http://img.youtube.com/vi/${dataId}/mqdefault.jpg`}
                onClick={(e) => videoClick(props)}
            />
            <div className="addToQueue"><i className="fa fa-plus" aria-hidden="true"></i></div>
            <p><strong>{artist}</strong> - {title}</p>
        </div>
    )

}
export default Video;