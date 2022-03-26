import { useContext, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import * as styles from './index.module.sass';
import { points as mapPoints, pointsEnum } from './points';
import cx from 'classnames';
import ShowToolbarButton from '../Toolbar/ShowToolbarButton';
import { ModalStateConsumer } from '../../context/ModalContext';
import { MarkersDataContext } from '../../context/MarkersDataContext';

export default function Map() {
  const { markersData, setMarkersData } = useContext(MarkersDataContext);
  const googleMap = useRef(null);
  const points = { metro: false, poi: false };
  let mapStyles = [];
  let map;

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

  const onChangePoints = (type) => {
    points[type] = !points[type];
    mapStyles = [];

    for (const [key, value] of Object.entries(points)) {
      if (value) mapStyles.push(...mapPoints[key]);
    }

    map.setOptions({ styles: mapStyles });
  };

  const markerEvent = (google, marker, markerTemp) => {
    google.maps.event.addListener(marker, 'click', function (e) {
      e.preventDefault;

      document
        .getElementById('actionButton')
        .setAttribute('data-value', JSON.stringify({ ...markerTemp, map: null }));

      new google.maps.InfoWindow({
        content:
          `<p class="title">${marker?.title}</p>` +
          `<p>${marker?.address}</p>` +
          `<p><span>Oceny: </span>${marker?.rating}/${marker?.totalRatings}</p>` +
          `<p><span>Poziom cenowy: </span>${marker?.priceLevel}</p>` +
          `<a href="https://www.google.com/maps/place/?q=place_id:${marker?.placeId}" target="_blank" class="btn btn-primary">Pokaż w Google Maps</a>` +
          `<button class="btn btn-primary" type="button" onclick="document.getElementById('actionButton').click();">Dodaj do list</button>`
      }).open({
        anchor: marker,
        map,
        shouldFocus: false
      });
    });
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_KEY,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(googleMap.current, mapOptions);

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

          const markerTemp = {
            map,
            title: place.name,
            position: place.geometry.location,
            address: place.formatted_address,
            priceLevel: place.price_level,
            rating: place.rating,
            totalRatings: place.user_ratings_total,
            placeId: place.place_id
          };

          const marker = new google.maps.Marker(markerTemp);
          markers.push(marker);

          markerEvent(google, marker, markerTemp);

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    });
  }, setMarkersData);

  return (
    <div className={styles.mapWrap}>
      <div className={styles.searchWrap}>
        <input
          id="pac-input"
          className={cx('controls', styles.search)}
          type="text"
          placeholder="Search Box"
        />
        <ShowToolbarButton />
      </div>
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
      <ModalStateConsumer>
        {({ toggleState }) => (
          <button id="actionButton" type="button" onClick={(e) => toggleState(e)} />
        )}
      </ModalStateConsumer>
    </div>
  );
}
