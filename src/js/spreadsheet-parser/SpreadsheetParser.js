class SpreadsheetParser {

    constructor(data, tab = {}) {

        this.title = data.feed.title.$t;
        this.lastUpdate = data.feed.updated.$t;
        this.href = data.feed.link[0].href;
        this.id = this.href.match(/\/d\/([^/]*)/)[1];
        this.$configs = {
            template: tab.template || "basic",
            adapter: tab.adapter || data.filter(item => item.row === "1")
                .map(item => item.content)
                .reduce((total, key) => {
                    total[key] = key;
                    return total;
                }, {})
        };

        this.rows = data.feed.entry.map(entry => {
            return {
                row: entry.gs$cell.row,
                column: entry.gs$cell.col,
                content: entry.gs$cell.$t
            };
        }).reduce((total, current, index, data) => {

            if (current.row > 1) {
                current.row--;
                let row = total.find(item => item.$id === current.row) || {};

                let key = data.find(item => item.column === current.column).content;

                if (Object.keys(row).length === 0) {
                    row.$id = current.row;
                    total.push(row);
                }
                row[key] = current.content;

                row.$data = Object.keys(this.$configs.adapter).reduce((total, key) => {
                    total[key] = row[this.$configs.adapter[key]] || null;
                    return total;
                }, {});
            }

            return total;
        }, []);
    }
}

export default SpreadsheetParser;