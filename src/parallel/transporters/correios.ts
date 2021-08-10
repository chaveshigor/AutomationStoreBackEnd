import axios from 'axios';

import { IMailOperations, IPackageLocationInfo } from '../mailOperationsInterfaces';

class Correios implements IMailOperations {
  async getPackageInfo(packageCode: string, packageType?: string): Promise<IPackageLocationInfo> {
    const url = 'https://correios.contrateumdev.com.br/api/rastreio';
    const packageData = await axios.post(url, {
      code: packageCode,
      type: packageType,
    });

    const lastEvent = packageData.data.objeto[0].evento[0];

    function formatDate(date: string): Date {
      const dateList = date.split('/');
      const day = dateList[0];
      const month = dateList[1];
      const year = dateList[2];

      return new Date(`${month}/${day}/${year}`);
    }

    const packageStatusInfo: IPackageLocationInfo = {
      date: formatDate(lastEvent.data),
      description: lastEvent.descricao,
    };

    return packageStatusInfo;
  }
}

export { Correios };
