// Service worker simplificado apenas para cumprir a regra de instalação do PWA
self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('fetch', (e) => {
  // Deixa as requisições passarem direto para a rede
  e.respondWith(fetch(e.request));
});