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

    $('#edit_article').on('click', () => {
        $('#article_content').prop('class','form-control')
        $('#article_content').prop('readonly',false);
        $('#update_article').css('display','inline-block');
    });

    $('#update_article').on('click', function(e){
        $target = $(e.target);
        var id = $target.attr('data-id');
        //get content form the textarea
        var content = $('#article_content').val();
        $.ajax({
            type: 'PATCH',
            url: '/articles/' + id,
            data: {content: content},
            error: function(err){
                console.log(err);
            },
            success: function(res){
                window.location.href = '/articles/' + id;
            }
        })
    });
})