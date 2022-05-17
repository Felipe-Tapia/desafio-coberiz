function carrusel(){
  $('.carruselMasVendidos').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    variableWidth: true,
    responsive:[{
      breakpoint: 200,
      settings:{
        centerMode: true,
        slidesToShow:1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 500,
      settings:{
        centerMode: true,
        slidesToShow:1,
        slidesToScroll: 1,
      },
    }
    ],
    prevArrow:
        '<button type="button" class="slick-arrow slick-prev arrowSlideHome-l"></button>',
      nextArrow:
        '<button type="button" class="slick-arrow slick-next arrowSlideHome-r"></button>',
  });
  
}
$('.banner-slick').slick({
  dots: true,
	prevArrow: $('.prev'),
	nextArrow: $('.next'),
  arrows: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay:true,
  autoplaySpeed:6000
});
