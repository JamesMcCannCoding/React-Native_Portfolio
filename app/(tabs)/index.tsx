import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  // 1. Use useWindowDimensions to get real-time screen dimensions
  const { width } = useWindowDimensions();
  
  // 2. Define a breakpoint (e.g., screens narrower than 500px are considered 'small')
  const isSmallScreen = width < 500;

  // 3. Get styles dynamically based on the screen size
  const styles = getStyles(isSmallScreen);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#111', dark: '#111' }}
      headerImage={
        <Image
          // Assuming this path is correct for your project structure
          source={require('../../assets/images/Space.jpg')} 
          style={styles.headerImage}
          resizeMode="cover"
        />
      }
    >

      {/* ---- Profile Section ---- */}
      <View style={styles.sectionCard}>
        <View style={styles.profileRow}>

          {/* Left - Text */}
          <View style={styles.textSection}>
            <Text style={styles.introText}>Hi there 👋 I'm</Text>
            <Text style={styles.name}>James McCann</Text>
            <Text style={styles.role}>Full Stack Developer 💻</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('mailto:james.mccann97@outlook.com')}
            >
              <Text style={styles.buttonText}>Hire Me</Text>
            </TouchableOpacity>
          </View>

          {/* Right - Avatar */}
          <View style={styles.imageSection}>
            <Image
              source={require('@/assets/images/emoji.jpg')}
              style={styles.avatar}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* ---- Location Section ---- */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>📍 Location</Text>
        <Text style={styles.sectionSubtitle}>Queensland University of Technology (QUT) – Brisbane</Text>

        <View style={styles.mapContainer}>
          {Platform.OS === 'web' ? (
            // Note: In React Native Web, using an iframe directly often works better
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=153.02%2C-27.48%2C153.03%2C-27.47&layer=mapnik&marker=-27.4778%2C153.0281"
              style={{
                border: 0,
                width: isSmallScreen ? 200 : 250, // Responsive map size
                height: isSmallScreen ? 200 : 250, // Responsive map size
                borderRadius: 15,
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.4)',
              }}
              loading="lazy"
            ></iframe>
          ) : (
            // For native mobile (iOS/Android), use WebView
            <WebView
              source={{
                uri:
                  'https://www.openstreetmap.org/export/embed.html?bbox=153.02%2C-27.48%2C153.03%2C-27.47&layer=mapnik&marker=-27.4778%2C153.0281',
              }}
              style={{
                width: isSmallScreen ? 200 : 250, // Responsive map size
                height: isSmallScreen ? 200 : 250, // Responsive map size
                borderRadius: 15,
                overflow: 'hidden',
              }}
            />
          )}
        </View>
      </View>

    </ParallaxScrollView>
  );
}

// 4. Create a function to generate the StyleSheet dynamically
const getStyles = (isSmallScreen: boolean) => StyleSheet.create({
  headerImage: {
    width: '100%',
    height: isSmallScreen ? 200 : 250,
  },

  /* Card Container for Each Section */
  sectionCard: {
    backgroundColor: '#181818',
    // Reduced padding for small screens
    padding: isSmallScreen ? 15 : 20, 
    marginVertical: 15,
    borderRadius: 20,
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    shadowColor: '#00ffd1',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Add elevation for Android shadow support
    elevation: 5, 
  },

  /* Profile Row */
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textSection: {
    flex: 1,
    paddingRight: isSmallScreen ? 10 : 20,
  },

  imageSection: {
    alignItems: 'center',
  },

  introText: {
    color: '#00FFD1',
    // Responsive Font Size adjustment
    fontSize: isSmallScreen ? 14 : 16, 
    marginBottom: 5,
    textTransform: 'uppercase',
  },

  name: {
    color: '#fff',
    // Responsive Font Size adjustment (the largest text)
    fontSize: isSmallScreen ? 28 : 34, 
    fontWeight: 'bold',
    marginBottom: 8,
  },

  role: {
    color: '#00FFD1',
    // Responsive Font Size adjustment
    fontSize: isSmallScreen ? 16 : 18, 
    fontWeight: '600',
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#00FFD1',
    // Reduced button padding
    paddingVertical: isSmallScreen ? 10 : 12, 
    paddingHorizontal: isSmallScreen ? 20 : 25, 
    borderRadius: 25,
    alignSelf: 'flex-start',
  },

  buttonText: {
    color: '#111',
    // Responsive Font Size adjustment
    fontSize: isSmallScreen ? 14 : 16, 
    fontWeight: 'bold',
  },

  avatar: {
    // Responsive Avatar Size
    width: isSmallScreen ? 120 : 150, 
    height: isSmallScreen ? 120 : 150,
    borderRadius: 100,
  },

  /* Location Section */
  sectionTitle: {
    color: '#fff',
    // Responsive Font Size adjustment
    fontSize: isSmallScreen ? 20 : 22, 
    fontWeight: 'bold',
    marginBottom: 8,
  },

  sectionSubtitle: {
    color: '#00FFD1',
    // Responsive Font Size adjustment
    fontSize: isSmallScreen ? 14 : 16, 
    marginBottom: 15,
  },

  mapContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});