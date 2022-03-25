import Map from 'components/Map';
import Toolbar from '../components/Toolbar';
import ToolbarStateProvider from '../context/ToolbarContext';
import AddPointModal from '../components/AddPointModal';
import ModalStateProvider from '../context/ModalContext';
import { ToastContainer } from 'react-toastify';
import { MarkersDataContextProvider } from '../context/MarkersDataContext';

export default function Home() {
  return (
    <main className="wrap">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <MarkersDataContextProvider>
        <ToolbarStateProvider>
          <ModalStateProvider>
            <>
              <Map />
              <Toolbar />
              <AddPointModal />
            </>
          </ModalStateProvider>
        </ToolbarStateProvider>
      </MarkersDataContextProvider>
    </main>
  );
}
