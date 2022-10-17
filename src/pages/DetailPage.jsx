import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

import NavbarMovies from '../components/NavbarMovies';
import JumbotronDetail from '../components/JumbotronDetail';
import CardMovies from '../components/CardMovies';
import CardInfo from '../components/CardInfo';
import FooterMovie from '../components/FooterMovie';

const key = '5e252ece70838954e863d3137b865d87';

export default function DetailPage() {
    const location = useParams();
    const id = location.id;
    const [ movie, setMovie ] = useState([]);
    const [ cast, setCast] = useState([])

    const getMovie = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`)
            setMovie(res.data);
        } catch(error) {
            console.error(error);
        }
    }

    const getCast = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}&language=en-US`)
            const info = res.data.cast.slice(0,10)
            setCast(info)
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMovie();
        getCast();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <NavbarMovies />
            <JumbotronDetail movies={movie}/>
            <CardInfo title='Cast and Crew Info' check='true' />
            <CardMovies movies={cast} cardStatus='true' />
            <FooterMovie />
        </div>
    )
}
