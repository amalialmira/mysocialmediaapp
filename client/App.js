import { initialWindowMetrics, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import StartPage from './pages/startPage';
import { View } from 'react-native';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import Voom from './pages/Voom';
import Profile from './pages/Profile';
import Detail from './pages/DetailPage';
import AuthProvider from './contexts/auth';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './configs/apolloClient';
import Navigation from './Navigation';



export default function App() {
  return (
    // <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    //   <SafeAreaView style={{  flex: 1 }}>
    //     <StartPage />
    //     {/* <LoginPage/> */}
    //     {/* <Register/> */}
    //     {/* <Voom/> */}
    //     {/* <Profile/> */}
    //     {/* <Detail/> */}
    //   </SafeAreaView>
    // </SafeAreaProvider>
    <>
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <Navigation />
        </ApolloProvider>
      </AuthProvider>
    </>

  );
}


