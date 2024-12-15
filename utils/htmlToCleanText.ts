import * as R from 'ramda';

export default function htmlToCleanText(html: string): string {
  return R.pipe(
    R.replace(/<[^>]*>/g, ''), // Remove HTML tags
    R.trim // Trim whitespace
  )(html);
}
