// PlatformIconMap.tsx
import React, { JSX } from "react";
import { SiPlaystation, SiNintendoswitch, SiNintendo, SiApple, SiAndroid } from "react-icons/si"; 
import { FaLinux, FaXbox, FaWindows} from "react-icons/fa";
import { PlatformEnum } from "@/models/Enums/PlatformEnum";

// Map from PlatformEnum value to JSX icon
export const PlatformIconMap: Record<number, JSX.Element> = {
  [PlatformEnum.XboxSeriesXS]: <FaXbox  />,
  [PlatformEnum.XboxOne]: <FaXbox  />,
  [PlatformEnum.Xbox360]: <FaXbox  />,
  [PlatformEnum.Xbox]: <FaXbox  />,

  [PlatformEnum.PlayStation5]: <SiPlaystation  />,
  [PlatformEnum.PlayStation4]: <SiPlaystation  />,
  [PlatformEnum.PlayStation3]: <SiPlaystation  />,
  [PlatformEnum.PlayStation2]: <SiPlaystation  />,
  [PlatformEnum.PlayStation]: <SiPlaystation  />,
  [PlatformEnum.PlayStationVita]: <SiPlaystation  />,
  [PlatformEnum.PlayStationPortable]: <SiPlaystation  />,

  [PlatformEnum.NintendoSwitch]: <SiNintendoswitch  />,
  [PlatformEnum.NintendoSwitch2]: <SiNintendoswitch  />,
  [PlatformEnum.NintendoGameCube]: <SiNintendo  />,
  [PlatformEnum.NintendoDS]: <SiNintendo  />,
  [PlatformEnum.Nintendo3DS]: <SiNintendo  />,
  [PlatformEnum.Wii]: <SiNintendo  />,
  [PlatformEnum.WiiU]: <SiNintendo  />,

  [PlatformEnum.PC_MicrosoftWindows]: <FaWindows  />,
  [PlatformEnum.Linux]: <FaLinux  />,
  [PlatformEnum.Mac]: <SiApple  />,
  [PlatformEnum.iOS]: <SiApple  />,
  [PlatformEnum.Android]: <SiAndroid  />,
};
