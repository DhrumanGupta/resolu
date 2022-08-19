import React from "react";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function MapChart({ lat, long }: { lat: number; long: number }) {
  return (
    <div className="mapouter">
      <div className="gmap_canvas">
        <iframe
          width="600"
          height="500"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
        ></iframe>
        <a href="https://fmovies-online.net"></a>
        <br />
        <a href="https://www.embedgooglemap.net">google map for my website</a>
      </div>
    </div>
  );
}
