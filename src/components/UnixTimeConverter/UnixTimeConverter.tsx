import React, { useEffect, useMemo, useState } from 'react';
import { utcToZonedTime, format } from 'date-fns-tz';
import styles from './UnixTimeConverter.module.scss';
import { timeZones } from './timezones';
import { Card, Grid, Input, Button, Divider } from '@nextui-org/react';

const dateFormat = 'dd-MM-yyyy HH:mm:ss z';
export const UnixTimeConverter = () => {
  const [unixTime, setUnixTime] = useState<string>('');
  const [tzSearchText, setTzSearchText] = useState('');
  const [pinnedTimezones, setPinnedTimezones] = useState<any[]>([]);

  const setCurrentTime = () => setUnixTime('' + Date.now());

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
    <>
      <div className={styles.pageContainer}>
        <Grid.Container alignContent="center" direction="column">
          <Grid>
            <h5>Enter Unix Time String</h5>
          </Grid>
          <Grid>
            <Input
              bordered
              type="text"
              placeholder="E.g. 1633197049977"
              autoFocus
              onChange={(e) => setUnixTime(e.target.value)}
              value={unixTime}
              css={{
                w: '100%',
              }}
            />
          </Grid>
          <Grid>
            <Button
              size={'sm'}
              onClick={setCurrentTime}
              style={{ marginTop: 8 }}
            >
              Use Current Time
            </Button>
          </Grid>
        </Grid.Container>
        {localTime && utcTime && (
          <>
            {/* <div className={styles.timeZonesContainer}>
              <div>
                <div className={styles.titleBar}>Local Time</div>
                <div className={styles.time}>{localTime}</div>
              </div>

              <div>
                <div className={styles.titleBar}>UTC Time</div>
                <div className={styles.time}>{utcTime}</div>
              </div>
            </div> */}
            <Grid.Container direction="row" gap={1}>
              <Grid xs>
                <Card variant="bordered">
                  <Card.Header
                    style={{ textAlign: 'center' }}
                    css={{ bg: '#444', color: '#fff' }}
                  >
                    Local Time
                  </Card.Header>
                  <Card.Divider />
                  <Card.Body>{localTime}</Card.Body>
                </Card>
              </Grid>
              <Grid xs>
                <Card variant="bordered">
                  <Card.Header
                    style={{ textAlign: 'center' }}
                    css={{ bg: '#444', color: '#fff' }}
                  >
                    UTC Time
                  </Card.Header>
                  <Card.Divider />
                  <Card.Body>{utcTime}</Card.Body>
                </Card>
              </Grid>
            </Grid.Container>
            <br />
            <Card variant="bordered">
              {otherTimes.map((t) => (
                <>
                  <Card.Header>{t.tz}</Card.Header>
                  <Card.Divider />
                  <Card.Body>{t.time}</Card.Body>
                </>
              ))}
            </Card>
            <Divider className={styles.divider} />
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
    </>
  );
};
