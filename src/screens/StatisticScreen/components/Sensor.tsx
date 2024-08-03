import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Underline, TextField, PercentageBar} from './index';

export const Sensor = ({sensor, type}) => {
    const {t} = useTranslation();
    const isExtended =
        'QualityPct' in sensor &&
        'DoublesPct' in sensor &&
        'SkipsPct' in sensor &&
        'NotSownPct' in sensor;
    const isExistDensity =
        'DensityFact' in sensor &&
        'DensityFactPct' in sensor &&
        'DensitySet' in sensor;
    const isExistRate =
        'RateFact' in sensor && 'RateFactPct' in sensor && 'RateSet' in sensor;

    const isSeedType = type === 'seed';

    const getTitle = () => {
        if (isSeedType) {
            return `${t('screens.statistic.seedSensorId')} ${sensor.id}`;
        } else {
            return `${t('screens.statistic.fertilizerSensorId')} ${sensor.id}`;
        }
    };

    const getPercentageFields = () => {
        if (isSeedType) {
            return (
                <>
                    <TextField
                        title={t('screens.statistic.sownPct')}
                        value={sensor.GraphSownPct}
                        label={'#04bb04'}
                    />
                    <TextField
                        title={t('screens.statistic.notSownPct')}
                        value={sensor.GraphNotSownPct}
                        label={'#f83232'}
                    />
                    <TextField
                        title={t('screens.statistic.unknownSownPct')}
                        value={sensor.GraphUnknownSownPct}
                        label={'#b3b3b4'}
                    />
                    <PercentageBar
                        data={[sensor.GraphSownPct, sensor.GraphNotSownPct, sensor.GraphUnknownSownPct]}
                        colors={['#04bb04', '#f83232', '#b3b3b4']}
                    />
                </>
            );
        } else {
            return (
                <>
                    <TextField
                        title={t('screens.statistic.fertilizedPct')}
                        value={sensor.GraphFertilizedPct}
                        label={'#04bb04'}
                    />
                    <TextField
                        title={t('screens.statistic.notFertilizedPct')}
                        value={sensor.GraphNotFertilizedPct}
                        label={'#f83232'}
                    />
                    <TextField
                        title={t('screens.statistic.unknownFertilizedPct')}
                        value={sensor.GraphUnknownFertilizedPct}
                        label={'#b3b3b4'}
                    />
                    <PercentageBar
                        data={[sensor.GraphFertilizedPct, sensor.GraphNotFertilizedPct, sensor.GraphUnknownFertilizedPct]}
                        colors={['#04bb04', '#f83232', '#b3b3b4']}
                    />
                </>
            );
        }
    };

    return (
        <View style={[styles.card, styles.shadowStyles]}>
            <Text style={styles.title}>{getTitle()}</Text>
            <Underline />
            {'TotalSeedThousand' in sensor && (
                <>
                    <TextField
                        title={t('screens.statistic.totalSeedThousand')}
                        value={sensor?.TotalSeedThousand}
                    />
                    <Underline />
                </>
            )}
            {isExtended && (
                <>
                    <TextField
                        title={t('screens.statistic.qualityPct')}
                        value={sensor?.QualityPct}
                        label={'#04bb04'}
                    />
                    <TextField
                        title={t('screens.statistic.doublesPct')}
                        value={sensor?.DoublesPct}
                        label={'#5f61f8'}
                    />
                    <TextField
                        title={t('screens.statistic.skipsPct')}
                        value={sensor?.SkipsPct}
                        label={'#faef3e'}
                    />
                    <TextField
                        title={t('screens.statistic.notSownPct')}
                        value={sensor?.NotSownPct}
                        label={'#f83232'}
                    />
                    <PercentageBar
                        data={[
                            sensor.QualityPct,
                            sensor.DoublesPct,
                            sensor.SkipsPct,
                            sensor.NotSownPct,
                        ]}
                        colors={['#04bb04', '#5f61f8', '#faef3e', '#f83232']}
                    />
                    <Underline />
                </>
            )}

            {isExistDensity && (
                <>
                    <TextField
                        title={t('screens.statistic.densityFact')}
                        value={`${sensor.DensityFact} (${sensor.DensityFactPct}%)`}
                    />
                    <TextField
                        title={t('screens.statistic.densitySet')}
                        value={sensor.DensitySet}
                    />
                    <Underline />
                </>
            )}

            {isExistRate && (
                <>
                    <TextField
                        title={t('screens.statistic.rateFact')}
                        value={`${sensor.RateFact} (${sensor.RateFactPct}%)`}
                    />
                    <TextField
                        title={t('screens.statistic.rateSet')}
                        value={'RateSet' in sensor ? sensor.RateSet : sensor.RateTarget}
                    />
                    <Underline />
                </>
            )}

            {getPercentageFields()}

            <Underline />
            <TextField
                title={t('screens.statistic.rateLowKm')}
                value={sensor.RateLowKm}
                warning
            />
            <TextField
                title={t('screens.statistic.rateLowCount')}
                value={sensor.RateLowCount}
                warning
            />
            <TextField
                title={t('screens.statistic.rateHighKm')}
                value={sensor.RateHighKm}
                warning
            />
            <TextField
                title={t('screens.statistic.rateHighCount')}
                value={sensor.RateHighCount}
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
        marginBottom: 12,
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
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
});
