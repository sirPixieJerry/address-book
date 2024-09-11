import type { SizeType } from '../types';

export const getWidth = (width: SizeType): string => {
  switch (width) {
    case 'small':
      return '180px';
    case 'medium':
      return '240px';
    case 'large':
      return '480px';
    default:
      return '100%';
  }
};
