import ParallaxScrollView from '@/components/parallax-scroll-view';
import React, { useEffect, useMemo, useState } from 'react'; // Import useEffect
import { Alert, Image, Linking, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';

// Search Function
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
}

interface SearchResult {
  id: string;
  sourceScreen: 'Home' | 'Resume';
  title: string;
  fullText: string;
  linkPath: string;
}

interface SearchResultWithSnippet extends SearchResult {
  snippet: string;
}

interface UserLocation {
  latitude: number | null;
  longitude: number | null;
}

// --- APP DATA ---
const PROJECT_DATA: Project[] = [
  {
    id: 1,
    title: "CFMEU Meetings Web App",
    description: "Sign in portal for users attending various meetings at the CFMEU. Desinged with a clean and minimalistic UI. Simplicity and ease of use was a priority. User sign in data is stored on a server and can be viewed and retrieved by staff.",
    tags: ["PHP", "MySQL", "HTML", "CSS"]
  },
  {
    id: 2,
    title: "Software Developer Portfolio",
    description: "A multi page web app created with the React framework. This program is compatable with mobile as it was developed as both a web and mobile app.",
    tags: ["React Native", "TypeScript", "Node", "CSS", "JavaScript"]
  },
  {
    id: 3,
    title: "Lumenari",
    description: "My personally owneed e-commerce website that sells stylish and interesting lighting gadgets. Developed from scratch as a PHP fullstack web app. Work in progress as the site grows.",
    tags: ["PHP", "HTML", "CSS", "JavaScript"]
  },
  {
    id: 4,
    title: "SportsPro Technical Support Web App",
    description: "A CRUD app developed with the LAMP stack. This was an Assignment that I completed in uni. Awarded a high distinction for this project.",
    tags: ["Linux", "Apache", "MAMP", "PHP"]
  },
];

// --- CENTRALIZED APP CONTENT INDEX ---
const APP_CONTENT_INDEX: SearchResult[] = [
  // Content from Home Screen (index.tsx)
  ...PROJECT_DATA.map(p => ({
    id: `project-${p.id}`,
    sourceScreen: 'Home' as const,
    title: p.title,
    fullText: `${p.title} ${p.description} ${p.tags.join(' ')}`,
    linkPath: '/',
  })),
  {
    id: 'home-profile',
    sourceScreen: 'Home',
    title: 'Profile Section',
    fullText: 'Profile Section. James McCann Full Stack Developer. Ready for hire. Contact me. Location QUT (Default) Queensland University of Technology (QUT) Brisbane. ',
    linkPath: '/',
  },
  {
    id: 'resume-summary',
    sourceScreen: 'Resume',
    title: 'Resume Summary',
    fullText: 'Highly motivated and dedicated graduate-level developer with a passion for IT and computer science. Specialising in building full-stack web applications using cutting-edge technologies. Proficient in a wide range of programming languages, with a strong foundation in software developmentmethodologies and best practices. I believe that I possessexcellent problem-solving abilities and thrive in collaborative,diverse team environments, consistently deliveringhighquality solutions. I am a 2024 graduate from USQ, I amcurrently pursuing a Postgraduate Certificate in ComputerScience through QUT Online',
    linkPath: '/resume.tsx',
  },
  {
    id: 'resume-skills',
    sourceScreen: 'Resume',
    title: 'Technical Skills',
    fullText: 'Technical Skills. Languages: JavaScript, TypeScript, Python, C#, C++. Frameworks: MVC with ASP.NET and Laravel, React, React Native, Node.js, Express. Databases: MongoDB, PostgreSQL. Mobile Dev: Kotlin, Expo. IT Skills Support: Microsoft Enterprise IT ecosystems: SCCM, Active Directory, Intune, M365 admin, RSAT, Bash Scripting. Remote Support Tools. Networking: CISCO CCNA training.',
    linkPath: '/resume',
  },
  {
    id: 'resume-experience',
    sourceScreen: 'Resume',
    title: 'Work Experience',
    fullText: 'Work Experience. Senior Software Engineer at TechCorp 2021-Present, developed internal tooling using GraphQL and React. Led migration to TypeScript. Bachelor of IT - Double Majoring in Computer Science and IT management from University of Southern Queensland (UniSQ). Graduated in 2024. GPA of 6. Studying a Graduate Certificate in Computer Science from QUT Online. Graduating late 2025. Cert. II in Business from North Metro TAFE. Graduated 2014.',
    linkPath: '/resume',
  },
];
// -------------------------------------------------------------
//                  HELPER FUNCTIONS
// -------------------------------------------------------------
// Helper component to apply highlighting within a single Text component
const HighlightedText = ({ text, query, styles }: { text: string, query: string, styles: any }) => {
  // Escape special regex characters in the query
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Split the text based on the query, case-insensitively
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));

  return (
    <Text style={styles.snippetText}>
      {parts.map((part, index) => (
        <Text
          key={index}
          // Check if the part matches the query case-insensitively
          style={part.toLowerCase() === query.toLowerCase() ? styles.highlighted : styles.normal}
        >
          {part}
        </Text>
      ))}
    </Text>
  );
};

