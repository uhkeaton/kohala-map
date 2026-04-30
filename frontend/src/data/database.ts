import toast from "react-hot-toast";

export class Database<TRow extends { [key: string]: string }> {
  rows: string[][];
  data: TRow[];
  columnIndexMap: Record<string, number>;
  headers: string[];

  constructor(tsv: string, knownKeys: readonly string[]) {
    const rows = tsv.split("\n").map((row) => {
      return row.split("\t");
    });

    // remove extra space or \r
    this.headers = rows[0].map((h) => h.trim());

    this.headers.forEach((key) => {
      if (!knownKeys.includes(key)) {
        toast.error(`Unknown column (${key})`);
      }
    });

    knownKeys.forEach((key) => {
      if (!this.headers.includes(key)) {
        toast.error(`Missing column (${key})`);
      }
    });

    this.columnIndexMap = Object.fromEntries(
      // header row
      this.headers.map((key, index) => [key, index]),
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
