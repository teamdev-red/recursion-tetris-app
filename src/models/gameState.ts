import { Field } from "./field";
import { Tetrimino } from "./tetrimino";

/**
 * テトリスのゲーム状態を管理するクラス
 * 落下中のテトリミノ，フィールドの状態，スコア，ゲームオーバーかどうかなどを管理し，画面に描画する．
 *
 * @param {CanvasRenderingContext2D} context キャンバスのコンテキスト
 * @param {CanvasRenderingContext2D} nextTetriminoContext 次に落下するテトリミノを表示するキャンバスのコンテキスト
 * @param {Field} field テトリスのフィールド
 * @param {Field} nextTetriminoField 次に落下するテトリミノを表示するフィールド
 * @param {Tetrimino} currentTetrimino 落下中のテトリミノ
 * @param {Tetrimino} nextTetrimino 次に落下するテトリミノ
 * @param {number} score テトリスのスコア
 * @param {number} gameStatus 現在のゲームの状態，0: ゲーム中，1: 一時停止，2: ゲームオーバー
 * @param {NodeJS.Timer} intervalId ゲームのインターバルID，ゲームオーバー時もしくは，ゲーム一時停止時にインターバルをクリアするために使用
 * @param {HTMLDivElement} view ゲーム画面を表示する要素
 */
export class GameState {
  private _context: CanvasRenderingContext2D;
  private _nextTetriminoContext: CanvasRenderingContext2D;
  private _field: Field;
  private _nextTetriminoField: Field;
  private _currentTetrimino: Tetrimino;
  private _nextTetrimino: Tetrimino;
  private _score: number;
  private _gameStatus: number;
  private _intervalId: NodeJS.Timer;
  private _view: HTMLDivElement;

  /**
   * blockの色
   * blockの数値の値に対応する
   */
  private static readonly BLOCK_COLORS = [
    "#FFF", // 空白
    "#00FF57", // Z
    "#FAFF00", // S
    "#FF9900", // J
    "#00D1FF", // L
    "#0000FF", // T
    "#FF0000", // I
    "#8F00FF", // O
  ];

  /**
   * 1ブロックのサイズ (px)
   */
  private static readonly BLOCK_SIZE = 30;

  /**
   * フィールドの横方向のブロック数
   */
  private static readonly FIELD_COL = 10;

  /**
   * フィールドの縦方向のブロック数
   */
  private static readonly FIELD_ROW = 20;

  /**
   * テトリミノのx座標の初期値
   */
  private static readonly START_X = GameState.FIELD_COL / 2;

  /**
   * テトリミノのy座標の初期値
   */
  private static readonly START_Y = 0;

  /**
   * 画面の横幅 (px)
   */
  private static readonly SCREEN_W = GameState.BLOCK_SIZE * GameState.FIELD_COL;

  /**
   * 画面の縦幅 (px)
   */
  private static readonly SCREEN_H = GameState.BLOCK_SIZE * GameState.FIELD_ROW;

  /**
   * テトリミノを1行消したときのスコアの増加量
   */
  private static readonly SCORE_INCREASE = 100;

  /**
   * テトリミノの落下速度 (ms)
   */
  private static readonly GAME_SPEED = 300;

  /**
   * ゲームの状態を表す定数
   */
  private static readonly GAME_STATUS = {
    PLAYING: 0,
    PAUSE: 1,
    GAMEOVER: 2,
  };


  /**
   * @param {HTMLDivElement} view ゲーム画面を表示する要素
   */
  public constructor(view: HTMLDivElement) {
    this._view = view;
    let gameField = document.createElement("canvas");
    gameField.width = GameState.SCREEN_W;
    gameField.height = GameState.SCREEN_H;
    gameField.style.border = "1px solid black";
    this._context = gameField.getContext("2d");
    // クラス名を直接指定して，要素を取得してので，クラス名が変わると動かなくなる．
    this._view.querySelector(".field").appendChild(gameField);

    let nextTetriminoField = document.createElement("canvas");
    nextTetriminoField.width = GameState.BLOCK_SIZE * 4;
    nextTetriminoField.height = GameState.BLOCK_SIZE * 4;
    this._nextTetriminoContext = nextTetriminoField.getContext("2d");
    // クラス名を直接指定して，要素を取得してので，クラス名が変わると動かなくなる．
    this._view.querySelector(".next-area").appendChild(nextTetriminoField);
  }

