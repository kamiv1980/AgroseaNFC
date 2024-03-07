import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const manufCode = {
  2: 'STMicroelectronics',
};

export const MainScreen = ({mainInfo, readTag, systemInfo}) => {
  return (
    <SafeAreaView style={styles.container}>
      {!mainInfo && !systemInfo && (
        <View style={styles.log}>
          <Text style={styles.title}>{'Ready...'}</Text>
        </View>
      )}

      {mainInfo && (
        <View style={styles.log}>
          <Text style={styles.title}>Tag info</Text>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>Manuf code</Text>
            <Text style={styles.text}>
              {manufCode[mainInfo?.icManufacturerCode] || 'unknown'}
            </Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>Serial Number</Text>
            <Text style={styles.text}>{mainInfo?.icSerialNumber}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>UID</Text>
            <Text style={styles.text}>{mainInfo?.id}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>Compatibility protocol</Text>
            <Text style={styles.text}>{mainInfo?.tech}</Text>
          </View>
        </View>
      )}

      {systemInfo && (
        <View style={styles.log}>
          <Text style={styles.title}>System info</Text>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>DFSID</Text>
            <Text style={styles.text}>{systemInfo?.dsfid}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>AFI</Text>
            <Text style={styles.text}>{systemInfo?.afi}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>Block Size</Text>
            <Text style={styles.text}>{systemInfo?.blockSize}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>Memory Size in blocks</Text>
            <Text style={styles.text}>{systemInfo?.blockCount}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>Memory Size in bytes</Text>
            <Text style={styles.text}>
              {systemInfo?.blockCount * systemInfo?.blockSize}
            </Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>IC ref</Text>
            <Text style={styles.text}>{systemInfo?.icReference}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.buttonRead} onPress={readTag}>
        <Text style={styles.buttonText}>Read</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  wrapper: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 20,
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#483d8b',
  },
  text: {
    fontSize: 16,
  },
  buttonWrite: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#9D2235',
  },
  buttonRead: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#006C5B',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  log: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
