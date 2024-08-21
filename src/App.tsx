import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/auth-context';
import { OptionsProvider } from './context/options-context';
import { Home } from './modules/home';

function App() {
  return (
    <AuthProvider>
      <OptionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </OptionsProvider>
    </AuthProvider>
  );
}

export default App;
