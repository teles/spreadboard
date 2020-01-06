const SampleConfig = {
    tabs: [{
        id: "1qQVqf4n9TBg1p1Uu7kDZyR3ApZUJYVs7XcuB7YuOVEc",
        adapter: {
            "title": "Termo: {{Termo}}",
            "text": "Definição: {{Definição}}",
            "more": "{{Exemplo}}"
        },
        template: "basic",
        theme: "warning"
    }, {
        id: "1565ns3l4xse6mCp3MxXcS70eqhJUXhuPQIfIXEWEUN0",
        adapter: {
            "title": "{{título}}",
            "subtitle": "{{tipo_de_capa}} - {{páginas}} páginas",
            "text": "{{descricao}}",
            "more": "{{link}}",
            "image": "{{capa}}"
        },
        template: "boxes-plus-image",
        theme: "primary"
    }]
};

export default SampleConfig;