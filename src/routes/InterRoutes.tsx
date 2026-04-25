import { Routes, Route, Navigate } from 'react-router-dom';
import { HistorialPage, IngresosPage, SalidasPage } from '../pages';

export const InterRoutes = () => {
  return (
    <Routes>
        <Route path='/*' element={<Navigate to="/"/>}/>
        <Route path='/' element={<IngresosPage/>}/>
        <Route path='/salidas' element={<SalidasPage/>}/>
        <Route path='/historial' element={<HistorialPage/>}/>
    </Routes>
  )
}


