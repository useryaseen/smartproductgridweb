import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import EditProductScreen from './screens/EditProductScreen.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="edit/:id" element={<EditProductScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