// Generates a contextual snippet of text around the matched query
const generateSnippet = (text: string, query: string, maxLength = 140): string => {
  const lowerCaseText = text.toLowerCase();
  const lowerCaseQuery = query.toLowerCase();

  const queryIndex = lowerCaseText.indexOf(lowerCaseQuery);

  let content = text;
  let startOffset = 0;

  if (queryIndex !== -1) {
    startOffset = Math.max(0, queryIndex - 30);
    content = text.substring(startOffset);
  }

  let endOffset = content.length;
  if (content.length > maxLength) {
    endOffset = maxLength;
    content = content.substring(0, maxLength);
  }

  if (startOffset > 0) {
    content = '...' + content;
  }
  if (text.length > startOffset + endOffset) {
    content = content + '...';
  }

  return content;
};

// -------------------------------------------------------------
//                  CONTACT FORM COMPONENT (Unchanged)
// -------------------------------------------------------------
const ContactForm = ({ targetEmail, isSmallScreen, styles }: { targetEmail: string, isSmallScreen: boolean, styles: any }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');

  // Regex for basic validation
  const nameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const handleSubmit = async () => {
    // Validation Checks
    if (!firstName || !lastName || !email || !message) {
      console.error('Validation Error: Please fill in all mandatory fields.');
      return;
    }
    // Regex Validation
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      console.error('Validation Error: Names must contain only letters.');
      return;
    }
    if (!emailRegex.test(email)) {
      console.error('Validation Error: Please enter a valid email address.');
      return;
    }
    // Construct Email Body
    const subject = encodeURIComponent('Portfolio Contact Form Submission');
    const body = encodeURIComponent(
      `First Name: ${firstName}\n` +
      `Last Name: ${lastName}\n` +
      `E-mail: ${email}\n` +
      `Mobile: ${mobile || 'N/A'}\n` +
      `Message:\n${message}`
    );

    // Open Default Mail Client
    const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

    try {
      const supported = await Linking.canOpenURL(mailtoUrl);
      if (supported) {
        await Linking.openURL(mailtoUrl);
        setFirstName('');
        setLastName('');
        setEmail('');
        setMobile('');
        setMessage('');
      } else {
        console.error('Error: Device does not support opening email clients automatically.');
      }
    } catch (error) {
      console.error('An error occurred during mailto link generation:', error);
    }
  };

  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Get in touch</Text>
      <Text style={styles.sectionSubtitle}>Send me a direct message about your project.</Text>

      {/* Name Fields */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="First Name *"
          placeholderTextColor="#999"
          value={firstName}
          onChangeText={setFirstName}
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name *"
          placeholderTextColor="#999"
          value={lastName}
          onChangeText={setLastName}
          keyboardType="default"
        />
      </View>

      {/* Email Field */}
      <TextInput
        style={styles.inputFull}
        placeholder="E-mail *"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Mobile Field (Optional) */}
      <TextInput
        style={styles.inputFull}
        placeholder="Mobile"
        placeholderTextColor="#999"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      />

      {/* Message Field */}
      <TextInput
        style={styles.inputMessage}
        placeholder="Message *"
        placeholderTextColor="#999"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.buttonSubmit}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
};

