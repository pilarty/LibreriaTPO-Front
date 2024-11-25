import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardLibro from "./CardLibro";
import "../views/Homepage.css"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { getLibros } from '../Redux/librosSlice';
import LoadingSpinner from './LoadingSpinner';

const CardLibroListNovedades = () => {

  const navigate2 = useNavigate();

  const manejarLibros = (isbn) => {
    navigate2(`/Libro/${isbn}`);
  }

  const dispatch = useDispatch()
  const {items: posts, loading, error, libro} = useSelector((state)=> state.libros)

  useEffect(()=>{
    dispatch(getLibros())
  }, [dispatch])

  if (loading || posts.length === 0) return <LoadingSpinner></LoadingSpinner>;
  if (error) return <p>Errro al cargar las publicaciones: {error}</p>


    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
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
       <Slider {...settings} className="homepage-lista-libros">
              {posts.content.filter((post) => post.novedad === true && post.stock !== 0).map((post) => (
                <div className="homepage-carrusel-item">
                <button className="homepage-boton-libros" onClick={() => manejarLibros(post.isbn)}>
                  <CardLibro
                    key = {post.isbn}
                    titulo = {post.titulo}
                    precio = {post.precio}
                    image = {post.image}
                  ></CardLibro>
                </button>
                </div>
              ))}

       </Slider>
    );
};

export default CardLibroListNovedades;