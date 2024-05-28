import { formatInTimeZone } from 'date-fns-tz';
import { Constant } from '../constants/constant';

export class Util {
    static formatLocalDate() {
        let date = new Date();
        console.log('Constante: ', Constant.TZ);
        return formatInTimeZone(date, Constant.TZ, 'yyyy-MM-dd HH:mm');
    }
}
