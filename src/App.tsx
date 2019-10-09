import * as React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Timers from "./components/Timers";

// Components

// Theme
const theme = createMuiTheme({});

// 型定義 Props を定義
type Props = {};

// App Component を定義
const App: React.FC<Props> = () => (
  <ThemeProvider theme={theme}>
    <Timers />
  </ThemeProvider>
);

export default App;
