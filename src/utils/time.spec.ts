import { expect } from 'chai';
import { describe, it } from 'vitest';
import { calculateTimeUntil, DAY, HOUR, MINUTE, SECOND } from './time';

describe('calculateTimeUntil', () => {
  it('returns expected time until target date', () => {
    const now = new Date();

    const expectedDays = 10;
    const expectedHours = 5;
    const expectedMinutes = 3;
    const expectedSeconds = 30; // Test runtime might be more than a second so ignore this value in assertion.

    const target = new Date(
      now.getTime() +
        expectedDays * DAY +
        expectedHours * HOUR +
        expectedMinutes * MINUTE +
        expectedSeconds * SECOND
    );

    const { days, hours, minutes } = calculateTimeUntil(target);
    expect({ days, hours, minutes }).to.deep.equal({
      days: expectedDays,
      hours: expectedHours,
      minutes: expectedMinutes,
    });
  });

  it('returns 0 days when there is less than a day in time difference', () => {
    const now = new Date();

    const expectedDays = 0;
    const expectedHours = 5;
    const expectedMinutes = 3;
    const expectedSeconds = 30; // Test runtime might be more than a second so ignore this value in assertion.

    const target = new Date(
      now.getTime() +
        expectedDays * DAY +
        expectedHours * HOUR +
        expectedMinutes * MINUTE +
        expectedSeconds * SECOND
    );

    const { days, hours, minutes } = calculateTimeUntil(target);
    expect({ days, hours, minutes }).to.deep.equal({
      days: expectedDays,
      hours: expectedHours,
      minutes: expectedMinutes,
    });
  });

  it('returns 0 days, hours, minutes, seconds when target is in the past', () => {
    const now = new Date();
    const target = new Date(now.getTime() - 1000);

    expect(calculateTimeUntil(target)).to.deep.equal({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it('returns expected time when target is created from utc time string', () => {
    const now = new Date();

    const expectedDays = 10;
    const expectedHours = 5;
    const expectedMinutes = 3;
    const expectedSeconds = 30; // Test runtime might be more than a second so ignore this value in assertion.

    const target = new Date(
      now.getTime() +
        expectedDays * DAY +
        expectedHours * HOUR +
        expectedMinutes * MINUTE +
        expectedSeconds * SECOND
    );

    const targetAsUtcString = target.toISOString();
    expect(targetAsUtcString.endsWith('Z')).to.be.true;

    const { days, hours, minutes } = calculateTimeUntil(new Date(targetAsUtcString));
    expect({ days, hours, minutes }).to.deep.equal({
      days: expectedDays,
      hours: expectedHours,
      minutes: expectedMinutes,
    });
  });
});
