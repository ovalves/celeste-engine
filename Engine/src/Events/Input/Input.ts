import Keys from './Keys';

export default class Input {
    /**
     * Keys mapping class
     */
    private keys: Keys;

    /**
     * Previous key state
     */
    private mKeyPreviousState: any  = [];

    /**
     * The pressed keys.
     */
    private mIsKeyPressed: any = [];

    /**
     * Click events: once an event is set, it will remain there until polled
     */
    private mIsKeyClicked: any = [];

    /**
     * Constructor
     */
    constructor() {
        this.keys = new Keys;
        this.mKeyPreviousState = [];
        this.mIsKeyPressed = [];
        this.mIsKeyClicked = [];
    }

    /**
     * Get the key mapping class instance
     */
    public getKeys() : Keys
    {
        return this.keys;
    }

    /**
     *  Search by the pressed key
     * @param searchedKey
     */
    public getKey(searchedKey: string)
    {
        if (!searchedKey) {
            return false;
        }

        let found: number = 0;
        for (var [key, value] of Object.entries(this.keys.getKeys())) {
            if (key == searchedKey) {
                found = value;
            }
        }

        return (found < 1) ? false : found;
    }

    /**
     * Event handler functions
     * @param event
     * @param mIsKeyPressed
     */
    _onKeyDown(event: any, mIsKeyPressed: any) {
        mIsKeyPressed[event.keyCode] = true;
        this.mIsKeyPressed = mIsKeyPressed;
    };

    _onKeyUp(event: any, mIsKeyPressed: any) {
        mIsKeyPressed[event.keyCode] = false;
        this.mIsKeyPressed = mIsKeyPressed;
    };

    /**
     * Initialize the Input Class
     */
    initialize() {
        var i;
        for (i = 0; i < this.keys.getKeys().LastKeyCode; i++) {
            this.mIsKeyPressed[i] = false;
            this.mKeyPreviousState[i] = false;
            this.mIsKeyClicked[i] = false;
        }

        // register handlers
        window.addEventListener(
            'keyup',
            () =>  this._onKeyUp(
                event,
                this.mIsKeyPressed
            )
        );

        window.addEventListener(
            'keydown',
            () => this._onKeyDown(
                event,
                this.mIsKeyPressed
            )
        );
    };

    /**
     * Updates the pressed keys
     */
    update() {
        var i;
        for (i = 0; i < this.keys.getKeys().LastKeyCode; i++) {
            this.mIsKeyClicked[i] = (!this.mKeyPreviousState[i]) && this.mIsKeyPressed[i];
            this.mKeyPreviousState[i] = this.mIsKeyPressed[i];
        }
    };

    /**
     * Function for GameEngine programmer to test if a key is pressed down
     * @param keyCode
     */
    isKeyPressed(keyCode: any) {
        return this.mIsKeyPressed[keyCode];
    };

    /**
     * Function for GameEngine programmer to test if a key is clicked
     * @param keyCode
     */
    isKeyClicked(keyCode: any) {
        return (this.mIsKeyClicked[keyCode]);
    };
}
