import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ResumeScreen() {
  // 1. Get screen dimensions and define breakpoint
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 500;
  
  // 2. Get dynamic styles
  const styles = getStyles(isSmallScreen, height);

  // State to hold the local URI for native platforms
  const [localPdfUri, setLocalPdfUri] = useState<string | null>(null);

  // Load the PDF asset locally on native platforms
  useEffect(() => {
    const loadPdfAsset = async () => {
      // Only run this logic on native platforms
      if (Platform.OS !== 'web') {
        try {
          // Download the asset from the module cache to the local file system
          const pdf = Asset.fromModule(require('../../assets/Resume.pdf'));
          await pdf.downloadAsync();
          
          // The localUri property points to the file path the WebView can use
          if (pdf.localUri) {
            setLocalPdfUri(pdf.localUri);
          }
        } catch (error) {
          console.error('Error loading PDF asset for WebView:', error);
        }
      } else {
        // For web, the URI is immediately ready
        setLocalPdfUri('/Resume.pdf');
      }
    };
    loadPdfAsset();
  }, []); 

  // The PDF URI for the viewer
  // FIX: Use the dynamically loaded localPdfUri for native, and the standard path for web.
  const pdfUri = Platform.select({
    web: '/Resume.pdf', 
    default: localPdfUri, 
  });

  const downloadLocalPDF = async () => {
    try {
      // 1. Get the local asset reference
      const pdf = Asset.fromModule(require('../../assets/images/Resume.pdf'));
      await pdf.downloadAsync();

      // Access cacheDirectory through the FileSystem namespace
      const dest = FileSystem.cacheDirectory + 'Resume.pdf';

      // 2. Copy the downloaded asset file to the cache directory
      await FileSystem.copyAsync({
        from: pdf.localUri!,
        to: dest,
      });

      // 3. Share the file
      await Sharing.shareAsync(dest);
    } catch (error) {
      console.log('Download error:', error);
    }
  };

  // Conditionally render a loading view if on native and URI is not ready
  const isNativeLoading = Platform.OS !== 'web' && !pdfUri;

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
          {isNativeLoading ? (
             <View style={styles.loadingContainer}>
                <ThemedText style={styles.loadingText}>Loading Resume for PDF Viewer...</ThemedText>
             </View>
          ) : Platform.OS === 'web' ? (
            <iframe
              src={pdfUri as string} 
              style={{
                ...styles.pdf,
                border: 'none',
                width: styles.pdf.width as number | string,
                height: styles.pdf.height as number | string,
              }}
              title="Resume PDF"
            />
          ) : (
            // FIX: Uses local file URI and requires allowFileAccess for Android.
            <WebView
              originWhitelist={['*']}
              source={{ uri: pdfUri as string }} 
              style={styles.pdf}
              useWebKit={true}
              allowFileAccess={true} 
            />
          )}
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const getStyles = (isSmallScreen: boolean, screenHeight: number) => StyleSheet.create({
  headerImage: {
    width: '100%',
    height: isSmallScreen ? 200 : 250,
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: isSmallScreen ? 15 : 20,
  },

  title: {
    fontFamily: Fonts.rounded,
    fontSize: isSmallScreen ? 24 : 32,
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
    padding: isSmallScreen ? 8 : 12,
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
    width: '100%',
    height: Platform.select({
      default: screenHeight * (isSmallScreen ? 0.75 : 0.85),
      web: isSmallScreen ? screenHeight * 1.0 : screenHeight * 1.5,
    }),
    borderRadius: 10,
  },

  downloadButton: {
    backgroundColor: '#00aaff',
    padding: isSmallScreen ? 10 : 12,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: isSmallScreen ? 15 : 20,
  },

  downloadText: {
    color: '#fff',
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: 'bold',
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },

  loadingText: {
    color: '#fff',
    fontSize: isSmallScreen ? 16 : 18,
  }
});