import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
    SectionContainer,
    SeedingInfo,
    Sensor,
    TextField,
    WeightProduct,
    WorkWithoutCrashControl,
} from './index';

export const FieldData = ({data}) => {
  const {t} = useTranslation();
  const seedSensors = data.SeedSensors || data.SeedSensorsGrA || [];
  const seedSensorsGrB = data.SeedSensorsGrB || [];
  const liquidFertilizerSensors = data.Liqferts || [];
  const fertilizerSensors = data.FertilizerSensors || [];
  const seedSensorsTitle = !!data.SeedSensors ? t('screens.statistic.seedSensors') : t('screens.statistic.seedSensorsGrA');

  const renderSeeding = () => {
    const seeding = data.Seeding || data.SeedingGrA;
    const title = !!data.Seeding ? t('screens.statistic.seeding') : t('screens.statistic.seedingGrA')
    return !!seeding ? (
      <SectionContainer title={title}>
        <SeedingInfo data={seeding} type={'seed'}/>
      </SectionContainer>
    ) : null;
  };

  const renderFertilizing = () => {
    const fertilizing = data.Fertilizing || data.SeedingGrB;
    const title = !!data.Fertilizing ? t('screens.statistic.fertilizing') : t('screens.statistic.seedingGrB')
    return !!fertilizing ? (
      <SectionContainer title={title}>
        <SeedingInfo data={fertilizing} type={'fertilizer'}/>
      </SectionContainer>
    ) : null;
  };

  const renderLiquidFertilizing = () => {
    const liqfert = data.Liqfert;
    return !!liqfert ? (
      <SectionContainer title={t('screens.statistic.liquidFertilizing')}>
        <SeedingInfo data={liqfert} type={'liquid'}/>
      </SectionContainer>
    ) : null;
  };

  return (
    <ScrollView style={styles.container}>
      <SectionContainer title={t('screens.statistic.generalInformation')}>
        <TextField title={t('screens.statistic.sn')} value={data.SN}/>
        <TextField title={t('screens.statistic.field')} value={data.Field} />
        <TextField
          title={t('screens.statistic.date')}
          value={new Date(data.Date).toLocaleDateString()}
        />
      </SectionContainer>

      <SectionContainer title={t('screens.statistic.fieldInformation')}>
        <TextField
          title={t('screens.statistic.pathKm')}
          value={data.workOnField.PathKm}
        />
        <TextField
          title={t('screens.statistic.areaHa')}
          value={data.workOnField.AreaHa}
        />
        <TextField
          title={t('screens.statistic.workTime')}
          value={data.workOnField.WorkTime}
        />
        <TextField
          title={t('screens.statistic.speedKmh')}
          value={data.workOnField.SpeedKmh}
        />
        <TextField
          title={t('screens.statistic.beginOfWork')}
          value={new Date(data.workOnField.BeginOfWork).toLocaleString()}
        />
        <TextField
          title={t('screens.statistic.endOfWork')}
          value={new Date(data.workOnField.EndOfWork).toLocaleString()}
        />
      </SectionContainer>

    {!!data.WeightProducts?.length && (
      <SectionContainer title={t('screens.statistic.weightProducts')}>
        {data.WeightProducts.map((product, index) => (
            <WeightProduct key={index} product={product} />
        ))}
      </SectionContainer>
      )}

      {'workWithoutCrashControl' in data && (
          WorkWithoutCrashControl(data.workWithoutCrashControl)
      )}

      <SectionContainer title={t('screens.statistic.speedControl')}>
        <TextField
          title={t('screens.statistic.slowPathKm')}
          value={data.speedControl.SlowPathKm}
          warning
        />
        <TextField
          title={t('screens.statistic.fastPathKm')}
          value={data.speedControl.FastPathKm}
          warning
        />
      </SectionContainer>

      {renderSeeding()}
      {renderFertilizing()}
      {renderLiquidFertilizing()}

      {!!seedSensors.length && (
        <SectionContainer title={seedSensorsTitle}>
          {seedSensors.map((sensor, index) => (
            <Sensor key={index} sensor={sensor} type={'seed'}/>
          ))}
        </SectionContainer>
      )}

      {!!seedSensorsGrB.length && (
        <SectionContainer title={t('screens.statistic.seedSensorsGrB')}>
          {seedSensorsGrB.map((sensor, index) => (
            <Sensor key={index} sensor={sensor} type={'seed'}/>
          ))}
        </SectionContainer>
      )}

    {!!liquidFertilizerSensors.length && (
        <SectionContainer title={t('screens.statistic.liquidFertilizerSensors')}>
            {liquidFertilizerSensors.map((sensor, index) => (
                <Sensor key={index} sensor={sensor} type={'seed'}/>
            ))}
        </SectionContainer>
    )}

    {!!fertilizerSensors.length && (
        <SectionContainer title={t('screens.statistic.fertilizerSensors')}>
          {fertilizerSensors.map((sensor, index) => (
            <Sensor key={index} sensor={sensor} type={'fertilizer'}/>
          ))}
        </SectionContainer>
    )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
