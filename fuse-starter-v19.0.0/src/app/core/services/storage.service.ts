import { isLanguageType, LanguageType } from '../types/language';
import { Constants } from '../utils/constants';

export class StorageService {
  public static get accessToken(): string {
    return StorageService.getItem('accessToken') || '';
  }
  public static set accessToken(v: string) {
    StorageService.setItem('accessToken', v);
  }

  public static get refreshToken(): string {
    return StorageService.getItem('refresh_token') || '';
  }
  public static set refreshToken(v: string) {
    StorageService.setItem('refresh_token', v);
  }

  public static get currentLanguage(): LanguageType {
    const currentLanguage = StorageService.getItem('currentLanguage') || '';

    return isLanguageType(currentLanguage)
      ? currentLanguage
      : Constants.DEFAULT_LANGUAGE.code;
  }
  public static set currentLanguage(v: string) {
    StorageService.setItem('currentLanguage', v);
  }

  public static remove(key: 'accessToken' | 'refresh_token') {
    this.removeItem(key);
  }

  public static clear() {
    localStorage.clear();
  }

  // PRIVATE METHODS
  private static setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private static getItem(key: string) {
    return localStorage.getItem(key);
  }

  private static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
