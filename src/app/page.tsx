"use client";

import { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { AutocompleteWebComponent } from "@/components/autocomplete-webcomponent";
import AutocompleteResult from "@/components/autocomplete-result";
import Place = google.maps.places.Place;

export default function Home() {
  const [selectedPlace, setSelectedPlace] =  useState<Place | null>(null);

  return (
    <main>
      <APIProvider
        apiKey={"api-key"}
        version={"beta"}
      >
        <Map
          mapId={"49ae42fed52588c3"}
          defaultZoom={3}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <AutocompleteWebComponent onPlaceSelect={setSelectedPlace} />

          <AutocompleteResult place={selectedPlace} />
        </Map>
      </APIProvider>
    </main>
  );
}