  /**
   * ゲームを開始する
   */
  public gameStart(): void {
    this._gameStatus = GameState.GAME_STATUS.PLAYING;
    this._score = 0;
    this._field = this.initializeField();
    this._currentTetrimino = this.initializeTetrimino();
    this.drawField();
    this.setKeydownHandler();
    this._intervalId = this.setDropTetriminoInterval();
  }

  /**
   * ゲームを一時停止する
   */
  public gamePause(): void {
    this._gameStatus = GameState.GAME_STATUS.PAUSE;
    clearInterval(this._intervalId);
    this.drawField();
    this._intervalId = this.setDropTetriminoInterval();
  }

  /**
   * ゲームを再開する
   */
  public gameRestart(): void {
    this._gameStatus = GameState.GAME_STATUS.PLAYING;
    clearInterval(this._intervalId);
    this.drawField();
    this.setKeydownHandler();
    this._intervalId = this.setDropTetriminoInterval();
  }

  /**
   * フィールドを初期化する
   *
   * @returns {Field} 初期化されたフィールド
   */
  private initializeField(): Field {
    return new Field(GameState.FIELD_COL, GameState.FIELD_ROW);
  }

  /**
   * 次に落ちてくるテトリミノを表示する画面を初期化する
   */
  private initializeNextTetriminoField(): Field {
    return new Field(4, 4);
  }


  /**
   * テトリミノを初期化する
   *
   * @returns {Tetrimino} 初期化されたテトリミノ
   */
  private initializeTetrimino(): Tetrimino {
    const tetri_type = Math.floor(
      Math.random() * Tetrimino.TETRIMINO_TYPES_COUNT
    );
    return new Tetrimino(
      tetri_type,
      GameState.START_X - Tetrimino.TETRIMINO_SIZE + 2,
      GameState.START_Y
    );
  }

  /**
   * 現在のゲームの状態を描画する
   */
  private drawField(): void {
    this.clearField();
    this.drawBlocks(this._field.value);
    this.drawBlocks(
      this._currentTetrimino.value,
      this._currentTetrimino.x,
      this._currentTetrimino.y
    );
    if (this._gameStatus === GameState.GAME_STATUS.GAMEOVER) {
      this.drawGameOverScreen();
    }
  }

  /**
   * ゲーム画面をクリアする
   */
  private clearField(): void {
    this._context.clearRect(0, 0, GameState.SCREEN_W, GameState.SCREEN_H);
  }

