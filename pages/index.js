import Map from 'components/Map';
import Toolbar from '../components/Toolbar';
import ToolbarStateProvider, { ToolbarStateConsumer } from '../context/ToolbarContext';
import ShowToolbarButton from '../components/Toolbar/ShowToolbarButton';

export default function Home() {
  return (
    <main className="wrap">
      <ToolbarStateProvider>
        <>
          <Map />
          <Toolbar />
          <ShowToolbarButton />
        </>
      </ToolbarStateProvider>
    </main>
  );
}
