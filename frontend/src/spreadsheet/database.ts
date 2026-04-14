import toast from "react-hot-toast";

export class Database<TRow extends { [key: string]: string }> {
  rows: string[][];
  data: TRow[];
  columnIndexMap: Record<string, number>;

  constructor(tsv: string, knownKeys: readonly string[]) {
    const rows = tsv.split("\n").map((row, i) => {
      // add index as first column
      const firstCol = i == 0 ? "row_index" : (i + 1).toString();
      // split rest on tabs
      return [firstCol, ...row.split("\t")];
    });

    // remove extra space or \r
    const headers = rows[0].map((h) => h.trim());

    headers.forEach((key) => {
      if (!knownKeys.includes(key)) {
        toast.error(`Unknown column (${key})`);
      }
    });

    knownKeys.forEach((key) => {
      if (!headers.includes(key)) {
        toast.error(`Missing column (${key})`);
      }
    });

    this.columnIndexMap = Object.fromEntries(
      // header row
      headers.map((key, index) => [key, index]),
    );

    // remove header row
    this.rows = rows.slice(1);

    this.data = rows.map((row) => {
      const record = {} as TRow;

      for (const [key, index] of Object.entries(this.columnIndexMap)) {
        record[key as keyof TRow] = row[index] as TRow[keyof TRow];
      }

      return record;
    });
  }

  public forEachItem(callback: (row: TRow, i: number) => void) {
    this.data.forEach(callback);
  }
}
