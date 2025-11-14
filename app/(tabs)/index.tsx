import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedView } from '@/components/themed-view';
import { Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#111', dark: '#111' }}
      headerImage={
        <Image
          source={require('../../assets/images/Space.jpg')}
          style={styles.headerImage}
          resizeMode="cover"
        />
      }
    >
      <ThemedView style={[styles.container, { backgroundColor: '#111' }]}>
        {/* Left Side - Text Section */}
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

        {/* Right Side - Emoji */}
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/emoji.jpg')}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
      </ThemedView>

{/* Map */}
<Text style={styles.introText}>Location:</Text>
<Text style={styles.role}>Queensland University of Technology</Text>
<View style={styles.mapContainer}>
  {Platform.OS === 'web' ? (
    <iframe
      src="https://www.openstreetmap.org/export/embed.html?bbox=153.02%2C-27.48%2C153.03%2C-27.47&layer=mapnik&marker=-27.4778%2C153.0281"
      style={{
        border: 0,
        width: 200,
        height: 200,
        borderRadius: 15,
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.4)',
      }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  ) : (
    <WebView
      source={{
        uri:
          'https://www.openstreetmap.org/export/embed.html?bbox=153.02%2C-27.48%2C153.03%2C-27.47&layer=mapnik&marker=-27.4778%2C153.0281',
      }}
      style={{
        width: 800,
        height: 800,
        borderRadius: 15,
        overflow: 'hidden',
      }}
    />
  )}
</View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#111',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  maxWidth: 1200, // 👈 restricts total width
  alignSelf: 'center', // 👈 centers content on wide monitors
  width: '100%',
},
  headerImage: {
    width: '100%',
    height: 250,
  },
  textSection: {
    flex: 1,
    paddingRight: 10,
  },
  introText: {
    color: '#00FFD1',
    fontSize: 16,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  name: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  role: {
    color: '#00FFD1',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00FFD1',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#111',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
  },
mapContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 20,
}
});
