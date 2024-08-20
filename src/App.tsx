import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/auth-context';
import { Home } from './modules/home';
import { ProtectedRoutes } from './routes/protected-routes';
import { OptionsProvider } from './context/options-context';

function App() {
  return (
    <AuthProvider>
      <OptionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/tasks' element={<h1 className='bg-slate-400'>holaaa</h1>} />
              <Route path='/add-task' element={<h1 className='bg-slate-400'>holaaa</h1>} />
              <Route path='/tasks/:id' element={<h1 className='bg-slate-400'>holaaa</h1>} />
              <Route path='/profile' element={<h1 className='bg-slate-400'>holaaa</h1>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </OptionsProvider>
    </AuthProvider>
  );
}

export default App;
