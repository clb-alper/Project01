const MainScreen = ({ navigation }) => {

    var [isPress, setIsPress] = React.useState(false);
  
    const [fontsLoaded] = useFonts({
      'Comic-Regular': require('../assets/fonts/ComicNeue-Regular.ttf'),
      'Comic-Light': require('../assets/fonts/ComicNeue-Light.ttf'),
      'Comic-Bold': require('../assets/fonts/ComicNeue-Bold.ttf'),
    });
  
    const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);
  
    if (!fontsLoaded) {
      return null;
    }
  
    var touchPropsLoginButton = {
      activeOpacity: 1,
      underlayColor: '#ffe0e7',
      style: isPress ? styles.loginButtonPressed : styles.loginButton,
      onHideUnderlay: () => setIsPress(false),
      onShowUnderlay: () => setIsPress(true),
      onPress: () => navigation.navigate('Login')
  
    };
    return (
      <View style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <Text>MainScreen</Text>
  
        <TouchableHighlight {...touchPropsLoginButton} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>{"Giriş Yap"}</Text>
        </TouchableHighlight>
      </View>
    )
  }
  
  export default MainScreen
  
  const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.yellowLight
    },
  
    loginButton: {
      alignItems: 'center',
      width: '85%',
      padding: 12,
      backgroundColor: colors.pinkRegular,
      borderWidth: 2,
      borderRadius: 15,
      borderColor: colors.pinkBorder
    },
  
    loginButtonText: {
      fontFamily: 'Comic-Light',
      textAlign: 'center',
      fontSize: 23,
    },
  
  })