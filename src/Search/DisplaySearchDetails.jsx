import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchBar from './SearchBar';
import Recommendations from '../Recommendations';

export default function DisplaySearchDetails() {

    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e0fa0c69b5ec0c1fd6153567c8a33701&append_to_response=casts,videos,images,releases`);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    return (
        <>
            <div className="bg-[#191919] h-full">
                <Header />
                <SearchBar />
                {movie ? (
                    <div className="flex flex-col my-8 lg:flex-row lg:mx-20">
                        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/assets/poster_unavailable.jpg'} alt={movie.title} className="flex-none mx-auto rounded-lg w-[90%] h-[90%] mb-6 lg:w-[325px] lg:h-auto object-contain" />
                        <div className="">
                            <div className="mx-6 lg:mt-6">
                                <h2 className="text-3xl font-bold text-[#EEEEEE]">{movie.title}</h2>
                                <ul className="flex items-center mt-2 text-[#EEEEEE]">
                                    <li className="mr-4 text-lg font-bold lg:text-base">⭐ {movie.vote_average > 3 ? `${movie.vote_average.toFixed(1)}` : movie.vote_average} </li>
                                    <li className="mr-4 text-lg font-bold lg:text-base">{movie.runtime}m</li>
                                    <li className="text-lg font-bold lg:text-base">{movie.release_date ? new Date(movie.release_date).getFullYear() : "?"}</li>
                                </ul>
                                <ul className="flex mt-1 text-gray-400">
                                    <li className="text-[#8E8E8E]">
                                        {movie.genres
                                            .map(genre => genre.name)
                                            .join(', ')}
                                    </li>
                                </ul>
                                <ul className="mt-2 text-[#EEEEEE]">
                                    <span className="text-[#8E8E8E] font-bold">Directed by </span>
                                    <li className="inline mr-2">
                                        {movie.casts.crew
                                            .filter(crew => crew.job === "Director")
                                            .slice(0, 2)
                                            .map(crew => crew.original_name)
                                            .join(', ')}
                                    </li>
                                </ul>
                                <ul className="mt-2 text-[#EEEEEE]">
                                    <span className="items-start font-bold text-[#8E8E8E]">Starring </span>
                                    <li className="inline mr-2">
                                        {movie.casts.cast
                                            .filter(cast => cast.known_for_department === "Acting")
                                            .slice(0, 9)
                                            .map(cast => cast.name)
                                            .join(', ')}
                                    </li>
                                </ul>
                                <p className="mt-4 text-[#EEEEEE]">{movie.overview}</p>
                            </div>
                            <Recommendations movieId={id} />
                        </div>
                    </div>
                )
                    :
                    (
                        <div>Loading...</div>
                    )}
            </div >

        </>
    );

}