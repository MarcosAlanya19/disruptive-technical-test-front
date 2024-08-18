import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/auth-context';
import { Login, Register } from './modules/register/pages';
import { ProtectedRoutes } from './routes/protected-routes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1 className='bg-slate-400'>holaaa</h1>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/tasks' element={<h1 className='bg-slate-400'>holaaa</h1>} />
            <Route path='/add-task' element={<h1 className='bg-slate-400'>holaaa</h1>} />
            <Route path='/tasks/:id' element={<h1 className='bg-slate-400'>holaaa</h1>} />
            <Route path='/profile' element={<h1 className='bg-slate-400'>holaaa</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
