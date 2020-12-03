
$(document).ready(function(){

    $('.welcome').animate({right: '10%'}, 'slow').delay(2000).animate({right: '12%'}, function(){
        bounce($(this), 2, '4%', 100)
        $('.welcome').animate({right: '0'}, 100, function(){
            $('.welcome').slideUp()
            
        })
        
    })

    function bounce(element, times, distance, speed){
        for(let i = 0; i < times; i++){
            element.animate({right: '-=' + distance}, speed).animate({right: '+=' + distance}, speed)
        }
    }

     $('.navbar a').click(function(){
        $('body,html').animate({
            scrollTop: $('#' + $(this).data('value')).offset().top
        }, 1000)

        $('.collapse').hide()
    })

    $('.navbar-toggler').click(function(){
        $('.collapse').toggle('fast').css({'padding': '2em', 'font-weight': '600'})
    })

    $('#imgs').width(145);
    
        
    // message center
    $('form').on('submit', function(e){
        
        const data = $(this).serialize();

        $.post('/contact', data, function(){
            $('#msg').css({"text-align": "center", "color": "white", "font-weight": "bold"}).html('<h2> Contact sent successfully!</h2>')
            .append('<p>we will get in touch soon</p>')
            .fadeIn(1500, function(){
                $('#msg').append('<p>Thank you !</p>')
            }).delay(2000).fadeOut(1500) 
        })

        e.preventDefault()
    })

})


