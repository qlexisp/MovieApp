import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import '../styles.css';
import { Autoplay, Pagination } from 'swiper/modules';
import { NavLink } from 'react-router-dom';

export default function DiscoverMovies() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=e0fa0c69b5ec0c1fd6153567c8a33701');
                const data = await response.json();
                setMovies(data.results);
                console.log
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            }
        };

        fetchTrending();
    }, []);

    return (
        <>
            <div className="mb-8 lg:mx-20 mx-6">
                <Swiper pagination={true}
                    modules={[Pagination]}
                    autoplay={{ delay: 5000 }}
                    className="text-[#EEEEEE] my-8 h-full w-full rounded-2xl">
                    {movies
                        .slice(0, 10)
                        .map(movie => (
                            <SwiperSlide key={movie.id}>
                                <div className="bg-cover bg-center flex py-8 px-8"
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                                    }}
                                >
                                    <img className="md:w-[180px] md:h-auto lg:w-[150px] lg:h-auto z-10 rounded-lg shadow-md mr-8" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />

                                    <div className="text-[#EEEEEE] mt-2 hidden md:block lg:block">
                                        <h2 className="mb-4 text-2xl font-bold lg:text-3xl">{movie.title}</h2>

                                        <p className="lg:block lg:text-[#EEEEEE] lg:w-[95%]">{movie.overview.length ? `${movie.overview.substring(0, 300)}...` : movie.overview}</p>

                                        <ul className="flex items-center mt-2 text-[#EEEEEE]">
                                            <li className="mr-4 font-bold">⭐ {movie.vote_average > 3 ? `${movie.vote_average.toFixed(1)}` : movie.vote_average} </li>
                                            <li className="font-bold">{movie.release_date ? new Date(movie.release_date).getFullYear() : "?"}</li>
                                        </ul>

                                        <button className="px-2 py-3 mt-4 font-bold bg-blue-600 rounded hover:bg-blue-700 transition duration-300">
                                            <NavLink to={`/movie/${movie.id}`}>Read More</NavLink>
                                        </button>

                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </>
    );
}