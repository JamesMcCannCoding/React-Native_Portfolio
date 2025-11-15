import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';

export default function TabFourScreen() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 500;
  const styles = getStyles(isSmallScreen);

  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/JamesMcCannCoding/repos?sort=updated'
        );
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
      }
    };

    fetchRepos();
  }, []);

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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.pageTitle}>
          Portfolio
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.sectionCard}>
        <ThemedText style={styles.sectionTitle}>
          Showcase Projects
        </ThemedText>

        <View style={styles.listItem}>
          <ThemedText style={styles.listText}>
            CFMEU IT Support Office – Full Stack App Development → 
            <ExternalLink href="https://www.cfmeu-online.com.au">
              <ThemedText type="link"> CFMEU Sign-in App Project</ThemedText>
            </ExternalLink>
          </ThemedText>
        </View>

        <View style={styles.listItem}>
          <ThemedText style={styles.listText}>
            E-commerce website development (Shopify & WordPress) →
            <ExternalLink href="https://www.lumenari.com.au/Products/USB_Sunset_Lamp/p1.php">
              <ThemedText type="link"> Lumenari.com.au</ThemedText>
            </ExternalLink>
          </ThemedText>
        </View>

        <View style={styles.listItem}>
          <ThemedText style={styles.listText}>
            University Full Stack Assignments → 
            <ExternalLink href="https://www.github.com/JamesMcCannCoding">
              <ThemedText type="link"> GitHub Portfolio</ThemedText>
            </ExternalLink>
          </ThemedText>
        </View>
      </ThemedView>

      <View style={styles.gitHubTitleContainer}>
        <ThemedText style={styles.sectionTitle}>GitHub Projects</ThemedText>
      </View>

      {/* FIX: Replaced FlatList with a standard View and map() to avoid nesting VirtualizedLists */}
      <View style={styles.repoListContainer}>
        {repos.map((item) => (
          <ThemedView key={item.id.toString()} style={styles.repoCard}>
            <ThemedText style={styles.repoTitle}>{item.name}</ThemedText>

            {item.description ? (
              <ThemedText style={styles.repoDescription}>
                {item.description}
              </ThemedText>
            ) : null}

            <ExternalLink href={item.html_url}>
              <ThemedText type="link">View on GitHub</ThemedText>
            </ExternalLink>
          </ThemedView>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

const getStyles = (isSmallScreen: boolean) => StyleSheet.create({
  headerImage: {
    width: '100%',
    height: isSmallScreen ? 250 : 250,
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: isSmallScreen ? 5 : 10,
  },

  pageTitle: {
    fontFamily: Fonts.rounded,
    color: '#fff',
    fontSize: isSmallScreen ? 28 : 32,
  },

  sectionCard: {
    backgroundColor: '#181818',
    padding: isSmallScreen ? 15 : 20,
    marginVertical: 15,
    borderRadius: 20,
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    shadowColor: '#00FFD1',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Add elevation for Android shadow support
    elevation: 5,
  },

  gitHubTitleContainer: {
    width: '90%', 
    maxWidth: 900, 
    alignSelf: 'center', 
    marginVertical: isSmallScreen ? 10 : 15,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: isSmallScreen ? 20 : 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  listItem: {
    marginBottom: isSmallScreen ? 8 : 12,
  },

  listText: {
    color: '#ccc',
    fontSize: isSmallScreen ? 14 : 16,
    marginBottom: 4,
  },
  
  // New container style to ensure content scrolling is still smooth
  repoListContainer: {
    paddingBottom: 50,
  },

  repoCard: {
    backgroundColor: '#181818',
    padding: isSmallScreen ? 15 : 20,
    marginVertical: 8,
    borderRadius: 20,
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    shadowColor: '#00FFD1',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Add elevation for Android shadow support
    elevation: 5,
  },

  repoTitle: {
    color: '#fff',
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  repoDescription: {
    color: '#ccc',
    marginBottom: 10,
    fontSize: isSmallScreen ? 13 : 15,
  },
});