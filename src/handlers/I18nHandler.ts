import ptBR from '@Noble/resources/i18n/pt-BR';
import { StorageHandler } from './StorageHandler';

export class I18nHandler {
  private readonly key = 'key_strings';
  private readonly strings = [ptBR];
  private readonly storageHandler = new StorageHandler();

  public async getCurrentStrings() {
    const code = await this.storageHandler.getValue(this.key);
    return this.strings.find(i => i.i18n.code === code) ?? ptBR;
  }

  get initialLanguage() {
    return ptBR;
  }
}
