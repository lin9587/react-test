import { useEffect, useState } from 'react'

import MovieCard from './MovieCard'
import SearchIcon from './search.svg'
import './App.css'

const API_URL = 'https://www.omdbapi.com/?apikey=d142540e'

const App = () => {
	const [searchTerm, setSearchTrem] = useState('')
	const [movies, setMovies] = useState([])

	useEffect(() => {
		searchMovies('Batman')
	}, [])

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`)
		const data = await response.json()

		setMovies(data.Search)
	}

	return (
		<div className='app'>
			<h1>MovieLand</h1>

			<div className='search'>
				<input
					placeholder='Search for movies'
					value={searchTerm}
					onChange={(e) => setSearchTrem(e.target.value)}
				/>
				<img
					src={SearchIcon}
					alt='search'
					onClick={() => searchMovies(searchTerm)}
				/>
			</div>

			{movies?.length > 0 ? (
				<div className='container'>
					{movies.map((movie) => {
						return <MovieCard movie={movie} key={movie.imdbID} />
					})}
				</div>
			) : (
				<div className='empty'>
					<h2>No movies found</h2>
				</div>
			)}
		</div>
	)
}

export default App
