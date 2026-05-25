import {createComparison, defaultRules} from "../lib/compare.js";

// TODO: DONE #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // TODO: DONE #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                                   // Получаем ключи из объекта
        .forEach((elementName) => {                                        // Перебираем по именам
            elements[elementName].append(                                  // в каждый элемент добавляем опции
                ...Object.values(indexes[elementName])                     // формируем массив имён, значений опций
                    .map(name => {                                         // используйте name как значение и текстовое содержимое
                        const option = document.createElement('option');   // создаем тег опции
                        option.value = name;                               // присваиваем name в value тега option
                        option.textContent = name;                         // присваиваем name в техтовое содержимое тега option
                        return option;                                     // ввозвращаем тег опции
                    })
            )
        });

    return (data, state, action) => {
        // TODO: DONE #4.2 — обработать очистку поля
        const clearButton = document.querySelectorAll('button[name=clear]');
        Array.from(clearButton).forEach((elem) => {
            const filterInput = elem.parentElement.querySelector('input');
            if (action && action.name === 'clear') {
                filterInput.value = '';
                state['customer'] = '';
                state['date'] = '';
            }
        });

        // TODO: DONE #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}