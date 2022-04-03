import Map from 'components/Map';
import ToolbarStateProvider from '../context/ToolbarContext';
import AddPointModal from '../components/AddPointModal';
import ModalStateProvider from '../context/ModalContext';
import { ToastContainer } from 'react-toastify';
import { MarkersDataContextProvider } from '../context/MarkersDataContext';
import ConfirmModal from '../components/ConfirmModal';
import ConfirmModalProvider from '../context/ConfirmModalContext';

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
        <ConfirmModalProvider>
          <ToolbarStateProvider>
            <ModalStateProvider>
              <>
                <Map />
                <AddPointModal />
                <ConfirmModal />
              </>
            </ModalStateProvider>
          </ToolbarStateProvider>
        </ConfirmModalProvider>
      </MarkersDataContextProvider>
    </main>
  );
}
