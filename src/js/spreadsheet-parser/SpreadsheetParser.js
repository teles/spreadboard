class SpreadsheetParser {

    constructor(data, tab = {}) {

        this.title = data.feed.title.$t;
        this.href = `${data.feed.link[0].href.match(/\/d\/([^/]*)/)[1]}`;
        this.id = `${data.feed.link[0].href.match(/\/d\/([^/]*)/)[1]}_${tab.pageNumber || "1"}`;

        this.$configs = {
            theme: tab.theme || "info",
            template: tab.template || "basic"
        };

        this.rows = data.feed.entry.map(entry => {
            return {
                row: entry.gs$cell.row,
                column: entry.gs$cell.col,
                content: entry.gs$cell.$t
            };
        }).reduce((total, current, index, data) => {
            this.$configs.adapter = tab.adapter || data.filter(item => item.row === "1")
                .map(item => item.content)
                .reduce((total, key) => {
                    total[key] = `{{${key}}}`;
                    return total;
                }, {});

            if (current.row > 1) {
                current.row--;
                let row = total.find(item => item.$id === current.row) || {};

                const key = data.find(item => item.column === current.column).content;

                if (Object.keys(row).length === 0) {
                    row.$id = current.row;
                    total.push(row);
                }
                row[key] = current.content;

                row.$data = Object.keys(this.$configs.adapter).reduce((total, key) => {
                    const match = this.$configs.adapter[key].match(/{{(.*?)}}/i) || null;
                    const matches = this.$configs.adapter[key]
                        .match(/{{[^\s]*?}}/gi)
                        .map(item => item.replace(/}}|{{/g, ""))
                        .join("|");

                    if (match !== null && row.hasOwnProperty(match[1])) {
                        total[key] = this.$configs.adapter[key]
                            .replace(new RegExp(`{{(${matches})}}`, "gi"), match => {
                                match = match.replace("{{", "")
                                    .replace("}}", "");
                                return row[match] || "";
                        });
                    }
                    return total;
                }, {});
            }

            return total;
        }, []);
    }
}

export default SpreadsheetParser;