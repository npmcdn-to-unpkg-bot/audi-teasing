function MapHeight(){
    var h = $(window).height();
    $('#gmap').css('height', h+'px' );
}
MapHeight();
 function owlSetHeight(){
    var h=$("#owl").height();
    var hd = $(window).height();
    if(hd<h+94){
        $("#owl").css('padding-top','110px');
    }
}
owlSetHeight();