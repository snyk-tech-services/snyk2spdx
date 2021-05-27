import * as debugLib from 'debug';
const debug = debugLib('snyk:generate-data-script');

export function getDate(): string {
  let date: string;
  const d = new Date();
  debug('creating date');
  date = d.getFullYear().toString() + '-';
  date = date + d.getMonth().toString().padStart(2, '0') + '-';
  date = date + d.getDay().toString().padStart(2, '0') + 'T';
  date = date + d.getHours().toString().padStart(2, '0') + ':';
  date = date + d.getMinutes().toString().padStart(2, '0') + ':';
  date = date + d.getSeconds().toString().padStart(2, '0') + 'Z';

  debug(date);

  return date;
}
