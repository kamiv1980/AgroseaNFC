import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

export const FieldData = ({data}) => {
  const {t} = useTranslation();

  const renderWeightProducts = () => {
    return data.WeightProducts.map((product, index) => (
      <View key={index} style={styles.card}>
        <Text>
          {t('screens.statistic.product')}: {product.Product}
        </Text>
        <Text>
          {t('screens.statistic.weight')}: {product.Weight} kg
        </Text>
        <Text>
          {t('screens.statistic.rateFacticalKgHa')}: {product.RateFacticalKgHa}
        </Text>
        <Text>
          {t('screens.statistic.rateSetupedKgHa')}: {product.RateSetupedKgHa}
        </Text>
        <Text style={styles.warning}>
          {t('screens.statistic.rateLowPathKm')}: {product.RateLowPathKm}
        </Text>
        <Text style={styles.warning}>
          {t('screens.statistic.rateLowAlarmCount')}:{' '}
          {product.RateLowAlarmCount}
        </Text>
        <Text style={styles.warning}>
          {t('screens.statistic.rateHighPathKm')}: {product.RateHighPathKm}
        </Text>
        <Text style={styles.warning}>
          {t('screens.statistic.rateHighAlarmCount')}:{' '}
          {product.RateHighAlarmCount}
        </Text>
      </View>
    ));
  };

  const renderSeedSensors = () => {
    return data.SeedSensor.map((sensor, index) => (
      <View key={index} style={styles.card}>
        <Text>
          {t('screens.statistic.seedSensorId')}: {sensor.id}
        </Text>
        <Text>
          {t('screens.statistic.sownPct')}: {sensor.SownPct}%
        </Text>
        <Text>
          {t('screens.statistic.notSownPct')}: {sensor.NotSownPct}%
        </Text>
        <Text>
          {t('screens.statistic.unknownSownPct')}: {sensor.UnknownSownPct}%
        </Text>
        <Text style={styles.warning}>
          {t('screens.statistic.rateLowKm')}: {sensor.RateLowKm}
        </Text>
        <Text style={styles.warning}>
          {t('screens.statistic.rateLowCount')}: {sensor.RateLowCount}
        </Text>
      </View>
    ));
  };

  const renderFertilizerSensors = () => {
    return data.FertilizerSensors.map((sensor, index) => (
      <View key={index} style={styles.card}>
        <Text>
          {t('screens.statistic.fertilizerSensorId')}: {sensor.id}
        </Text>
        <Text>
          {t('screens.statistic.fertilizedPct')}: {sensor.FertilizedPct}%
        </Text>
        <Text>
          {t('screens.statistic.notFertilizedPct')}: {sensor.NotFertilizedPct}%
        </Text>
        <Text>
          {t('screens.statistic.unknownFertilizedPct')}:{' '}
          {sensor.UnknownFertilizedPct}%
        </Text>
        <Text style={styles.warning}>
          {t('screens.statistic.rateLowKm')}: {sensor.RateLowKm}
        </Text>
        <Text style={styles.warning}>
          {t('screens.statistic.rateLowCount')}: {sensor.RateLowCount}
        </Text>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>
          {t('screens.statistic.generalInformation')}
        </Text>
        <Text>
          {t('screens.statistic.sn')}: {data.SN}
        </Text>
        <Text>
          {t('screens.statistic.field')}: {data.Field}
        </Text>
        <Text>
          {t('screens.statistic.date')}:{' '}
          {new Date(data.Date).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>
          {t('screens.statistic.fieldInformation')}
        </Text>
        <Text>
          {t('screens.statistic.pathKm')}: {data.workOnField.PathKm}
        </Text>
        <Text>
          {t('screens.statistic.areaHa')}: {data.workOnField.AreaHa}
        </Text>
        <Text>
          {t('screens.statistic.workTime')}: {data.workOnField.WorkTime}
        </Text>
        <Text>
          {t('screens.statistic.speedKmh')}: {data.workOnField.SpeedKmh}
        </Text>
        <Text>
          {t('screens.statistic.beginOfWork')}: {data.workOnField.BeginOfWork}
        </Text>
        <Text>
          {t('screens.statistic.endOfWork')}: {data.workOnField.EndOfWork}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>{t('screens.statistic.speedControl')}</Text>
        <Text>
          {t('screens.statistic.slowPathKm')}: {data.speedControl.SlowPathKm}
        </Text>
        <Text>
          {t('screens.statistic.fastPathKm')}: {data.speedControl.FastPathKm}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>{t('screens.statistic.seeding')}</Text>
        <Text>
          {t('screens.statistic.sownHa')}: {data.Seeding.SownHa}
        </Text>
        <Text>
          {t('screens.statistic.notSownHa')}: {data.Seeding.NotSownHa}
        </Text>
        <Text>
          {t('screens.statistic.unknownSownHa')}: {data.Seeding.UnknownSownHa}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>{t('screens.statistic.fertilizing')}</Text>
        <Text>
          {t('screens.statistic.fertilizedHa')}: {data.Fertilizing.FertilizedHa}
        </Text>
        <Text>
          {t('screens.statistic.notFertilizedHa')}:{' '}
          {data.Fertilizing.NotFertilizedHa}
        </Text>
        <Text>
          {t('screens.statistic.unknownFertilizedHa')}:{' '}
          {data.Fertilizing.UnknownFertilizedHa}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>
          {t('screens.statistic.weightProducts')}
        </Text>
        {renderWeightProducts()}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>{t('screens.statistic.seedSensors')}</Text>
        {renderSeedSensors()}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>
          {t('screens.statistic.fertilizerSensors')}
        </Text>
        {renderFertilizerSensors()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 8,
  },
  warning: {
    backgroundColor: '#ffd0d0',
  },
});
