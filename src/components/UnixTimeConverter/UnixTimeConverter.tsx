import React, { useEffect, useMemo, useState } from 'react';
import { utcToZonedTime, format } from 'date-fns-tz';

import { Layout } from '../Layout/Layout';
import styles from './UnixTimeConverter.module.scss';
import { timeZones } from './timezones';

const dateFormat = 'dd-MM-yyyy HH:mm:ss z';
export const UnixTimeConverter = () => {
  const [unixTime, setUnixTime] = useState<string>('');
  const [tzSearchText, setTzSearchText] = useState('');
  const [pinnedTimezones, setPinnedTimezones] = useState<any[]>([]);

  useEffect(() => {
    const pinned = localStorage.getItem('pinned_timezones');
    if (pinned) {
      setPinnedTimezones(JSON.parse(pinned));
    }
  }, []);

  const filteredTimeZones = useMemo(() => {
    const lowerSearchText = tzSearchText.toLowerCase();
    return tzSearchText
      ? timeZones.filter(
          (tz) =>
            tz.country.toLowerCase().includes(lowerSearchText) ||
            tz.tz.toLowerCase().includes(lowerSearchText) ||
            tz.countryFull.toLowerCase().includes(lowerSearchText)
        )
      : [];
  }, [tzSearchText]);

  const { localTime, utcTime, otherTimes } = useMemo(() => {
    try {
      if (!unixTime) {
        return {
          localTime: null,
          utcTime: null,
          otherTimes: [],
        };
      }

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
        otherTimes: pinnedTimezones.map((tz) => ({
          time: format(utcToZonedTime(parsedTime, tz), dateFormat, {
            timeZone: tz,
          }),
          tz,
        })),
      };
    } catch (ex) {
      console.error(ex);
      return {
        localTime: null,
        utcTime: null,
        otherTimes: [],
      };
    }
  }, [unixTime, pinnedTimezones]);

  const addTZ = (tz: string) => {
    if (pinnedTimezones.includes(tz)) {
      return;
    }

    const pinned = [...pinnedTimezones, tz];
    setPinnedTimezones(pinned);
    localStorage.setItem('pinned_timezones', JSON.stringify(pinned));
  };

  const removeTz = (tz: string) => {
    if (!pinnedTimezones.includes(tz)) {
      return;
    }

    const pinned = pinnedTimezones.filter((ptz) => ptz !== tz);
    setPinnedTimezones(pinned);
    localStorage.setItem('pinned_timezones', JSON.stringify(pinned));
  };

  return (
    <Layout title={'Unix Time Converter'}>
      <div className={styles.pageContainer}>
        <div className={styles.timeInputWrapper}>
          <h5>Enter Unix Time String</h5>
          <input
            type="text"
            placeholder="E.g. 1633197049977"
            autoFocus
            onChange={(e) => setUnixTime(e.target.value)}
          />
        </div>
        {localTime && utcTime && (
          <>
            <div className={styles.timeZonesContainer}>
              <div>
                <div className={styles.titleBar}>Local Time</div>
                <div className={styles.time}>{localTime}</div>
              </div>

              <div>
                <div className={styles.titleBar}>UTC Time</div>
                <div className={styles.time}>{utcTime}</div>
              </div>
            </div>
            <br />
            <div className={styles.timeZonesContainer}>
              {otherTimes.map((t) => (
                <div>
                  <div className={styles.titleBar}>
                    {t.tz}
                    <button
                      onClick={() => removeTz(t.tz)}
                      className={styles.removeBtn}
                    >
                      Remove
                    </button>
                  </div>
                  <div className={styles.time}>{t.time}</div>
                </div>
              ))}
            </div>
            <hr className={styles.divider} />
            <div>
              <h5>Add more Timezones</h5>
              <input
                className={styles.tzInput}
                type="text"
                onChange={(e) => setTzSearchText(e.target.value)}
              />
              <div>
                {filteredTimeZones.map((tz) => (
                  <div
                    className={styles.tzMenuItem}
                    key={tz.tz}
                    onClick={() => addTZ(tz.tz)}
                  >
                    {tz.tz}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};
