import Toast from 'react-native-simple-toast';
import { DesignHandler } from './DesignHandler';

export class ToastHandler {
  private readonly design = new DesignHandler();

  public showDefault(msg: string) {
    this.design.getCurrentDesignProperties().then(colors => {
      Toast.showWithGravity(msg, Toast.LONG, Toast.TOP, {
        backgroundColor: colors.textPlaceholder,
        textColor: colors.primary,
      });
    });
  }

  public showDangerMessage(msg: string) {
    this.design.getCurrentDesignProperties().then(colors => {
      Toast.showWithGravity(msg, Toast.LONG, Toast.TOP, {
        backgroundColor: colors.danger,
        textColor: colors.title,
      });
    });
  }
}
