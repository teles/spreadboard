class SpreadsheetParser {

    constructor(data, tab = {}) {

        this.title = data.feed.title.$t;
        this.lastUpdate = data.feed.updated.$t;
        this.href = data.feed.link[0].href;
        this.id = this.href.match(/\/d\/([^/]*)/)[1];

        this.rows = data.feed.entry.map(entry => {
            return {
                row: entry.gs$cell.row,
                column: entry.gs$cell.col,
                content: entry.gs$cell.$t
            };
        }).reduce(function (total, current, index, data) {

            const adapter = tab.adapter || data.filter(item => item.row === "1")
                .map(item => item.content)
                .reduce((total, key) => {
                    total[key] = key;
                    return total;
                }, {});

            if (current.row > 1) {
                current.row--;
                let row = total.find(item => item.$id === current.row) || {};

                let key = data.find(item => item.column === current.column).content;

                if (Object.keys(row).length === 0) {
                    row.$id = current.row;
                    total.push(row);
                }
                row[key] = current.content;


                row.$data = Object.keys(adapter).reduce((total, key) => {
                    total[key] = row[adapter[key]] || null;
                    return total;
                }, {});

                row.$configs = {
                    template: tab.template || "basic"
                };
            }

            return total;
        }, []);
    }
}

export default SpreadsheetParser;