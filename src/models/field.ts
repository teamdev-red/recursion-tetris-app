export class Field {
  /**
   * テトリスフィールドの値
   */
  private _value: number[][];
  public get value(): number[][] {
    return this._value;
  }

  /**
   * @param col テトリスフィールドの列数
   * @param row テトリスフィールドの行数
   */
  constructor(col: number, row: number) {
    if (col < 1 || row < 1) {
      throw new Error('フィールドのサイズは必ず1以上にしてください');
    }
    this._value = this.generateField(col, row);
  }

  /**
   * テトリスフィールドの値を初期化
   * @param col テトリスフィールドの列数
   * @param row テトリスフィールドの行数
   */
  private generateField(col: number, row: number): number[][] {
    let field = [];
    for (let i = 0; i < row; i++) {
      field[i] = [];
      for (let j = 0; j < col; j++) {
        field[i][j] = 0;
      }
    }
    return field;
  }
}
