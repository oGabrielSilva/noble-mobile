import { StorageHandler } from '@Noble/handlers/StorageHandler';
import darkScheme from '@Noble/resources/theme/dark';

export class DesignHandler {
  private readonly storageKey = 'key_design';
  private readonly storageHandler = new StorageHandler();
  private readonly schemes = [darkScheme];

  async getCurrentDesignProperties() {
    const current = await this.storageHandler.getValue(this.storageKey);
    return (this.schemes.find(i => i.name === current) ?? darkScheme) as Design;
  }

  listOfSchemes() {
    return Array.from(this.schemes) as Design[];
  }

  get initialTheme() {
    return darkScheme as Design;
  }
}
