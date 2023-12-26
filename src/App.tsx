import { RouterProvider } from 'react-router-dom';
import router from './structure/root/root';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
