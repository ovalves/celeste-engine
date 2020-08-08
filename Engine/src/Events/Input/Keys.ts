export default class Keys {
    // arrows
    public UP = 'UP';
    public LEFT = 'LEFT';
    public RIGHT = 'RIGHT';
    public DOWN = 'DOWN';

    // space bar
    public SPACE = 'SPACE';

    // numbers
    public ZERO = 'ZERO';
    public ONE = 'ONE';
    public TWO = 'TWO';
    public THREE = 'THREE';
    public FOUR = 'FOUR';
    public FIVE = 'FIVE';
    public SIX = 'SIX';
    public SEVEN = 'SEVEN';
    public EIGHT = 'EIGHT';
    public NINE = 'NINE';

    // Alphabets
    public A = 'A';
    public D = 'D';
    public E = 'E';
    public F = 'F';
    public G = 'G';
    public I = 'I';
    public J = 'J';
    public K = 'K';
    public L = 'L';
    public R = 'R';
    public S = 'S';
    public W = 'W';


    public keys = {
        // arrows
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,

        // space bar
        SPACE: 32,

        // numbers
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE : 53,
        SIX : 54,
        SEVEN : 55,
        EIGHT : 56,
        NINE : 57,

        // Alphabets
        A : 65,
        D : 68,
        E : 69,
        F : 70,
        G : 71,
        I : 73,
        J : 74,
        K : 75,
        L : 76,
        R : 82,
        S : 83,
        W : 87,

        LastKeyCode: 222
    };

    public getKeys()
    {
        return this.keys;
    }
}