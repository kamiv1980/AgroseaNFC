export function renderSpeedControl(speedControl, t) {
    return `
    <table border="1" cellpadding="4" cellspacing="0" class="margin-top">
      <tbody>
        <tr>
          <td class="header" colspan="2"><b>${t('screens.statistic.speedControl')}</b></td>
        </tr>
        <tr>
          <td class="redvalue">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                  <td width="200">${t('screens.statistic.slowPathKm')}</td>
                  <td width="150">${speedControl.SlowPathKm} (${speedControl.SlowPathPct}%)</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td class="redvalue">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                  <td width="200">${t('screens.statistic.fastPathKm')}</td>
                  <td width="150">${speedControl.FastPathKm} (${speedControl.FastPathPct}%)</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  `;
}
