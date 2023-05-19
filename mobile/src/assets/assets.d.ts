{/* To allow to import png files */}
declare module '*.png'

{/* Validating svg files in react-native */}
declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}