import * as styles from './index.module.sass';
import { ToolbarStateConsumer } from '../../context/ToolbarContext';
import cx from 'classnames';
import { jsonFetcher } from '../../utils';
import useSWR from 'swr';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Toolbar() {
  const { data } = useSWR('/api/markers', jsonFetcher);
  console.log(data);
  const handlingDelete = (id) => {
    axios
      .delete('/api/markers', { params: { id } })
      .then(() => toast.success('Usunięto lokalizacje!'))
      .catch((error) => toast.error(error));
  };

  return (
    <ToolbarStateConsumer>
      {(toolbar) => (
        <>
          <div className={cx(styles.toolbarWrap, { [styles.active]: toolbar.state })}>
            <div className={cx(styles.pointsWrap, 'accordion')} id="points">
              {data?.map((marker) => (
                <div key={marker.id} className={cx(styles.bar, 'accordion-item')}>
                  <h2
                    className={cx(styles.header, 'accordion-header')}
                    id={`selector-${marker.id}`}>
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${marker.id}`}
                      aria-expanded="true"
                      aria-controls={`collapse-${marker.id}`}>
                      {marker.title}
                    </button>
                  </h2>
                  <div
                    id={`collapse-${marker.id}`}
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#points">
                    <div className={cx(styles.body, 'accordion-body')}>
                      {marker.address && (
                        <p className={cx(styles.info)}>
                          <span>Adres:</span> {marker.address}
                        </p>
                      )}
                      {marker.rating && marker.totalRatings && (
                        <p className={cx(styles.info)}>
                          <span>Oceny:</span> {marker.rating}
                          <span className={cx(styles.mini)}>/{marker.totalRatings}</span>
                        </p>
                      )}
                      {marker.priceLevel && (
                        <p className={cx(styles.info)}>
                          <span>Poziom cenowy:</span> {marker.priceLevel}
                        </p>
                      )}
                      {marker.description && (
                        <p className={cx(styles.info)}>
                          <span>Opis:</span> {marker.description}
                        </p>
                      )}
                      <div className={cx(styles.buttons)}>
                        <button className={cx(styles.btn, 'btn btn-primary')} type="button">
                          Pokaż
                        </button>
                        <button
                          onClick={() => handlingDelete(marker.id)}
                          className={cx(styles.btn, 'btn btn-danger')}
                          type="button">
                          Usuń
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </ToolbarStateConsumer>
  );
}
