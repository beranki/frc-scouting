import { error } from '@sveltejs/kit';
import { validate } from '$lib/config.js';

export function POST({ request }) {
  
  const forum = request.json();

  const { ok, msg } = validate(forum);
  if (!ok) {
    error(400, 'forum invalid: ' + msg);
  }

  // Defaults to 200
  return new Response('passed!');
}
