import React from 'react';
import './config/ReacttotronConfig'
import { StatusBar } from 'react-native'

import Routes from './routes'

export default function src() {
  return(
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
      <Routes />
    </>
  );
}
