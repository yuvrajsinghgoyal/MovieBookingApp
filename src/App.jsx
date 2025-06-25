import React from 'react'
import NavBar from './components/NavBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Favorite from './pages/Favorite'
import MovieDetails from './pages/MovieDetails'
import Movies from './pages/Movies'
import MyBookings from './pages/MyBookings'
import SeatLayout from './pages/SeatLayout'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
const App = () => {
  const isAdminRoute=useLocation().pathname.startsWith('/admin');
  return (
    <>
    <Toaster/>
      {!isAdminRoute && <NavBar/>}
      <Routes>
        <Route path='/' element={<Home/> } />
        <Route path='/movies' element={<Movies/> } />
        <Route path='/movies/:id' element={<MovieDetails/> } />
        <Route path='/movies/:id/:date' element={<SeatLayout/> } />
        <Route path='/my-bookings' element={<MyBookings/> } />
        <Route path='/favorite' element={<Favorite/> } />
      </Routes>
      {!isAdminRoute && <Footer/>}
    </>
  )
}
export default App





