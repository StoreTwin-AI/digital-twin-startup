"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { KakaoMap } from "@/components/map/KakaoMap";
import { DistrictCard } from "@/components/map/DistrictCard";
import { StepIndicator } from "@/components/layout/StepIndicator";
import { saveDistrict } from "@/lib/session";
import type { District } from "@/lib/types";

export default function MapPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<District | null>(null);

  const handleSelect = useCallback((district: District) => {
    setSelected(district);
    saveDistrict(district);
  }, []);

  const handleContinue = () => {
    if (selected) router.push("/simulate");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          상권 선택
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          지도에서 창업을 검토할 지역을 클릭하세요
        </p>
        <div className="mt-6">
          <StepIndicator current={1} />
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <KakaoMap onSelect={handleSelect} selected={selected} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <DistrictCard district={selected} onContinue={handleContinue} />
        </motion.div>
      </div>
    </div>
  );
}
