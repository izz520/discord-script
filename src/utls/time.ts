import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/zh-cn'; // 引入中文语言包，可选

dayjs.extend(utc);
dayjs.extend(timezone);

export const nextTime = (second: number) => {
  return dayjs().add(second, 'second').tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
};
