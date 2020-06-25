$(document).ready(function(){
    $('#delete_article').on('click', function(e){
        $target = $(e.target);
        var id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/articles/' + id,
            error: function(err){
                console.log(err);
            },
            success: function(res){
                window.location.href = '/articles';
            }
        })
    });
})