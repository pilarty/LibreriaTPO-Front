import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardLibro from "./CardLibro";
import "../views/Homepage.css"

const manejarLibros = () => {
   //ToDo
 }

const CardLibroList = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    return (
       <Slider {...settings} className="lista-libros">
         <div className="carrusel-item">
           <button className="boton-libros" onClick={manejarLibros}>
              <CardLibro />
           </button>
         </div>
         <div className="carrusel-item">
           <button className="boton-libros" onClick={manejarLibros}>
              <CardLibro />
           </button>
         </div>
         <div className="carrusel-item">
           <button className="boton-libros" onClick={manejarLibros}>
              <CardLibro />
           </button>
         </div>
         <div className="carrusel-item">
           <button className="boton-libros" onClick={manejarLibros}>
              <CardLibro />
           </button>
         </div>
         <div className="carrusel-item">
           <button className="boton-libros" onClick={manejarLibros}>
              <CardLibro />
           </button>
         </div>
       </Slider>
    );
};

export default CardLibroList;