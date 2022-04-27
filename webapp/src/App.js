import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import routes from './routes';
import MainLayout from 'components/Layout/Main/MainLayout';

console.warn = console.error = () => {};

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider>
        {routing}
    </ThemeProvider>
  );
};

export default App;