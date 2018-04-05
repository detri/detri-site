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
    @media (max-width: 768px) {
      font-size: 16px;
    }
    height: calc(100vh - 4.5em);
  }
  #root {
    height: 100%;
  }
  :not(#modal).router-enter {
    opacity: 0;
  }
  :not(#modal).router-enter.router-enter-active {
    opacity: 1;
    transition: opacity 1s ease-in;
  }
  :not(#modal).router-exit {
    opacity: 1;
  }
  :not(#modal).router-exit.router-exit-active {
    opacity: 0;
    transition: opacity 1s ease-out;
  }
  #modal {
    opacity: 0;
    visibility: hidden;
  }
  #modal.router-enter {
    opacity: 0;
    visibility: visible;
  }
  #modal.router-enter.router-enter-active {
    background-color: #000;
    opacity: 0.7;
    transition: opacity 1s ease-in, background-color 1s ease-in;
  }
  #modal.router-enter.router-enter-done {
    background-color: #000;
    opacity: 0.7;
    display: none;
  }
  #modal.router-exit {
    background-color: #000;
    opacity: 0.7;
  }
  #modal.router-exit.router-exit-active {
    opacity: 0;
    background-color: transparent;
    transition: opacity 1s ease-out, background-color 1s ease-out;
  }
  #modal.router-exit.router-exit-done {
    opacity: 0;
    background-color: transparent;
    display: none;
  }
  ${normalize}
`;
