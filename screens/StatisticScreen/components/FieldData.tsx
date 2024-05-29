import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export const FieldData = ({data}) => {
  const renderWeightProducts = () => {
    return data.WeightProducts.map((product, index) => (
      <View key={index} style={styles.card}>
        <Text>Product: {product.Product}</Text>
        <Text>Weight: {product.Weight} kg</Text>
        <Text>Rate Factical Kg/Ha: {product.RateFacticalKgHa}</Text>
        <Text>Rate Setuped Kg/Ha: {product.RateSetupedKgHa}</Text>
        <Text style={styles.warning}>Rate Low Path Km: {product.RateLowPathKm}</Text>
        <Text style={styles.warning}>Rate Low Alarm Count: {product.RateLowAlarmCount}</Text>
        <Text style={styles.warning}>Rate High Path Km: {product.RateHighPathKm}</Text>
        <Text style={styles.warning}>Rate High Alarm Count: {product.RateHighAlarmCount}</Text>
      </View>
    ));
  };

  const renderSeedSensors = () => {
    return data.SeedSensor.map((sensor, index) => (
      <View key={index} style={styles.card}>
        <Text>Seed Sensor ID: {sensor.id}</Text>
        <Text>Sown Percentage: {sensor.SownPct}%</Text>
        <Text>Not Sown Percentage: {sensor.NotSownPct}%</Text>
        <Text>Unknown Sown Percentage: {sensor.UnknownSownPct}%</Text>
        <Text style={styles.warning}>Rate Low Km: {sensor.RateLowKm}</Text>
        <Text style={styles.warning}>Rate Low Count: {sensor.RateLowCount}</Text>
      </View>
    ));
  };

  const renderFertilizerSensors = () => {
    return data.FertilizerSensors.map((sensor, index) => (
      <View key={index} style={styles.card}>
        <Text>Fertilizer Sensor ID: {sensor.id}</Text>
        <Text>Fertilized Percentage: {sensor.FertilizedPct}%</Text>
        <Text>Not Fertilized Percentage: {sensor.NotFertilizedPct}%</Text>
        <Text>Unknown Fertilized Percentage: {sensor.UnknownFertilizedPct}%</Text>
        <Text style={styles.warning}>Rate Low Km: {sensor.RateLowKm}</Text>
        <Text style={styles.warning}>Rate Low Count: {sensor.RateLowCount}</Text>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>General Information</Text>
        <Text>SN: {data.SN}</Text>
        <Text>Field: {data.Field}</Text>
        <Text>Date: {new Date(data.Date).toLocaleDateString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Field Information</Text>
        <Text>Path Km: {data.workOnField.PathKm}</Text>
        <Text>Area Ha: {data.workOnField.AreaHa}</Text>
        <Text>Work Time: {data.workOnField.WorkTime}</Text>
        <Text>Speed Km/h: {data.workOnField.SpeedKmh}</Text>
        <Text>Begin Of Work: {data.workOnField.BeginOfWork}</Text>
        <Text>End Of Work: {data.workOnField.EndOfWork}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Speed Control</Text>
        <Text>Slow Path Km: {data.speedControl.SlowPathKm}</Text>
        <Text>Fast Path Km: {data.speedControl.FastPathKm}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Seeding</Text>
        <Text>Sown Ha: {data.Seeding.SownHa}</Text>
        <Text>Not Sown Ha: {data.Seeding.NotSownHa}</Text>
        <Text>Unknown Sown Ha: {data.Seeding.UnknownSownHa}</Text>
        {/*<Text>Sown Pct: {data.Seeding.SownPct}</Text>*/}
        {/*<Text>Not Sown Pct: {data.Seeding.NotSownPct}</Text>*/}
        {/*<Text>Unknown Sown Pct: {data.Seeding.UnknownSownPct}</Text>*/}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Fertilizing</Text>
        <Text>Fertilized Ha: {data.Fertilizing.FertilizedHa}</Text>
        <Text>Not Fertilized Ha: {data.Fertilizing.NotFertilizedHa}</Text>
        <Text>Unknown Fertilized Ha: {data.Fertilizing.UnknownFertilizedHa}</Text>
        {/*<Text>Fertilized Pct: {data.Fertilizing.FertilizedPct}</Text>*/}
        {/*<Text>Not Fertilized Pct: {data.Fertilizing.NotFertilizedPct}</Text>*/}
        {/*<Text>Unknown Fertilized Pct: {data.Fertilizing.UnknownFertilizedPct}</Text>*/}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Weight Products</Text>
        {renderWeightProducts()}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Seed Sensors</Text>
        {renderSeedSensors()}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Fertilizer Sensors</Text>
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
