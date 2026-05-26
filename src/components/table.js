import {cloneTemplate} from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before, after} = settings;
    const root = cloneTemplate(tableTemplate);

    // TODO: #1.2 DONE —  вывести дополнительные шаблоны до и после таблицы
    before.reverse().forEach(templateId => {                  // перебираем нужный массив идентификаторов
        root[templateId] = cloneTemplate(templateId);         // клонируем и получаем объект, сохраняем в таблице
        root.container.prepend(root[templateId].container);   // добавляем к таблице после (append) или до (prepend)
    });

    after.forEach(templateId => {                             // перебираем нужный массив идентификаторов
        root[templateId] = cloneTemplate(templateId);         // клонируем и получаем объект, сохраняем в таблице
        root.container.append(root[templateId].container);    // добавляем к таблице после (append) или до (prepend)
    });

    // TODO: #1.3 DONE —  обработать события и вызвать onAction()
    root.container.addEventListener('change', () => {
        onAction();
    })

    root.container.addEventListener('reset', () => {
        setTimeout(onAction);
    })

    root.container.addEventListener('submit', (e) => {
        e.preventDefault();
        onAction(e.submitter);
    })

    const render = (data) => {
        // TODO: #1.1 DONE — преобразовать данные в массив строк на основе шаблона rowTemplate
        const nextRows = data.map(item => {
            const row = cloneTemplate(rowTemplate);
            Object.keys(item).forEach(key => {
                if (key in row.elements) {
                    if (row.elements.tagName === 'INPUT' || row.elements.tagName === 'SELECT') {
                        row.elements[key].value = item[key];               
                    } else {
                        row.elements[key].textContent = item[key];
                    }
                }
            })
            return row.container;
        })
        root.elements.rows.replaceChildren(...nextRows);
    }

    return {...root, render};
}