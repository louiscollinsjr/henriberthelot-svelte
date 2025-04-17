import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Redirect to the first chapter on the server
  redirect(307, '/chapter/01-an-american-morning'); 
};
