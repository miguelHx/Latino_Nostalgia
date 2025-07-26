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
        {title: "Eres Mia", artist: "Romeo Santos", dataId: "8iPcqtHoR3U"},
        {title: "Tocado y Hundido", artist: "Melendi", dataId: "1JwAr4ZxdMk"},
        {title: "Odio", artist: "Romeo Santos ft. Drake", dataId: "W8r-eIhp4j0"},
        {title: "Fuiste Tu", artist: "Ricardo Arjona ft. Gaby Moreno", dataId: "I9cCPQVPv8o"}
    ]
    return (
        <div id="videos">
            <div className="videos">
                {renderVideos(testData, props.loadVideo, props.addToQueue)}
            </div>
        </div>
    );
}

export default Videos;