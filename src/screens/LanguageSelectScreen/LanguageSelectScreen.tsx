import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

const LANGUAGES = [
  {code: 'en', label: 'English'},
  {code: 'uk', label: 'Українська'},
  {code: 'pl', label: 'Polski'},
  {code: 'ro', label: 'Română'},
  {code: 'bg', label: 'Български'},
  {code: 'hu', label: 'Magyar'},
];

export const LanguageSelectScreen = () => {

  const { i18n, t } = useTranslation();
  const selectedLanguageCode = i18n.language;

  const setLanguage = code => {
    return i18n.changeLanguage(code);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {LANGUAGES.map(language => {
          const selectedLanguage = language.code === selectedLanguageCode;

          return (
            <Pressable
              key={language.code}
              style={styles.buttonContainer}
              disabled={selectedLanguage}
              onPress={() => setLanguage(language.code)}>
              <Text
                style={[selectedLanguage ? styles.selectedText : styles.text]}>
                {language.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: '#000',
    paddingVertical: 4,
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'tomato',
    paddingVertical: 4,
  },
});
