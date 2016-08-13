$(window).on('load', function() {

    $('.video').each(function() {

        var videoId = this.getAttribute('data-id');

        //Based on the youtube ID, find thumbnail image
        $(this).css('background-image', 'url(http://img.youtube.com/vi/' + videoId + '/hqdefault.jpg)');
    });
});

function loadVid(element) {
    element.embedly({
        key: 'c819eb35dd4f4b52b609427c1c509c4a',
        query: {maxwidth:530}
    });

    element.children('div').addClass('hidden');
}