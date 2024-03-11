import { DOCS_URL } from '../../shared/constants';
import daBoiAvatar from '../static/da-boi.png';
import avatarPlaceholder from '../static/avatar-placeholder.png';

export const navigation = [
  { name: 'Documentation', href: DOCS_URL }
];
export const features = [
  {
    name: 'Create Notes',
    description: 'Easily compose and save your thoughts',
    icon: '✍️',
    href: DOCS_URL,
  },
  {
    name: 'Mark Completed',
    description: 'Indicate task completion with a simple checkbox',
    icon: '✅',
    href: DOCS_URL,
  },
  {
    name: 'Delete Notes',
    description: 'Seamlessly remove unwanted notes',
    icon: '🗑️',
    href: DOCS_URL,
  },
  {
    name: 'Auto-Save',
    description: 'Enjoy peace of mind as notes are saved automatically',
    icon: '💾',
    href: DOCS_URL,
  },
];
