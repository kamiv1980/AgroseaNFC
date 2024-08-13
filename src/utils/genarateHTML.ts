import {
  renderSeeding,
  renderSensors,
  renderSpeedControl,
  renderWorkOnField,
  renderWorkWithoutControl,
} from './templates';

export function generateHTML(data, t) {
  const {
    SN,
    Field,
    workOnField,
    WeightProducts,
    speedControl,
    workWithoutCrashControl,
    ...rest
  } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Statistic</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 16px 4px;
        }
        .header {
            text-align: center;
            background-color: #D0D0D0;
            box-shadow: inset 0px 0px 0px 1000px #D0D0D0
        }
        .margin-top {
            margin: 16px auto;
        }
        .greenvalue {
            text-align: left;
            background-color: #FFFFFF;
            box-shadow: inset 0px 0px 0px 1000px #FFFFFF
        }
        .redvalue {
            text-align: left;
            background-color: #FFF0F0;
            box-shadow: inset 0px 0px 0px 1000px #FFF0F0
        }
        .sownquality, .sowndoubles, .sownskips, .sownnotsown, .areasown, .areanotsown, .areaunknown {
            height: 32px;
            width: 32px;
        }
        .sownquality {
            background-color: #00AA00;
            box-shadow: inset 0px 0px 0px 1000px #00AA00
        }
        .sowndoubles {
            background-color: #0080FF;
            box-shadow: inset 0px 0px 0px 1000px #0080FF
        }
        .sownskips {
            background-color: #FFFF00;
            box-shadow: inset 0px 0px 0px 1000px #FFFF00
        }
        .sownnotsown {
            background-color: #FF0000;
            box-shadow: inset 0px 0px 0px 1000px #FF0000
        }
        .areasown {
            background-color: #00AA00;
            box-shadow: inset 0px 0px 0px 1000px #00AA00
        }
        .areanotsown {
            background-color: #FF0000;
            box-shadow: inset 0px 0px 0px 1000px #FF0000
        }
        .areaunknown {
            background-color: #AAAAAA;
            box-shadow: inset 0px 0px 0px 1000px #AAAAAA
        }
        .marker-sownquality, .marker-sowndoubles, .marker-sownskips, .marker-sownnotsown, .marker-areasown, .marker-areanotsown, .marker-areaunknown {
            width: 16px;
            height: 16px;
        }
        .marker-sownquality {
            background-color: #00AA00;
            box-shadow: inset 0px 0px 0px 1000px #00AA00
        }
        .marker-sowndoubles {
            background-color: #0080FF;
            box-shadow: inset 0px 0px 0px 1000px #0080FF
        }
        .marker-sownskips {
            background-color: #FFFF00;
            box-shadow: inset 0px 0px 0px 1000px #FFFF00
        }
        .marker-sownnotsown {
            background-color: #FF0000;
            box-shadow: inset 0px 0px 0px 1000px #FF0000
        }
        .marker-areasown {
            background-color: #00AA00;
            box-shadow: inset 0px 0px 0px 1000px #00AA00
        }
        .marker-areanotsown {
            background-color: #FF0000;
            box-shadow: inset 0px 0px 0px 1000px #FF0000
        }
        .marker-areaunknown {
            background-color: #AAAAAA;
            box-shadow: inset 0px 0px 0px 1000px #AAAAAA
        }
    </style>
</head>
<body>
<div>
  <h1>${t('screens.statistic.sn')} ${SN}</h1>
  <p>${t('screens.statistic.date')} ${new Date(rest.Date).toLocaleString()}</p>
  <p>${t('screens.statistic.field')} ${Field}</p>
  ${renderWorkOnField(workOnField, WeightProducts, t)}
  ${renderWorkWithoutControl(workWithoutCrashControl, t)}
  ${renderSpeedControl(speedControl, t)}
  ${renderSeeding(rest.Seeding, t('screens.statistic.seeding'), t, 'seed')}
  ${renderSeeding(rest.SeedingGrA, t('screens.statistic.seedingGrA'), t, 'seed')}
  ${renderSeeding(rest.Fertilizing, t('screens.statistic.fertilizing'), t, 'fertilizer')}
  ${renderSeeding(rest.SeedingGrB, t('screens.statistic.seedingGrB'), t, 'seed')}
  ${renderSeeding(rest.Liqfert, t('screens.statistic.liquidFertilizing'), t, 'liquid')}
  ${renderSensors(rest.SeedSensors, t('screens.statistic.seedSensors'), t, 'seed')}
  ${renderSensors(rest.SeedSensorsGrA, t('screens.statistic.seedSensorsGrA'), t, 'seed')}
  ${renderSensors(rest.SeedSensorsGrB, t('screens.statistic.seedSensorsGrB'), t, 'seed')}
  ${renderSensors(rest.FertilizerSensors, t('screens.statistic.fertilizerSensors'), t, 'fertilizer')}
  ${renderSensors(rest.Liqferts, t('screens.statistic.liquidFertilizerSensors'), t, 'liquid')}
</div>
</body>
</html>
  `;
}
