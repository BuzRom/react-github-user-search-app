import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import UserSearch from './pages/UserSearch'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserSearch />} />
        <Route path='/user/:login' element={<Profile />} />
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  )
}

export default App
