import { normalize } from 'styled-normalize';
import { injectGlobal } from 'styled-components';
import JosefinSansSemiBold from '../assets/fonts/JosefinSans-SemiBold.ttf';
import JosefinSansBold from '../assets/fonts/JosefinSans-Bold.ttf';
import JosefinSansRegular from '../assets/fonts/JosefinSans-Regular.ttf';
import JosefinSansItalic from '../assets/fonts/JosefinSans-Italic.ttf';
import JosefinSansLight from '../assets/fonts/JosefinSans-Light.ttf';
import JosefinSansLightItalic from '../assets/fonts/JosefinSans-LightItalic.ttf';

injectGlobal`
  @font-face {
    font-family: 'Josefin Sans';
    src: url(${JosefinSansRegular}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Josefin Sans';
    src: url(${JosefinSansBold}) format('truetype');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'Josefin Sans';
    src: url(${JosefinSansItalic}) format('truetype');
    font-weight: normal;
    font-style: italic;
  }
  @font-face {
    font-family: 'Josefin Sans';
    src: url(${JosefinSansLight}) format('truetype');
    font-weight: lighter;
    font-style: normal;
  }
  @font-face {
    font-family: 'Josefin Sans';
    src: url(${JosefinSansLightItalic}) format('truetype');
    font-weight: lighter;
    font-style: italic;
  }
  body {
    font-family: 'Josefin Sans';
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    @media (max-width: 1279px) {
      font-size: 16px;
    }
    height: calc(100vh - 4.5em);
  }
  #root {
    height: 100%;
  }
  ${normalize}
`;
