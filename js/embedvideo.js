window.onload = function() {

    $(".video").each(function(index)) {
        var videoId = this.getAttribute('data-id');
        var url = "https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg"
        $(this).css('background-image', 'url(' + url + ')');
        alert(url);
    }

};