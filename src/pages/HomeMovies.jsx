import React, { useState, useEffect } from 'react'
import axios from 'axios';

import NavbarMovies from '../components/NavbarMovies'
import CardMovies from '../components/CardMovies'
import CardInfo from '../components/CardInfo';   
import ButtonCategories from '../components/ButtonCategories';

import { Container } from 'react-bootstrap';
import FooterMovie from '../components/FooterMovie';

const key = '5e252ece70838954e863d3137b865d87';

export default function HomeMovies() {
    const [ movies, setMovies ] = useState([]);
    const [ trending, setTrending ] = useState([]);

    const getData = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=4`);
            setMovies(res.data.results)
        } catch(error) {
            console.error(error);
        }
    }

    const getTrending = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=3`);
            setTrending(res.data.results)
        } catch(error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getData();
        getTrending();
    }, [])
    return (
        <div>
            <NavbarMovies movies={movies} jumbotron={trending} />
            <div>
                <Container>
                    <CardInfo title='Popular Movie' />
                    <CardMovies movies={movies} />
                </Container>
            </div>
            <div>
                <Container>
                    <CardInfo title='Browse By Category' />
                    <ButtonCategories />
                    <CardMovies movies={trending} />
                </Container>
            </div>
            <FooterMovie />
        </div>
    )
}
