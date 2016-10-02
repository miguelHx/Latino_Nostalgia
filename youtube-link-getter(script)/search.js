var songArray = [
'Numeros Rojos',
'El Africano',
'Baila',
'Agradecido',
'Camarero',
'Baila Para Mi',
'Venezia',
'Una Noche Sin Ti',
'La Decada en Rio',
'Grite Una Noche',
'El Sur Tambien Existe',
'Que Te Quiero',
'Como Pudiste Hacerme Esto a Mi',
'No Te Aguanto Mas',
'Voy a Mil',
'Tu No Tienes Corazon',
'Ninna',
'Arte Moderno',
'Amante Bandido',
'Ni Tu Ni Nadie',
'Cabaret',
'Que Peligro Tiene',

]; // array to search songs from
var artistArray = [
'Azul y Negro',
'Georgie Dann',
'Ivan',
'Rosendo',
'Enrique del Pozo',
'Objetivo Birmania',
'Hombres G',
'Ana Curra',
'La Decada Prodigiosa',
'Nacha Pop',
'Joan Manuel Serrat',
'Katrina & The Waves',
'Alaska y Dinarama',
'Objetivo Birmania',
'Ole Ole',
'Luis Miguel',
'Juan Pardo',
'La Mode',
'Miguel Bose',
'Alaska y Dinarama',
'La Union',
'Juan Pardo',

]; // array to search artists from

var dataIdArray = [
'Lj_RSn1e4Bg',
'kl6agOwMzAQ',
'cFl76MkjCOs',
'_Gj8QvG0qzk',
'vULQfnC2iMM',
'LNjrRYj1jcU',
'i7cEs-1qK5k',
'o4bB8Vds8k4',
'odQe9i92zHo',
'BjkQXThIo2E',
'ksWES8VSDaU',
'E_FIotq2XR8',
'TPWHaDUwpz4',
'07HFjbnbTaU',
'43vT1uOMy3M',
'b8mm6_KYL5U',
'w30brVyO05w',
'dFnz2dAMB_w',
'lA9p_fpUxnY',
'8dG3O086YgM',
'f1DsymQzD0U',
'VGa1QxFDLM8'
]; // stores data-ids to match index of song and artist array

/*
HTML that I want to duplicate hundreds of times:

<div class="video-container">
    <div class="video" onclick="loadVid($(this));" data-id="(youtube id)">
        <a href="https://www.youtube.com/watch?v=(youtube id)"></a>
    </div>
    <div class="video-text-container">
        <span class="video-text"><strong>(Title)</strong> - (Artist)</span>
    </div>
</div>

SONGS TO DELETE:
Echa pa lla - Pitbull ft. Papayo
*/

function showResponse(response) {
    //console.log(response);
    var dataId = response['items'][0]['id']['videoId']; // gets the youtube id of the search query
    //dataIdArray.push(dataId);
    console.log(dataId);

    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += "'" + dataId + "',\n"; // displays the data-id in the html
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {

    gapi.client.setApiKey('AIzaSyCrUUJWvqIIDid9vcJ38SVPk1yKv7DAVwc');

    search();
}

function search() {
    // Use the JavaScript client library to create a search.list() API call.

    //make the for loop here
    for (i = 0; i < songArray.length; i++) {
        var request = gapi.client.youtube.search.list({
            part: 'snippet', 
            order: 'relevance',
            maxResults: 1,
            type: 'video',
            q: songArray[i] + " " + artistArray[i],
        });


        // Send the request to the API server,
        // and invoke onSearchRepsonse() with the response.
        request.execute(onSearchResponse);
    }
    console.log(dataIdArray);
    display();

}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
}
function display() {
    for (i = 0; i < songArray.length; i++) {
        document.getElementById('response').innerHTML += "&lt;div class=&quot;video-container&quot;&gt;<br />" + 
            "\t&lt;div class=&quot;video&quot; onclick=&quot;loadVid($(this));&quot; data-id=&quot;" + dataIdArray[i] + "&quot;&gt;<br />" + 
                "\t\t&lt;a href=&quot;https://www.youtube.com/watch?v=" + dataIdArray[i] + "&quot;&gt;&lt;/a&gt;<br />" +
            "\t&lt;/div&gt;<br />" +
            "\t&lt;div class=&quot;video-text-container&quot;&gt;<br />" +
                "\t\t&lt;span class=&quot;video-text&quot;&gt;&lt;strong&gt;" + songArray[i] + "&lt;/strong&gt; - " + artistArray[i] + 
                "&lt;/span&gt;<br />" +
            "\t&lt;/div&gt;<br />" +
        "&lt;/div&gt;</br></br>";
    }
}