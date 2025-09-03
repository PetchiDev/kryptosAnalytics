/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // Handle Chrome DevTools and favicon requests gracefully
  if (event.url.pathname.startsWith('/.well-known/') || event.url.pathname === '/favicon.ico') {
    return new Response('Not Found', { status: 404 });
  }
  
  const response = await resolve(event);
  return response;
}
