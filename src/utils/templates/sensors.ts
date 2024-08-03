export function renderSensors (sensors, title, t, type) {
    const renderExtendedSection = (sensor) => `
    ${'QualityPct' in sensor && 'DoublesPct' in sensor && 'SkipsPct' in sensor && 'NotSownPct' in sensor ? `
      <tr>
        <td bgcolor="#FFFFFF" colspan="2">
          <table border="0" cellpadding="4" cellspacing="0">
            <tbody>
              <tr>
                <td width="32">
                  <table border="1" cellpadding="0" cellspacing="0">
                    <tbody><tr><td class="marker-sownquality"></td></tr></tbody>
                  </table>
                </td>
                <td width="164">${t('screens.statistic.qualityPct')}</td>
                <td width="150">${sensor.QualityPct}</td>
                <td width="32">
                  <table border="1" cellpadding="0" cellspacing="0">
                    <tbody><tr><td class="marker-sowndoubles"></td></tr></tbody>
                  </table>
                </td>
                <td width="164">${t('screens.statistic.doublesPct')}</td>
                <td width="150">${sensor.DoublesPct}</td>
              </tr>
              <tr>
                <td width="32">
                  <table border="1" cellpadding="0" cellspacing="0">
                    <tbody><tr><td class="marker-sownskips"></td></tr></tbody>
                  </table>
                </td>
                <td width="164">${t('screens.statistic.skipsPct')}</td>
                <td width="150">${sensor.SkipsPct}</td>
                <td width="32">
                  <table border="1" cellpadding="0" cellspacing="0">
                    <tbody><tr><td class="marker-sownnotsown"></td></tr></tbody>
                  </table>
                </td>
                <td width="164">${t('screens.statistic.notSownPct')}</td>
                <td width="150">${sensor.NotSownPct}</td>
              </tr>
              <tr>
                <td colspan="6" align="center">
                  <table border="0" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                      <td class="sownquality" style="width: ${sensor.QualityPct * 10}px;"></td>
                      <td class="sowndoubles" style="width: ${sensor.DoublesPct * 10}px;"></td>
                      <td class="sownskips" style="width: ${sensor.SkipsPct * 10}px;"></td>
                      <td class="sownnotsown" style="width: ${sensor.NotSownPct * 10}px;"></td>
                    </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    ` : ''}
  `;

    const renderDensitySection = (sensor) => `
    ${'DensityFact' in sensor && 'DensityFactPct' in sensor && 'DensitySet' in sensor ? `
      <tr>
        <td bgcolor="#FFFFFF" colspan="2">
          <table border="0" cellpadding="4" cellspacing="0">
            <tbody>
              <tr>
                <td width=250>${t('screens.statistic.densityFact')}</td>
                <td width=110>${sensor.DensityFact} (${sensor.DensityFactPct}%)</td>
                <td width=250>${t('screens.statistic.densitySet')}</td>
                <td width=110>${sensor.DensitySet}</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    ` : ''}
  `;

    const renderRateSection = (sensor) => `
    ${'RateFact' in sensor && 'RateFactPct' in sensor && 'RateSet' in sensor ? `
      <tr>
        <td bgcolor="#FFFFFF" colspan="2">
          <table border="0" cellpadding="4" cellspacing="0">
            <tbody>
              <tr>
                <td width=250>${t('screens.statistic.rateFact')}</td>
                <td width=110>${sensor.RateFact} (${sensor.RateFactPct}%)</td>
                <td width=250>${t('screens.statistic.rateSet')}</td>
                <td width=110>${sensor.RateSet}</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    ` : ''}
  `;

    const renderFertilizedSection = (sensor) => `
    <tr>
      <td bgcolor="#FFFFFF" colspan="2">
        <table border="0" cellpadding="4" cellspacing="0">
          <tbody>
            <tr>
              <td width="31">
                <table border="1" cellpadding="0" cellspacing="0">
                  <tbody><tr><td class="marker-areasown"></td></tr></tbody>
                </table>
              </td>
              <td width="200">${t('screens.statistic.sownPct')} ${sensor.GraphSownPct}</td>
              <td width="31">
                <table border="1" cellpadding="0" cellspacing="0">
                  <tbody><tr><td class="marker-areanotsown"></td></tr></tbody>
                </table>
              </td>
              <td width="200">${t('screens.statistic.notSownPct')} ${sensor.GraphNotSownPct}</td>
              <td width="32">
                <table border="1" cellpadding="0" cellspacing="0">
                  <tbody><tr><td class="marker-areaunknown"></td></tr></tbody>
                </table>
              </td>
              <td width="200">${t('screens.statistic.unknownSownPct')} ${sensor.GraphUnknownSownPct}</td>
            </tr>
            <tr>
              <td colspan="6" align="center">
                <table border="0" cellpadding="0" cellspacing="0">
                  <tbody><tr>
                    <td class="areasown" style="width: ${sensor.GraphSownPct * 10}px;"></td>
                    <td class="areanotsown" style="width: ${sensor.GraphNotSownPct * 10}px;"></td>
                    <td class="areaunknown" style="width: ${sensor.GraphUnknownSownPct * 10}px;"></td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  `;

    const renderSensorSection = (sensor) => `
    <tr>
      <td style="padding-top: 16px">
        <table border="1" cellpadding="4" cellspacing="0">
          <tbody>
            <tr>
              <td class="header" colspan="2"><b>${t(type === 'seed' ? `screens.statistic.seedSensorId` : `screens.statistic.fertilizerSensorId`)} ${sensor.id}</b></td>
            </tr>
            ${'TotalSeedThousand' in sensor ? `
              <tr>
                <td bgcolor="#FFFFFF" colspan="2">
                  <table border="0" cellpadding="4" cellspacing="0">
                    <tbody>
                      <tr>
                        <td width="570">${t('screens.statistic.totalSeedThousand')}</td>
                        <td width="160">${sensor.TotalSeedThousand}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            ` : ''}
            ${'Liters' in sensor ? `
              <tr>
                <td bgcolor="#FFFFFF" colspan="2">
                  <table border="0" cellpadding="4" cellspacing="0">
                    <tbody>
                      <tr>
                        <td width="570">${t('screens.statistic.totalLiters')}</td>
                        <td width="160">${sensor.Liters}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            ` : ''}
            ${renderExtendedSection(sensor)}
            ${renderDensitySection(sensor)}
            ${renderRateSection(sensor)}
            ${renderFertilizedSection(sensor)}
            <tr>
              <td class="redvalue" colspan="2">
                <table border="0" cellpadding="4" cellspacing="0">
                  <tbody>
                    <tr>
                      <td width=250>${t('screens.statistic.rateLowKm')}</td>
                      <td width=110>${sensor.RateLowKm} (${sensor.RateLowPct || ''}%)</td>
                      <td width=250>${t('screens.statistic.rateLowCount')}</td>
                      <td width=110>${sensor.RateLowCount}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td class="redvalue" colspan="2">
                <table border="0" cellpadding="4" cellspacing="0">
                  <tbody>
                    <tr>
                      <td width=250>${t('screens.statistic.rateHighKm')}</td>
                      <td width=110>${sensor.RateHighKm} (${sensor.RateHighPct || ''}%)</td>
                      <td width=250>${t('screens.statistic.rateHighCount')}</td>
                      <td width=110>${sensor.RateHighCount}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  `;

    return !!sensors?.length ? `
    <table border="1" cellpadding="4" cellspacing="0" class="margin-top">
      <tbody>
        <tr>
          <td class="header" colspan="2"><b>${title}</b></td>
        </tr>
        ${sensors.map(renderSensorSection).join('')}
      </tbody>
    </table>
  ` : '';
}
