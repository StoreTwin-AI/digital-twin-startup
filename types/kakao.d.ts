/* Kakao Maps SDK — minimal typings for MVP */
declare namespace kakao.maps {
  class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
  }

  class Map {
    constructor(container: HTMLElement, options: object);
    setCenter(latlng: LatLng): void;
    setLevel(level: number): void;
    panTo(latlng: LatLng): void;
  }

  class Marker {
    constructor(options: { map: Map; position: LatLng });
    setMap(map: Map | null): void;
    setPosition(position: LatLng): void;
  }

  namespace event {
    function addListener(
      target: Map,
      type: string,
      callback: (mouseEvent: { latLng: LatLng }) => void,
    ): void;
  }

  function load(callback: () => void): void;
}

declare const kakao: {
  maps: typeof kakao.maps;
};

interface Window {
  kakao: typeof kakao;
}
