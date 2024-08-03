import {TextField, Underline} from './index';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

export const WeightProduct = ({product}) => {
  const {t} = useTranslation();

  return (
    <View style={[styles.card, styles.shadowStyles]}>
      <Text style={styles.title}>{`${t('screens.statistic.product')} ${product.Product}`}</Text>
      <Underline />
      <TextField title={t('screens.statistic.weight')} value={product.Weight} />
      <TextField
        title={t('screens.statistic.rateFacticalKgHa')}
        value={product.RateFacticalKgHa}
      />
      <TextField
        title={t('screens.statistic.rateSetupedKgHa')}
        value={product.RateSetupedKgHa}
      />
      <Underline />
      <TextField
        title={t('screens.statistic.rateLowPathKm')}
        value={product.RateLowPathKm}
        warning
      />
      <TextField
        title={t('screens.statistic.rateLowAlarmCount')}
        value={product.RateLowAlarmCount}
        warning
      />
      <TextField
        title={t('screens.statistic.rateHighPathKm')}
        value={product.RateHighPathKm}
        warning
      />
      <TextField
        title={t('screens.statistic.rateHighAlarmCount')}
        value={product.RateHighAlarmCount}
        warning
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 8,
  },
  title: {
    color: '#483d8b',
    fontWeight: '700',
    fontSize: 16,
    },
  shadowStyles: {
    backgroundColor: '#fff',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
