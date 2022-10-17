import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

import CardMovies from '../components/CardMovies';
import NavbarMovies from '../components/NavbarMovies';
import JumbotronSearch from '../components/JumbotronSearch';

export default function SearchPage() {
    const location = useParams();
    const search = location.s;
    const key = '5e252ece70838954e863d3137b865d87';
    const [movies, setMovies] = useState([]);

    const getSearch = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${search}`)
            setMovies(res.data.results)
        }catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <NavbarMovies />
            <JumbotronSearch title='All Movies ->' search={search}/>
            <CardMovies movies={movies}/>
        </div>
    )
}
