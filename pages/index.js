import Map from 'components/Map';
import Toolbar from '../components/Toolbar';
import ToolbarStateProvider, { ToolbarStateConsumer } from '../context/ToolbarContext';
import ShowToolbarButton from '../components/Toolbar/ShowToolbarButton';
import AddPointModal from '../components/AddPointModal';
import ModalStateProvider from '../context/ModalContext';

export default function Home() {
  return (
    <main className="wrap">
      <ToolbarStateProvider>
        <ModalStateProvider>
          <>
            <Map />
            <Toolbar />
            <AddPointModal />
          </>
        </ModalStateProvider>
      </ToolbarStateProvider>
    </main>
  );
}
