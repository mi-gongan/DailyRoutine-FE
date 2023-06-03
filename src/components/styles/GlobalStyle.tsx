import { Global } from "@emotion/react"
import { color } from "./colors";

export const GlobalStyle = () => <Global
  styles={`
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-Thin.woff') format('woff');
      font-weight: 250;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-ExtraLight.woff') format('woff');
      font-weight: 265;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-Light.woff') format('woff');
      font-weight: 300;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-Medium.woff') format('woff');
      font-weight: 400;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-Regular.woff') format('woff');
      font-weight: 400;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-Medium.woff') format('woff');
      font-weight: 500;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-SemiBold.woff') format('woff');
      font-weight: 600;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-Bold.woff') format('woff');
      font-weight: 700;
    }
    @font-face {
      font-family: 'Rota';
      src: url('/fonts/Rota-ExtraBold.woff') format('woff');
      font-weight: 800;
    }
    
    body {
      margin: 0 auto;
      width: 100%;
      max-width: 500px;
      min-height: 100vh;
      background: ${color.background.main};
      color: ${color.white};
      font-family: 'Rota', sans-serif !important;
      user-select: none;

      > #__next {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
    }
    body::-webkit-scrollbar {
      display: none;
    }
  `}
/>;
