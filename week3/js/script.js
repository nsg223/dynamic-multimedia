items = [
                {'caption':'City View', 'image': 'photos/DSC01049.JPG'},
                {'caption':'Ferris Wheel', 'image': 'photos/DSC01066.JPG'},
                {'caption':'A building in the forbidden city with extra long text', 'image': 'photos/DSC02511.jpg'},
                {'caption':'City from Mt Gravatt lookout', 'image': 'photos/DSC03810.jpg'},
                {'caption':'Sunrise', 'image': 'photos/DSC05750.jpg'},
            ]



$(document).ready(function() {

    $("#form-submit").submit(function (e){
        e.preventDefault();
        var query = $("#search-form").val();
        query = query.toLowerCase();
        query = query.trim();
        // query = query.split('');

        results = [];

        for (i = 0; i < items.length; i++) {
            caption = items[i].caption;
            caption = caption.toLowerCase();
            if (caption.indexOf(query) != -1) {
                results.push(items[i]);
            }    
        }

        if (results.length > 0) {
            render(results);
        } else if (query == '') {
            render(items);
        } else {
            document.getElementById("content-section").innerHTML = 'No Results Found';
        }

    });


    function render(render_items) {

        content = "";

        for (var i = 0; i < render_items.length; i++) {
            content += '<div class="col-md-4">';
            content += '<div class="well">';
            content += '<a href="' + render_items[i].image + '" target="_blank">';
            content += '<img src="' + render_items[i].image + '" alt="lovely photo" class="center-block img-responsive">';
            content += '</a>';
            content +=  '  <p class="text-center"> ' + render_items[i].caption + ' </p>';
            content += '</div>';
            content +=  '</div>' ;
        }

        // $("#content-section").html(content);
        document.getElementById("content-section").innerHTML = content;

    }

    render(items);

});

document.getElementById("login-button").addEventListener("click", function(event){
    alert("This feature is not available yet");
});