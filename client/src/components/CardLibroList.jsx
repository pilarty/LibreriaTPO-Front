import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardLibro from "./CardLibro";
import "../views/Homepage.css"

import { useEffect, useState } from 'react';

const manejarLibros = () => {
   //ToDo
 }

const CardLibroList = () => {

    const [posts, setPost] = useState([]);

    console.log(posts);

    useEffect(() => {
      fetch("http://localhost:4002/libros")
        .then((response) => response.json())
        .then((data) => {
          setPost(data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos: ", error)
        })
    })

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
              {posts.map((post) =>(
                <CardLibro>
                  key = {post.isbn}
                  titulo = {post.titulo}
                  precio = {post.precio}
                </CardLibro>
              ))}
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