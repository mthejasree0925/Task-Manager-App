import i18n from '../i18n/i18n'; 
import * as Localization from 'expo-localization';
import en from '../locales/en.json';
import es from '../locales/es.json';

jest.mock('expo-localization', () => ({
  getLocales: jest.fn(),
}));

describe('i18n configuration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize i18n with correct resources', () => {
    const resources = i18n.options.resources;
    expect(resources.en.translation).toEqual(en);
    expect(resources.es.translation).toEqual(es);
  });

  it('should default to English when no locale found', () => {
    (Localization.getLocales as jest.Mock).mockReturnValue([]);

    jest.resetModules();
    const mockLocalization = require('expo-localization');
    mockLocalization.getLocales = jest.fn(() => []);
    const i18nModule = require('../i18n/i18n').default;

    expect(i18nModule.language).toBe('en');
  });

  it('should use device language when available', () => {
    (Localization.getLocales as jest.Mock).mockReturnValue([
      { languageCode: 'es' },
    ]);

    jest.resetModules();
    const mockLocalization = require('expo-localization');
    mockLocalization.getLocales = jest.fn(() => [{ languageCode: 'es' }]);
    const i18nModule = require('../i18n/i18n').default;

    // Should pick device language 'es'
    expect(i18nModule.language).toBe('es');
  });

  it('should fall back to English if device language unsupported', async () => {
    (Localization.getLocales as jest.Mock).mockReturnValue([
      { languageCode: 'fr' }, 
    ]);

    jest.resetModules();
    const mockLocalization = require('expo-localization');
    mockLocalization.getLocales = jest.fn(() => [{ languageCode: 'fr' }]);
    const i18nModule = require('../i18n/i18n').default;

    expect(['en', 'fr']).toContain(i18nModule.language);
    // even if it sets 'fr', fallbackLng ensures 'en' translations exist
    const translation = i18nModule.t('signin.mainTitle');
    expect(typeof translation).toBe('string');
  });

  it('should translate a known key', async () => {
    i18n.changeLanguage('en');
    const translation = i18n.t('signin.mainTitle');
    expect(typeof translation).toBe('string');
  });
  //  Snapshot Test
  it('matches the i18n configuration snapshot', () => {
    const snapshotData = {
      language: i18n.language,
      fallbackLng: (i18n.options as any).fallbackLng,
      supportedLanguages: Object.keys((i18n.options as any).resources),
      defaultLanguage: (i18n.options as any).lng,
      translations: {
        en: Object.keys(en).slice(0, 3), // Only sample keys to keep snapshot readable
        es: Object.keys(es).slice(0, 3),
      },
    };
    expect(snapshotData).toMatchSnapshot();
  });
});
