import Video from './Video';
import './Videos.css';

const testData = [
        {title: "Explicale", artist: "Yandel Featuring Bad Bunny", yt_id: "U516oP9nt2o"},
        {title: "El Perdon", artist: "Nicky Jam y Enrique Iglesias", yt_id: "hXI8RQYC36Q"},
        {title: "Propuesta Indecente", artist: "Romeo Santos", yt_id: "QFs3PIZb3js"},
        {title: "Fanatica Sensual", artist: "Plan B", yt_id: "QvypZSdjO8M"},
        {title: "Eres Mia", artist: "Romeo Santos", yt_id: "8iPcqtHoR3U"},
        {title: "Tocado y Hundido", artist: "Melendi", yt_id: "1JwAr4ZxdMk"},
        {title: "Odio", artist: "Romeo Santos ft. Drake", yt_id: "W8r-eIhp4j0"},
        {title: "Fuiste Tu", artist: "Ricardo Arjona ft. Gaby Moreno", yt_id: "I9cCPQVPv8o"},
        {title: "Despacito", artist: "Luis Fonsi & Daddy Yankee Featuring Justin Bieber", yt_id: "72UO0v5ESUo"}
]

function Videos(props) {
    const {year, songs, loadVideo, addToQueue} = props;

    const renderVideos = (videoData) => {
        if (!videoData || videoData.length === 0) {
            videoData = testData;
        }
        const output = [];
        for (const vd of videoData) {
            output.push(
                <Video key={`${vd.yt_id}`} {...vd} loadVideo={loadVideo} addToQueue={addToQueue} />
            )
        }
        return output;
    }
    return (
        <div id="videos">
            <div key={year} className="videos">
                {renderVideos(songs)}
            </div>
        </div>
    );
}

export default Videos;