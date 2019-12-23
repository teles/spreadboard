class SpreadsheetParser {

    constructor(data) {

        this.title = data.feed.title.$t;
        this.lastUpdate = data.feed.updated.$t;
        this.href = data.feed.link[0].href;

        this.rows = data.feed.entry.map(entry => {
            return {
                row: entry.gs$cell.row,
                column: entry.gs$cell.col,
                content: entry.gs$cell.$t
            };
        }).reduce(function (total, current, index, data) {

            if (current.row > 1) {
                current.row--;
                let row = total.find(item => item.$id === current.row) || {};
                let key = data.find(item => item.column === current.column).content;

                if (Object.keys(row).length === 0) {
                    row.$id = current.row;
                    total.push(row);
                }
                row[key] = current.content;
            }

            return total;
        }, []);
    }
}

export default SpreadsheetParser;