import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import * as RNFS from '@dr.pogodin/react-native-fs';
// import * from '../../mock-data/mock-data.gz'
import data from '../../mock-data/data.json';
import {FieldData} from './components';

export const StatisticScreen = () => {

// useEffect(() => {
//     var path = RNFS.DocumentDirectoryPath
//     console.log(path)
//     RNFS.readDir(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
//         .then((result) => {
//             console.log('GOT RESULT', result);
//
//             // stat the first file
//             return Promise.all([RNFS.stat(result[0].path), result[0].path]);
//         })
    //     .then((statResult) => {
    //         if (statResult[0].isFile()) {
    //             // if we have a file, read it
    //             return RNFS.readFile(statResult[1], 'utf8');
    //         }
    //
    //         return 'no file';
    //     })
    //     .then((contents) => {
    //         // log the file contents
    //         console.log(contents);
    //     })
    //     .catch((err) => {
    //         console.log(err.message, err.code);
    //     });
// },[])

  return (
    <SafeAreaView style={styles.container}>
      <FieldData data={data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
  },
  input: {
    height: 50,
    margin: 20,
    paddingLeft: 10,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#483d8b',
  },
  button: {
    marginTop: 10,
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
});
