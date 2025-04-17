// MDX components that will be available in all MDX files
import Clue from './components/Clue.svelte';
import Footnote from './components/Footnote.svelte';
import SettingBio from './components/SettingBio.svelte';

// Export components to be used in MDX files
export { Clue, Footnote, SettingBio };

// Export a components object for mdsvex
export const components = {
  Clue,
  Footnote,
  SettingBio
};
