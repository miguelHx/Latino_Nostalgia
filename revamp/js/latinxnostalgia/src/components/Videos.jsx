import Video from './Video';
import './Videos.css';

function renderVideos(videoData, loadVideo, addToQueue) {
    const output = [];
    for (const vd of videoData) {
        output.push(
            <Video key={`${vd.dataId}`} {...vd} loadVideo={loadVideo} addToQueue={addToQueue} />
        )
    }
    return output;
}

function Videos(props) {
    const testData = [
        {title: "El Perdon", artist: "Nicky Jam y Enrique Iglesias", dataId: "hXI8RQYC36Q"},
        {title: "Propuesta Indecente", artist: "Romeo Santos", dataId: "QFs3PIZb3js"},
        {title: "Fanatica Sensual", artist: "Plan B", dataId: "QvypZSdjO8M"},
        {title: "El Perdon", artist: "Nicky Jam y Enrique Iglesias", dataId: "hXI8RQYC36Q"},
        {title: "Propuesta Indecente", artist: "Romeo Santos", dataId: "QFs3PIZb3js"},
        {title: "Fanatica Sensual", artist: "Plan B", dataId: "QvypZSdjO8M"}
    ]
    return (
        <div id="videos">
            <div className="videos">
                {renderVideos(testData, props.loadVideo, props.addToQueue)}
            </div>
        </div>
    )
}

export default Videos;