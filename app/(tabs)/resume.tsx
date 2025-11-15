import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { Image, Platform, StyleSheet, View } from 'react-native';

const PDF_URL_WEB = '/Resume.pdf';
const PDF_ASSET_NATIVE = require('../../assets/images/Resume.pdf'); 

const RESUME_PNG_1 = require('../../assets/images/Resume1.png');
const RESUME_PNG_2 = require('../../assets/images/Resume2.png');

export default function ResumeScreen() {
  // 1. Get screen dimensions and define breakpoint
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 500;
  
  const styles = getStyles(isSmallScreen, height);

  const downloadLocalPDF = async () => {
    try {
      // Get the local asset reference
      const pdf = Asset.fromModule(PDF_ASSET_NATIVE);
      await pdf.downloadAsync();

      // Access cacheDirectory through the FileSystem namespace
      const dest = FileSystem.cacheDirectory + 'Resume.pdf';

      // Copy the downloaded asset file to the cache directory
      await FileSystem.copyAsync({
        from: pdf.localUri!,
        to: dest,
      });

      // Share the file
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

      {/* Download Button (Available on all platforms) */}
      <TouchableOpacity onPress={downloadLocalPDF} style={styles.downloadButton}>
        <ThemedText style={styles.downloadText}>
          Download Resume (PDF)
        </ThemedText>
      </TouchableOpacity>

      {/* ------------------------------------------------------------- */}
      {/* CONTENT DISPLAY: Platform Conditional Rendering */}
      {/* ------------------------------------------------------------- */}
      <View style={styles.contentWrapper}>
        
        {/* WEB VERSION: Display PDF (Hides PNGs) */}
        {Platform.OS === 'web' ? (
          <View style={styles.pdfInnerCard}>
            <iframe
              // Use the static path for the web build
              src={PDF_URL_WEB} 
              style={{
                ...styles.pdf,
                border: 'none',
                width: styles.pdf.width as number | string,
                height: styles.pdf.height as number | string,
              }}
              title="Resume PDF Viewer"
            />
          </View>
        ) : (
          // MOBILE VERSION: Display PNG Images (Hides PDF Viewer)
          <View style={styles.mobileImagesContainer}>
            <Image
              source={RESUME_PNG_1}
              style={styles.mobileImage}
              resizeMode="contain"
            />

            <Image
              source={RESUME_PNG_2}
              style={styles.mobileImage}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    </ParallaxScrollView>
  );
}

const getStyles = (isSmallScreen: boolean, screenHeight: number) => StyleSheet.create({
  headerImage: {
    width: '100%',
    height: isSmallScreen ? 250 : 250,
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

  // General wrapper for PDF/Images, controls max-width and padding
  contentWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 50,
  },

  // Style applied to the container holding the iframe on web
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

  // Style applied to the iframe element on web
  pdf: {
    width: '100%',
    height: Platform.select({
      // Adjusted screen height for web to allow more content viewing
      web: isSmallScreen ? screenHeight * 1.0 : screenHeight * 1.5,
      // Fallback for native, though this block is now hidden on native
      default: screenHeight * (isSmallScreen ? 0.75 : 0.85), 
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
  
  // -----------------------------------------------------------------
  // NEW MOBILE IMAGE STYLES
  // -----------------------------------------------------------------
  mobileImagesContainer: {
    width: '100%', // Match the pdfInnerCard width 
    maxWidth: 1200,
    paddingVertical: 0,
    alignItems: 'center',
  },

  mobileImage: {
    // Ensures the image spans the available width and provides height for scrolling
    width: '100%', 
    height: isSmallScreen ? 490 : 1300, // Large fixed height to make the image clearly readable/scrollable
    minHeight: 300,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#181818',
    borderColor: '#00FFD1',
    borderWidth: 1,
  },

  imageHeader: {
    color: '#00aaff',
    fontSize: isSmallScreen ? 20 : 24,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 5,
    textDecorationLine: 'underline',
  }
});