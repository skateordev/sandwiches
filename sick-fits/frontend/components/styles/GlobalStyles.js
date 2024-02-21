import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'a_dripping_marker';
    src: url('/static/a-dripping-marker.woff2') format('woff2');
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-style: normal;
    font-weight: normal;
  }

  :root {
    --logoFont: 'a_dripping_marker', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --bodyFont: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    font-size: 16px;
  }

  html {
    --red: #f00;
    --grey: #444;
    --gray: var(--grey);
    --black: #222;
    --white: #fff;
    --offWhite: #f1f1f1;
    --maxWidth: 1600px;
    --lightGrey: #cdcdcd;
    --lightGray: var(--lightGrey);
    --boxShadow: 0 12px 12px 0 rgba(0,0,0,0.13);

    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-family: var(--bodyFont);
    line-height: 1.2;

    a {
      color: var(--black);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    button {
      font-family: var(--bodyFont);
    }

    button:hover {
      cursor: pointer;
    }
  }
`;

export default GlobalStyles;
