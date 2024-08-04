export function renderSeeding(seeding, title, t, type) {
    const isExtended =
        seeding &&
        'QualityPct' in seeding &&
        'DoublesPct' in seeding &&
        'SkipsPct' in seeding &&
        'NotSownPct' in seeding;
    const isExistDensity =
        seeding && 'DensityFact' in seeding && 'DensityFactPct' in seeding && 'DensitySet' in seeding;
    const isExistRate =
        seeding && 'RateFact' in seeding && 'RateFactPct' in seeding && 'RateSet' in seeding;
    const isExistLiquidRate =
        seeding && 'RateFact' in seeding && 'RateFactPct' in seeding && 'RateTarget' in seeding;

    return seeding ? `
    <table border="1" cellpadding="4" cellspacing="0" class="margin-top">
      <tbody>
        <tr>
          <td class="header" colspan="4"><b>${title}</b></td>
        </tr>
        ${'TotalSeedThousand' in seeding ? `
        <tr>
          <td bgcolor="#FFFFFF" colspan="4">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                  <td width="570">${t('screens.statistic.totalSeedThousand')}</td>
                  <td width="160">${seeding.TotalSeedThousand}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        ` : ''}
        ${'TotalLiters' in seeding ? `
        <tr>
          <td bgcolor="#FFFFFF" colspan="4">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                  <td width="570">${t('screens.statistic.totalLiters')}</td>
                  <td width="160">${seeding.TotalLiters}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        ` : ''}
        ${isExtended ? `
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
                  <td width="150">${seeding.QualityPct}</td>
                  <td width="32">
                    <table border="1" cellpadding="0" cellspacing="0">
                      <tbody><tr><td class="marker-sowndoubles"></td></tr></tbody>
                    </table>
                  </td>
                  <td width="164">${t('screens.statistic.doublesPct')}</td>
                  <td width="150">${seeding.DoublesPct}</td>
                </tr>
                <tr>
                  <td width="32">
                    <table border="1" cellpadding="0" cellspacing="0">
                      <tbody><tr><td class="marker-sownskips"></td></tr></tbody>
                    </table>
                  </td>
                  <td width="164">${t('screens.statistic.skipsPct')}</td>
                  <td width="150">${seeding.SkipsPct}</td>
                  <td width="32">
                    <table border="1" cellpadding="0" cellspacing="0">
                      <tbody><tr><td class="marker-sownnotsown"></td></tr></tbody>
                    </table>
                  </td>
                  <td width="164">${t('screens.statistic.notSownPct')}</td>
                  <td width="150">${seeding.NotSownPct}</td>
                </tr>
                <tr>
                  <td colspan="6" align="center">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tbody><tr>
                        <td class="sownquality" style="width: ${seeding.QualityPct * 10}px;"></td>
                        <td class="sowndoubles" style="width: ${seeding.DoublesPct * 10}px;"></td>
                        <td class="sownskips" style="width: ${seeding.SkipsPct * 10}px;"></td>
                        <td class="sownnotsown" style="width: ${seeding.NotSownPct * 10}px;"></td>
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
        ${isExistDensity ? `
        <tr>
          <td bgcolor="#FFFFFF" colspan="4">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                    <td width=250>${t('screens.statistic.densityFact')}</td>
                    <td width=110>${seeding.DensityFact} (${seeding.DensityFactPct}%)</td>
                    <td width=250>${t('screens.statistic.densitySet')}</td>
                    <td width=110>${seeding.DensitySet}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        ` : ''}
        ${isExistRate ? `
        <tr>
          <td bgcolor="#FFFFFF" colspan="4">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                    <td width=250>${t('screens.statistic.rateFact')}</td>
                    <td width=110>${seeding.RateFact} (${seeding.RateFactPct}%)</td>
                    <td width=250>${t('screens.statistic.rateSet')}</td>
                    <td width=110>${seeding.RateSet}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        ` : ''}
        ${isExistLiquidRate ? `
        <tr>
          <td bgcolor="#FFFFFF" colspan="4">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                    <td width=250>${t('screens.statistic.rateFactLiquid')}</td>
                    <td width=110>${seeding.RateFact} (${seeding.RateFactPct}%)</td>
                    <td width=250>${t('screens.statistic.rateTargetLiquid')}</td>
                    <td width=110>${seeding.RateTarget}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        ` : ''}
        <tr>
          <td bgcolor="#FFFFFF" colspan="4">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                  <td width="31">
                    <table border="1" cellpadding="0" cellspacing="0">
                      <tbody><tr><td class="marker-areasown"></td></tr></tbody>
                    </table>
                  </td>
                  <td width="200">${t((type === 'liquid' || type === 'fertilizer') ? 'screens.statistic.fertilizedHa' : 'screens.statistic.sownHa')} ${seeding.GraphSownHa}</td>
                  <td width="31">
                    <table border="1" cellpadding="0" cellspacing="0">
                      <tbody><tr><td class="marker-areanotsown"></td></tr></tbody>
                    </table>
                  </td>
                  <td width="200">${t((type === 'liquid' || type === 'fertilizer') ? 'screens.statistic.notFertilizedHa' : 'screens.statistic.notSownHa')} ${seeding.GraphNotSownHa}</td>
                  <td width="32">
                    <table border="1" cellpadding="0" cellspacing="0">
                      <tbody><tr><td class="marker-areaunknown"></td></tr></tbody>
                    </table>
                  </td>
                  <td width="200">${t((type === 'liquid' || type === 'fertilizer') ? 'screens.statistic.unknownFertilizedHa' : 'screens.statistic.unknownSownHa')} ${seeding.GraphUnknownSownHa}</td>
                </tr>
                <tr>
                  <td colspan="6" align="center">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tbody><tr>
                        <td class="areasown" style="width: ${seeding.GraphSownPct * 10}px"></td>
                        <td class="areanotsown" style="width: ${seeding.GraphNotSownPct * 10}px"></td>
                        <td class="areaunknown" style="width: ${seeding.GraphUnknownSownPct * 10}px"></td>
                      </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  ` : '';
}
