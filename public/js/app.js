
// Allows get new articles button to perform scraping

document.getElementById('scrape').addEventListener('click', function() { 
     $.getJSON('/scrape', function(data) {
        console.log('success')
     })
});

// Triggers mobile friendly navbar

$(document).ready(function(){
    $('.sidenav').sidenav();
  });

// Triggers floating action button on click

var elem = document.querySelector('.fixed-action-btn');
var instance = M.FloatingActionButton.init(elem, {
  direction: 'left',
  hoverEnabled: false
});

$(document).on('click','#savebtn', function() {

    var id = $(this).data('id');
    $.ajax({
        method: 'POST',
        url: '/saved/' + id,
        data: {
            saved: true
        }
    }).then(function(data) {
        window.location.reload();
    });
})

$(document).on('click','#deletebtn', function() {

    var id = $(this).data('id');
    $.ajax({
        method: 'POST',
        url: '/saved/' + id,
        data: {
            saved: false
        }
    }).then(function(data) {
        window.location.reload();

    });
})



