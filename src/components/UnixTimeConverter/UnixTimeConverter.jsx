import React, { useMemo, useState } from 'react';
import { utcToZonedTime, format } from 'date-fns-tz';

import { Layout } from '../Layout/Layout';
import styles from './UnixTimeConverter.module.scss';

const dateFormat = 'dd-MM-yyyy HH:mm:ss z';
export const UnixTimeConverter = () => {
  const [unixTime, setUnixTime] = useState();
  const { localTime, utcTime } = useMemo(() => {
    try {
      const unixTimeAsNumber = +unixTime;
      if (Number.isNaN(unixTimeAsNumber)) {
        throw new Error('Invalid unix time string');
      }

      const parsedTime = new Date(unixTimeAsNumber);
      return {
        localTime: format(parsedTime, dateFormat),
        utcTime: format(utcToZonedTime(parsedTime, 'utc'), dateFormat, {
          timeZone: 'utc',
        }),
      };
    } catch (ex) {
      console.error(ex);
      return {
        localTime: null,
        utcTime: null,
      };
    }
  }, [unixTime]);

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.timeInputWrapper}>
          <input
            type="text"
            placeholder="E.g. 1633197049977"
            autoFocus
            onChange={(e) => setUnixTime(e.target.value)}
          />
        </div>
        {localTime && utcTime && (
          <div className={styles.mainTimeZonesContainer}>
            <div>
              <div className={styles.titleBar}>Local Time</div>
              <div className={styles.time}>{localTime}</div>
            </div>

            <div>
              <div className={styles.titleBar}>UTC Time</div>
              <div className={styles.time}>{utcTime}</div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
