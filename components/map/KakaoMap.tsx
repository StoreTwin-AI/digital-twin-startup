"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Loader2 } from "lucide-react";
import { KAKAO_MAP_KEY } from "@/lib/constants";
import { findNearestDistrict } from "@/mock/districts";
import type { District } from "@/lib/types";

interface KakaoMapProps {
  onSelect: (district: District) => void;
  selected?: District | null;
}

function loadKakaoScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.kakao?.maps) {
      window.kakao.maps.load(() => resolve());
      return;
    }

    const existing = document.getElementById("kakao-map-sdk");
    if (existing) {
      existing.addEventListener("load", () => {
        window.kakao.maps.load(() => resolve());
      });
      return;
    }

    const script = document.createElement("script");
    script.id = "kakao-map-sdk";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => resolve());
    };
    script.onerror = () => reject(new Error("Kakao Maps SDK load failed"));
    document.head.appendChild(script);
  });
}

export function KakaoMap({ onSelect, selected }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadKakaoScript()
      .then(() => {
        if (cancelled || !mapRef.current) return;

        const center = new kakao.maps.LatLng(37.5665, 126.978);
        const map = new kakao.maps.Map(mapRef.current, {
          center,
          level: 6,
        });
        mapInstance.current = map;

        const marker = new kakao.maps.Marker({ map, position: center });
        markerRef.current = marker;

        kakao.maps.event.addListener(map, "click", (mouseEvent) => {
          const latlng = mouseEvent.latLng;
          const lat = latlng.getLat();
          const lng = latlng.getLng();
          marker.setPosition(latlng);
          map.panTo(latlng);
          const district = findNearestDistrict(lat, lng);
          onSelect(district);
        });

        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setError(
            "??? ???? ?????. API ?? ??? ??? ??????.",
          );
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [onSelect]);

  useEffect(() => {
    if (!selected || !mapInstance.current || !markerRef.current) return;
    const pos = new kakao.maps.LatLng(selected.lat, selected.lng);
    markerRef.current.setPosition(pos);
    mapInstance.current.panTo(pos);
  }, [selected]);

  return (
    <motion.div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-2xl border border-white/10">
      <motion.div
        ref={mapRef}
        className="h-full w-full min-h-[400px] sm:min-h-[480px]"
        style={{ opacity: loading ? 0.3 : 1 }}
      />

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#030712]/90"
        >
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm text-zinc-400">???? ?? ?...</p>
        </motion.div>
      )}

      {error && (
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#030712]/95 p-6 text-center">
          <MapPin className="h-10 w-10 text-red-400" />
          <p className="text-sm text-zinc-300">{error}</p>
          <p className="text-xs text-zinc-500">
            ?? ???: localhost:3000, digitaltwin.dreamhelixion.com
          </p>
        </motion.div>
      )}

      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs text-blue-300 backdrop-blur-md sm:text-sm"
          >
            <MapPin className="h-4 w-4" />
            ??? ??? ??? ?????
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
