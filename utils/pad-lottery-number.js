/*
    Util function that pad a number in to n digits starting with 1
    This helper function is used to pad lottery number
*/

export default function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        if (str.length == length-1)
            str = '8' + str;
        else
            str = '0' + str;
    }
    //TODO: Hard Coding
    var str = [str.slice(0, 2), '-', str.slice(2)].join('');
    var str = [str.slice(0, 5), '-', str.slice(5)].join('');
    return str;
  }
  