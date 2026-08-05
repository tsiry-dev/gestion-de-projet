import useInitializeAuth from '#hooks/useInitializeAuth';
import './App.css'
import AppProvider from '@app/providers/AppProvider';
import AppRouter from '@app/routes/AppRouter';

function App() {

  return <AppProvider>
      <AppRouter />
  </AppProvider>
}

export default App
