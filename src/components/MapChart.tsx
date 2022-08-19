import clsx from "clsx";
import React from "react";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function MapChart({
  lat,
  long,
  className,
}: {
  lat: number;
  long: number;
  className?: string;
}) {
  return (
    <div className={clsx(className, "overflow-hidden")}>
      <iframe
        className="w-full h-full"
        id="gmap_canvas"
        src={`https://maps.google.com/maps?q=${lat},${long}&t=&z=17&ie=UTF8&iwloc=&output=embed`}
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
      />
    </div>
  );
}