  /**
   * ゲーム画面にブロックを描画する
   *
   * @param {number[][]} blocks 描画するブロック
   * @param {number} [offsetX=0] ブロックを描画するときに使用する x オフセット
   * @param {number} [offsetY=0] ブロックを描画するときに使用する y オフセット
   * @param {CanvasRenderingContext2D} context 描画するコンテキスト
   */
  private drawBlocks(
    blocks: number[][],
    offsetX = 0,
    offsetY = 0,
    context: CanvasRenderingContext2D
  ): void {
    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          this.drawBlock(
            x + offsetX,
            y + offsetY,
            // blockの色とGameState.BLOCK_COLORSのindexを対応させている
            GameState.BLOCK_COLORS[blocks[y][x]],
            context
          );
        }
      }
    }
  }

  /**
   * 最終スコアを含むゲームオーバー画面を描画する
   */
  private drawGameOverScreen(): void {
    let scoreString = `SCORE: ${this._score}`;
    this._context.font = "40px 'MS ゴシック'";
    let textWidth = this._context.measureText(scoreString).width;
    let x = GameState.SCREEN_W / 2 - textWidth / 2;
    let y = GameState.SCREEN_H / 2 - 20;
    this._context.lineWidth = 4;
    this._context.strokeText(scoreString, x, y);
    this._context.fillStyle = "white";
    this._context.fillText(scoreString, x, y);
  }

  /**
   * 指定した位置に 1 つのブロックを描画する．ブロックの色は引数で指定し，枠線は黒にする．
   *
   * @param {number} x ブロックの x 座標
   * @param {number} y ブロックの y 座標
   * @param {CanvasRenderingContext2D} context 描画するコンテキスト
   */
  private drawBlock(
    x: number,
    y: number,
    color: string,
    context: CanvasRenderingContext2D
  ): void {
    let px = x * GameState.BLOCK_SIZE;
    let py = y * GameState.BLOCK_SIZE;
    context.fillStyle = color;
    context.fillRect(px, py, GameState.BLOCK_SIZE, GameState.BLOCK_SIZE);
    // 呼ばれるごとに枠線が太くなるので，毎回リセットする
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.strokeRect(px, py, GameState.BLOCK_SIZE, GameState.BLOCK_SIZE);
  }

  /**
   * 以下の順番で処理する
   * 現在のテトリミノを1ブロック下に落とす． 一番下に来たら固定する．
   * ラインが揃っていたら消去する．
   * また，一番下に来たときには新しいテトリミノを生成する．
   */
  private dropTetrimino(): void {
    if (this._gameStatus !== GameState.GAME_STATUS.PLAYING) return;
    let newTetrimino = this._currentTetrimino.moveDown();
    if (this.checkMove(newTetrimino)) this._currentTetrimino = newTetrimino;
    else {
      this.fixTetrimino();
      this._score += this.checkLine();
      newTetrimino = this.initializeTetrimino();
      if (!this.checkMove(newTetrimino))
        this._gameStatus = GameState.GAME_STATUS.GAMEOVER;
      this._currentTetrimino = newTetrimino;
    }
    this.drawField();
  }

  /**
   * キー入力に応じてテトリミノを移動させる
   */
  private setKeydownHandler(): void {
    document.onkeydown = (e) => {
      if (this._gameStatus !== GameState.GAME_STATUS.PLAYING) return;

      if (e.key == "ArrowLeft") {
        this._currentTetrimino = this.checkAndMoveLeft();
      } else if (e.key == "ArrowRight") {
        this._currentTetrimino = this.checkAndMoveRight();
      } else if (e.key == "ArrowUp") {
        this._currentTetrimino = this.hardDrop();
      } else if (e.key == "ArrowDown") {
        this._currentTetrimino = this.checkAndMoveDown();
      } else if (e.key == " ") {
        this._currentTetrimino = this.checkAndRotate();
      }
      this.drawField();
    };
  }

  /**
   * GAME_SPEEDの間隔でテトリミノを落下させる
   * ゲームを一時停止機能を追加する際に，clearIntervalで停止させるようにするため，intervalIdを返す
   */
  private setDropTetriminoInterval(): NodeJS.Timer {
    if (this._gameStatus !== GameState.GAME_STATUS.PLAYING)
      return this._intervalId;
    return setInterval(() => this.dropTetrimino(), GameState.GAME_SPEED);
  }

  /**
   * テトリミノが移動可能かどうかをチェックし，移動可能なら移動させる
   *
   * @returns {Tetrimino} 移動後のテトリミノ
   */
  private checkAndMoveLeft(): Tetrimino {
    let newTetrimino = this._currentTetrimino.moveLeft();
    if (this.checkMove(newTetrimino)) return newTetrimino;
    return this._currentTetrimino;
  }
  private checkAndMoveRight(): Tetrimino {
    let newTetrimino = this._currentTetrimino.moveRight();
    if (this.checkMove(newTetrimino)) return newTetrimino;
    return this._currentTetrimino;
  }


  /**
   * テトリミノを一番下まで落とす
   * @returns {Tetrimino} 最下段まで落としたテトリミノ
   */
  private hardDrop(): Tetrimino {
    while(this.checkAndMoveDown() != this._currentTetrimino){
      this._currentTetrimino = this.checkAndMoveDown();
    }
    return this._currentTetrimino;
  }


  private checkAndMoveDown(): Tetrimino {
    let newTetrimino = this._currentTetrimino.moveDown();
    if (this.checkMove(newTetrimino)) return newTetrimino;
    return this._currentTetrimino;
  }

  private checkAndRotate(): Tetrimino {
    let newTetrimino = this._currentTetrimino.moveRotate();
    if (this.checkMove(newTetrimino)) return newTetrimino;
    return this._currentTetrimino;
  }

  /**
   * 指定したテトリミノを新しい位置に移動できるかどうかをチェックする
   *
   * @param {Tetrimino} newTetrimino チェックするテトリミノ
   * @returns {boolean} テトリミノを移動できる場合は true、それ以外の場合は false。
   */
  private checkMove(newTetrimino: Tetrimino): boolean {
    return (
      this.checkMoveWithinField(newTetrimino) &&
      this.checkMoveOverlapping(newTetrimino)
    );
  }

  /**
   * テトリミノの移動先がフィールド内かどうかをチェックする
   * 移動先が壁である場合はfalseを返し，移動先がフィールド内である場合はtrueを返す
   *
   * @param {Tetrimino} newTetrimino 移動先のテトリミノ
   * @return {boolean} 移動可能かどうか
   */
  private checkMoveWithinField(newTetrimino: Tetrimino): boolean {
    for (let y = 0; y < Tetrimino.TETRIMINO_SIZE; y++) {
      for (let x = 0; x < Tetrimino.TETRIMINO_SIZE; x++) {
        let nx = newTetrimino.x + x;
        let ny = newTetrimino.y + y;
        if (newTetrimino.value[y][x]) {
          if (
            ny < 0 ||
            ny >= GameState.FIELD_ROW ||
            nx < 0 ||
            nx >= GameState.FIELD_COL
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  /**
   * テトリミノの重なりの有無を判定する
   *
   * @param {Tetrimino} newTetrimino 移動先のテトリミノ
   * @return {boolean} 重なっていないかどうか，重なっている場合はfalseを返す
   *                  重なっていない場合はtrueを返す
   */
  private checkMoveOverlapping(newTetrimino: Tetrimino): boolean {
    for (let y = 0; y < Tetrimino.TETRIMINO_SIZE; y++) {
      for (let x = 0; x < Tetrimino.TETRIMINO_SIZE; x++) {
        let nx = newTetrimino.x + x;
        let ny = newTetrimino.y + y;
        if (newTetrimino.value[y][x]) {
          if (this._field.value[ny][nx]) {
            return false;
          }
        }
      }
    }
    return true;
  }

  /**
   * テトリミノをゲームフィールド上の所定の位置に固定する
   */
  private fixTetrimino(): void {
    for (let y = 0; y < Tetrimino.TETRIMINO_SIZE; y++) {
      for (let x = 0; x < Tetrimino.TETRIMINO_SIZE; x++) {
        if (this._currentTetrimino.value[y][x]) {
          this._field.value[this._currentTetrimino.y + y][
            this._currentTetrimino.x + x
          ] = this._currentTetrimino.value[y][x];
        }
      }
    }
  }

  /**
   * テトリミノが揃ったか確認し，揃った行を削除する．
   * 1行揃うごとにSCORE_INCREASE点加算しスコアを返す
   *
   * @returns {number} スコア
   */
  private checkLine(): number {
    let line_count = 0;
    let score = 0;
    for (let y = 0; y < GameState.FIELD_ROW; y++) {
      let fill = true;
      for (let x = 0; x < GameState.FIELD_COL; x++) {
        if (!this._field.value[y][x]) {
          fill = false;
          break;
        }
      }
      if (fill) {
        line_count++;
        this.clearLine(y);
        y--;
      }
    }
    score = line_count ? line_count * GameState.SCORE_INCREASE : 0;
    return score;
  }

  /**
   * 指定した行を削除する
   *
   * @param {number} y 削除する行
   */
  private clearLine(y: number): void {
    for (let ny = y; ny > 0; ny--) {
      for (let nx = 0; nx < GameState.FIELD_COL; nx++) {
        this._field.value[ny][nx] = this._field.value[ny - 1][nx];
      }
    }
    for (let nx = 0; nx < GameState.FIELD_COL; nx++) {
      this._field.value[0][nx] = 0;
    }
  }
}
