export function getWeekNumber(date: Date): number {
  const target = new Date(date.valueOf());

  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);

  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const firstDayNr = (firstThursday.getDay() + 6) % 7;

  firstThursday.setDate(firstThursday.getDate() - firstDayNr + 3);

  return (
    1 +
    Math.round(
      (target.getTime() - firstThursday.getTime()) /
        (7 * 24 * 60 * 60 * 1000)
    )
  );
}