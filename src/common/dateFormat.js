/**
 * ======时间格式化======
 * 参考 https://github.com/phstc/jquery-dateFormat
 */
let DateFormat = {
  daysInWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDaysInWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  shortMonthsInYear: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  longMonthsInYear: ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'],
  shortMonthsToNumber: {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
    'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
  },

  YYYYMMDD_MATCHER: /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[Z\-+]?(\d{2}:?\d{2})?/,

  numberToLongDay(value) {
    // 0 to Sunday
    // 1 to Monday
    return this.daysInWeek[parseInt(value, 10)] || value;
  },


  numberToShortDay(value) {
    // 0 to Sun
    // 1 to Mon
    return this.shortDaysInWeek[parseInt(value, 10)] || value;
  },
  numberToShortMonth(value) {
    // 1 to Jan
    // 2 to Feb
    let monthArrayIndex = parseInt(value, 10) - 1;
    return this.shortMonthsInYear[monthArrayIndex] || value;
  },
  numberToLongMonth(value) {
    // 1 to January
    // 2 to February
    let monthArrayIndex = parseInt(value, 10) - 1;
    return this.longMonthsInYear[monthArrayIndex] || value;
  },
  shortMonthToNumber(value) {
    // Jan to 01
    // Feb to 02
    return this.shortMonthsToNumber[value] || value;
  },
  parseTime(value) {
    // 10:54:50.546
    // => hour: 10, minute: 54, second: 50, millis: 546
    // 10:54:50
    // => hour: 10, minute: 54, second: 50, millis: ''
    let time = value,
      hour,
      minute,
      second,
      millis = '',
      delimited,
      timeArray;

    if (time.indexOf('.') !== -1) {
      delimited = time.split('.');
      // split time and milliseconds
      time = delimited[0];
      millis = delimited[delimited.length - 1];
    }

    timeArray = time.split(':');

    if (timeArray.length === 3) {
      hour = timeArray[0];
      minute = timeArray[1];
      // '20 GMT-0200 (BRST)'.replace(/\s.+/, '').replace(/[a-z]/gi, '');
      // => 20
      // '20Z'.replace(/\s.+/, '').replace(/[a-z]/gi, '');
      // => 20
      second = timeArray[2].replace(/\s.+/, '').replace(/[a-z]/gi, '');
      // '01:10:20 GMT-0200 (BRST)'.replace(/\s.+/, '').replace(/[a-z]/gi, '');
      // => 01:10:20
      // '01:10:20Z'.replace(/\s.+/, '').replace(/[a-z]/gi, '');
      // => 01:10:20
      time = time.replace(/\s.+/, '').replace(/[a-z]/gi, '');
      return {
        time: time,
        hour: hour,
        minute: minute,
        second: second,
        millis: millis
      };
    }

    return { time: '', hour: '', minute: '', second: '', millis: '' };
  },
  padding(value, length) {
    let paddingCount = length - String(value).length;
    for (let i = 0; i < paddingCount; i++) {
      value = '0' + value;
    }
    return value;
  },

  parseDate(value) {
    let values,
      subValues;

    let parsedDate = {
      date: null,
      year: null,
      month: null,
      dayOfMonth: null,
      dayOfWeek: null,
      time: null
    };

    if (typeof value == 'number') {
      return this.parseDate(new Date(value));
    } else if (typeof value.getFullYear == 'function') {
      parsedDate.year = String(value.getFullYear());
      // d = new Date(1900, 1, 1) // 1 for Feb instead of Jan.
      // => Thu Feb 01 1900 00:00:00
      parsedDate.month = String(value.getMonth() + 1);
      parsedDate.dayOfMonth = String(value.getDate());
      parsedDate.time = this.parseTime(value.toTimeString() + "." + value.getMilliseconds());
    } else if (value.search(this.YYYYMMDD_MATCHER) != -1) {
      /* 2009-04-19T16:11:05+02:00 || 2009-04-19T16:11:05Z */
      values = value.split(/[T\+-]/);
      parsedDate.year = values[0];
      parsedDate.month = values[1];
      parsedDate.dayOfMonth = values[2];
      parsedDate.time = this.parseTime(values[3].split('.')[0]);
    } else {
      values = value.split(' ');
      if (values.length === 6 && isNaN(values[5])) {
        // values[5] == year
        /*
         * This change is necessary to make `Mon Apr 28 2014 05:30:00 GMT-0300` work
         * like `case 7`
         * otherwise it will be considered like `Wed Jan 13 10:43:41 CET 2010
         * Fixes: https://github.com/phstc/jquery-dateFormat/issues/64
         */
        values[values.length] = '()';
      }
      switch (values.length) {
        case 6:
          /* Wed Jan 13 10:43:41 CET 2010 */
          parsedDate.year = values[5];
          parsedDate.month = shortMonthToNumber(values[1]);
          parsedDate.dayOfMonth = values[2];
          parsedDate.time = this.parseTime(values[3]);
          break;
        case 2:
          /* 2009-12-18 10:54:50.546 */
          subValues = values[0].split('-');
          parsedDate.year = subValues[0];
          parsedDate.month = subValues[1];
          parsedDate.dayOfMonth = subValues[2];
          parsedDate.time = this.parseTime(values[1]);
          break;
        case 7:
        /* Tue Mar 01 2011 12:01:42 GMT-0800 (PST) */
        case 9:
        /* added by Larry, for Fri Apr 08 2011 00:00:00 GMT+0800 (China Standard Time) */
        case 10:
          /* added by Larry, for Fri Apr 08 2011 00:00:00 GMT+0200 (W. Europe Daylight Time) */
          parsedDate.year = values[3];
          parsedDate.month = shortMonthToNumber(values[1]);
          parsedDate.dayOfMonth = values[2];
          parsedDate.time = this.parseTime(values[4]);
          break;
        case 1:
          /* added by Jonny, for 2012-02-07CET00:00:00 (Doctrine Entity -> Json Serializer) */
          subValues = values[0].split('');
          parsedDate.year = subValues[0] + subValues[1] + subValues[2] + subValues[3];
          parsedDate.month = subValues[5] + subValues[6];
          parsedDate.dayOfMonth = subValues[8] + subValues[9];
          parsedDate.time = this.parseTime(subValues[13] + subValues[14] + subValues[15] + subValues[16] + subValues[17] + subValues[18] + subValues[19] + subValues[20]);
          break;
        default:
          return null;
      }
    }

    if (parsedDate.time) {
      parsedDate.date = new Date(parsedDate.year, parsedDate.month - 1, parsedDate.dayOfMonth, parsedDate.time.hour, parsedDate.time.minute, parsedDate.time.second, parsedDate.time.millis);
    } else {
      parsedDate.date = new Date(parsedDate.year, parsedDate.month - 1, parsedDate.dayOfMonth);
    }

    parsedDate.dayOfWeek = String(parsedDate.date.getDay());

    return parsedDate;
  },
  prettyDate: function (time) {
    let date;
    let diff;
    let day_diff;

    if (typeof time === 'string' || typeof time === 'number') {
      date = new Date(time);
    }

    if (typeof time === 'object') {
      date = new Date(time.toString());
    }

    diff = (((new Date()).getTime() - date.getTime()) / 1000);

    day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0) {
      return;
    }

    if (diff < 60) {
      return 'just now';
    } else if (diff < 120) {
      return '1 minute ago';
    } else if (diff < 3600) {
      return Math.floor(diff / 60) + ' minutes ago';
    } else if (diff < 7200) {
      return '1 hour ago';
    } else if (diff < 86400) {
      return Math.floor(diff / 3600) + ' hours ago';
    } else if (day_diff === 1) {
      return 'Yesterday';
    } else if (day_diff < 7) {
      return day_diff + ' days ago';
    } else if (day_diff < 31) {
      return Math.ceil(day_diff / 7) + ' weeks ago';
    } else if (day_diff >= 31) {
      return 'more than 5 weeks ago';
    }
  },
  toBrowserTimeZone: function (value, format) {
    return this.date(new Date(value), format || 'MM/dd/yyyy HH:mm:ss');
  },

  format(value, format) {
    try {
      let parsedDate = this.parseDate(value);

      if (parsedDate === null) {
        return value;
      }

      let year = parsedDate.year,
        month = parsedDate.month,
        dayOfMonth = parsedDate.dayOfMonth,
        dayOfWeek = parsedDate.dayOfWeek,
        time = parsedDate.time;
      let hour;

      let pattern = '',
        retValue = '',
        unparsedRest = '',
        inQuote = false;

      /* Issue 1 - letiable scope issue in format.date (Thanks jakemonO) */
      for (let i = 0; i < format.length; i++) {
        let currentPattern = format.charAt(i);
        // Look-Ahead Right (LALR)
        let nextRight = format.charAt(i + 1);

        if (inQuote) {
          if (currentPattern == "'") {
            retValue += (pattern === '') ? "'" : pattern;
            pattern = '';
            inQuote = false;
          } else {
            pattern += currentPattern;
          }
          continue;
        }
        pattern += currentPattern;
        unparsedRest = '';
        switch (pattern) {
          case 'ddd':
            retValue += numberToLongDay(dayOfWeek);
            pattern = '';
            break;
          case 'dd':
            if (nextRight === 'd') {
              break;
            }
            retValue += this.padding(dayOfMonth, 2);
            pattern = '';
            break;
          case 'd':
            if (nextRight === 'd') {
              break;
            }
            retValue += parseInt(dayOfMonth, 10);
            pattern = '';
            break;
          case 'D':
            if (dayOfMonth == 1 || dayOfMonth == 21 || dayOfMonth == 31) {
              dayOfMonth = parseInt(dayOfMonth, 10) + 'st';
            } else if (dayOfMonth == 2 || dayOfMonth == 22) {
              dayOfMonth = parseInt(dayOfMonth, 10) + 'nd';
            } else if (dayOfMonth == 3 || dayOfMonth == 23) {
              dayOfMonth = parseInt(dayOfMonth, 10) + 'rd';
            } else {
              dayOfMonth = parseInt(dayOfMonth, 10) + 'th';
            }
            retValue += dayOfMonth;
            pattern = '';
            break;
          case 'MMMM':
            retValue += numberToLongMonth(month);
            pattern = '';
            break;
          case 'MMM':
            if (nextRight === 'M') {
              break;
            }
            retValue += numberToShortMonth(month);
            pattern = '';
            break;
          case 'MM':
            if (nextRight === 'M') {
              break;
            }
            retValue += this.padding(month, 2);
            pattern = '';
            break;
          case 'M':
            if (nextRight === 'M') {
              break;
            }
            retValue += parseInt(month, 10);
            pattern = '';
            break;
          case 'y':
          case 'yyy':
            if (nextRight === 'y') {
              break;
            }
            retValue += pattern;
            pattern = '';
            break;
          case 'yy':
            if (nextRight === 'y') {
              break;
            }
            retValue += String(year).slice(-2);
            pattern = '';
            break;
          case 'yyyy':
            retValue += year;
            pattern = '';
            break;
          case 'HH':
            retValue += this.padding(time.hour, 2);
            pattern = '';
            break;
          case 'H':
            if (nextRight === 'H') {
              break;
            }
            retValue += parseInt(time.hour, 10);
            pattern = '';
            break;
          case 'hh':
            /* time.hour is '00' as string == is used instead of === */
            hour = (parseInt(time.hour, 10) === 0 ? 12 : time.hour < 13 ? time.hour
              : time.hour - 12);
            retValue += this.padding(hour, 2);
            pattern = '';
            break;
          case 'h':
            if (nextRight === 'h') {
              break;
            }
            hour = (parseInt(time.hour, 10) === 0 ? 12 : time.hour < 13 ? time.hour
              : time.hour - 12);
            retValue += parseInt(hour, 10);
            // Fixing issue https://github.com/phstc/jquery-dateFormat/issues/21
            // retValue = parseInt(retValue, 10);
            pattern = '';
            break;
          case 'mm':
            retValue += this.padding(time.minute, 2);
            pattern = '';
            break;
          case 'm':
            if (nextRight === 'm') {
              break;
            }
            retValue += time.minute;
            pattern = '';
            break;
          case 'ss':
            /* ensure only seconds are added to the return string */
            retValue += this.padding(time.second.substring(0, 2), 2);
            pattern = '';
            break;
          case 's':
            if (nextRight === 's') {
              break;
            }
            retValue += time.second;
            pattern = '';
            break;
          case 'S':
          case 'SS':
            if (nextRight === 'S') {
              break;
            }
            retValue += pattern;
            pattern = '';
            break;
          case 'SSS':
            let sss = '000' + time.millis.substring(0, 3);
            retValue += sss.substring(sss.length - 3);
            pattern = '';
            break;
          case 'a':
            retValue += time.hour >= 12 ? 'PM' : 'AM';
            pattern = '';
            break;
          case 'p':
            retValue += time.hour >= 12 ? 'p.m.' : 'a.m.';
            pattern = '';
            break;
          case 'E':
            retValue += numberToShortDay(dayOfWeek);
            pattern = '';
            break;
          case "'":
            pattern = '';
            inQuote = true;
            break;
          default:
            retValue += currentPattern;
            pattern = '';
            break;
        }
      }
      retValue += unparsedRest;
      return retValue;
    } catch (e) {
      if (console && console.log) {
        console.log(e);
      }
      return value;
    }
  }
}; export { DateFormat };
