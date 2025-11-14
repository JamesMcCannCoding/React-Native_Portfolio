import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';

export default function TabFourScreen() {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/JamesMcCannCoding/repos?sort=updated');
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
        <ThemedText
          type="title"
          style={{ fontFamily: Fonts.rounded }}
        >
          Portfolio
        </ThemedText>
      </ThemedView>

      <ThemedText>This app includes example code to help you get started.</ThemedText>

        <ThemedText>
          <ul>
            <li>CFMEU IT Support Office - Full Stack App Development. View here 👉
            <ExternalLink href="https://www.cfmeu-online.com.au">
              <ThemedText type="link"> CFMEU Sign-in App Project</ThemedText>
            </ExternalLink></li>
            <li>E-commerce website development on Shopify and WordPress. View here 👉 
              <ExternalLink href="https://www.lumenari.com.au/Products/USB_Sunset_Lamp/p1.php">
                <ThemedText type="link"> Lumenari.com.au</ThemedText>
              </ExternalLink>
            </li>
            <li>University Full Stack Assignment Projects. View here 👉  
              <ExternalLink href="https://www.github.com/JamesMcCannCoding">
                <ThemedText type="link"> Github Portfolio</ThemedText>
              </ExternalLink>
            </li>
          </ul>
        </ThemedText>

        <ThemedText><b>Github Project</b></ThemedText>
        <FlatList
          data={repos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ThemedView style={{ marginBottom: 12 }}>
              <ThemedText style={{ fontWeight: 'bold' }}>{item.name}</ThemedText>
              {item.description ? <ThemedText>{item.description}</ThemedText> : null}
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
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});