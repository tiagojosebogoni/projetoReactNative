import Reacttron from 'reactotron-react-native'

if (__DEV__){
  const tron = Reacttron.configure({host:'192.168.0.109'}).useReactNative().connect();

  console.tron = tron;

  tron.clear();
}
