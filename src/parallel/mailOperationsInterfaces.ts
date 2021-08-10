import { Correios } from './transporters/correios';

interface IPackageLocationInfo {
    date: Date,
    description: string
}

interface IMailOperations {
    getPackageInfo(packageCode: string, packageType: string): Promise<IPackageLocationInfo>
}

interface ITransporters {
    correios: Correios
}

export { IMailOperations, IPackageLocationInfo, ITransporters };
