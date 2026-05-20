"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, MapPin } from "lucide-react";
import { fetchNearestDistrict } from "@/lib/api-client";
import { NAVER_MAP_CLIENT_ID } from "@/lib/constants";
import type { District } from "@/lib/types";

interface NaverMapProps {
  onSelect: (district: District) => void;
  selected?: District | null;
}

function loadNaverScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.naver?.maps) {
      resolve();
      return;
    }

    const existing = document.getElementById("naver-map-sdk");
    if (existing) {
      if (!window.naver?.maps) {
        existing.remove();
      } else {
        resolve();
        return;
      }
    }

    const finish = () => {
      if (window.naver?.maps) {
        resolve();
        return;
      }

      reject(new Error("Naver Maps SDK loaded without maps API"));
    };

    const script = document.createElement("script");
    script.id = "naver-map-sdk";
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    script.onload = finish;
    script.onerror = () => reject(new Error("Naver Maps SDK load failed"));
    document.head.appendChild(script);
  });
}

export function NaverMap({ onSelect, selected }: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const [loading, setLoading] = useState(true);
  const [resolvingDistrict, setResolvingDistrict] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadNaverScript()
      .then(() => {
        if (cancelled || !mapRef.current) return;

        const center = new naver.maps.LatLng(37.5665, 126.978);
        const map = new naver.maps.Map(mapRef.current, {
          center,
          zoom: 12,
        });
        mapInstance.current = map;

        const marker = new naver.maps.Marker({ map, position: center });
        markerRef.current = marker;

        naver.maps.Event.addListener(map, "click", async (event) => {
          const latlng = event.coord;
          marker.setPosition(latlng);
          map.panTo(latlng);
          setResolvingDistrict(true);

          try {
            const district = await fetchNearestDistrict(latlng.lat(), latlng.lng());
            onSelect(district);
          } catch (apiError) {
            console.error("[TrialSpace] fetchNearestDistrict failed:", apiError);
            setError("상권 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
          } finally {
            setResolvingDistrict(false);
          }
        });

        setLoading(false);
      })
      .catch((loadError) => {
        console.error("[TrialSpace] Naver Maps load failed:", loadError);
        if (!cancelled) {
          setError("네이버 지도를 불러오지 못했습니다. API 키와 허용 도메인을 확인해 주세요.");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [onSelect]);

  useEffect(() => {
    if (!selected || !mapInstance.current || !markerRef.current) return;
    const pos = new naver.maps.LatLng(selected.lat, selected.lng);
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

      {(loading || resolvingDistrict) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#030712]/80"
        >
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm text-zinc-400">
            {loading ? "지도를 불러오는 중..." : "상권을 분석하는 중..."}
          </p>
        </motion.div>
      )}

      {error && !loading && (
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#030712]/95 p-6 text-center">
          <MapPin className="h-10 w-10 text-red-400" />
          <p className="text-sm text-zinc-300">{error}</p>
          <p className="text-xs text-zinc-500">
            허용 도메인: localhost:3000, 127.0.0.1:3000, 배포 도메인
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
            지도에서 분석할 위치를 클릭하세요
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
