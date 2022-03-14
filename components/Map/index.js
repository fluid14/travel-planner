import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import * as styles from './index.module.sass';

export default function Map() {
  const googleMap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.MAPS_KEY,
      version: 'weekly'
    });

    const mapOptions = {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 4
    };

    let map;
    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(googleMap.current, mapOptions);
    });
  });
  return <div className={styles.map} id="map" ref={googleMap}></div>;
}
