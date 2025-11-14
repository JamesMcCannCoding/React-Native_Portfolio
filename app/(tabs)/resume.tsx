import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { Dimensions, Image, Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ResumeScreen() {
  const pdfUri = Platform.OS === 'web' ? './Resume.pdf' : 'https://example.com/Resume.pdf';

  return (
<ParallaxScrollView
  headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }} // fallback color
  headerImage={
      <Image
        source={require('../../assets/images/Space.jpg')}
        style={styles.headerImage}
        resizeMode="cover"
      />
    }
  >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Resume
        </ThemedText>
      </ThemedView>

      <View style={styles.pdfContainer}>
        {Platform.OS === 'web' ? (
          <iframe
            src={pdfUri}
            style={{ ...styles.pdf, border: 'none' }}
            title="Resume PDF"
          />
        ) : (
        <WebView
          originWhitelist={['*']}
          source={{ uri: pdfUri }}
          style={styles.pdf}
          useWebKit={true}
        />
        )}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
pdfContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start', // top-align the PDF
  width: '100%',
  paddingVertical: 20,
},
pdf: {
  width: Platform.OS === 'web'
    ? Math.min(Dimensions.get('window').width * 0.9, 1200) // cap max width on web
    : Dimensions.get('window').width * 0.95,
  height: Platform.OS === 'web'
    ? Dimensions.get('window').height * 1.70
    : Dimensions.get('window').height * 0.9,
  borderRadius: 10,
},
});
