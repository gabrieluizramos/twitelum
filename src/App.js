import React from 'react';
import Cabecalho from './components/cabecalho';
import NavMenu from './components/navmenu';

function App() {
  return (
    <div>
      <Cabecalho>
        <NavMenu usuario="@guilhermependezza" />
      </Cabecalho>
    </div>
  );
}

export default App;
