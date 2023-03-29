import { NativeBaseProvider } from "native-base";
import { theme } from './theme/theme';

import SafeAreaAppBar from "./components/SafeAreaAppBar";
import Router from "./routes/Router";

export default Main = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaAppBar/>
      <Router/>
    </NativeBaseProvider>
  );
}
