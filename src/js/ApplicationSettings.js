import ApplicationTemplates from "./ApplicationTemplates";

const camelCaseToKebabCase = (camelCaseString) => camelCaseString
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
    .toLowerCase();

const templatesToKebabCase = (templates) => Object.keys(templates).reduce((result, key) => {
    result[camelCaseToKebabCase(key)] = templates[key];
    return result;
}, {});

const ApplicationSettings = {
    templates: templatesToKebabCase(ApplicationTemplates),
    themes: {
        "primary": {
            "class": "is-primary"
        },
        "info": {
            "class": "is-info"
        },
        "success": {
            "class": "is-success"
        },
        "warning": {
            "class": "is-warning"
        },
        "danger": {
            "class": "is-danger"
        },
        "light": {
            "class": "is-light"
        },
        "dark": {
            "class": "is-dark"
        }
    },
    samples: {
        tabs: [{
            id: "1qQVqf4n9TBg1p1Uu7kDZyR3ApZUJYVs7XcuB7YuOVEc",
            adapter: {
                "title": "Termo: {{Termo}}",
                "text": "Definição: {{Definição}}"
            },
            template: "basic",
            theme: "warning"
        }, {
            id: "1qQVqf4n9TBg1p1Uu7kDZyR3ApZUJYVs7XcuB7YuOVEc",
            pageNumber: "2",
            adapter: {
                "title": "{{nome}}",
                "text": "{{âncora}}",
                "subtitle": "{{descricao}}"
            },
            template: "list-item",
            theme: "warning"
        }, {
            id: "1565ns3l4xse6mCp3MxXcS70eqhJUXhuPQIfIXEWEUN0",
            adapter: {
                "title": "{{título}}",
                "subtitle": "{{tipo_de_capa}} - {{páginas}} páginas",
                "text": "{{descricao}}",
                "image": "{{capa}}"
            },
            template: "boxes-plus-image",
            theme: "primary"
        }]
    }
};

export default ApplicationSettings;