import React from 'react';
import GoogleMapReact from 'google-map-react';
import homelyLogo from '../../../../../../assets/images/homely.png';

const AnyReactComponent = ({ text }) => (text);

const Map = () => {
  const defaultProps = {
    center: {
      lat: 22.7441,
      lng: 75.8942,
    },
    zoom: 15,
  };

  const products = [
    { id: 1, lat: 22.7441, long: 75.8942, name: 'Product 1' },
    { id: 2, lat: 22.7441, long: 75.8949, name: 'Product 2' },
    // Add more products as needed
  ];

  return (
    <div className='h-screen w-full relative'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDmuAiCyp_op90BX5Mq0azVaMZ9zKGrDI4' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {products.map((product) => (
          <AnyReactComponent
            key={product.id}
            lat={product.lat}
            lng={product.long}
            text={product.name}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
