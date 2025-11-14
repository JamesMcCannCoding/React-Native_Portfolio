import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { Fonts } from '@/constants/theme';
import { Image, StyleSheet } from 'react-native';

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
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{ fontFamily: Fonts.rounded }}
        >
          About me
        </ThemedText>
      </ThemedView>

      <ThemedText>This app includes example code to help you get started.</ThemedText>


      <Collapsible title="Get to know me">
        <ThemedText>
          <ul>
            <li>Lives in Brisbane.</li>
            <li>28 Years old.</li>
            <li>Gym Junkie.</li>
            <li>NRL Fan.</li>
            <li>Guitar player.</li>
            <li>Gamer.</li>
            <li>Game Developer on Unreal Engine 5.</li>
            <li>Car enthusiast.</li>
            <li>Surfer, Skateboarder, Snow boarder.</li>
          </ul>
        </ThemedText>
      </Collapsible>

      <Collapsible title="Education">
        <ThemedText>
          <ul>
            <li>Graduated Bachelors of Information Technology - Double Majoring in Computer Science and IT Management (2024)</li>
            <li>Studying a Graduate Certificate in Computer Science - Queensland University of Technology (2025)</li>
            <li>Graduated High School from St. Marks Anglican Community School (2014)</li>
          </ul>
        </ThemedText>
      </Collapsible>

      <Collapsible title="Languages I can speak">
        <ThemedText>
          <ul>
            <b>Front end:</b>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Python</li>
            <br />
            <b>Middle-ware:</b>
            <li>PHP</li>
            <li>REST API</li>
            <li>JSON</li>
            <li>Express</li>
            <br />
            <b>Back-end:</b>
            <li>MySQL</li>
            <li>SQL</li>
            <li>Node.js</li>
            <li>Azure</li>
            <li>AWS</li>
            <li>MongoDB</li>
            <br />
            <b>Engineering:</b>
            <li>C++</li>
            <li>C#</li>
            <li>Java</li>
            <br />
            <b>Frameworks:</b>
            <li>MVC with ASP.NET</li>
            <li>Laravel</li>
            <br />
            <b>Mobile Dev:</b>
            <li>Kotlin</li>
            <li>Expo</li>
          </ul>
        </ThemedText>
      </Collapsible>

      <Collapsible title="Experience">
        <ThemedText>
          <ul>
            <li>CFMEU IT Support Office - Full Stack App Development</li>
            <ExternalLink href="https://www.cfmeu-online.com.au">
              <ThemedText type="link">CFMEU Sign-in App Project</ThemedText>
            </ExternalLink>
            <li>E-commerce website development on Shopify and WordPress</li>
            <li>University Full Stack Assignment Projects: 
              <ExternalLink href="https://www.github.com/JamesMcCannCoding">
                <ThemedText type="link">Github Portfolio</ThemedText>
              </ExternalLink>
            </li>
          </ul>
        </ThemedText>
      </Collapsible>
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
  mapPlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});