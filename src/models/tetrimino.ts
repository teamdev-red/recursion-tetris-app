export class Tetrimino {
  public static readonly TETRIMINO_SIZE = 4;
  public static readonly TETRIMINO_TYPES = [
    // Z
    [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    // S
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    // J
    [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    // L
    [
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    // T
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    // I
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    // O
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
  ];

  /**
   * Tetrisのテトリミノを表すクラス
   *
   * @param type テトリミノのタイプ，0: Z, 1: S, 2: J, 3: L, 4: T, 5: I, 6: O
   * @param x x座標
   * @param y y座標
   * @param value テトリミノの形
   * @param rotate テトリミノの回転角度，0: 0度, 1: 90度, 2: 180度, 3: 270度
   */
  public static TETRIMINO_TYPES_COUNT = Tetrimino.TETRIMINO_TYPES.length;

  private _type: number;
  public get type(): number {
    return this._type;
  }

  private _value: number[][];
  public get value(): number[][] {
    return this._value;
  }

  private _x: number;
  public get x(): number {
    return this._x;
  }

  private _y: number;
  public get y(): number {
    return this._y;
  }

  private _rotate: number;
  public get rotate(): number {
    return this._rotate;
  }

  public constructor(type: number, x: number, y: number, rotate?: number) {
    this._type = type;
    this._x = x;
    this._y = y;
    this._rotate = rotate || 0;
    this._value = this.generateTetriminoValue();
  }

  /**
   * this.rotateの値に応じてテトリミノの値を回転させる．
   * 計算量がO(n^2)のため，改善の余地あり．
   * @return 回転後のテトリミノの値
   */
  private generateTetriminoValue(): number[][] {
    let value = Tetrimino.TETRIMINO_TYPES[this.type];
    for (let i = 0; i < this.rotate; i++) {
      const newValue = [];
      for (let j = 0; j < Tetrimino.TETRIMINO_SIZE; j++) {
        const newRow = [];
        for (let k = 0; k < Tetrimino.TETRIMINO_SIZE; k++) {
          newRow.push(value[Tetrimino.TETRIMINO_SIZE - k - 1][j]);
        }
        newValue.push(newRow);
      }
      value = newValue;
    }
    return value;
  }

  /**
   * テトリミノを左に1つ移動．
   *
   * @return 移動後のTetriminoクラスのインスタンス
   */
  public moveLeft(): Tetrimino {
    return new Tetrimino(this._type, this._x - 1, this._y, this._rotate);
  }

  /**
   * テトリミノを右に1つ移動．
   *
   * @return 移動後のTetriminoクラスのインスタンス
   */
  public moveRight(): Tetrimino {
    return new Tetrimino(this._type, this._x + 1, this._y, this._rotate);
  }

  /**
   * テトリミノを下に1つ移動．
   *
   * @return 移動後のTetriminoクラスのインスタンス
   */
  public moveDown(): Tetrimino {
    return new Tetrimino(this._type, this._x, this._y + 1, this._rotate);
  }

  /**
   * テトリミノを上に1つ移動．
   *
   * @return 移動後のTetriminoクラスのインスタンス
   */
  public moveUp(): Tetrimino {
    return new Tetrimino(this._type, this._x, this._y - 1, this._rotate);
  }

  /**
   * テトリミノを90度回転する．
   *
   * @return 回転後のTetriminoクラスのインスタンス
   */
  public moveRotate(): Tetrimino {
    return new Tetrimino(this._type, this._x, this._y, this._rotate + 1);
  }
}
