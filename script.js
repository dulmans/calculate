function calculator(str) {
    const romanNumb = [
        { value: 1000, char: 'M' },
        { value: 900, char: 'CM' },
        { value: 500, char: 'D' },
        { value: 400, char: 'CD' },
        { value: 100, char: 'C' },
        { value: 90, char: 'XC' },
        { value: 50, char: 'L' },
        { value: 40, char: 'XL' },
        { value: 10, char: 'X' },
        { value: 9, char: 'IX' },
        { value: 5, char: 'V' },
        { value: 4, char: 'IV' },
        { value: 1, char: 'I' }
    ]; // Объявляем константу с правилами конвертации из АРАБСКОЙ в РИМСКУЮ систему счисления
    const arabicToRomanNumb = romanNumb.slice().sort((a,b) => b.char.length - a.char.length); // Объявляем константу с правилами конвертации из РИМСКОЙ в АРАБСКУЮ систему счисления
    const allowedOperators = [`+`, `-`, `/`, `*`]; // Переменная, в которую вводятся допустимые операторы
    const arrValuesOperator = str.split(/\b/g).map(x => x.trim()); // Разделяем значения и оператора на 3 элемента массива, а также, убираем лишние пробелы в каждом элементе (для валидной проверки далее)



    if(arrValuesOperator.length != 3){ // Делаем вступительную проверку, основанную на кол-ве элементов в массиве
        throw new Error(`Wrong record format! // Неверный формат записи!`);
    };

    if(!(allowedOperators.some(x => x === arrValuesOperator[1]))){ // Проверяем на валидность оператор
        throw new Error(`Invalid operator, only allowed: (${allowedOperators.join(` `)}) ! // Неверный оператор, допускаются только: (${allowedOperators.join(` `)}) !`);
    };

    if(formatCheck(arrValuesOperator[0]) === 'error' || formatCheck(arrValuesOperator[2]) === 'error'){ // Проверяем операнды на нетипичные значения (ошибочные символы при вводе юзером)
        throw new Error(`An error was made while entering an expression! // Была допущена ошибка при вводе выражения!`);
    }
    else if(formatCheck(arrValuesOperator[0]) != formatCheck(arrValuesOperator[2])){ // Проверяем операнды на однотипность системы счисления
        throw new Error(`Both values must be the same number system! // Оба значения должны быть одной и той же системой счисления!`);
    };
    // expect(() => formatCheck(arrValuesOperator[0]) != formatCheck(arrValuesOperator[2])).toThrowError('1');
    const notation = formatCheck(arrValuesOperator[0]); // Объявляем константу со значением: формат системы счисления текущего выражения ('Roman' & 'Arabic')

    if(notation === 'Roman'){ // Присваиваем каждому операнду из Римской системы счисления -> Арабскую систему счисления дл мат. расчётов
        arrValuesOperator[0] = formatChange('romanToArabic', arrValuesOperator[0]);
        arrValuesOperator[2] = formatChange('romanToArabic', arrValuesOperator[2]);
    }
    else{
        arrValuesOperator[0] = Number(arrValuesOperator[0]);
        arrValuesOperator[2] = Number(arrValuesOperator[2]);
    };

    if(arrValuesOperator[0] < 1 || arrValuesOperator[0] > 10 ||
        arrValuesOperator[2] < 1 || arrValuesOperator[2] > 10){ // Проверяем, чтобы операнды были в интервале 1...10
        throw new Error(`Value cannot be less than 1 and greater than 10! // Значение не может быть меньше 1 и больше 10!`);
    }

    /* ////////////////////////////////////////////////////////  */
    // ОБРАБОТКА РЕЗУЛЬТАТА ФУНКЦИИ
    /* //////////////////////////////////////////////////////// */
    // Считаем результат и возвращаем его в той системе счисления, в которой изначально были переданы аперанды
    const result = Math.floor(arrValuesOperator[1] === '+' ? arrValuesOperator[0] + arrValuesOperator[2] :
    arrValuesOperator[1] === '-' ? arrValuesOperator[0] - arrValuesOperator[2] :
    arrValuesOperator[1] === '/' ? arrValuesOperator[0] / arrValuesOperator[2] :
    arrValuesOperator[0] * arrValuesOperator[2]);
    return String(notation === 'Arabic' ? result : formatChange('arabicToRoman', result));


    /* ////////////////////////////////////////////////////////  */
    // ФУНКЦИЯ ПРОВЕРКИ СИСТЕМЫ СЧИСЛЕНИЯ
    /* //////////////////////////////////////////////////////// */
    function formatCheck(elem){ // Определяет формат системы счиления по переданному элементу
        if(elem / 1 == elem){ // Если значение поделить на 1 И == значение, ТО: 'Arabic'
            return 'Arabic';
        }
        else if((elem.split('').filter((x) => !romanNumb.some(y => y.char === x))).length == 0){ // Проверяем каждый символ аперанда И ищем его среди символов Римской системы счисления
            return 'Roman';
        }
        else{ // Если НЕ первое и НЕ второе, ТО значение операнда юзером было переданно с ошибкой
            return 'error';
        }
    }

    /* ////////////////////////////////////////////////////////  */
    // ФУНКЦИЯ ПРЕОБРАЗОВАНИЕ ФОРМАТОВ СИСТЕМ СЧИСЛЕНИЯ
    /* //////////////////////////////////////////////////////// */
    function formatChange(format, x){ // Конвертирует числа из одной системы счисления в другую, в зависимости от пераданного формата: 'romanToArabic' (из Римской -> в Арабскую / пр.: IV --> 4) ИЛИ 'arabicToRoman' (из Арабской -> в Римскую / пр.: 14 --> XIV)
        if(format === 'romanToArabic'){
            return arabicToRomanNumb.reduce((results, currentValue) => {
                while(0 < (x.match(new RegExp(currentValue.char, 'gi')) || []).length){
                    x = x.replace(currentValue.char, '');
                    results += currentValue.value
                };
                return results;
            }, 0)
        }
        else if(format === 'arabicToRoman'){
            return romanNumb.reduce((results, currentValue) => {
                while(x >= currentValue.value){
                    results += currentValue.char;
                    x -= currentValue.value;
                };
                return results;
            }, '');
        };
    }
}

calculator('   ');