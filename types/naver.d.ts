/* Naver Maps SDK minimal typings for TrialSpace MVP */
declare namespace naver.maps {
  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  class Map {
    constructor(container: HTMLElement, options: object);
    panTo(latlng: LatLng): void;
  }

  class Marker {
    constructor(options: { map: Map; position: LatLng });
    setMap(map: Map | null): void;
    setPosition(position: LatLng): void;
  }

  namespace Event {
    function addListener(
      target: Map,
      type: string,
      callback: (event: { coord: LatLng }) => void,
    ): void;
  }
}

declare const naver: {
  maps: typeof naver.maps;
};

interface Window {
  naver: typeof naver;
}
