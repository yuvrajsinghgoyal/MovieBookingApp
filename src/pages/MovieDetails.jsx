import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import { HeartIcon, PlayCircle, StarIcon } from 'lucide-react'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import timeFormate from '../lib/timeFormat'

const MovieDetails = () => {
  const navigate=useNavigate()
  const {id} = useParams()
  const [show,setShow]=useState(null)

  const getshow=async()=>{
    const show = dummyShowsData.find((show) => show._id === id);
    if(show){
      setShow({
      movie:show,
      dateTime:dummyDateTimeData
    })
    }
    
  }

  React.useEffect(() => {
    getshow();
  }, [id])

  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-52'>
        <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
            <img src={show.movie.poster_path} alt="" className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover' />
            <div className='relative flex flex-col gap-3'>
                <BlurCircle top="-100px" left="-100px"/>
                <p className='text-primary'>ENGLISH</p>
                <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>
                <div className='flex items-center gap-2 text-gray-300'>
                  <StarIcon className='w-5 h-5 text-primary fill-primary'/>
                  {show.movie.vote_average.toFixed(1)} User Rating
                </div>
                <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl' >{show.movie.overview}</p>
                <p>
                  {timeFormate(show.movie.runtime)} | {show.movie.genres.map(genre=>genre.name).join(", ")} | {show.movie.release_date.split("-")[0]} | {show.movie.tagline}
                </p>

                <div className='flex items-center flex-wrap gap-4 mt-4'>
                  <button className='flex items-center gap-2  px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
                    <PlayCircle className='w-5 h-5'/>
                    Watch Trailer
                    </button>
                  <a href="#dateSelect" className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'>Buy Tickets</a>
                  <button className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
                    <HeartIcon className={`w-5 h-5`}/>
                  </button>

                </div>

            </div>
        </div>

        <p className='text-lg font-medium mt-20' >Your Favorite Cast</p>
        <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
            <div className='flex items-center gap-4 w-max px-4'>
                  {show.movie.casts.slice(0,12).map((cast,index)=>(
                      <div key={index} className='flex flex-col items-center text-center'>
                        <img src={cast.profile_path} alt={cast.name} className=' rounded-full h-20 md:h-20 aspect-square  object-cover' />
                        <p className='text-sm text-center font-medium mt-3'>{cast.name}</p>
                      </div>
                  ))}
            </div>
        </div>

        <DateSelect dateTime={show.dateTime} id={id} />

        <p className='text-lg font-medium mt-20 mb-8' >You May Also Like</p>
        <div className='flex flex-wrap max-sm:justify-center gap-8'>
                  {dummyShowsData.slice(0,4).map((movie,index)=>(
                    <MovieCard key={index} movie={movie} />
                  ))}
        </div>

        <div className='flex justify-center mt-20'>
                  <button onClick={()=>{navigate('/movies');scrollTo(0,0)}} className='px-10 py-3 text-sm  bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>
                      Show More
                  </button>
        </div>

    </div>
  ) : (
    <Loading/>
  )
}

export default MovieDetails;