"use client";

import dynamic from "next/dynamic";
import { Resort } from "@/lib/types";

const ResortMap = dynamic(() => import("@/components/map/resort-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-slate-100 animate-pulse flex items-center justify-center text-slate-500 rounded-xl">
      Loading map...
    </div>
  ),
});

interface Props {
  resorts: Resort[];
  center?: [number, number];
  zoom?: number;
}

export function MapWrapper(props: Props) {
  return <ResortMap {...props} />;
}
