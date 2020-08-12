export default class AudioManager {
    /**
     * An audio-processing graph built from audio modules linked together, each represented by an AudioNode.
     */
    private audioContext: AudioContext;

    /**
     * The audio source playing in background
     */
    private backgroundgAudioNode : any;

    /**
     * ResourceMap Instance
     */
    private resourceMap: any;

    /**
     * Constructor
     * @param ResourceMap
     */
    constructor(ResourceMap: any) {
        try {
            this.audioContext = new window.AudioContext;
            this.resourceMap = ResourceMap;
        } catch (e) {
            alert("Web Audio Is not supported.");
        }
    }

    /**
     * Load an audio asset
     * @param clipName
     */
    public loadAudio(clipName: string) {
        if (!(this.resourceMap.isAssetLoaded(clipName))) {
            // Update resources in load counter.
            this.resourceMap.asyncLoadRequested(clipName);

            // Asynchronously request the data from server.
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if ((req.readyState === 4) && (req.status !== 200)) {
                    alert(clipName + ": loading failed! [Hint: you cannot double click index.html to run this project. " +
                        "The index.html file must be loaded by a web-server.]");
                }
            };
            req.open('GET', clipName, true);
            // Specify that the request retrieves binary data.
            req.responseType = 'arraybuffer';

            let that = this;
            req.onload = function () {
                // Asynchronously decode, then call the function in parameter.
                that.audioContext.decodeAudioData(req.response,
                    function (buffer) {
                        that.resourceMap.asyncLoadCompleted(clipName, buffer);
                    }
                );
            };
            req.send();
        } else {
            this.resourceMap.incAssetRefCount(clipName);
        }
    }

    /**
     *  Stop and remove all scene audio assets
     * @param audios
     */
    public unloadAudios(audios: Array<string>) {
        if (audios.length < 1) {
            return;
        }

        // Stop audio if playing
        this.stopBackgroundAudio();

        // Remove audio assets
        audios.forEach((audio: string) => {
            this.resourceMap.unloadAsset(audio);
        });
    }

    /**
     * Play audio track only
     * @param clipName
     */
    public playAudioTrack(clipName: string) {
        var clipInfo = this.resourceMap.retrieveAsset(clipName);
        if (clipInfo !== null) {
            // SourceNodes are one use only.
            var sourceNode = this.audioContext.createBufferSource();
            sourceNode.buffer = clipInfo;
            sourceNode.connect(this.audioContext.destination);
            sourceNode.start(0);
        }
    }

    /**
     * Play audio in background
     * @param clipName
     */
    public playBackgroundAudio(clipName: string) {
        var clipInfo = this.resourceMap.retrieveAsset(clipName);
        if (clipInfo !== null) {
            // Stop audio if playing.
            this.stopBackgroundAudio();

            this.backgroundgAudioNode = this.audioContext.createBufferSource();
            this.backgroundgAudioNode.buffer = clipInfo;
            this.backgroundgAudioNode.connect(this.audioContext.destination);
            this.backgroundgAudioNode.loop = true;
            this.backgroundgAudioNode.start(0);
        }
    };

    /**
     * Stop audio if playing.
     */
    public stopBackgroundAudio() {
        // Check if the audio is  playing.
        if (typeof this.backgroundgAudioNode === 'undefined') {
            return;
        }

        if (this.backgroundgAudioNode === null) {
            return;
        }

        this.backgroundgAudioNode.stop(0);
        this.backgroundgAudioNode = null;
    };

    /**
     * Check if audio is playing on background
     */
    public isBackgroundAudioPlaying() {
        return (this.backgroundgAudioNode !== null);
    };
}