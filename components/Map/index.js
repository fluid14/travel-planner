import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import * as styles from './index.module.sass';
import { points as mapPoints, pointsEnum } from './points';
import cx from 'classnames';

export default function Map() {
  const googleMap = useRef(null);
  const points = { metro: false, poi: false };
  let mapStyles = [];
  let map;

  const onChangePoints = (type) => {
    points[type] = !points[type];
    mapStyles = [];

    for (const [key, value] of Object.entries(points)) {
      if (value) mapStyles.push(...mapPoints[key]);
    }

    map.setOptions({ styles: mapStyles });
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_KEY,
      version: 'weekly',
      libraries: ['places']
    });

    const mapOptions = {
      center: {
        lat: 40.727505,
        lng: -73.9389489
      },
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      styles: mapStyles
    };

    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(googleMap.current, mapOptions);

      // SEARCH BOX -----------------
      const input = document.getElementById('pac-input');
      const searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
      });

      let markers = [];
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        markers.forEach((marker) => {
          marker.setMap(null);
        });

        markers = [];

        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log('Returned place contains no geometry');
            return;
          }
          const marker = new google.maps.Marker({
            map,
            title: place.name,
            position: place.geometry.location,
            address: place.formatted_address,
            open: place.opening_hours.isOpen,
            priceLevel: place.price_level,
            rating: place.rating,
            totalRatings: place.user_ratings_total
          });
          markers.push(marker);

          google.maps.event.addListener(marker, 'click', function (e) {
            e.preventDefault;
            console.log(marker);
            const contentString = `<p>${marker.title}</p>` + `<p>${marker.address}</p>`;
            const infowindow = new google.maps.InfoWindow({
              content: contentString
            });
            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: false
            });
          });

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    });
  });

  return (
    <div className={styles.mapWrap}>
      <input
        id="pac-input"
        className={cx('controls', styles.search)}
        type="text"
        placeholder="Search Box"
      />
      <div className={styles.map} id="map" ref={googleMap} />
      <div className={styles.pointsWrap}>
        {Object.entries(pointsEnum).map(([key, value]) => (
          <button
            key={key}
            className={cx(styles.btn, 'btn', 'btn-primary')}
            onClick={() => onChangePoints(value)}>
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
