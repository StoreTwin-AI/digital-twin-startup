"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { LineChart, Shield, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "\uC2E4\uC81C \uC0C1\uAD8C \uB370\uC774\uD130",
    description:
      "\uC11C\uC6B8 \uC8FC\uC694 \uC0C1\uAD8C\uC758 \uC720\uB3D9\uC778\uAD6C, \uC784\uB300\uB8CC, \uACBD\uC7C1 \uBC00\uB3C4\uB97C \uBC18\uC601\uD55C \uB514\uC9C0\uD138 \uD2B8\uC708 \uC2DC\uAE08\uB808\uC774\uC158.",
  },
  {
    icon: LineChart,
    title: "\uB9E4\uCD9C\u00B7\uC720\uB3D9 \uC2DC\uAC01\uD654",
    description:
      "\uC2DC\uAC04\uB300\uBCC4 \uC720\uB3D9\uC778\uAD6C, 6\uAC1C\uC6D4 \uB9E4\uCD9C \uCD94\uC774, \uC18C\uBE44\uCE35 \uBE44\uC728\uC744 \uCC28\uD2B8\uB85C \uD55C\uB208\uC5D0 \uD655\uC778.",
  },
  {
    icon: Shield,
    title: "\uB9AC\uC2A4\uD06C \uC0AC\uC804 \uC810\uAC80",
    description:
      "\uACBD\uC7C1 \uAC15\uB3C4\uC640 \uC131\uACF5 \uD655\uB960\uC744 \uBD84\uC11D\uD574 \uCC3D\uC5C5 \uC804 \uC758\uC0AC\uACB0\uC815 \uB9AC\uC2A4\uD06C\uB97C \uC904\uC785\uB2C8\uB2E4.",
  },
  {
    icon: Zap,
    title: "\uC989\uC2DC AI \uC778\uC0AC\uC774\uD2B8",
    description:
      "\uC22B\uC790\uB9CC\uC774 \uC544\uB2CC, \uC2E4\uD589 \uAC00\uB2A5\uD55C \uC804\uB7B5 \uBB38\uC7A5\uAE4C\uC9C0 AI\uAC00 \uC81C\uC548\uD569\uB2C8\uB2E4.",
  },
];

export function Features() {
  return (
    <section className="border-t border-white/5 px-4 py-20 sm:px-6">
      <motion.div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {"\uCC3D\uC5C5 \uC2E4\uD5D8\uC2E4, TrialSpace"}
          </h2>
          <p className="mt-4 text-zinc-400">
            {"Vercel\u00B7Stripe\uAE09 SaaS UX\uB85C \uC124\uACC4\uB41C \uBC1C\uD45C\uC6A9 MVP"}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <GlassCard hover delay={i * 0.05} className="h-full">
                <f.icon className="mb-4 h-8 w-8 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {f.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
