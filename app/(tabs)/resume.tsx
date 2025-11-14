import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { cacheDirectory } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { Dimensions, Image, Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ResumeScreen() {
  const pdfUri =
    Platform.OS === 'web' ? '/Resume.pdf' : 'https://example.com/Resume.pdf';

  const downloadLocalPDF = async () => {
    try {
      const pdf = Asset.fromModule(require('../../assets/Resume.pdf'));
      await pdf.downloadAsync();

      const dest = cacheDirectory + 'Resume.pdf';

      await FileSystem.copyAsync({
        from: pdf.localUri!,
        to: dest,
      });

      await Sharing.shareAsync(dest);
    } catch (error) {
      console.log('Download error:', error);
    }
  };

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
      {/* Title */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Resume
        </ThemedText>
      </ThemedView>

      {/* Download Button */}
      <TouchableOpacity onPress={downloadLocalPDF} style={styles.downloadButton}>
        <ThemedText style={styles.downloadText}>
          Download Resume (PDF)
        </ThemedText>
      </TouchableOpacity>

      {/* PDF Display */}
      <View style={styles.pdfOuterWrapper}>
        <View style={styles.pdfInnerCard}>
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
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  title: {
    fontFamily: Fonts.rounded,
    fontSize: 32,
    textAlign: 'center',
    color: '#fff',
  },

  pdfOuterWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 50,
  },

  pdfInnerCard: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 12,
    borderRadius: 18,
    width: '94%',
    maxWidth: 1200,
    shadowColor: '#00aaff',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    borderWidth: 1,
    borderColor: 'rgba(0,150,255,0.3)',
  },

  pdf: {
    width:
      Platform.OS === 'web'
        ? '100%'
        : Dimensions.get('window').width * 0.9,
    height:
      Platform.OS === 'web'
        ? Dimensions.get('window').height * 1.5
        : Dimensions.get('window').height * 0.85,
    borderRadius: 10,
  },

  downloadButton: {
    backgroundColor: '#00aaff',
    padding: 12,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },

  downloadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
