jQuery(function($){
    var body = $('body');
    detect_device_type();

    $( window ).load( function(){
        w = $( window ).width();
    });
    
    $(window).resize(function(){
        
        if( w != $( window ).width() ){
            detect_viewport_orientation();
            //set_viewport();
            w = $( window ).width();

          }
    });
    
    function detect_device_type(){
        detect_viewport_orientation();
        
        md = new MobileDetect(window.navigator.userAgent);
        var phone = md.phone();
        var tablet = md.tablet();
        if( !phone && !tablet){
            device_type = 'desktop';
        }
        if(phone) device_type = 'phone';
        if(tablet) device_type = 'tablet';
        body = $('body');
        body.addClass(device_type);
        set_viewport();
    }
    function set_viewport(){
        if( device_type=='tablet' && viewport_orientation=='landscape'){
            var viewport_content = 'width=1200';
        }
        else if( device_type=='tablet' && viewport_orientation=='portrait'){
            var viewport_content = 'width=120';
        }
        else if( device_type=='phone' && viewport_orientation=='landscape'){
            var viewport_content = 'width=1200';
        }
        else if( device_type=='phone' && viewport_orientation=='portrait'){
            var viewport_content = 'width=480';
            var scale = vWidth/480;
            viewport_content = viewport_content+ ', initial-scale=' +scale;
            //viewport_content = viewport_content+ ', initial-scale=1';
            console.log(vWidth);
        }
        //viewport_content += ', minimum-scale=1, maximum-scale=1, initial-scale=1, user-scalable=no';
        
        if( device_type=='phone' && viewport_orientation=='portrait'){}
        else{ viewport_content += ', initial-scale=1'; }
        
        //console.log('viewport_content: '+viewport_content);
        //$('#viewport-meta').attr('content', viewport_content);
        $('meta[name=viewport]').attr('content', viewport_content);
    }
    function detect_viewport_orientation(){
        vWidth = window.innerWidth;
        vHeight = window.innerHeight;
        
        if(vWidth > vHeight) viewport_orientation = 'landscape';
        else if(vWidth < vHeight) viewport_orientation = 'portrait';
        body = $('body');
        if(viewport_orientation == 'landscape'){
            body.removeClass('portrait').addClass('landscape');
        }
        if(viewport_orientation == 'portrait'){
            body.addClass('portrait').removeClass('landscape');
        }
    }
    
});
window.onload = function () {
    hideAddressBar();
    window.addEventListener("orientationchange", function () {
        hideAddressBar();
    }, false);
}

function hideAddressBar() {
    setTimeout(function () {
        document.body.style.height = window.outerHeight + 'px';
        setTimeout(function () {
            //window.scrollTo(0, 1);
        }, 1100);
    }, 1000);
    return false;
}