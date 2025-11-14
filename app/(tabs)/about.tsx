import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { Collapsible } from '@/components/ui/collapsible';
import { Fonts } from '@/constants/theme';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function TabTwoScreen() {
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

      {/* ---- Title Section ---- */}
      <View style={styles.sectionCard}>
        <ThemedText type="title" style={styles.title}>
          About Me
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Learn more about my background, skills, and experience.
        </ThemedText>
      </View>

      {/* ---- Get to know me ---- */}
      <View style={styles.sectionCard}>
        <Collapsible title="Get to know me">
          <View style={styles.listContainer}>
            {[
              'Lives in Brisbane.',
              '28 years old.',
              'Gym junkie.',
              'NRL fan.',
              'Guitar player.',
              'Gamer.',
              'Game Developer on Unreal Engine 5.',
              'Car enthusiast.',
              'Surfer, skateboarder, snowboarder.',
            ].map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>
        </Collapsible>
      </View>

      {/* ---- Education ---- */}
      <View style={styles.sectionCard}>
        <Collapsible title="Education">
          <View style={styles.listContainer}>
            {[
              'Bachelor of Information Technology – Computer Science & IT Management (2024)',
              'Graduate Certificate in Computer Science – QUT (2025)',
              'Graduated High School – St. Marks Anglican Community School (2014)',
            ].map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>
        </Collapsible>
      </View>

      {/* ---- Languages ---- */}
      <View style={styles.sectionCard}>
        <Collapsible title="Languages I can speak">
          <View style={styles.listContainer}>
            
            <Text style={styles.listHeader}>Front End</Text>
            {['HTML', 'CSS', 'JavaScript', 'React', 'Python'].map((item, idx) => (
              <Text key={idx} style={styles.listItem}>• {item}</Text>
            ))}

            <Text style={styles.listHeader}>Middle-ware</Text>
            {['PHP', 'REST API', 'JSON', 'Express'].map((item, idx) => (
              <Text key={idx} style={styles.listItem}>• {item}</Text>
            ))}

            <Text style={styles.listHeader}>Back End</Text>
            {['MySQL', 'SQL', 'Node.js', 'Azure', 'AWS', 'MongoDB'].map((item, idx) => (
              <Text key={idx} style={styles.listItem}>• {item}</Text>
            ))}

            <Text style={styles.listHeader}>Engineering</Text>
            {['C++', 'C#', 'Java'].map((item, idx) => (
              <Text key={idx} style={styles.listItem}>• {item}</Text>
            ))}

            <Text style={styles.listHeader}>Frameworks</Text>
            {['MVC with ASP.NET', 'Laravel'].map((item, idx) => (
              <Text key={idx} style={styles.listItem}>• {item}</Text>
            ))}

            <Text style={styles.listHeader}>Mobile Development</Text>
            {['Kotlin', 'Expo'].map((item, idx) => (
              <Text key={idx} style={styles.listItem}>• {item}</Text>
            ))}

          </View>
        </Collapsible>
      </View>

      {/* ---- Experience ---- */}
      <View style={styles.sectionCard}>
        <Collapsible title="Experience">
          <View style={styles.listContainer}>

            <Text style={styles.listItem}>• CFMEU IT Support Office – Full Stack App Development</Text>

            <ExternalLink href="https://www.cfmeu-online.com.au">
              <Text style={styles.link}>• CFMEU Sign-in App Project</Text>
            </ExternalLink>

            <Text style={styles.listItem}>• E-commerce website development on Shopify & WordPress</Text>

            <Text style={styles.listItem}>• University Full-Stack Assignment Projects:</Text>
            <ExternalLink href="https://www.github.com/JamesMcCannCoding">
              <Text style={styles.link}>Visit GitHub Portfolio</Text>
            </ExternalLink>

          </View>
        </Collapsible>
      </View>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 250,
  },

  /* Main Card Container */
  sectionCard: {
    backgroundColor: '#181818',
    padding: 20,
    marginVertical: 15,
    borderRadius: 20,
    width: '90%',
    maxWidth: 900,
    alignSelf: 'center',
    shadowColor: '#00ffd1',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  /* Titles */
  title: {
    fontFamily: Fonts.rounded,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },

  subtitle: {
    color: '#00FFD1',
    fontSize: 16,
  },

  /* Lists */
  listContainer: {
    marginTop: 10,
    marginLeft: 5,
  },

  listItem: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 6,
  },

  listHeader: {
    color: '#00FFD1',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
  },

  /* Links */
  link: {
    color: '#00FFD1',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 4,
  },
});
