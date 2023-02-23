import { Outlet } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <Outlet />
      </div>
    </SnackbarProvider>
  );
}

export default App;
