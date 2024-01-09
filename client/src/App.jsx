import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import Layout from './components/Layout'
import RegisterPage from './pages/RegisterPage'
import axios from "axios"
import { UserContextProvider } from './context/UserContext'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'
import PlacePage from './pages/PlacePage'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<IndexPage />} />
            <Route path='/LoginPage' element={<LoginPage />} />
            <Route path='/RegisterPage' element={<RegisterPage />} />
            <Route path='/AccountPage' element={<ProfilePage />} />
            <Route path='/AccountPage/places' element={<PlacesPage />} />
            <Route path='/AccountPage/places/new' element={<PlacesFormPage />} />
            <Route path='/AccountPage/places/:id' element={<PlacesFormPage />} />
            <Route path='/place/:id' element={<PlacePage />} />
            <Route path='/AccountPage/bookings' element={<BookingsPage />} />
            <Route path='/AccountPage/bookings/:id' element={<BookingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
