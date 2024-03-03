import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0; 
  }


  body{
    margin: 0;
    padding: 0;

    font-family: Raleway, sans-serif;
    color: #000;

    background: #fffafa;    
  }

  li{
    list-style-type: none;
  }

  a {
    color: #fffc;
    text-decoration: none;
  }
`
