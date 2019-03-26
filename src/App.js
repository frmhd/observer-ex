import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';

import Sidebar from './Sidebar';
import Content from './Content';
import Header from './Header';
import AppStyled from './styled/AppStyled';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fff;
  }
`

class App extends Component {
  render() {
    return (
      <AppStyled>
        <GlobalStyle />
        <Header />
        <Sidebar />
        <Content />
      </AppStyled>
    );
  }
}

export default App;
