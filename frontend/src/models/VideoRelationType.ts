export type VideoRelationType =
  | 'cover'
  | 'inspired'
  | 'copy'
  | 'variant'
  | 'live'
  | 'remix'
  | 'languagevariant'
  | 'reaction'
  | 'discussion'
  | 'parody'
  | 'montage';

export const VideoRelationTypes: VideoRelationType[] = [
  'cover',
  'inspired',
  'copy',
  'variant',
  'live',
  'remix',
  'languagevariant',
  'reaction',
  'discussion',
  'parody',
  'montage',
];

export const VideoRelationTypeString = (
  rel: VideoRelationType,
  inverse: boolean,
) => {
  switch (rel) {
    case 'cover':
      return inverse ? 'Cover' : 'Original';
    case 'inspired':
      return inverse ? 'Inspired' : 'Inspiration';
    case 'copy':
      return inverse ? 'Copied as' : 'Copied from';
    case 'variant':
      return 'Variant';
    case 'live':
      return inverse ? 'Live version' : 'Studio version';
    case 'remix':
      return inverse ? 'Remixed as' : 'Remixed from';
    case 'languagevariant':
      return 'Alternate language';
    case 'reaction':
      return inverse ? 'Reaction' : 'Original';
    case 'discussion':
      return inverse ? 'Discussion' : 'Original';
    case 'parody':
      return inverse ? 'Parody' : 'Original';
    case 'montage':
      return inverse ? 'Montage' : 'Collected';
    default:
      return 'Related';
  }
};
