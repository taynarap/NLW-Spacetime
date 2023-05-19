import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, View } from 'react-native';

{/* Import Fonts */}
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import {
  BaiJamjuree_700Bold
} from '@expo-google-fonts/bai-jamjuree'

import blurbg from './src/assets/bg-blur.png'

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

  {/* Only return info after fonts have been loaded */}
  if(!hasLoadedFonts){
    return null
  }

  return (
    <ImageBackground source={blurbg} 
    className='bg-gray-900 flex-1 relative' 
    imageStyle={{position: 'absolute', left: '-100%'}}>

      <StatusBar style="light" translucent/>
    </ImageBackground>
  );
}
