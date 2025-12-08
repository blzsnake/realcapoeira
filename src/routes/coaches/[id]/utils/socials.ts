export type SocialKey = 'vk' | 'tg' | 'inst' | 'youtube';

export const buildSocialUrl = (key: SocialKey, value: string): string => {
  switch (key) {
    case 'vk':
      return `https://vk.com/${value}`;
    case 'tg':
      return `https://t.me/${value}`;
    case 'inst':
      return `https://instagram.com/${value}`;
    case 'youtube':
      return `https://youtube.com/${value.startsWith('@') ? value : `@${value}`}`;
    default:
      return '#';
  }
};
