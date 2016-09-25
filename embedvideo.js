$(window).on('load', function() {

    $('.video').each(function() {

        var videoId = this.getAttribute('data-id');

        //Based on the youtube ID, find thumbnail image
        $(this).css('background-image', 'url(http://img.youtube.com/vi/' + videoId + '/hqdefault.jpg)');
    });
});

function loadVid(element) {
    element.embedly({
        key: 'f31b66cde9364207b35e8cd4d54bc24a',
        query: {maxwidth:530}
    });

    element.addClass('loading');
}