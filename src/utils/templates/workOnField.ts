export function renderWorkOnField(workOnField, WeightProducts, t) {
    return `
    <table border="1" cellpadding="4" cellspacing="0" class="margin-top">
      <tbody>
        <tr>
          <td class="header" colspan="2"><b>${t('screens.statistic.fieldInformation')}</b></td>
        </tr>
        <tr>
          <td class="greenvalue">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                  <td width="200">${t('screens.statistic.pathKm')}</td>
                  <td width="150">${workOnField.PathKm}</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td class="greenvalue">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                  <td width="200">${t('screens.statistic.areaHa')}</td>
                  <td width="150">${workOnField.AreaHa}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td class="greenvalue">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                  <td width="200">${t('screens.statistic.workTime')}</td>
                  <td width="150">${workOnField.WorkTime}</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td class="greenvalue">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                  <td width="200">${t('screens.statistic.speedKmh')}</td>
                  <td width="150">${workOnField.SpeedKmh}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td class="greenvalue" colspan="2">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                  <td width="200">${t('screens.statistic.beginOfWork')}</td>
                  <td width="500">${new Date(workOnField.BeginOfWork).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td class="greenvalue" colspan="2">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                  <td width="200">${t('screens.statistic.endOfWork')}</td>
                  <td width="500">${new Date(workOnField.EndOfWork).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        ${!!WeightProducts?.length ? WeightProducts.map((product) => `
          <tr>
            <td class="greenvalue" colspan="2">
              <table border="0" cellpadding="4" cellspacing="0">
                <tr>
                  <td width="250">${t('screens.statistic.product')} ${product.Product}</td>
                  <td width="100">${product.Weight} кг</td>
                  <td width="350">${((product.Weight / product.RateSetupedKgHa) * 100).toFixed(1)}%</td>
                </tr>
              </table>
              <table border="0" cellpadding="4" cellspacing="0">
                <tr>
                  <td width="250">${t('screens.statistic.rateFacticalKgHa')}</td>
                  <td width="100">${product.RateFacticalKgHa}</td>
                  <td width="250">${t('screens.statistic.rateSetupedKgHa')}</td>
                  <td width="100">${product.RateSetupedKgHa}</td>
                </tr>
              </table>
              <table border="0" cellpadding="4" cellspacing="0">
                <tr>
                  <td width="250">${t('screens.statistic.rateLowPathKm')}</td>
                  <td width="100">${product.RateLowPathKm}</td>
                  <td width="250">${t('screens.statistic.rateLowAlarmCount')}</td>
                  <td width="100">${product.RateLowAlarmCount}</td>
                </tr>
              </table>
              <table border="0" cellpadding="4" cellspacing="0">
                <tr>
                  <td width="250">${t('screens.statistic.rateHighPathKm')}</td>
                  <td width="100">${product.RateHighPathKm}</td>
                  <td width="250">${t('screens.statistic.rateHighAlarmCount')}</td>
                  <td width="100">${product.RateHighAlarmCount}</td>
                </tr>
              </table>
            </td>
          </tr>
        `).join('') : ''}
      </tbody>
    </table>
  `;
}