// -------------------------------------------------------------
//                  SEARCH RESULTS COMPONENT
// -------------------------------------------------------------
const SearchResultsList = ({ results, styles, query }: { results: SearchResultWithSnippet[], styles: any, query: string }) => {
  if (query.length === 0) return null;

  if (results.length === 0) {
    return (
      <View style={styles.sectionCard}>
        <Text style={styles.listEmptyText}>
          No results found for "{query}".
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>
        🌍 Search Results ({results.length})
      </Text>

      {results.map((result) => (
        <View key={result.id} style={styles.projectItem}>
          <View style={styles.resultHeader}>
            {/* Badge indicating source screen */}
            <Text style={styles.sourceScreenBadge}>
              {result.sourceScreen}
            </Text>
            <Text style={styles.resultTitle}>{result.title}</Text>
          </View>

          <View style={styles.snippetContainer}>
            {/* Contextual snippet with highlighting */}
            <HighlightedText
              text={result.snippet}
              query={query}
              styles={styles}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

// -------------------------------------------------------------
//                  STATIC PROJECTS LIST
// -------------------------------------------------------------
const ProjectSection = ({ projects, styles }: { projects: Project[], styles: any }) => {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>🛠️ Projects ({projects.length})</Text>
      <Text style={styles.sectionSubtitle}>A look at some key development areas.</Text>
      {projects.map((project) => (
        <View key={project.id} style={styles.projectItem}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>
          <View style={styles.tagContainer}>
            {project.tags.map((tag, index) => (
              <Text key={index} style={styles.tagText}>#{tag}</Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

// -------------------------------------------------------------
//                  EXPORT FUNCTION
// -------------------------------------------------------------
export default function HomeScreen() {
  const TARGET_EMAIL = 'james.mccann97@outlook.com';
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 500;
  const styles = getStyles(isSmallScreen);

  // State for the search query
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<UserLocation>({ latitude: null, longitude: null });

  // Function to get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log('User Location:', position.coords);
        },
        (error) => {
          console.error('Error fetching user location:', error);
          Alert.alert("Geolocation Error", "Could not retrieve your location. Check your browser permissions.");
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (Platform.OS === 'web' && userLocation.latitude === null) {
      getUserLocation();
    }
  }, [userLocation.latitude]);

  const filteredResults = useMemo(() => {
    if (!searchQuery.length) return [];

    const lowerCaseQuery = searchQuery.toLowerCase();

    return APP_CONTENT_INDEX
      .filter(item => item.fullText.toLowerCase().includes(lowerCaseQuery))
      .map(item => ({
        ...item,
        snippet: generateSnippet(item.fullText, searchQuery)
      }));
  }, [searchQuery]);

  const userMapUrl = useMemo(() => {
    if (userLocation.latitude !== null && userLocation.longitude !== null) {
      const lat = userLocation.latitude;
      const lon = userLocation.longitude;
      const bbox = `${lon - 0.01},${lat - 0.005},${lon + 0.01},${lat + 0.005}`;
      return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
    }
    return 'https://www.openstreetmap.org/export/embed.html?bbox=-180,-85,180,85&layer=mapnik';
  }, [userLocation]);

  const mapWidth = isSmallScreen ? 150 : 250;
  const mapHeight = isSmallScreen ? 150 : 250;

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
      {/* ---- Search Bar ---- */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={[
            styles.searchInput,
            Platform.OS === 'web' && { outlineStyle: 'none' as any }
          ]}
          placeholder="Search portfolio, skills (Node.js, React, Python)..."
          placeholderTextColor="#777"
          value={searchQuery}
          onChangeText={setSearchQuery}
          keyboardType="default"
        />
      </View>

      <SearchResultsList
        results={filteredResults}
        styles={styles}
        query={searchQuery}
      />

      {/* ---- Profile Section ---- */}
      <View style={styles.sectionCard}>
        <View style={styles.profileRow}>
          <View style={styles.textSection}>
            <Text style={styles.introText}>Hi there 👋 I'm</Text>
            <Text style={styles.name}>James McCann</Text>
            <Text style={styles.role}>Full Stack Developer 💻</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL(`mailto:${TARGET_EMAIL}`)}
            >
              <Text style={styles.buttonText}>Hire Me</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imageSection}>
            <Image
              source={require('../../assets/images/emoji.jpg')}
              style={styles.avatar}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* ---- Location Section ---- */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>📍 Location</Text>

        {/* New Container for Side-by-Side Maps */}
        <View style={styles.twoMapsContainer}>
          {/* Map 1: QUT */}
          <View style={styles.mapWrapper}>
            <Text style={styles.mapTitle}>QUT Brisbane Campus</Text>
            <Text style={styles.sectionSubtitle}>Queensland University of Technology (QUT) – Brisbane City</Text>
            {Platform.OS === 'web' ? (
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=153.02%2C-27.48%2C153.03%2C-27.47&layer=mapnik&marker=-27.4778%2C153.0281"
                style={{
                  border: 0,
                  width: mapWidth,
                  height: mapHeight,
                  borderRadius: 15,
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.4)',
                }}
                loading="lazy"
              ></iframe>
            ) : (
              <WebView
                source={{
                  uri:
                    'https://www.openstreetmap.org/export/embed.html?bbox=153.02%2C-27.48%2C153.03%2C-27.47&layer=mapnik&marker=-27.4778%2C153.0281',
                }}
                style={{
                  width: mapWidth,
                  height: mapHeight,
                  borderRadius: 15,
                  overflow: 'hidden',
                }}
              />
            )}
          </View>

          {/* Map 2: User Location */}
          <View style={styles.mapWrapper}>
            <Text style={styles.mapTitle}>Your Location</Text>
            <Text style={styles.sectionSubtitle}>
              {userLocation.latitude !== null ? `Lat: ${userLocation.latitude.toFixed(3)}, Lon: ${userLocation.longitude?.toFixed(3)}` : 'Fetching location...'}
            </Text>
            {userLocation.latitude !== null ? (
              Platform.OS === 'web' ? (
                <iframe
                  src={userMapUrl}
                  style={{
                    border: 0,
                    width: mapWidth,
                    height: mapHeight,
                    borderRadius: 15,
                    boxShadow: '0 0 10px rgba(255, 0, 0, 0.6)',
                  }}
                  loading="lazy"
                ></iframe>
              ) : (
                <WebView
                  source={{ uri: userMapUrl }}
                  style={{
                    width: mapWidth,
                    height: mapHeight,
                    borderRadius: 15,
                    overflow: 'hidden',
                  }}
                />
              )
            ) : (
              <View style={[styles.mapPlaceholder, { width: mapWidth, height: mapHeight }]}>
                <Text style={styles.placeholderText}>
                  Location not available or blocked.
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* ---- Contact Form Section ---- */}
      <ContactForm
        targetEmail={TARGET_EMAIL}
        isSmallScreen={isSmallScreen}
        styles={styles}
      />

      {/* ---- Project Section ---- */}
      {searchQuery.length === 0 && (
        <ProjectSection
          projects={PROJECT_DATA}
          styles={styles}
        />
      )}

    </ParallaxScrollView>
  );
}

// -------------------------------------------------------------
//                  STYLES
// -------------------------------------------------------------
const getStyles = (isSmallScreen: boolean) => StyleSheet.create({
  headerImage: {
    width: '100%',
    height: isSmallScreen ? 250 : 250,
  },
  /* Card Container for Each Section */
  sectionCard: {
    backgroundColor: '#181818',
    padding: isSmallScreen ? 15 : 20,
    marginVertical: 5,
    borderRadius: 20,
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    shadowColor: '#00ffd1',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textSection: {
    flex: 1,
    paddingRight: isSmallScreen ? 10 : 20,
  },
  imageSection: {
    alignItems: 'center',
  },
  introText: {
    color: '#00FFD1',
    fontSize: isSmallScreen ? 14 : 16,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  name: {
    color: '#fff',
    fontSize: isSmallScreen ? 28 : 34,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  role: {
    color: '#00FFD1',
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00FFD1',
    paddingVertical: isSmallScreen ? 10 : 10,
    paddingHorizontal: isSmallScreen ? 30 : 80,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#111',
    fontSize: isSmallScreen ? 16 : 24,
    fontWeight: 'bold',
  },
  avatar: {
    width: isSmallScreen ? 120 : 150,
    height: isSmallScreen ? 120 : 150,
    borderRadius: 100,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: isSmallScreen ? 20 : 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: '#00FFD1',
    fontSize: isSmallScreen ? 12 : 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  mapTitle: {
    color: '#fff',
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  twoMapsContainer: {
    flexDirection: isSmallScreen ? 'column' : 'row',
    justifyContent: isSmallScreen ? 'center' : 'space-around', 
    alignItems: 'center',
    flexWrap: 'wrap', 
    marginTop: 10,
    gap: 15,
  },
  mapWrapper: {
    alignItems: 'center',
    marginBottom: 15,
    width: isSmallScreen ? '100%' : 'auto', 
  },
  mapPlaceholder: {
    backgroundColor: '#252525',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  placeholderText: {
    color: '#FF0000',
    textAlign: 'center',
    fontSize: 14,
  },
  mapContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // -------------------------------------------------------------
  //                  Search Bar Styles
  // -------------------------------------------------------------
  searchContainer: {
    backgroundColor: '#181818',
    paddingVertical: isSmallScreen ? 10 : 12,
    paddingHorizontal: 15,
    marginVertical: 15,
    borderRadius: 25,
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#00FFD1',
    borderWidth: 1,
    shadowColor: '#00FFD1',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  searchIcon: {
    fontSize: 20,
    color: '#00FFD1',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: isSmallScreen ? 16 : 18,
    paddingRight: 5,
  },
  // -------------------------------------------------------------
  //                  Project/Search Item Styles
  // -------------------------------------------------------------
  projectItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#252525',
    marginBottom: 5,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  resultTitle: {
    color: '#fff',
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: '600',
  },
  projectTitle: {
    color: '#fff',
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  projectDescription: {
    color: '#ccc',
    fontSize: isSmallScreen ? 14 : 16,
    marginBottom: 5,
  },
  snippetContainer: {
    paddingLeft: 10,
  },
  snippetText: {
    color: '#aaa',
    fontSize: isSmallScreen ? 13 : 15,
    fontStyle: 'italic',
  },
  highlighted: {
    color: '#00FFD1',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 255, 209, 0.1)',
    borderRadius: 3,
  },
  normal: {
    color: '#aaa',
    fontSize: isSmallScreen ? 13 : 15,
  },
  sourceScreenBadge: {
    backgroundColor: '#00aaff',
    color: '#111',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagText: {
    color: '#00FFD1',
    fontSize: 12,
    marginRight: 8,
    backgroundColor: '#112222',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  listEmptyText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
  // -------------------------------------------------------------
  //                  Form Styles
  // -------------------------------------------------------------
  inputRow: {
    flexDirection: isSmallScreen ? 'column' : 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#252525',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    width: isSmallScreen ? '100%' : '48.5%',
    marginBottom: isSmallScreen ? 15 : 0,
    borderColor: '#00FFD1',
    borderWidth: 1,
    fontSize: 16,
  },
  inputFull: {
    backgroundColor: '#252525',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 15,
    borderColor: '#00FFD1',
    borderWidth: 1,
    fontSize: 16,
  },
  inputMessage: {
    backgroundColor: '#252525',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    borderColor: '#00FFD1',
    borderWidth: 1,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  buttonSubmit: {
    backgroundColor: '#00FFD1',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});