// helpers/platformDisplay.tsx
import React from "react";
import { PlatformEnum } from "@/models/Enums/PlatformEnum";
import { PlatformIconMap } from "@/models/Enums/PlatformEnumIconMap";


export function renderPlatform(platformId: number) {
  if (PlatformIconMap[platformId]) {
    return PlatformIconMap[platformId]; // Show icon
  } else {
    // No known icon → show text
    const name = PlatformEnum[platformId] ?? "Unknown Platform";
    return <span className="text-xs text-gray-300">{name}</span>;
  }
}
