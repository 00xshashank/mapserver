import React, { useRef, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import MapView, { UrlTile, Marker, Polyline, MapViewProps } from 'react-native-maps';

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface MapWithOsmProps {
  coords?: LatLng[];
}

const BENGALURU_CENTER = {
  latitude: 12.9716,
  longitude: 77.5946,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2,
};

const Map: React.FC<MapWithOsmProps> = ({ coords = [] }) => {
  const mapRef = useRef<MapViewProps & { fitToCoordinates: (coords: LatLng[], options: any) => void }>(null);

  const initialRegion = useMemo(() => {
    if (coords.length === 1) {
      const { latitude, longitude } = coords[0];
      return { latitude, longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 };
    }
    return BENGALURU_CENTER;
  }, [coords]);

  useEffect(() => {
    if (coords.length > 1 && mapRef.current) {
      mapRef.current.fitToCoordinates(coords, {
        edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
        animated: true,
      });
    }
  }, [coords]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef as any}
        style={{ flex: 1 }}
        initialRegion={initialRegion}
      >
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          tileSize={256}
          zIndex={-1}
        />

        {coords.length === 0 && (
          <Marker coordinate={BENGALURU_CENTER} title="Bengaluru" />
        )}

        {coords.length === 1 && (
          <Marker coordinate={coords[0]} title="Location" />
        )}

        {coords.length > 1 && (
          <>
            <Polyline coordinates={coords} strokeWidth={4} lineCap="round" lineJoin="round" />
            <Marker coordinate={coords[0]} title="Start" pinColor="green" />
            <Marker coordinate={coords[coords.length - 1]} title="End" pinColor="red" />
          </>
        )}
      </MapView>
    </View>
  );
};

export default Map;
