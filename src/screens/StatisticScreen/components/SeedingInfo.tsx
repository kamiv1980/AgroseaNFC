import {PercentageBar, TextField, Underline} from './index';
import React from 'react';
import {useTranslation} from 'react-i18next';

export const SeedingInfo = ({data, type}) => {
  const {t} = useTranslation();
  const isExtended =
    'QualityPct' in data &&
    'DoublesPct' in data &&
    'SkipsPct' in data &&
    'NotSownPct' in data;
  const isExistDensity =
    'DensityFact' in data && 'DensityFactPct' in data && 'DensitySet' in data;
  const isExistRate =
    'RateFact' in data && 'RateFactPct' in data && 'RateSet' in data;
  const isExistLiquidRate =
    'RateFact' in data && 'RateFactPct' in data && 'RateTarget' in data;

  return (
    <>
      {'TotalLiters' in data && (
        <>
            <TextField
                title={t('screens.statistic.totalLiters')}
                value={data?.TotalLiters}
            />
          <Underline />
        </>
      )}
      {'TotalSeedThousand' in data && (
        <>
          <TextField
            title={t('screens.statistic.totalSeedThousand')}
            value={data?.TotalSeedThousand}
          />
          <Underline />
        </>
      )}
      {isExtended && (
        <>
          <TextField
            title={t('screens.statistic.qualityPct')}
            value={data?.QualityPct}
            label={'#04bb04'}
          />
          <TextField
            title={t('screens.statistic.doublesPct')}
            value={data?.DoublesPct}
            label={'#5f61f8'}
          />
          <TextField
            title={t('screens.statistic.skipsPct')}
            value={data?.SkipsPct}
            label={'#faef3e'}
          />
          <TextField
            title={t('screens.statistic.notSownPct')}
            value={data?.NotSownPct}
            label={'#f83232'}
          />
          <PercentageBar
            data={[
              data.QualityPct,
              data.DoublesPct,
              data.SkipsPct,
              data.NotSownPct
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
            value={`${data.DensityFact} (${data.DensityFactPct}%)`}
          />
          <TextField
            title={t('screens.statistic.densitySet')}
            value={data.DensitySet}
          />
          <Underline />
        </>
      )}

      {isExistRate && (
        <>
          <TextField
            title={t('screens.statistic.rateFact')}
            value={`${data.RateFact} (${data.RateFactPct}%)`}
          />
          <TextField
            title={t('screens.statistic.rateSet')}
            value={data.RateSet}
          />
          <Underline />
        </>
      )}

      {isExistLiquidRate && (
        <>
          <TextField
            title={t('screens.statistic.rateFactLiquid')}
            value={`${data.RateFact} (${data.RateFactPct}%)`}
          />
          <TextField
            title={t('screens.statistic.rateTargetLiquid')}
            value={data.RateTarget}
          />
          <Underline />
        </>
      )}

        <TextField
            title={
                (type === 'liquid' || type === 'fertilizer')
                ? t('screens.statistic.fertilizedHa')
                : t('screens.statistic.sownHa')
            }
            value={data?.GraphSownHa}
            label={'#04bb04'}
        />
        <TextField
            title={
                (type === 'liquid' || type === 'fertilizer')
                ? t('screens.statistic.notFertilizedHa')
                : t('screens.statistic.notSownHa')
            }
            value={data?.GraphNotSownHa}
            label={'#f83232'}
        />
        <TextField
            title={
                (type === 'liquid' || type === 'fertilizer')
                ? t('screens.statistic.unknownFertilizedHa')
                : t('screens.statistic.unknownSownHa')
            }
            value={data?.GraphUnknownSownHa}
            label={'#b3b3b4'}
        />
      <PercentageBar
        data={[data?.GraphSownPct, data?.GraphNotSownPct, data?.GraphUnknownSownPct]}
        colors={['#04bb04', '#f83232', '#b3b3b4']}
      />
    </>
  );
};
