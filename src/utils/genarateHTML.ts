import {
    renderSeeding,
    renderSensors,
    renderSpeedControl,
    renderWorkOnField,
    renderWorkWithoutControl
} from "./templates";

export function generateHTML(data, t) {
    const { SN, Field, workOnField, WeightProducts, speedControl, workWithoutCrashControl, ...rest } = data;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Statistic</title>
    <style>
        body {
        font-family: arial;
        }
        td.header {
         text-align: center;
         background-color : #D0D0D0;
        }
        .margin-top {
         margin-top: 32px;
        }
        td.greenvalue {
         text-align: left;
         background-color : #FFFFFF;
        }
        td.redvalue {
         text-align: left;
         background-color : #FFF0F0;
        }
        td.sownquality {
         text-align: left;
         background-color : #00AA00;
         height : 32px;
        }
        td.sowndoubles {
         text-align: left;
         background-color : #0080FF;
         height : 32px;
        }
        td.sownskips {
         text-align: left;
         background-color : #FFFF00;
         height : 32px;
        }
        td.sownnotsown {
         text-align: left;
         background-color : #FF0000;
         height : 32px;
        }
        td.marker-sownquality {
         text-align: left;
         background-color : #00AA00;
         height : 16px;
         width : 16px;
        }
        td.marker-sowndoubles {
         text-align: left;
         background-color : #0080FF;
         height : 16px;
         width : 16px;
        }
        td.marker-sownskips {
         text-align: left;
         background-color : #FFFF00;
         height : 16px;
         width : 16px;
        }
        td.marker-sownnotsown {
         text-align: left;
         background-color : #FF0000;
         height : 16px;
         width : 16px;
        }
        td.areasown {
         background-color : #00AA00;
         height : 32px;
        }
        td.areanotsown {
         background-color : #FF0000;
         height : 32px;
        }
        td.areaunknown {
         background-color : #AAAAAA;
         height : 32px;
        }
        td.marker-areasown {
         background-color : #00AA00;
         height : 16px;
         width : 16px;
        }
        td.marker-areanotsown {
         background-color : #FF0000;
         height : 16px;
         width : 16px;
        }
        td.marker-areaunknown {
            background-color : #AAAAAA;
            height : 16px;
            width : 16px;
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
