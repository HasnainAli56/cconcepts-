import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        full_service: resolve(__dirname, 'full-service-leistungen.html'),
        planung_beratung: resolve(__dirname, 'planung-beratung.html'),
        logistik_lagerung: resolve(__dirname, 'logistik-lagerung.html'),
        konfektionierung: resolve(__dirname, 'konfektionierung.html'),
        full_service_werbeartikel: resolve(__dirname, 'full-service-werbeartikel.html'),
        werbeartikel_produkte: resolve(__dirname, 'werbeartikel-produkte.html'),
        konstruktionen: resolve(__dirname, 'konstruktionen-sonderanfertigungen.html'),
        messeauftritte: resolve(__dirname, 'messeauftritte.html'),
        promotion_events: resolve(__dirname, 'promotion-events.html'),
        werbeaktionen: resolve(__dirname, 'werbeaktionen.html'),
        streuartikel_giveaways: resolve(__dirname, 'streuartikel-giveaways.html'),
        gewinnspiele_verlosung: resolve(__dirname, 'gewinnspiele-verlosung.html'),
        uber_uns: resolve(__dirname, 'uber-uns.html'),
        kontakt: resolve(__dirname, 'kontakt.html'),
        impressum: resolve(__dirname, 'impressum.html'),
        datenschutz: resolve(__dirname, 'datenschutzerklarung.html'),
        agb: resolve(__dirname, 'agb.html')
      }
    }
  }
});
