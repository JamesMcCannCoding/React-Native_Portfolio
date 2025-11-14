import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

export default function TabFourScreen() {
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
      {/* Page Title */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.pageTitle}>
          Portfolio
        </ThemedText>
      </ThemedView>

      {/* Showcase Projects Section */}
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

      <View style={{ width: '90%', maxWidth: 900, alignSelf: 'center', marginVertical: 15 }}>
        <ThemedText style={styles.sectionTitle}>GitHub Projects</ThemedText>
      </View>

      <FlatList
        data={repos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <ThemedView style={styles.repoCard}>
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
        )}
      />
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
    marginBottom: 10,
  },

  pageTitle: {
    fontFamily: Fonts.rounded,
    color: '#fff',
    fontSize: 32,
  },

  /* Shared Card Style (matching index.tsx) */
  sectionCard: {
    backgroundColor: '#181818',
    padding: 20,
    marginVertical: 15,
    borderRadius: 20,
    width: '90%',
    maxWidth: 900,
    alignSelf: 'center',
    shadowColor: '#00FFD1',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  listItem: {
    marginBottom: 12,
  },

  listText: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 4,
  },

  /* Repo Card Style (same as sectionCard) */
  repoCard: {
    backgroundColor: '#181818',
    padding: 20,
    marginVertical: 10,
    borderRadius: 20,
    width: '90%',
    maxWidth: 900,
    alignSelf: 'center',
    shadowColor: '#00FFD1',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  repoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  repoDescription: {
    color: '#ccc',
    marginBottom: 10,
  },
});
