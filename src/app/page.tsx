"use client";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import { PlacesAutocomplete } from "@/components/places-autocomplete";
import { getGeocode, getLatLng } from "use-places-autocomplete";

const DEFAULT_LOCATION = { lat: 53.5511, lng: 9.9937 };
const INITIAL_ZOOM = 12;

export default function Home() {
  const [lat, setLat] = useState(DEFAULT_LOCATION.lat);
  const [lng, setLng] = useState(DEFAULT_LOCATION.lng);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  const libraries = useMemo(() => ["places"], []);

  // This gives coordinates for the center of the map
  const mapCenter = useMemo(() => ({ lat, lng }), [lat, lng]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    [],
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,

    // @ts-expect-error: libraries is really just a string array
    libraries: libraries,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-2">
      <div className="w-full max-w-md mb-2">
        <PlacesAutocomplete
          onAddressSelect={(address) => {
            getGeocode({ address }).then((results) => {
              const { lat, lng } = getLatLng(results[0]);
              setLat(lat);
              setLng(lng);
              setZoom(15);
            });
          }}
        />
      </div>
      <div className="w-full flex-1 max-w-3xl rounded-lg overflow-hidden shadow-md">
        <GoogleMap
          options={mapOptions}
          zoom={zoom}
          center={mapCenter}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerClassName="w-full h-[60vh] sm:h-[70vh]"
          onLoad={() => console.log("Map component loaded")}
        >
          <MarkerF
            position={mapCenter}
            onLoad={() => console.log("Marker loaded")}
          />
        </GoogleMap>
      </div>
    </main>
  );
}
