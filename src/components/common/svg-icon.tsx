import * as React from "react";
import Svg, { Defs, G, Path, SvgProps } from "react-native-svg";

export function ArchiveInputFill(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 4a1 1 0 00-1 1v2a1 1 0 001 1h16a1 1 0 001-1V5a1 1 0 00-1-1H4zm0 6l.82 8.199A2 2 0 006.81 20h10.38a2 2 0 001.99-1.801L20 10H4zm6 3a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1v-1a1 1 0 10-2 0v1h-1z"
        fill={props.color ? props.color : "#ffff"}
      />
    </Svg>
  );
}

export function ClipboardPlusOutline(props: SvgProps) {
  return (
    <Svg width={28} height={30} viewBox="0 0 28 30" fill="none" {...props}>
      <G filter="url(#filter0_d_2208_1358)">
        <Path
          d="M18 3c2.175.012 3.353.109 4.121.877C23 4.756 23 6.17 23 8.998v6c0 2.829 0 4.243-.879 5.122-.878.878-2.293.878-5.121.878h-6c-2.828 0-4.243 0-5.121-.878C5 19.24 5 17.827 5 14.998v-6c0-2.828 0-4.242.879-5.121C6.647 3.109 7.825 3.012 10 3"
          stroke="#F4F4F5"
          strokeWidth={1.5}
        />
      </G>
      <Path
        d="M10 2.5A1.5 1.5 0 0111.5 1h5A1.5 1.5 0 0118 2.5v1A1.5 1.5 0 0116.5 5h-5A1.5 1.5 0 0110 3.5v-1z"
        stroke="#F4F4F5"
        strokeWidth={1.5}
      />
      <Path
        d="M17 12h-3m0 0h-3m3 0V9m0 3v3"
        stroke="#F4F4F5"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Defs></Defs>
    </Svg>
  );
}
