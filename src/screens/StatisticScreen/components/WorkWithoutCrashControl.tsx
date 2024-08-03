import {SectionContainer} from "./SectionContainer";
import {TextField} from "./TextField";
import React from "react";
import {useTranslation} from "react-i18next";

export const WorkWithoutCrashControl = ({workWithoutCrashControl}) => {
    const {t} = useTranslation();

    return !!workWithoutCrashControl ? (
        <SectionContainer title={t('screens.statistic.workWithoutCrashControl')}>
            <TextField
                title={t('screens.statistic.pathKm')}
                value={workWithoutCrashControl.PathKm}
                warning
            />
            <TextField
                title={t('screens.statistic.areaHa')}
                value={workWithoutCrashControl.AreaHa}
                warning
            />
            <TextField
                title={t('screens.statistic.workTime')}
                value={workWithoutCrashControl.WorkTime}
                warning
            />
            <TextField
                title={t('screens.statistic.speedKmh')}
                value={workWithoutCrashControl.SpeedKmH}
                warning
            />
        </SectionContainer>
    ) : null;
}
