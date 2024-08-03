export function renderWorkWithoutControl(workWithoutControl, t) {
    return workWithoutControl ? `
    <table border="1" cellpadding="4" cellspacing="0" class="margin-top">
      <tbody>
        <tr>
          <td class="header" colspan="2"><b>${t('screens.statistic.workWithoutCrashControl')}</b></td>
        </tr>
        <tr>
          <td class="redvalue">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                  <td width="200">${t('screens.statistic.pathKm')}</td>
                  <td width="150">${workWithoutControl.PathKm}</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td class="redvalue">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                  <td width="200">${t('screens.statistic.areaHa')}</td>
                  <td width="150">${workWithoutControl.AreaHa}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td class="redvalue">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                  <td width="200">${t('screens.statistic.workTime')}</td>
                  <td width="150">${workWithoutControl.WorkTime}</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td class="redvalue">
            <table border="0" cellpadding="4" cellspacing="0">
              <tbody>
                <tr>
                  <td width="200">${t('screens.statistic.speedKmh')}</td>
                  <td width="150">${workWithoutControl.SpeedKmH}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  ` : '';
}
