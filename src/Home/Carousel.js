import { Splide, SplideSlide } from '@splidejs/react-splide';

// import '@splidejs/splide/dist/css/themes/splide-default.min.css';
// import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';

const Carousel=()=>{
return (
    <Splide options={ {
        margin:{
          left: '1rem'
        },
        arrows: false,
        pagination: false,
        type   : 'loop',
        autoplay: true,
        focus: 'center',
        interval: 5000,
        pauseOnHover: true,
        slideFocus: true,
        perPage: 1,
        rewind : true,
        width  : 150,
        height: 130,
        gap    : '1rem',
      } }>
  <SplideSlide>
    <img src="https://pbs.twimg.com/profile_images/695587106928906240/p_uKNflX_400x400.jpg" alt="Image 1"/>
  </SplideSlide>
  <SplideSlide>
    <img src="https://pbs.twimg.com/profile_images/378800000249725777/6227821c6411f865e286d040df29848b.jpeg" alt="Image 2"/>
  </SplideSlide>
  <SplideSlide>
    <img src="https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/4009/square_thumb%402x.jpg"/>
  </SplideSlide>
  <SplideSlide>
    <img src="https://pbs.twimg.com/profile_images/642791158351925248/qkc3BHQ6.jpg"/>
  </SplideSlide>
  <SplideSlide>
    <img src="https://pbs.twimg.com/profile_images/2942458178/4d47e763fe635a31497845ce6a885d00.jpeg"/>
  </SplideSlide>
</Splide>
)
}
export default Carousel;
