/* ----------------------------------------------------------------
    FMOD Studio Scripting API TypeScript Types
    Studio version 2.00.08, Build#108014
    v. 1.0
------------------------------------------------------------------*/

/**
 * The absolute directory path of the js file currently being loaded. 
 * This does not include a trailing '/' character.
 * e.g. if you were to call a script from ...myscript.js
 * it would return the directory of that script
 */
declare const __dirname: string;

/**
 * The absolute path of the js file currently being loaded.
 * e.g. if you were to call a script from ...myscript.js
 * it would provide path/to/myscript.js as a string
 */
declare const __filename: string;

/**
 * The base namespace 
 */
declare namespace studio {
    namespace version {
        const productVersion: number;
        const majorVersion: number;
        const minorVersion: number;
        const changeList: number;
        /** 
         * Returns the verison in a human-readable format
         * @example "Version 1.00.00 (100000)"
         */
        function toString(): string;
    }
    
    /**
     * Contains info on the current operating system
     */
    namespace os {
        /** The platform running FMOD Studio */
        const platform: "win" | "mac";
    }

    /**
     * Contains info on the FMOD Studio application
     */
    namespace application {
        /** The filePath to the FMOD Studio executable */
        const filePath: string;
    }

    /**
     * Menu module for managing items in the "Scripts" dropdown menu
     */
    namespace menu {
        /**
         * Registers a menu item under the "Scripts" menu, based on the 
         * description object 
         */
        function addMenuItem(description: menuItemDescription): void;

        /**
         * Removes a menu item that was added with menu.addMenuItem(). 
         * The description argument must match a description that the menu item 
         * was added with.
         */
        function removeMenuItem(description: menuItemDescription): void;

        /**
         * Returns an Array of menu item descriptions added with 
         * menu.addMenuItem(). The order of the Array matches the order in 
         * which the items were added.
         */
        function menuItems(): menuItemDescription[];

        interface menuItemDescription {
            /** 
             * The name that appears in the Script menu in FMOD Studio 
             * (required) Note: Using a '\' char in the item name will
             * place it in a submenu.
             */
            name: string,
    
            /**
             * The function that executes when the menu item is selected
             * (required)
             */
            execute: () => void,
    
            /**
             * A key command shortcut to activate this script from FMOD Studio
             * @example "ctrl+shift+p"
             */
            keySequence?: string,
    
            /**
             * A bool or a function that queries for this value
             */
            isEnabled?: boolean | (() => boolean);
    
            /**
             * A bool or a function that queries for this value
             */
            isChecked?: boolean | (() => boolean);
    
            /**
             * A submenu containing other menu item descriptions
             */
            subMenuItems?: menuItemDescription[];
        }
    }

    /**
     * Window/navigation related module for triggering Window actions
     * or selecting currently browsed FMOD Studio ManagedObjects
     */
    namespace window {
        /**
         * Opens an FMOD Studio Window
         * @returns whether or not open was successful
         */
        function open(windowType: "Event Editor" | "Mixer" | "Audio Bin" |
            "Preset Browser" | "Event Browser" | "Mixer Routing" | "Profiler" |
            "Sandbox" | "Console"): boolean;

        /**
         * Attempts to navigate to a ManagedObject in the UI. Will open a new
         * window if required. Returns true if successful.
         */
        function navigateTo(managedObject: project.ManagedObject): boolean;

        /**
         * Returns the currently selected ManagedObject in the active browser 
         * tab of the last active window. A tabName can optionally be specified 
         * to select from a different browser tab.
         */
        function browserCurent(tabName?: string): 
            project.ManagedObject | null | undefined;

        function browserSelection(tabName?: string): project.ManagedObject[];

        /**
         * Returns the currently selected ManagedObject in the last active 
         * editor (e.g. in the multitrack view).
         */
        function editorCurrent(): project.ManagedObject | null;

        /**
         * Returns an array of selected ManagedObjects in the last active editor 
         * (e.g. in the multitrack view).
         */
        function editorSelection(): project.ManagedObject[];

        /**
         * Returns the currently selected ManagedObject in the deck of the last
         * active window.
         */
        function deckCurrent(): project.ManagedObject | null;

        /**
         * Returns an array of selected ManagedObjects in the deck of the last 
         * active window.
         */
        function deckSelection(): project.ManagedObject[];

        /**
         * Attempts to trigger the actionType action for the last active window. 
         * The available options are described by the window.actions enum.
         */
        function triggerAction(actionType: actions): void;

        /**
         * A list of Window actions triggerable by the function 
         * window.triggerAction
         */
        const enum actions {
            Copy,
            Paste,
            Delete,
            Duplicate,
            NewProject,
            OpenProject,
            CloseProject,
            OpenMostRecentFile,
            ClearRecentFiles,
            Save,
            SaveAs,
            RevertToSaved,
            ExitApplication,
            ShowPreferences,
            ShowAbout,
            ShowWelcome,
            ShowGettingStartedGuide,
            ShowUserManual,
            ShowQuestionsPage,
            ShowSupportEmail,
            ShowFMODio,
            Undo,
            Redo,
            Build,
            BuildAllPlatforms,
            ExportGuids,
            ImportAudioFiles,
            RefreshModifiedAssets,
            ValidateProject,
            PackageProject,
            ToggleConnectToGame,
            ViewBrowser,
            ViewDeck,
            ViewProperties,
            ZoomIn,
            ZoomOut,
            ZoomToFit,
            OpenInNewWindow,
            OpenInFileSystem,
            OpenInExternal,
            Split,
            BringToFront,
            SendToBack,
            MoveTo,
            MoveToCursor,
            Rename,
            SourceControlBrowseForProject,
            SourceControlSync,
            SourceControlCommit,
            SourceControlRevert,
            SourceControlIdentifyLocalChanges,
            ResizeTracks,
            NewBrowserItem,
            NewBrowserFolder,
            NewMixerGroup,
            NewMixerReturn,
            NewParameter,
            IncreaseTrackHeight,
            DecreaseTrackHeight,
            ToggleFilePlayback,
            LoopPlayback,
            FollowPlaybackPosition,
            SnapToItems,
            SnapToRuler,
            ShowOverlappingInstrumentsInLanes,
            ShowMarkerLines,
            ShowAutomationValues,
            ShowCompactStrips,
            ToggleBulkEdit,
            NewTab,
            CloseTab,
            WindowMinimize,
            WindowMaximize,
            WindowCycle,
            WindowBringAllToFront,
            WindowClose,
            ScriptReload,
            MergeConflictingAsset
        }
    }

    /**
     * Module for creating custom popup windows/interfaces
     */
    namespace ui {
        /**
         * Displays a dialog window. The function returns once the dialog has
         * been closed.
         */
        function showModalDialog(description: widget): void;
        /**
         * Displays a dialog window. The function returns once the dialog has
         * been closed.
         */
        function showModelessDialog(description: widget): void;

        interface widget {
            widgetType: widgetType;
            /** String used to reference this widget. Immutable. */
            widgetId: string;
            /** Bool that sets widget visibility */
            isVisible: boolean;
            /** Bool that sets whether a widget is interactive */
            isEnabled: boolean,
            /** The min width in pixels for a widget */
            minimumWidth: number;
            /** The min height in pixels for a widget */
            minimumHeight: number;
            /** 
             * Enumeration determining how much space a widget will take up
             * and how it will respond to size change
             */
            sizePolicy: sizePolicy;
            /**
             * A Function which is called after the widget is constructed.
             */
            onConstructed: () => void;
            /**
             * A callback Function. This will be called periodically after 
             * calling startTimer() on a widget. The timerId matches a 
             * corresponding timerId returned by startTimer().
             */
            onTimerEvent: (timerId: number) => void;

            windowTitle: string;

            windowWidth: number;

            windowHeight: number;

            /**
             * Function called as the widget is destroyed
             */
            onClose: () => void;

            /** 
             * Returns a sibling widget with the matching widgetId.
             * Can only be called from the context of a callback, using 'this'
             */
            findWidget(widgetId: string): widget;

            /**
             * Closes the parent window
             * Can only be called from the context of a callback, using 'this'
             */
            closeDialog(): void;

            /**
             * (Can only be called from a callback)
             * Starts a timer with the intervalInMs and returns a timerId. Once
             * a timer is started, the onTimerEventFunction of the widget
             * description will be called periodically. The timerId can be used
             * to differentiate between timers when multiple timers have been
             * started.
             * @param intervalInMs The interval between calls to callback
             * @returns timerId
             */
            startTimer: (intervalInMs: number) => number;

            /** 
             * (Can only be called from the context of a callback)
             * Stops a timer with the given timerId 
             */
            stopTimer: (timerId: number) => void;
        }

        /**
         * A container widget. widgetType = widgetType.Layout
         */
        interface LayoutWidget extends widget {
            layout: layoutType;
            items: widget[];
            /** Describes the margins around a layout */
            contentsMargins: {
                left: number,
                top: number,
                right: number,
                bottom: number
            };
            /** Spacing between items in pixels */
            spacing: number;
        }

        /** A widget with layoutType of HBoxLayout or VBoxLayout */
        interface BoxLayoutWidget extends widget {
            /**
             * Determines how much space an item consumes relative to its 
             * siblings. Immutable.
             */
            stretchFactor: number;
            /**
             * Immutable.
             */
            alignment: alignment;
        }

        interface GridLayoutWidget extends widget {
            /**
             * Row index in grid. Immutable.
             */
            row: number;
            /**
             * Column index in grid. Immutable.
             */
            column: number;
            /**
             * Number of rows for item to span. Immutable
             */
            rowSpan: number;
            /**
             * Number of columns for item to span. Immutable.
             */
            columnSpan: number;
            /**
             * Immutable
             */
            alignment: alignment;
        }

        interface LabelWidget extends widget {
            text: string;
            wordWrap: boolean;
        }

        interface PushButtonWidget extends widget {
            text: string;
            /** Callback function */
            onClicked: () => void;
        }

        interface LineEditWidget extends widget {
            text: string;
            isReadOnly: boolean;
            echoMode: echoMode;
            /** Callback function */
            onTextEdited: () => void;
            /** Callback function */
            onEditingFinished: () => void;
        }

        interface TextEditWidget extends widget {
            /**
             * The contents of the text edit, as plain text string. 
             * Alternatively, use the html attribute to specify HTML formatted 
             * text.
             */
            text: string;

            /** 
             * The contents of the text edit, as a HTML formatted string. 
             * This can be used instead of text. 
             */
            html: string;

            isReadOnly: boolean;
        }

        interface ComboBoxWidget extends widget {
            items: {text: string, userData: any[]}[];
            currentIndex: number;
            readonly currentText: string;
            readonly currentUserData: any;
            onCurrentTextChanged: () => void;
        }

        interface CheckBoxWidget extends widget {
            text: string;
            isChecked: boolean;
            onToggled: () => void;
        }

        interface SliderWidget extends widget {
            orientation: orientation;
            value: number;
            /**
             * Range values are integers
             */
            range: {minimum: number, maximum: number};
            /** Callback function */
            onValueChanged: () => void;
        }

        interface SpinBoxWidget extends widget {
            value: number;
            /**
             * Range values are integers
             */
            range: {minimum: number, maximum: number};
            onValueChanged: () => void;
        }

        interface PathLineEditWidget extends widget {
            text: string;
            /** Immutable. */
            label: string;
            /** Immutable. */
            caption: string;
            /** Immutable. */
            pathType: pathType;
            /** Callback function */
            onEditingFinished: () => void;
        }

        const enum widgetType {
            /** A blank widget */
            Spacer,
            /** A container widget. Must specify a corresponding layout type */
            Layout,
            /** A text label */
            Label,
            /** A clickable button */
            PushButton,
            /** A single-line text entry widget */
            LineEdit,
            /** A multi-line text entry widget. Supports plain text and HTML */
            TextEdit,
            /** A dropdown */
            ComboBox,
            /** A boolean check box with a text label */
            CheckBox,
            /** A slider with an integer range */
            Slider,
            /** A number box with an integer range */
            SpinBox,
            /** 
             * A convenience widget providing a single-line text entry widget 
             * and a "Browse" push button to allow user to input a file or a 
             * directory path. 
             */
            PathLineEdit
        }

        const enum deckWidgetType {
            Spacer = 0,
            Layout = 1,
            Label = 2,
            Pixmap = 3,
            Dial = 4,
            Fader = 5,
            MinMaxFader = 6,
            NumberBox = 7,
            Dropdown = 8,
            Button = 9,
            ButtonGroup = 10,
            DataDrop = 11,
            SidechainInput = 12,
            InputMeter = 13,
            OutputMeter = 14,
            GainReductionMeter = 15,
            DistanceRolloffGraph = 16,
            PolarDirectivityGraph = 17
        }

        const enum dataDropMode {
            File,
            Text
        }

        const enum layoutType {
            /** 
             * A horizontal layout. Items are spaced evenly, unless a 
             * stretchFactor is specified. 
             */
            HBoxLayout,
            /**
             * A vertical layout. Items are spaced evenly, unless a 
             * stretchFactor is specified.
             */
            VBoxLayout,
            /**
             * A grid layout. Items can specify a row, column, rowSpan and 
             * columnSpan.
             */
            GridLayout
        }

        /** 
         * An enumeration corresponding to the alignment of an item within a 
         * layout widget. 
         */
        const enum alignment {
            AlignLeft = 1,
            AlignRight = 2,
            AlignHCenter = 4,
            AlignJustify = 8,
            AlignAbsolute = 16,
            AlignTop = 32,
            AlignBottom = 64,
            AlignVCenter = 128,
            AlignBaseline = 256,
            AlignCenter = 132
        }

        /**
         * An enumeration corresponding to the size policy of a widget. 
         * This determines how much space it will try to consume within its 
         * layout, and how it will react when more or less space is made 
         * available.
         */
        const enum sizePolicy {
            Fixed = 0,
            Minimum = 1,
            Maximum = 4,
            Preferred = 5,
            MinimumExpanding = 3,
            Expanding = 7,
            Ignored = 13
        }

        const enum orientation {
            Horizontal = 1,
            Vertical = 2
        }

        /** 
         * An enumeration corresponding to the echo mode of a LineEdit widget. 
         * This can be used to display asterisks instead of characters when 
         * entering a password. 
         */
        const enum echoMode {
            Normal,
            NoEcho,
            Password,
            PasswordEchoOnEdit
        }

        /** 
         * An enumeration corresponding to the different path types the 
         * PathLineEdit supports. This controls the behavior of browser dialog 
         * presented.
         */
        const enum pathType {
            /** 
             * User will be able to select an existing file. 
             */
            OpenFile,
            /** 
             * User will be able to specify a new file name at a given directory
             */
            SaveFile,
            /**
             * User will be able to select an existing directory.
             */
            Directory
        }
    } // end ui

    /**
     * Module to write and read files, log messages to console,
     * show simple popup dialogue, start external processes, retrieve
     * external js modules.
     */
    namespace system {
                /**
         * Loads a javascript file as a library
         * @param fileName Can be a relative or absolute path to the js module
         * @example
         * // In the separate javascript file
         * module.exports = {
         *      foobar: function() {
         *          // implementation
         *      }
         * }
         * 
         * // The module can then be used
         * var myModule = studio.system.require()
         * 
         */
        function require(fileName: string): any;
    
        /**
         * Returns the callstack as an array of strings
         */
        function backtrace(): string[];
    
        /**
         * Logs a verbose message to the console
         */
        function verbose(msg: string): void;
    
        /**
         * Logs a message to the console
         */
        function print(msg: string): void;
    
        /**
         * Logs a warning to the console
         */
        function warn(msg: string): void;
    
        /**
         * Logs an error to the console
         */
        function error(msg: string): void;
    
        /**
         * Popup dialogue message (blocking)
         */
        function message(msg: string): void;
    
        /**
         * Prompts a yes/no response to a given message (blocking)
         * @returns a boolean value
         */
        function question(msg: string): boolean;
    
        /**
         * Prompts for text input and returns the string, or null if cancelled 
         * (blocking)
         */
        function getText(msg: string, defaultText?: string): string | null;
    
        /**
         * Prompts for numeric input and returns the value, or null if cancelled
         * (blocking)
         */
        function getNumber(msg: string, defaultText?: string): number | null;
    
        /**
         * Runs an external process with options object 
         * { workingDir, args, timeout (milliseconds) } (blocking)
         * @returns a process result object
         */
        function start(pathToExecutable: string, 
            processOptions: {workingDir: string, args: string[], timeout: number}): 
            {exitCode: number, standardOutput: string, standardError: string};
        
        /**
         * Runs an external asynchronous process with options object
         * @returns a studio.system.ScriptProcess object representing the 
         * asynchronous process
         */
        function startAsync(pathToExecutable: string,
            processOptions: {workingDir: string, args: string[]}): 
                studio.system.ScriptProcess;
        
        /**
         * Returns a studio.system.File object representing the file at filePath.
         */        
        function getFile(filePath: string): studio.system.File;  
        /**
         * This object allows for interaction with a proces started using 
         * system.startAsync().
         */
        class ScriptProcess {
            /**
             * Returns true if the process is running and is ready for reading or
             * writing, or false otherwise.
             */
            isRunning(): boolean;

            /**
             * Returns all data available from the standard output of the process.
             */
            readAllStandardOutput(): string;

            /**
             * Returns all data available from the standard error of the process.
             */
            readAllStandardError(): string;

            /**
             * Writes the text to standard input of the process and waits up to
             * timeout number of milliseconds for the process to write back to
             * the standard output
             */
            writeStandardInput(text: string, timeout: number): void;

            /**
             * Kills the process, causing it to exit immediately
             */
            kill(): void;
        }

        class File {
            /**
             * Returns true if the file the object represents exists on disk, 
             * or false otherwise.
             */
            exists(): boolean;

            /**
             * Opens the file in the mode specified by openModeFlag. 
             * The available options are described by the system.openMode enum. 
             * Returns true if the operation succeeds, or false otherwise.
             */
            open(openModeFlag: openMode): boolean;

            /**
             * Writes the text to the file. Returns the number of bytes that 
             * were actually written, or -1 if an error occurred.
             */
            writeText(text: string): number;

            /**
             * Returns at most, maxSize bytes from the file
             * @param maxSize the number of characters to read. If eof has been
             * reached, it will read less
             */
            readText(maxSize: number): string;

            /**
             * Closes the file and flushes any changes to disk.
             */
            close(): void;

            /**
             * Copies file to the absolute filePath specified. Directories that
             * don't exist within the filePath will be created as required.
             * @param filePath the absolute path to copy the file to
             */
            copy(filePath: string): void;

            /**
             * Removes the file from disk. The operation is not undoable and the 
             * file will not be recoverable from the Recycle Bin on Windows or 
             * the Trash on Mac OS X.
             */
            remove(): void;

            /** Returns the size of the file in bytes. */
            size(): number;

            /**
             * Returns the complete OR-ed together combination of 
             * system.permission flags if the file exists on disk, 
             * or 0 otherwise.
             */
            permissions(): permission;

            /**
             * Sets the system.permission flags for the file to the permissions 
             * specified. Returns true if successful, or false if the 
             * permissions cannot be modified.
             */
            setPermissions(permissions: permission): boolean;
        }

        /** 
         * An enumeration used with studio.system.File.open() to describe the 
         * mode in which a file is opened.
         */
        const enum openMode {
            /** The file is open for reading */
            ReadOnly,
            /** 
             * The file is open for writing. 
             * Note that this mode implies Truncate 
             */
            WriteOnly,
            /**
             * The file is open for reading and writing
             */
            ReadWrite,
            /**
             * The file is opened in append mode so that all data is written
             * to the end of the file
             */
            Append,
            /** 
             * If possible, the file is truncated before it is opened.
             * All earlier contents of the file are lost.
             */
            Truncate
        }

        /**
         * An enumeration used with studio.system.File.setPermissions() to alter
         * the permissions of a file. The permissions of a file can be queried 
         * using studio.system.File.permissions. The values may be OR-ed 
         * together to test multiple permissions and ownership values.
         */
        const enum permission {
            /** The file is readable by the owner of the file. */
            ReadOwner = 16384, 
            /** The file is writable by the owner of the file. */
            WriteOwner = 8192, 
            /** The file is executable by the owner of the file. */
            ExeOwner = 4096, 
            /** The file is readable by the user (platform-dependent). */
            ReadUser = 1024, 
            /** The file is writable by the user (platform-dependent). */
            WriteUser = 512,
            /** The file is executable by the user (platform-dependent). */ 
            ExeUser = 256, 
            /** The file is readable by the group. */
            ReadGroup = 64,
            /** The file is writable by the group. */
            WriteGroup = 32,
            /** The file is executable by the group. */
            ExeGroup = 16, 
            /** The file is readable by anyone. */
            ReadOther = 4, 
            /** The file is writable by anyone. */
            WriteOther = 2, 
            /** The file is executable by anyone. */
            ExeOther = 1, 
            /** The file is executable by everyone. */
            Exe = 237, 
            /** The file is writable by everyone. */
            Write = 8738, 
            /** The file is readable by everyone. */
            Read = 17476
        }

    } // end system

    /**
     * The meat and potatoes of FMOD Studio.
     * Contains information on all ManagedObjects. Perform core tasks like
     * saving, exporting, creating, deleting, referencing ManagedObjects,
     * connecting callbacks.
     */
    namespace project {

        const workspace: Workspace;
        const model: Model;

        /**
         * Saves the project
         * @returns success
         */
        function save(): boolean;

        /**
         * Build all the banks to all the platforms listed in the build tab of 
         * the preferences dialogue
         * @returns success
         * @example
         * // Single banks
         * studio.project.build({ banks: 'Weapons' }); // Build the "Weapons" bank to all platforms
         * studio.project.build({ banks: 'Music', platforms: ['Desktop', 'PlayStation 4'] }); // Build the "Music" bank for only the "Desktop" and "PlayStation 4" platforms
         *
         * // Multiple banks
         * studio.project.build({ banks: ['Weapons', 'Characters'], platforms: 'Desktop' }); // Build the "Weapons" and "Characters" banks only for the "Desktop" platform
         * studio.project.build({ banks: ['Weapons', 'Music'], platforms: ['Desktop', 'PlayStation 4'] }); // Build the "Weapons" and "Music" banks to the "Desktop" and "PlayStation 4" platforms
         *
         * // Platforms
         * studio.project.build({ platforms: 'Desktop' }); // Builds all banks for the "Desktop" platform
         * studio.project.build({ platforms: ['Desktop', 'PlayStation 4'] }); // Builds all banks for the "Desktop" and "PlayStation 4" platforms
         */
        function build(build_options?: 
            {banks: string | string[], platforms?: string | string[]}): boolean;

        /**
         * Export project guids.txt
         * @returns success
         */
        function exportGUIDs(): boolean;

        /**
         * Returns a ManagedObject found by GUID or path. The idOrPath passed 
         * may be a GUID or path string.
         * @example
         * var item = project.lookup("{3a731ab3-ce6d-453d-862e-32050cecf68a}");
         * var event = project.lookup("event:/path/to/eventname");
         * var eventFolder = project.lookup("event:/path/to/foldername");
         * var snapshot = project.lookup("snapshot:/snapshotname");
         * var vca = project.lookup("vca:/vcaname");
         * @description
         * Paths are formatted using the pattern type:/path/to/item, where type is one of:
         * event, snapshot, bus, vca, asset, parameter, effect, tag, 
         * profilersession. Paths can also be used to find container items, such as finding a folder in the event hierarchy.
         */
        function lookup(idOrPath: string): ManagedObject;
        

        /**
         * Creates a blank Bank in the Studio Project, and drops it in the root
         * Banks folder.
         */
        function create(entityName: "Bank"): Bank;
        /**
         * Creates a blank BankFolder in the Studio Project, and drops it in the
         * root Banks folder.
         */
        function create(entityName: "BankFolder"): BankFolder;
        /**
         * Creates a blank Event in the Studio Project, and drops it in the root
         * Events folder.
         */
        function create(entityName: "Event"): Event;
        function create(entityName: "EventFolder"): EventFolder;

        function create(entityName: "EffectPresetFolder"): EffectPresetFolder;
        function create(entityName: "ParameterPresetFolder"): ParameterPresetFolder;
        /**
         * Returns a new instances of a ManagedObject of the given entity name. 
         * This will create any required child objects for the object 
         * (e.g. creating an Event will create and attach its EventMixer).
         * Cannot create anything that depends on a parent object, or an error
         * will occur that will ask you to repair the FMOD project.
         */
        function create(entityName: string): ManagedObject;

        /**
         * Deletes the managedObject and its references, if any, from the 
         * project. This is the equivalent to deleting an item in the user 
         * interface.
         */
        function deleteObject(managedObject: ManagedObject): void;

        /**
         * Absolute path to the project's .fspro file on disk
         */
        const filePath: string;

        /** 
         * Imports an audio asset into the project and returns an AudioFile 
         * ManagedObject, or null if importing failed. The file is always 
         * imported into the root audio bin folder. Use the AudioFile.container 
         * relationship to reassign it to another folder.
         */
        function importAudioFile(filePath: string): AudioFile;

        const audioFileImported: {
            /** Sets a function to be called when an audio file is imported */
            connect(callback: (audioFile: AudioFile) => void): void;
        }

        const buildStarted: {
            /**
             * Sets a function to be called before banks are built.
             */
            connect(callback: () => void): void;
        }

        const buildEnded: {
            /** Sets a function to be called when an audio file is imported */
            connect(callback: (didbuildSucceed: boolean) => void): void;
        }

        const enum distanceRolloffType {
            LinearSquared,
            Linear,
            Inverse,
            InverseTapered,
            Custom
        }

        


        class Model {
            /** Returns a string describing every studio.project.Entity */
            document(): void;
            ADSRModulator: Entity;
            Asset: Entity;
            AudioFile: Entity;
            AudioSettings: Entity;
            AudioTable: Entity;
            AudioTrack: Entity;
            AutomatableObject: Entity;
            AutomationCurve: Entity;
            AutomationPoint: Entity;
            AutomationTrack: Entity;
            Automator: Entity;
            AutopitchModulator: Entity;
            Bank: Entity;
            BankFolder: Entity;
            BoolPluginParameter: Entity;
            ChannelMixEffect: Entity;
            ChorusEffect: Entity;
            CommandSound: Entity;
            CompressorEffect: Entity;
            ControlSurface: Entity;
            ControlSurfaceCustomBinding: Entity;
            ControlSurfaceCustomBindings: Entity;
            ControlSurfaceProtocol: Entity;
            ConvolutionReverbEffect: Entity;
            DAWAsset: Entity;
            DAWProject: Entity;
            DataFile: Entity;
            DataPluginParameter: Entity;
            DataReferee: Entity;
            DelayEffect: Entity;
            DistortionEffect: Entity;
            EditorSettings: Entity;
            EffectChain: Entity;
            EffectPreset: Entity;
            EffectPresetFolder: Entity;
            Encodable: Entity;
            EncodableAsset: Entity;
            EncodingSetting: Entity;
            Event: Entity;
            EventAutomatableProperties: Entity;
            EventFolder: Entity;
            EventMixer: Entity;
            EventMixerGroup: Entity;
            EventMixerMaster: Entity;
            EventMixerReturn: Entity;
            EventSound: Entity;
            FadeCurve: Entity;
            FlangerEffect: Entity;
            FloatPluginParameter: Entity;
            Folder: Entity;
            GainEffect: Entity;
            GameParameter: Entity;
            GroupTrack: Entity;
            HighpassEffect: Entity;
            HighpassSimpleEffect: Entity;
            ITEchoEffect: Entity;
            IntPluginParameter: Entity;
            LFOModulator: Entity;
            LimiterEffect: Entity;
            Locale: Entity;
            LoopRegion: Entity;
            Loopable: Entity;
            LoudnessMeter: Entity;
            LowpassEffect: Entity;
            LowpassSimpleEffect: Entity;
            MackieControlSurface: Entity;
            MackieExtendedControlSurface: Entity;
            ManagedObject: Entity;
            Marker: Entity;
            MarkerTrack: Entity;
            MasterAssetFolder: Entity;
            MasterBankFolder: Entity;
            MasterEffectPresetFolder: Entity;
            MasterEventFolder: Entity;
            MasterParameterPresetFolder: Entity;
            MasterTagFolder: Entity;
            MasterTrack: Entity;
            MeteringSettings: Entity;
            MidiControlSurfaceProtocol: Entity;
            Mixer: Entity;
            MixerBus: Entity;
            MixerBusEffectChain: Entity;
            MixerBusFader: Entity;
            MixerBusPanner: Entity;
            MixerEffect: Entity;
            MixerGroup: Entity;
            MixerInput: Entity;
            MixerMaster: Entity;
            MixerReturn: Entity;
            MixerSend: Entity;
            MixerStrip: Entity;
            MixerVCA: Entity;
            Modulator: Entity;
            Module: Entity;
            MultiSound: Entity;
            MultibandEqEffect: Entity;
            NamedMarker: Entity;
            NamedWorkspaceBasedSourceControlProvider: Entity;
            ObjectSpatialiserEffect: Entity;
            ObsoleteObject: Entity;
            OscControlSurfaceProtocol: Entity;
            ParamEqEffect: Entity;
            Parameter: Entity;
            ParameterCondition: Entity;
            ParameterPreset: Entity;
            ParameterPresetFolder: Entity;
            ParameterProperty: Entity;
            ParameterPrototype: Entity;
            ParameterProxy: Entity;
            PerforceProvider: Entity;
            PitchShifterEffect: Entity;
            Platform: Entity;
            PlatformSpecificItem: Entity;
            PlayPercentage: Entity;
            Plugin: Entity;
            PluginEffect: Entity;
            PluginOwner: Entity;
            PluginParameter: Entity;
            PluginSettings: Entity;
            PluginSound: Entity;
            ProfilerFolder: Entity;
            ProfilerGraph: Entity;
            ProfilerRecordingMarker: Entity;
            ProfilerSession: Entity;
            ProfilerSessionFolder: Entity;
            ProfilerSystemTrack: Entity;
            ProfilerTrack: Entity;
            ProgrammerSound: Entity;
            ProgrammerSoundPlaceholder: Entity;
            ProjectSettings: Entity;
            ProxyEffect: Entity;
            Quantizable: Entity;
            RandomizerModulator: Entity;
            ReferenceableData: Entity;
            Region: Entity;
            ReturnTrack: Entity;
            SFXReverbEffect: Entity;
            ScriptBasedProvider: Entity;
            Selectable: Entity;
            Selector: Entity;
            Sidechain: Entity;
            SidechainModulator: Entity;
            SidechainTarget: Entity;
            SingleSound: Entity;
            Snapshot: Entity;
            SnapshotGroup: Entity;
            SnapshotList: Entity;
            SnapshotMasterTrack: Entity;
            SnapshotModule: Entity;
            SnapshotProperty: Entity;
            SnapshotTrack: Entity;
            Sound: Entity;
            SoundScatterer: Entity;
            SourceControlProvider: Entity;
            SpatialEffect: Entity;
            SpatialiserEffect: Entity;
            SslNucleusControlSurface: Entity;
            SustainPoint: Entity;
            Tag: Entity;
            TagFolder: Entity;
            TempoMarker: Entity;
            TfsProvider: Entity;
            ThreeEQEffect: Entity;
            Timeline: Entity;
            TouchOscControlSurface: Entity;
            Track: Entity;
            TransceiverEffect: Entity;
            TransitionDestination: Entity;
            TransitionDestinationFadeInCurve: Entity;
            TransitionDestinationSound: Entity;
            TransitionFadeCurve: Entity;
            TransitionMarker: Entity;
            TransitionRegion: Entity;
            TransitionSourceFadeOutCurve: Entity;
            TransitionSourceSound: Entity;
            TransitionTimeline: Entity;
            TransitionTimelineOwner: Entity;
            TremoloEffect: Entity;
            Triggerable: Entity;
            UiMixerView: Entity;
            UserProperty: Entity;
            Workspace: Entity;
            WorkspaceBasedSourceControlProvider: Entity;
            WorkspaceChangelist: Entity;
            WorkspaceItem: Entity;
        }

        /**
         * A studio.project.Entity provides information about the type of a 
         * ManagedObject. The entity for a given ManagedObject can be retrieved 
         * using ManagedObject.entity. This provides the string representation 
         * for an entity, which can then be looked up in the 
         * studio.project.model.
         */
        class Entity {
            /** 
             * An array of strings representing the entity types inherited
             * by this entity.
             */
            superEntities: string[];

            /**
             * Boolean set to true if an entity cann't be instantiated, or is a 
             * base class for other types
             */
            isAbstract: boolean;

            /**
             * Boolean set to true if an entity exists globally rather than on 
             * per project basis
             */
            isGlobal: boolean;

            /**
             * Boolean set to true if only a single ManagedObject instance can
             * exist at any given time
             */
            isSingleton: boolean;

            /**
             * Returns an object containing named properties that represent each
             * ManagedObject property available for this entity. Each
             * description object has a dataType string and default value.
             */
            properties:  {
                [key: string]: { 
                    dataType: string;
                    defaultValue: any;
                }
            };

            /**
             * Returns an object containing named relationship that represent
             * ManagedObject relationship available for this entity.
             */
            relationships: {
                [key: string]: {
                    cardinality: string,
                    destinationType: string,
                    isRequired: boolean
                }
            };

            /**
             * Returns an array of ManagedObject instances of a given entity type.
             * You can optionally pass an options object 
             * { searchContext, includeDerivedTypes }. 
             * Passing a managed object for the searchContext field will bound 
             * the object search to a particular file. Passing true for the 
             * includeDerivedTypes field will allow derived types of the given 
             * entity to be returned.
             * @example
             * // find all SingleSounds within the project
                studio.project.model.SingleSound.findInstances();

                // find all SingleSounds within the currently selected event
                studio.project.model.SingleSound.findInstances({ searchContext: studio.window.browserCurrent() });

                // find all GroupTracks, ReturnTracks and MasterTracks within the currently selected event
                studio.project.model.AudioTrack.findInstances({ searchContext: studio.window.browserCurrent(), includeDerivedTypes: true });
             */
            findInstances(options?: {searchContext: ManagedObject, 
                includeDerivedTypes: boolean}): ManagedObject[];
            
            /**
             * Returns the singleton ManagedObject instance of a particular 
             * entity type. An error will be thrown if the entity is not a 
             * singleton type.
             */
            singletonInstance(): ManagedObject;

            /**
             * Returns a string describing the Entity, including its properties 
             * and relationships
             */
            document(): string;
        }

        abstract class ManagedObject {
            /**
             * Unique GUID string
             */
            id: string;
            
            /**
             * Returns whether an object is in a valid state. Immutable.
             */
            readonly isValid: boolean;

            /** 
             * A string representing the object's studio.project.Entity type
             * e.g. Event. Lookup studio.project.model to inspect details about the
             * entity. Immutable.
             */
            readonly entity: string;
        
            /** 
             * Extended API. Returns an object of type studio.project.ManagedPropertyMap
             * Provides access to an object's properties. Immutable.
             */
            readonly properties: ManagedPropertyMap;
        
            /**
             * Extended API. Returns an object of type 
             * studio.project.ManagedRelationshipMap. Provides access to an object's
             * relationships. Immutable.
             */
            readonly relationships: ManagedRelationshipMap;
        
            /**
             * Returns true if the object has an entity that matches entityName, or is
             * of a derived type.
             */
            isOfType(entityName: string): boolean;
        
            /** 
             * Returns true if the object has an entity that exactly matches entityName.
             * This does not include derived types.
             */
            ifOfExactType(entityName: string): boolean;
        
            /** Logs all members */
            dump(): void;
        
            /**
             * Returns a string describing this ManagedObject's type 
             * studio.project.Entity.
             */
            document(): string;

            // Contains both property names and relationship that can be set
            // conveniently with = operator. Relationships can only be set with
            // a "to one" relationship through this way. "To many" relationships
            // must be set through the extended API.
            [key: string]: any;
        }

        interface ManagedPropertyMap {
            /**
             * The owning managed object of the property map. Immutable
             */
            readonly parent: ManagedObject;
        
            /** Logs all members */
            dump(): void;
        
            // note: also contains other properties
        }
        
        interface ManagedRelationshipMap {
            /**
             * The owning managed object of the relationship map. Immutable.
             */
            readonly parent: ManagedObject;
            
            /**
             * Logs all members
             */
            dump(): void;
        
            // notes: contains the names of other relationships
        }

        class ManagedProperty<T> {
            name: string;
            dataType: string;
            value: T;
            defaultValue: T;

            /**
             * Sets the inner value
             */
            setValue(value: T): void;

            /**
             * Logs all memebers
             */
            dump(): void;
        }

        class ManagedRelationship<
            MyType extends ManagedObject, 
            T extends ManagedObject> {
            /** 
             * The owning ManagedObject parent of the relationship. Immutable 
             */
            readonly parent: MyType;

            /** 
             * Name of the relationship. Immutable
             */
            readonly name: string;

            /**
             * A string representing an object's cardinality. Either "ToOne"
             * or "ToMany". Immutable
             */
            readonly cardinality: string;

            /**
             * A string representing an object's ordering. Either "None" if it
             * is unordered, "Ordered" if its ordering is saved to the project
             * or Transient if ordering is per user. Immutable.
             */
            readonly ordering: string;

            /**
             * An array of managed object destinations. Immutable.
             */
            destinations: T[];

            /**
             * Appends a new destination to a relationship. Replaces the current
             * destination for a "ToOne" relationship
             */
            add(managedObject: ManagedObject): void;

            /**
             * Inserts a new destination at a given index. Index must be in
             * range [0 - destinations.length]
             */
            insert(index: number, managedObject: ManagedObject): void;

            /**
             * Removes a destination from a relationship
             */
            remove(managedObject: ManagedObject): void;

            /**
             * Logs all memebers
             */
            dump(): void;
        }
        
        interface _3D_Attributes {
            radialDistance: number;
            azimuth: number;
            height: number;
            rotation: number;
        }

        class ADSRModulator
        extends Modulator {
            initialValue: number;
            attackTime: number;
            attackShape: number;
            peakValue: number;
            holdTime: number;
            decayTime: number;
            decayShape: number;
            sustainValue: number;
            releaseTime: number;
            releaseShape: number;
            finalValue: number;
        }

        abstract class Asset 
        extends ManagedObject {
            /**
             * Returns the path of the file the asset refers to, relative to
             * the project assets directory
             */
            getAssetPath(): string;

            /**
             * Sets the path of the file the asset refers to, relative to the 
             * project assets directory. Calling this function will move the 
             * underlying file asset on disk.
             */
            setAssetPath(filePath: string): void;

            /**
             * Returns the absolute path of the file the asset refers to.
             */
            getAbsoluteAssetPath(): string;

            assetPath: string;

            masterAssetFolder: MasterAssetFolder;
        }

        class AudioFile 
        extends EncodableAsset
        implements ReferenceableData, ProgrammerSoundPlaceholder {
            programmerSounds?: ProgrammerSound[];
            dataReferences?: DataReferee[];

            isStreaming: boolean;
            frequencyInKHz: number;
            channelCount: number;
            length: number;
            dataReferees?: DataReferee[];
            sounds?: SingleSound[]; 
        }

        class AudioSettings
        extends ManagedObject {
            driverName: string;
            deviceId: string;
            deviceName: string;
            forcedBlockSize: number;
        }

        
        class AudioTable 
        extends WorkspaceItem 
        implements Encodable, ProgrammerSoundPlaceholder {
            sourceDirectory: string;
            includeSubDirectories: boolean;
            isLocalized: boolean;

            encodingSettings?: EncodingSetting[];
            programmerSounds?: ProgrammerSound[];
            bank: Bank;
        }

        abstract class AudioTrack extends Track {
            /**
             * Creates an automation track for a given property of an 
             * automatable object
             */
            addAutomationTrack(automatableObject: AutomatableObject): void;
            uiAutomationTracksVisible: boolean;

            automationTracks?: AutomationTrack[];
            modules: Module[];
        }

        /**
         * Examples: AudioTrack, Instrument, MixerEffect, MixerBus
         */
        abstract class AutomatableObject 
        extends ManagedObject {
            /**
             * Creates a modulator for a given property of the automatable 
             * object
             */
            addModulator(modulatorType: "RandomizerModulator" | "ADSRModulator" | 
                "SidechainModulator", propertyName: string): void;
            
            /**
             * Creates an automator for a given property of the automatable 
             * object.
             * @example
             * var automator1 = sound.addAutomator("volume"); // adds an automator for the volume property of the sound
             * var automator2 = sound.addAutomator(sound.pitch); // alternatively, the property can be used as an argument
             */
            addAutomator(propertyName: string): Automator;

            uiModulationDrawerVisible: boolean;
            uiTriggerBehaviorDrawerVisible: boolean;

            automators?: Automator[];
            modulators?: Modulator[];
            snapshotProperties?: SnapshotProperty[];
            profilerGraphs?: ProfilerGraph[];
            customBindings?: ControlSurfaceCustomBinding;
        }

        class AutomationCurve 
        extends ManagedObject {
            /**
             * Creates an automation point on the curve at a given position and 
             * value. The position must be within the range of the curve's 
             * parameter and the value must be within the value range of the 
             * automated property.
             */
            addAutomationPoint(position: number, value: number): void;

            automator: Automator;
            parameter: ParameterPrototype;
            automationPoints?: AutomationPoint[];
        }

        class AutomationPoint 
        extends ManagedObject 
        implements Selectable {
            position: number;
            value: number;
            curveShape: number;
            isSCurve: boolean;

            selector?: Selector;
            automationCurve: AutomationCurve;
            startPointOwner: FadeCurve;
            endPointOwner: FadeCurve;
        }

        class AutomationTrack extends Track {
            automator: Automator;
            audioTrack?: AudioTrack;
        }

        class Automator extends ManagedObject {
            /**
             * Creates an automation curve on the parameter specified. The 
             * parameter argument can be either a GameParameter or the Timeline 
             * of the event containing the object being automated.
             * @example
             *  // adds an automation curve to a master track's volume, on the timeline
             *  var event = studio.project.workspace.addEvent("New Event", true);
             *  var mixerGroup = event.masterTrack.mixerGroup;
             *  var automator = mixerGroup.addAutomator("volume");
             *  var automationCurve = automator.addAutomationCurve(event.timeline);
                     *  
             *  // adds an automation curve to a gain effect, on a parameter
             *  var gainEffect = mixerGroup.effectChain.addEffect("GainEffect");
             *  var automator = gainEffect.addAutomator("gain");
             *  var rpmParameter = studio.project.lookup("parameter:/RPM");
             *  var automationCurve = automator.addAutomationCurve(rpmParameter.parameter);
             */
            addAutomationCurve(parameter: string): AutomationCurve;

            nameOfPropertyBeingAutomated: string;
            
            // relationships
            objectBeingAutomated: AutomatableObject;
            automationCurves?: AutomationCurve[];
            automationTracks?: AutomationTrack[];
        }

        class AutopitchModulator 
        extends Modulator {
            root: number;
            pitchAtMinimum: number;
        }

        class Bank extends WorkspaceItem {
            /** Returns the bank's path as a string */
            getPath(): string;
            
            /** default: false */
            isMasterBank: boolean;
            /** default: false */
            dontLoopOptionEnabled: boolean;

            // relationships
            autioTable?: AudioTable;
            events?: Event[];
        }

        class BankFolder extends Folder {

        }

        class BoolPluginParameter 
        extends PluginParameter<boolean> {}

        class ChannelMixEffect extends MixerEffect {
            /**
             * Enumeration
             */
            outputGrouping: number;
            gain00: number;
            gain01: number;
            gain02: number;
            gain03: number;
            gain04: number;
            gain05: number;
            gain06: number;
            gain07: number;
            gain08: number;
            gain09: number;
            gain10: number;
            gain11: number;
            gain12: number;
            gain13: number;
            gain14: number;
            gain15: number;
            gain16: number;
            gain17: number;
            gain18: number;
            gain19: number;
            gain20: number;
            gain21: number;
            gain22: number;
            gain23: number;
            gain24: number;
            gain25: number;
            gain26: number;
            gain27: number;
            gain28: number;
            gain29: number;
            gain30: number;
            gain31: number;
            output00: number;
            output01: number;
            output02: number;
            output03: number;
            output04: number;
            output05: number;
            output06: number;
            output07: number;
            output08: number;
            output09: number;
            output10: number;
            output11: number;
            output12: number;
            output13: number;
            output14: number;
            output15: number;
            output16: number;
            output17: number;
            output18: number;
            output19: number;
            output20: number;
            output21: number;
            output22: number;
            output23: number;
            output24: number;
            output25: number;
            output26: number;
            output27: number;
            output28: number;
            output29: number;
            output30: number;
            output31: number;
        }

        class ChorusEffect extends MixerEffect {
            rate: number;
            depth: number;
            mix: number;
        }

        class CommandSound extends Sound {
            targetEvent?: Event; 
        }

        class CompressorEffect
        extends MixerEffect
        implements SidechainTarget {
            threshold: number;
            ratio: number;
            attackTime: number;
            releaseTime: number;
            gain: number;
            linkChannels: boolean;
            sidechains?: Sidechain[];
        }

        abstract class ControlSurface 
        extends ManagedObject {
            name: string;
            /**
             * 3-byte hex value, or perhaps as a string
             */
            color: number;
            customBindings?: ControlSurfaceCustomBindings[];
            protocols?: ControlSurfaceProtocol;
        }

        class ControlSurfaceCustomBinding
        extends ManagedObject {
            owner: ControlSurfaceCustomBindings;
            linkedObject: AutomatableObject;
        }

        class ControlSurfaceCustomBindings
        extends ManagedObject {
            customBindings?: ControlSurfaceCustomBinding[];
            workspace: Workspace;
            controlSurface: ControlSurface;
        }

        class ControlSurfaceProtocol
        extends ManagedObject {
            controlSurface: ControlSurface;
        }

        class ConvolutionReverbEffect 
        extends MixerEffect 
        implements DataReferee {
            /**
             * Sets the impulse response for a convolution reverb effect. 
             * The file path must be an absolute path referring to an audio data 
             * file.
             */
            setIRFromFilePath(filePath: string): void;

            uiModulationDrawerVisible: boolean;
            uiTriggerBehaviorDrawerVisible: boolean;
            bypass: boolean;
            startFrame: number;
            endFrame: number;
            wetLevel: number;
            dryLevel: number;
            linkChannels: boolean;

            automators?: Automator[];
            modulators?: Modulator[];
            snapshotProperties?: SnapshotProperty[];
            profilerGraphs?: ProfilerGraph[];
            customBindings?: ControlSurfaceCustomBinding;
            excludedPlatforms?: Platform[];
            owner?: EffectChain;
            presetOwner?: EffectPreset;
            referenceableData?: AudioFile;
        }

        class DAWAsset
        extends AudioFile {
            project: DAWProject;
        }

        class DAWProject
        extends EncodableAsset {
            dawProjectPath: string;
            renderedAssetsPath: string;
            assets?: DAWAsset[];
        }

        class DataFile
        extends Asset 
        implements DataReferee {
            dataReferees?: DataReferee;
            referenceableData?: ReferenceableData;
        }

        /**
         * Value is a byte array
         */
        class DataPluginParameter
        extends PluginParameter<number[]> {
            dataType: number;
            referenceableData?: ReferenceableData;
        }

        interface DataReferee 
        extends ManagedObject {
            referenceableData?: ReferenceableData;
        }

        class DelayEffect
        extends MixerEffect {
            delay: number;
            feedback: number;
            level: number;
            dryLevel: number;
        }

        class DistortionEffect
        extends MixerEffect {
            level: number;
        }

        class EditorSettings
        extends ManagedObject {
            forcedDevicePixelRatio: number;
            followCursor: boolean;
            loopPlayback: boolean;
            autoplayAudioFilePlayback: boolean;
            loopAudioFilePlayback: boolean;
            compressedAudioFilePlayback: boolean;
            /**
             * Enumeration
             */
            preferredOpenItemMethod: number;
            snapToItems: boolean;
            snapToRuler: boolean;
            showMarkerLines: boolean;
            showAutomationPointValues: boolean;
            showOverlappingInstrumentsInLanes: boolean;
            bulkEditEnabled: boolean;
            initialSyncEnabled: boolean;
            liveUpdateSyncConnectedPlatform: boolean;
            liveUpdateDisableStreamingSounds: boolean;
            apiPlaybackEnabled: boolean;
            mixerStripWidth: number;
            mixerStripHeight: number;
            /** 
             * Enumeration 
             */
            defaultProfilerGraphType: number;
            /** Enumeration */
            profilerAutomaticScopeInMode: number;
            autoSaveEnabled: boolean;
            /** Enumeration */
            startupMode: number;
            /** Enumeration */
            editorScrollModeNoModifier: number;
            /**
             * Enumeration
             */
            editorScrollModeShiftModifier: number;
            /** 
             * Enumeration
             */
            editorScrollModeAltModifier: number;
            /**
             * Enumeration
             */
            editorScrollModeControlModifier: number;
            /**
             * Enumeration
             */
            birdsEyeDragMode: number;
            buildThreadCount: number;
            emailAddress: string;
            recentFiles: string[];
            recentIpAddress: string[];
            liveUpdateAutoReconnect: boolean;
            recentVersionOpened: number;
            sampleEditor: string;
            showOnlyKnownAudioFileTypes: boolean;
            recentImportFolder: string;
            absoluteMouseModeEnabled: boolean;
            analyticsEnabled: boolean;
            /** 
             * Enumeration
             */
            timeDisplayMode: number;
            keyboardShortcuts: string[];
            uiAutomationTracksVisible: boolean;
            uiModulationDrawerVisible: boolean;
            uiTriggerBehaviorDrawerVisible: boolean;
            /**
             * Enumeration
             */
            linkedAssetsRenderMode: number;
            /**
             * Enumeration
             */
            linkedAssetsRemovalMode: number;
            reaperApplicationPath: string;
        }

        class EffectChain
        extends MixerEffect {
            effects: MixerEffect[];
        }
        
        class EffectPreset
        extends WorkspaceItem {
            effect: MixerEffect;
            proxies?: ProxyEffect;
        }

        class EffectPresetFolder 
        extends Folder {}
        
        interface Encodable {
            encodingSettings?: EncodingSetting[];
        }

        class EncodableAsset extends Asset implements Encodable {
            encodingSettings?: EncodingSetting[];
        }

        /**
         * Encoding Setting for a Build Platform
         * Can be found in Preferences -> Build -> Project platforms
         */
        class EncodingSetting
        extends ManagedObject {
            /** 
             * Enumeration
             * Vorbis = 3,
             * FADPCM = 1,
             * PCM = 0
             */
            encodingFormat: number;

            /** 
             * Vorbis Quality
             * Range: [0 - 100] in percent 
             */
            quality: number;
            /** 
             * Enumeration:
             * Custom = 0,
             * Optimized for Size = 1,
             * Preserved = 2
             */
            sampleRateMode: number;

            /** 
             * Only in effect when sampleRateMode is set to 0 (Custom).
             * In hertz
             */
            sampleRate: number;

            /**
             * Enumeration
             */
            loadingMode: number;

            platform: Platform;

            encodable: Encodable;
        }

        class Event 
        extends Folder 
        implements Selector {
            selectables: Selectable[];
            isPlaying(): boolean;
            isPaused(): boolean;
            isStopping(): boolean;
            isRecording(): boolean;

            /**
             * Plays the event. The equivalent of pressing the play button in 
             * the transport controls.
             */
            play(): void;

            /**
             * Toggle pause for an event. The equivalent of pressing the pause 
             * button in the transport controls.
             */
            togglePause(): void;
            stopImmediate(): void;
            stopNonImmediate(): void;
            returnToStart(): void;
            keyOff(): void;
            toggleRecording(): void;
            getPath(): string;
            get3DAttributes(): _3D_Attributes;
            set3DAttributes(attributes: _3D_Attributes): void;

            /**
             * Gets the cursor position of a global game parameter as a number
             * @param parameter must be a Timeline or GameParameter
             */
            getCursorPosition(parameter: Timeline | GameParameter): number;

            /**
             * Sets the cursor position of the global game parameter to a number.
             */
            setCursorPosition(parameter: Timeline | GameParameter, 
                position: number): void;
            
            getPlayheadPosition(parameter: Timeline | GameParameter): number;

            /**
             * Returns an Array of all GameParameter objects referenced by an 
             * event. This includes any implicitly referenced parameters. The 
             * order of the Array matches the order displayed in the transport 
             * bar.
             */
            getParameterPresets(): GameParameter[];

            addGameParameter(parameterDefinition: ParameterPreset | 
                GameParameter | {
                    name: string,
                    type: parameterType,
                    /** minimum value of the paramter range */
                    min: number,
                    /** maximum value of the parameter range */
                    max: number
                }
            ): GameParameter;

            /**
             * Adds and returns a GroupTack with the given name to the Event.
             */
            addGroupTrack(name: string): GroupTrack;

            /**
             * Adds and returns a ReturnTrack to the Event.
             */
            addReturnTrack(name: string): ReturnTrack;

            /**
             * Adds a marker track to the eEvent
             */
            addMarkerTrack(): MarkerTrack;
            
            /** default: false */
            isDefault: boolean;
            note: string;
            /** default: -1 */
            outputFormat: Enumerator;
            /** default: true */
            uiMarkerTracksVisible: boolean;
            /** default: 8 */
            uiMaxMarkerTracksVisible: number;

            // Relationships
            uiLastParameterSelection?: Parameter;
            mixer: EventMixer;
            masterTrack: MasterTrack;
            mixerInput: MixerInput;
            automatableProperties: EventAutomatableProperties[];
            markerTracks: MarkerTrack[];
            groupTracks?: GroupTrack[];
            timeline: Timeline;
            parameters: Parameter[];
            tags?: Tag[];
            userProperties?: UserProperty[];
            references?: EventSound[];
            commands?: CommandSound[];
            banks?: Bank[];
            defaultEvent?: Event;
            clonedEvents?: Event[];
        }

        class EventAutomatableProperties
        extends AutomatableObject {
            /** default: false */
            isPersistent: boolean;
            /** default: 65; // Infinite */
            maxVoices: number;
            /** Enumeration. Default: 0 */
            voiceStealing: number;
            /** default: 2 */
            priority: number;
            /** default: false */
            dopplerEnabled: boolean;
            /** default: 100 */
            dopplerScale: number;
            /** default: 100 */
            snapshotIntensity: number;
            /** default: false */
            noLookahead: boolean;
            /** default: 0 */
            triggerCooldown: number;
            /** default: 0 */
            sampleDataLoadingMode: number;

            event: Event;
        }

        class EventFolder 
        extends Folder {}

        class EventMixer
        extends Mixer {
            event: Event;
        }

        class EventMixerGroup 
        extends MixerGroup
        implements Selectable {
            selector?: Selector;
            groupTrack: GroupTrack;
        }

        class EventMixerMaster
        extends MixerMaster
        implements Selectable {
            selector?: Selector;
            mixer: Mixer;
            groupTrack: MasterTrack;
        }

        class EventMixerReturn
        extends MixerReturn
        implements Selectable {
            selector?: Selector;
            returnTrack: ReturnTrack;
        }

        /**
         * Represents a Sound object in an Event
         */
        class EventSound extends Sound {
            /**
             * Float number in semi-tones
             */
            pitch: number;
            
            parameters?: ParameterProperty[];
            event: Event;
        }

        class FadeCurve
        extends ManagedObject {
            startPoint: AutomationPoint;
            endPoint: AutomationPoint;
            /** Required only when no fadeOutOwner field */
            fadeInOwner?: Module;
            /** Required only when no fadeInOwner field */
            fadeOutOwner?: Module;
            relatedModule?: Module;
        }

        class FlangerEffect
        extends MixerEffect {
            /** default: 0.1 */
            rate: number;
            /** default: 1 */
            delay: number;
            /** default: 50 */
            mix: number;
        }

        class FloatPluginParameter
        extends PluginParameter<number> {
            curve: string;
        }

        
        abstract class Folder extends WorkspaceItem {
            /**
             * Returns the item at the relative path specified. Returns
             * undefined if the item cannot be found.
             * @example
             * var event = studio.project.workspace.masterEventFolder.getItem("sfx/explosion_event");
             */
            getItem(path: string): ManagedObject | undefined;

            // properties
            name: string;

            // relationships
            folder: Folder;
            items: WorkspaceItem[];
        }

        class GainEffect
        extends MixerEffect {
            /** default: 0 */
            gain: number;
        }

        class GameParameter
        extends AutomatableObject
        implements ParameterPrototype, Selectable {
            /**
             * Returns the cursor position of the global GameParameter as a
             * number. Returns undefined if the scope of the Game Parameter is
             * @example
             * var globalParameterPreset = studio.project.lookup("parameter:/game_state/time_of_day"); // return a ParameterPreset object
             * var timeOfDay = globalParameterPreset.parameter.getCursorPosition();
             * not global
             */
            getCursorPosition(): number | undefined;

            /**
             * Sets the cursor position of the global game parameter to a number
             * @example
             * var globalParameterPreset = studio.project.lookup("parameter:/game_state/time_of_day"); // return a ParameterPreset object
             * globalParameterPreset.parameter.setCursorPosition(1300);
             */
            setCursorPosition(position: number): void;

            /** Enumeration */
            parameterType: parameterType;
            /** default: 0 */
            minimum: number;
            /** default: 1 */
            maximum: number;
            enumerationLabels: string;
            /** default: false */
            isGlobal: boolean;
            /** default: false */
            isReadonly: boolean;
            /** default: false */
            isHeld: boolean;
            initialValue: number;
            /** default: 0 */
            velocity: number;
            /** default: 0 */
            seekSpeed: number;
            /** default: 0 */
            seekSpeedDescending: number;
            /** default: false */
            seekSpeedAsymmetric: boolean;
            cursorPosition: number;
            /** default: true */
            isExposedRecursively: boolean;

            automationCurves?: AutomationCurve[];
            selector?: Selector;
            presetOwner: ParameterPreset;
            proxies?: ParameterProxy[];
            triggerConditions?: ParameterCondition[];
        }

        // class GroupBus extends ManagedObject implements AutomatableObject {
        //     addModulator(modulatorType: "RandomizerModulator" | "ADSRModulator" | "SidechainModulator", propertyName: string): void;
        //     addAutomator(propertyName: string): Automator;
        //     uiModulationDrawerVisible: boolean;
        //     uiTriggerBehaviorDrawerVisible: boolean;
        //     automators?: Automator[] | undefined;
        //     modulators?: Modulator[] | undefined;
        //     snapshotProperties?: SnapshotProperty[] | undefined;
        //     profilerGraphs?: any[] | undefined;
        //     customBindings?: any;
        //     /**
        //      * Returns the MixerBus at the relative path specified. Returns
        //      * undefined if it cannot be found
        //      * @example
        //      * var bus = studio.project.workspace.mixer.masterBus.getItem("sfx/player");
        //      */
        //     getItem(path: string): MixerBus;
        // }

        class GroupTrack extends AudioTrack
        implements PlatformSpecificItem {
            addSound(parameter: string | Timeline | GameParameter, 
                soundType: "SingleSound" | "MultiSound" | "ProgrammerSound", 
                start: number, length: number): ProgrammerSound | SingleSound | MultiSound;
            /** default: false */
            streaming: boolean;

            excludedPlatforms?: Platform[];
            mixerGroup: EventMixerGroup;
            event: Event;
        }

        class HighpassEffect 
        extends MixerEffect {
            /** default: 2000 */
            cutoff: number;
            /** default: 1 */
            resonance: number;
        }

        class HighpassSimpleEffect
        extends MixerEffect {
            /** default: 2000 */
            cutoff: number;
        }

        class ITEchoEffect
        extends MixerEffect {
            /** default: 50 */
            wetDryMix: number;
            /** default: 50 */
            feedback: number;
            /** default: 500 */
            leftDelay: number;
            /** default: 500 */
            rightDelay: number;
            /** default: 0 */
            panDelay: number;
        }

        class IntPluginParameter
        extends PluginParameter<number> {
            minimumValue: number;
            maximumValue: number;
        }

        class LFOModulator
        extends Modulator {
            /** Enum. default: 0 */
            shape: number;
            /** default: false */
            isTempoSync: boolean;
            /** default: 0.5 */
            rate: number;
            /** default: 4 */
            beats: number;
            /** default: 0 */
            phase: number;
            /** default: 0 */
            depth: number;
            /** default: 0 */
            direction: number;
        }

        class LimiterEffect
        extends MixerEffect {
            /** default: 0 */
            boost: number;
            /** default: 0 */
            ceiling: number;
            /** default: 10 */
            release: number;
            /** default: true */
            linkChannels: boolean;
        }

        class Locale
        extends ManagedObject {
            name: string;
            localeCode: string;
            uiActiveLocaleOwner?: ProjectSettings;
            workspace: Workspace;
        }

        class LoopRegion
        extends Region
        implements Triggerable, Quantizable, TransitionDestination,
            TransitionTimelineOwner {
            addParameterCondition(parameter: string | Timeline | GameParameter, 
                min: number, max?: number): ParameterCondition
            name: string;
            /** default: 1 */
            looping: number;
            references?: TransitionTimelineOwner[];    
            /** Enumeration */
            quantizationInterval: number;
            transitionOffset: number;
            triggerProbabilityEnabled: boolean;
            triggerProbability: number;
            triggerConditions?: ParameterCondition[];
            uiTransitionTimelineVisible: boolean;
            transitionTimeline?: TransitionTimeline;
            destination?: TransitionDestination;
        }

        interface Loopable 
        extends ManagedObject {
            looping: boolean;
            /** default: 0 */
            playCount: number;
        }

        class LoudnessMeter
        extends MixerEffect {
            /** Enum. default: 0 */
            meterRange: number;
            /** Enum. default: 0 */
            meterMode: number;
            /** default -23 */
            loudnessTarget: number;
            /** Enum. default: 0 */
            loudnessScale: number;
        }

        class LowpassEffect
        extends MixerEffect {
            /** default: 2000 */
            cutoff: number;
            /** default: 1 */
            resonance: number;
        }

        class LowpassSimpleEffect
        extends MixerEffect {
            /** default: 2000 */
            cutoff: number;
        }

        class MackieControlSurface
        extends ControlSurface {}

        class MackieExtendedControlSurface
        extends ControlSurface {}

        abstract class Marker extends AutomatableObject 
        implements Selectable {
            position: number;
            selector?: Selector;
            timeline: Timeline;
            markerTrack: MarkerTrack;
        }

        class MarkerTrack extends Track {
            addNamedMarker(name: string, position: number): NamedMarker;

            addRegion(position: number, length: number, name: string, loopMode: regionLoopMode): LoopRegion;

            addTransitionMarker(position: number, destination: number): TransitionMarker;

            addTransitionRegion(position: number, length: number, destination: NamedMarker | LoopRegion): TransitionRegion;
            addSustainPoint(position: number): SustainPoint;

            uiTrackHeight: number;
            selector?: Selector;
        }

        class MasterAssetFolder extends EncodableAsset {
            /**
             * Returns the Asset at the relative path specified. Returns 
             * undefined if the item cannot be found.
             * @example
             * studio.project.workspace.masterAssetFolder.getAsset("music/level_01.wav");
             */

            getAsset(path: string): Asset;
            assetDirectory: string;
            dawProjectSourceDirectory: string;
            streamingAssetThresholdLength: number;
            assets?: Asset[];
            workspace: Workspace;
        }

        class MasterBankFolder
        extends BankFolder {
            workspace: Workspace;
        }

        class MasterEffectPresetFolder
        extends EffectPresetFolder {
            workspace: Workspace;
        }

        class MasterEventFolder
        extends EventFolder {
            workspace: Workspace;
        }

        class MasterParameterPresetFolder
        extends ParameterPresetFolder {
            workspace: Workspace;
        }

        class MasterTagFolder
        extends TagFolder {
            workspace: Workspace;
        }

        class MasterTrack
        extends GroupTrack {}

        class MeteringSettings
        extends ManagedObject {
            /**
             * Enumeration.
             * default: 2
             */
            meteringChannelOrdering: number;
        }

        class MidiControlSurfaceProtocol
        extends ControlSurfaceProtocol {
            inputPortName: string;
            outputPortName: string;
            /**
             * default: -1
             */
            inputPort: number;
            /**
             * default: -1
             */
            outputPort: number;
        }

        class Mixer
        extends ManagedObject {
            masterBus: MixerMaster;
            vca?: MixerVCA[];
            snapshotList: SnapshotList;
            snapshots?: Snapshot[];
            workspace: Workspace;
            uiMixerView?: UiMixerView;
        }

        abstract class MixerBus extends MixerStrip {
            /**
             * Returns the effective input format for a MixerBus object as an 
             * enumeration.
             */
            getInputFormat(): number;
            /**
             * Returns the effective output format for a MixerBus object as an 
             * enumeration.
             */
            getOutputFormat(): number;
            
            /** enum */
            overridingInputFormat: number;
            inputFormatOverriden: boolean;
            effectChain: MixerBusEffectChain;
            panner: MixerBusPanner;
            output: MixerGroup;
        }

        class MixerBusEffectChain
        extends EffectChain {
            /**
             * Creates an effect and adds it to the end of the chain. 
             * The effectDefinition argument can either be an EffectPreset, a 
             * MixerEffect that is a preset, or one of the following strings
                "ThreeEQEffect",
                "ChannelMixEffect",
                "ChorusEffect",
                "CompressorEffect",
                "ConvolutionReverbEffect",
                "DistortionEffect",
                "DelayEffect",
                "FlangerEffect",
                "GainEffect",
                "LimiterEffect",
                "MultibandEqEffect",
                "PitchShifterEffect",
                "SFXReverbEffect",
                "TransceiverEffect",
                "TremoloEffect",
                "HighpassEffect",
                "HighpassSimpleEffect",
                "LowpassEffect",
                "LowpassSimpleEffect",
                "ParamEqEffect",
                "SpatialiserEffect",
                "ObjectSpatialiserEffect",
                "LoudnessMeter"
            */
            addEffect(effectDefinition: // EffectPreset | MixerEffect
                "ThreeEQEffect" |
                "ChannelMixEffect" |
                "ChorusEffect" |
                "CompressorEffect" |
                "ConvolutionReverbEffect" |
                "DistortionEffect" |
                "DelayEffect" |
                "FlangerEffect" |
                "GainEffect" |
                "LimiterEffect" |
                "MultibandEqEffect" |
                "PitchShifterEffect" |
                "SFXReverbEffect" |
                "TransceiverEffect" |
                "TremoloEffect" |
                "HighpassEffect" |
                "HighpassSimpleEffect" |
                "LowpassEffect" |
                "LowpassSimpleEffect" |
                "ParamEqEffect" |
                "SpatialiserEffect" |
                "ObjectSpatialiserEffect" |
                "LoudnessMeter"
                ): MixerEffect;

            /** Returns the bus or VCA's path as a string */
            getPath(): string;

            bus: MixerBus;
        }

        class MixerBusFader
        extends MixerEffect {}

        class MixerBusPanner
        extends MixerEffect {
            stereoPan: number;
            stereoLeftPan: number
            stereoRightPan: number
            surroundPanDirection: number
            surroundPanExtent: number; 
            surroundLFELevel: number;
            /** 
             * Enumeration: not known
             */
            stereoToSurroundPanMode: number;
            surroundStereoSeparation: number;
            surroundStereoAxis: number;
            surroundHeightBlend: number;
            overridingOutputFormat: number;
            outputFormatOverridden: boolean;
            /**
             * Flags: not known
             */
            disabledSpeakers: number;
            /** default: false */
            LFEUpmixEnabled: boolean;

            /**
             * Only required when there is no presetOwner field present
             */
            bus?: MixerBus;
        }

        abstract class MixerEffect 
        extends AutomatableObject
        implements PlatformSpecificItem {
            /** default: false */
            bypass: boolean;
            excludedPlatforms?: Platform[];
            /** Required only if there is no presetOwner. Union-like */
            owner?: EffectChain;
            /** Required only if there is no owner. Union-like */
            presetOwner?: EffectPreset;
        }

        

        class MixerGroup
        extends MixerBus {
            name: string;
            /** Pitch offset in semitones. default: 0 */
            pitch: number;
            /** default 65, which represents infinite instances */
            maxInstances: number;

            /** 
             * Enumeration
             */
            instanceStealing: number;
            
            input?: MixerBus;
        }

        class MixerInput
        extends MixerGroup {
            mixer: Mixer;
        }

        class MixerMaster
        extends MixerGroup {
            mixer: Mixer;
        }

        class MixerReturn
        extends MixerBus {
            name: string;
            input?: MixerSend;
        }

        class MixerSend
        extends MixerEffect {
            /** Default: -80 */
            level: number;
            /**
             * Enumeration: not known.
             * default: -1
             */
            inputFormat: number;
            mixerReturn: MixerReturn;
        }

        abstract class MixerStrip 
        extends AutomatableObject {
            volume: number;
            color: string;
            masters?: MixerVCA[];
            snapshotTracks?: SnapshotTrack[];
            profilerTracks?: ProfilerTrack[];
            uiMixerView?: UiMixerView;
        }

        class MixerVCA
        extends MixerStrip {
            name: string;
            slaves?: MixerStrip[];
            mixer: Mixer;
        }

        abstract class Modulator extends AutomatableObject {
            nameOfPropertyBeingModulated: string;
            objectBeingModulated: AutomatableObject;
        }

        abstract class Module 
        extends AutomatableObject
        implements Selectable, Triggerable {
            selector?: Selector | undefined;
            addParameterCondition(parameter: string | Timeline | GameParameter, min: number, max?: number | undefined): ParameterCondition;
            triggerProbabilityEnabled: boolean;
            triggerProbability: number;
            triggerConditions?: ParameterCondition[];

            isAsync: boolean;
            isCutoff: boolean;
            start: number;
            length: number;
            /**
             * Enumeration
             */
            delayType: number;
            minimumTimeDelay: number;
            maximumTimeDelay: number;
            /**
             * Enumeration
             */
            quantizationInterval: number;
            startOffset: number;
            timelockedOffset: number;
            /** 
             * Enumeration:
             * 3 sets to "None"
             * Anything else sets to "Oldest"
             */
            voiceStealing: number;
            /**
             * Polyphony. Default is 65, which is inifinite
             */
            maxVoices: number;

            /** Default: "Blue" */
            color: "Blue" | "Cyan" | "Green" | "Magenta" | "Red" | "Yellow";
            name: string;
            fadeInCurve?: FadeCurve;
            fadeOutCurve?: FadeCurve;
            relatedFadeCurves?: FadeCurve[];
            audioTrack: AudioTrack;
            parameter: Parameter;
        }

        class MultiSound 
        extends Sound {
            /** default: false */
            looping: boolean;
            /** default: 0 */
            playCount: number;
            /**
             * Enumeration:
             * default: 0
             */
            playlistMode: number;
            selectables?: Selectable[];
            sounds?: Sound[];
            /** Only required if audioTrack and owner fields not present */
            scattererOwner?: SoundScatterer;
        }

        class MultibandEqEffect
        extends MixerEffect {
            /** default: 1 */
            filterTypeA: number;
            /** default: 0 */
            filterTypeB: number;
            /** default: 0 */
            filterTypeC: number;
            /** default: 0 */
            filterTypeD: number;
            /** default: 0 */
            filterTypeE: number;
            /** default: 660 */
            frequencyA: number;
            /** default: 40 */
            frequencyB: number;
            /** default: 11000 */
            frequencyC: number;
            /** default: 160 */
            frequencyD: number;
            /** default: 2700 */
            frequencyE: number;
            /** default: 0.707 */
            qualityA: number;
            /** default: 0.707 */
            qualityB: number;
            /** default: 0.707 */
            qualityC: number;
            /** default: 0.707 */
            qualityD: number;
            /** default: 0.707 */
            qualityE: number;
            /** default: 0 */
            gainA: number;
            /** default: 0 */
            gainB: number;
            /** default: 0 */
            gainC: number;
            /** default: 0 */
            gainD: number;
            /** default: 0 */
            gainE: number;
        }

        class NamedMarker 
        extends AutomatableObject {
            name: string;
            position: number;
        }

        abstract class NamedWorkspaceBasedSourceControlProvider
        extends WorkspaceBasedSourceControlProvider {
            workspaceName: string;
        }

        class ObjectSpatialiserEffect 
        extends SpatialEffect {}

        class ObsoleteObject {}

        class OscControllerSurfaceProtocol
        extends ControlSurfaceProtocol {
            inputPort: number;
            outputPort: number;
            address: string;
        }

        class ParamEqEffect
        extends MixerEffect {
            /** default: 2000 */
            centreFrequency: number;
            /** default: 0 */
            gain: number;
            /** default: 1 */
            bandwidth: number;
        }

        abstract class Parameter
        extends AutomatableObject {
            uiLastRulerScaleRation: number;
            uiLastHorizontalScrollBarValue: number;
            eventSelector?: Event;
            modules: Module[];
            event: Event;
        }

        class ParameterCondition extends AutomatableObject {
            minimum: number;
            maximum: DoubleRange;

            // relationships
            owner: Triggerable;
            parameter: GameParameter;
        }

        class ParameterPreset 
        extends WorkspaceItem {
            name: string;
            folder: ParameterPresetFolder;
            parameter: GameParameter;
        }

        class ParameterPresetFolder
        extends Folder {}

        class ParameterProperty
        extends AutomatableObject {
            position: number;
            parameter: ParameterProxy;
            owner: EventSound;
        }

        interface ParameterPrototype
        extends ManagedObject {
            automationCurves?: AutomationCurve[];
        }

        class ParameterProxy 
        extends ParameterPreset
        implements Selectable {
            // properties
            uiModulationDrawerVisible: boolean;
            uiTriggerBehaviorDrawerVisible: boolean;
            /** default: 1.0 */
            uiLastRulerScaleRatio: number;
            /** default: 0.0 */
            uiLastHorizontalScrollBarValue: number;

            // relationships
            automators?: Automator[];
            modulators?: Modulator[];
        }

        class PerforceProvider
        extends NamedWorkspaceBasedSourceControlProvider {
            p4Port: string;
            p4Host: string;
            p4Charset: string;
            p4User: string;
            p4Password: string;
            p4WorkspaceForm: string;
        }

        class PitchShifterEffect
        extends MixerEffect {
            /** default: 0.5 */
            pitch: number;
            /** default: 1024 */
            fftSize: number;
            /** default: 4 */
            overlap: number;
            /** default: 0 */
            maxChannels: number;
        }

        const enum parameterType {
            User = 0,
            UserDiscrete = 1,
            UserEnumeration = 2,
            Distance = 3,
            Direction = 4,
            Elevation = 5,
            EventConeAngle = 6,
            EventOrientation = 7,
            Speed = 8,
        }

        class Platform 
        implements Encodable {
            /** Enumeration */
            hardwareType: number;
            name: string;
            subDirectory: string;
            /** Enumeration */
            speakerFormat: number;
            buildMetadataOnly: boolean;
            encodingSettings?: EncodingSetting[];
            uiActivePlatformOwner?: ProjectSettings;
            workspace: Workspace;
            associatedSettings?: EncodingSetting[];
            excludedItems?: PlatformSpecificItem;
        }

        interface PlatformSpecificItem
        extends ManagedObject {
            excludedPlatforms?: Platform[];
        }

        class PlayPercentage
        extends ManagedObject {
            percentage: number;
            sound: Sound;
            owner: MultiSound;
        }

        class Plugin
        extends ManagedObject {
            identifier: string;
            pluginParameters: PluginParameter<any>[];
            owner: PluginOwner;
        }

        class PluginEffect
        extends MixerEffect
        implements PluginOwner, SidechainTarget {
            sidechains?: Sidechain[];
            plugin: Plugin;
        }

        interface PluginOwner
        extends ManagedObject {
            plugin: Plugin;
        }

        abstract class PluginParameter<T> 
        extends AutomatableObject {
            name: string;
            value: T;
            plugin: Plugin;
        }

        class PluginSettings
        extends ManagedObject {
            pluginFolders: string[];
        }

        class PluginSound
        extends Sound
        implements PluginOwner {
            plugin: Plugin;
        }

        class ProfilerFolder
        extends Folder {}

        class ProfilerGraph
        extends AutomationTrack {
            /**
             * Enumeration
             */
            graphType: number;
            /**
             * default: -1
             */
            instanceId: number;
            objectBeingGraphed: AutomatableObject;
        }

        class ProfilerRecordingMarker
        extends NamedMarker {
            selector?: Selector;
            timeline: Timeline;
            markerTrack: MarkerTrack;
            references?: TransitionTimelineOwner[];
        }

        class ProfilerSession
        extends Event {
            profilerTracks?: ProfilerTrack[];
            profilerSystemTrack: ProfilerSystemTrack;
        }

        class ProfilerSessionFolder
        extends ProfilerFolder {
            workspace: Workspace;
        }

        class ProfilerSystemTrack
        extends ProfilerTrack {}

        class ProfilerTrack
        extends AudioTrack {
            profilerSession: ProfilerSession;
            mixerStrip: MixerStrip;
        }

        class ProgrammerSound 
        extends Sound 
        implements Loopable {
            looping: boolean;
            playCount: number;
            selectedKey: string;
            placeholder?: ProgrammerSoundPlaceholder; 
        }

        abstract class ProgrammerSoundPlaceholder 
        extends ManagedObject {
            programmerSounds?: ProgrammerSound[];
        }
        
        /**
         * Pseudo-singleton class located at studio.project.workspace.projectSettings
         */
        class ProjectSettings
        extends ManagedObject {
            activeLocale?: Locale;
            activePlatform: Platform;
            workspace: Workspace;
        }

        class ProxyEffect
        extends MixerEffect {
            bypass: boolean;
            /** Enumeration. Default: -1 */
            inputFormat: number;
            
        }

        interface Quantizable
        extends ManagedObject {
            /** Enumeration */
            quantizationInterval: number;
            transitionOffset: number;
        }

        class RandomizerModule
        extends Modulator {
            /** default: 0 */
            amount: number;
        }

        interface ReferenceableData
        extends ManagedObject {
            dataReferences?: DataReferee[];
        }

        abstract class Region 
        extends Marker {
            length: number;
        }

        const enum regionLoopMode {
            None,
            Looping,
            Magnet
        }

        class ReturnTrack
        extends AudioTrack
        implements PlatformSpecificItem {
            excludedPlatforms?: Platform[];
            mixerReturn: EventMixerReturn;
            event: Event;
        }

        class SFXReverbEffect
        extends MixerEffect {
            /** default: 1500 */
            decayTime: number;
            /** default: 20 */
            earlyDelay: number;
            /** default: 40 */
            lateDelay: number;
            /** default: 5000 */
            HFReference: number;
            /** default: 50 */
            HFDecayRatio: number;
            /** default: 100 */
            diffusion: number;
            /** default: 100 */
            density: number;
            /** default: 250 */
            lowShelfFrequency: number;
            /** default: 0 */
            lowShelfGain: number;
            /** default: 5000 */
            highCut: number;
            /** default: 50 */
            earlyLateMix: number;
            /** default: -6 */
            wetLevel: number;
            /** default: 0 */
            dryLevel: number;
            /** default: 0 */
        }

        class ScriptBasedProvider
        extends SourceControlProvider {
            name: string;
            settings: string;
        }

        interface Selectable extends ManagedObject {
            selector?: Selector;
        }

        interface Selector extends ManagedObject {
            selectables: Selectable[];
        }

        class SidechainModulator
        extends Modulator
        implements SidechainTarget {
            /** 
             * Enumeration.
             * default: 0
             */
            levelMode: number
            /**
             * default: 0
             */
            amount: number;
            /**
             * default: 100
             */
            attackTime: number;
            /**
             * default: 200
             */
            releaseTime: number;
            /**
             * default: -24
             */
            minimumThreshold: number;
            /**
             * default: -6
             */
            maximumThreshold: number;
            sidechains?: Sidechain[];
        }

        interface SidechainTarget
        extends ManagedObject {
            sidechains?: Sidechain[];
        }

        class Sidechain 
        extends MixerEffect {
            targets?: SidechainTarget[];
        }

        class SingleSound 
        extends Sound
        implements Loopable {
            looping: boolean;
            playCount: number;
            audioFile?: AudioFile;
        }

        class Snapshot extends Event {
            /** enum */
            behavior: number;
            snapshotMasterTrack: SnapshotMasterTrack;
            snapshotProperties: SnapshotProperty[];
            snapshotTracks?: SnapshotTrack[];
        }

        class SnapshotGroup extends Folder {}

                
        class SnapshotList extends SnapshotGroup {
            mixer: Mixer;
        }

        class SnapshotMasterTrack extends AudioTrack {
            color: string;
            snapshot: Snapshot;
        }

        class SnapshotModule
        extends EventSound {
            /** default: 100 */
            intensity: number;
        }

        class SnapshotProperty 
        extends AutomatableObject {
            propertyName: string;
            value: number;
            snapshot: Snapshot;
            automatableObject: AutomatableObject;
        }

        class SnapshotTrack
        extends AudioTrack {
            snapshot: Snapshot;
            mixerStip: MixerStrip;
        }

        abstract class Sound 
        extends Module {
            volume: number;
            pitch: number;
            playPercentage?: PlayPercentage;
            /** only required when audioTrack is defined*/
            owner?: MultiSound;
        }

        class SoundScatterer
        extends Sound {
            /** 
             * default: 16 
             */
            polyphony: number;
            /**
             * Enumeration
             * default: 0
             */
            soundStealing: number;
            /**
             * default: 33
             */
            totalSounds: number;
            /**
             * default: 500
             */
            minimumTimeBetweenSounds: number;
            /**
             * default: 1000
             */
            maximumTimeBetweenSounds: number;
            /**
             * default: 100
             */
            spawnRate: number;
            /**
             * default: 1
             */
            minimumScatterDistance: number;
            /**
             * default: 20
             */
            maximumScatterDistance: number;
            /**
             * default: 0
             */
            volumeRandomization: number;
            /**
             * default: 0
             */
            pitchRandomization: number;

            sound: MultiSound;
        }


        abstract class SourceControlProvider
        extends ManagedObject {
            workspace: Workspace;
        }

        abstract class SpatialEffect
        extends MixerEffect {
            /**
             * Enumeration.
             * default: 0
             */
            distanceRolloffType: number;
            /**
             * default: 1
             */
            minimumDistance: number;
            /**
             * default: 20
             */
            maximumDistance: number;
            /**
             * Enumeration.
             * default: 0
             */
            extentMode: number;
            /**
             * default: 0
             */
            soundSize: number;
            /**
             * default: 0
             */
            minimumExtent: number;
        }

        class SpatialiserEffect 
        extends SpatialEffect {
            /**
             * default: true
             */
            occlusionEnabled: boolean;
            /**
             * default: 100
             */
            dopplerMultiplier: number;
            /**
             * default: 1
             */
            panBlend: number;
            /**
             * default: 0
             */
            userPanDirection: number;
            /**
             * default: 360
             */
            userPanExtent: number;
            /**
             * default: 0
             */
            userLFELevel: number;
            /**
             * default: false
             */
            LFEUpmixEnabled: boolean;
            /**
             * Enumeration
             * default: 1
             */
            stereoToSurroundUserPanMode: number;
            /**
             * default: 60
             */
            userStereoSeparation: number;
            /**
             * default: 0
             */
            userStereoAxis: number;
        }

        class SslNucleusControlSurface
        extends ControlSurface {}

        class SustainPoint 
        extends Marker {}

        class Tag 
        extends WorkspaceItem {
            events?: Event[];
        }

        class TagFolder 
        extends Folder {}

        class TempoMarker 
        extends Marker {
            /** default: 120 */
            tempo: number;
            /** default: 4 */
            timeSignatureNumerator: number;
            /** default: 4 */
            timeSignatureDenominator: number;
        }

        class TfsProvider
        extends NamedWorkspaceBasedSourceControlProvider {
            serverURL: string;
            connectionPath: string;
            /** default: 8080 */
            connectionPort: number;
            /** default: "http" */
            connectionProtocol: string;
            workspaceFormString: string;
        }

        class ThreeEQEffect
        extends MixerEffect {
            /** default: 0 */
            lowGain: number;
            /** default: 0 */
            midGain: number;
            /** default: 0 */
            highGain: number;
            /** default: 400 */
            lowCrossover: number;
            /** default: 4000 */
            highCrossover: number;
            /** default: 1 */
            crossoverSlope: number;
        }

        class Timeline 
        extends Parameter
        implements ParameterPrototype {
            name: string;
            isProxyEnabled: boolean;

            markers?: Marker[];
        }

        class TouchOscControlSurface
        extends ControlSurface {}

        abstract class Track extends ManagedObject 
        implements Selectable {
            uiTrackHeight: number;
            selector?: Selector;
        }

        class TransceiverEffect
        extends MixerEffect {
            /**
             * default: false
             */
            transmitMode: boolean;
            /**
             * default: 0
             */
            level: number;
            /**
             * default: 0
             */
            channel: number;
            /**
             * default: -1
             */
            speakerMode: number;
        }

        class TransitionDestination 
        extends ManagedObject {
            // properties
            name: string;

            // relationships
            references?: TransitionTimelineOwner[];
        }

        class TransitionDestinationFadeInCurve
        extends TransitionFadeCurve {}

        class TransitionDestinationSound
        extends Module {}

        class TransitionFadeCurve
        extends FadeCurve {}

        class TransitionMarker 
        extends Marker
        implements TransitionTimelineOwner, Triggerable {
            addParameterCondition(parameter: string | Timeline | GameParameter, 
                min: number, max?: number): ParameterCondition;
            triggerProbabilityEnabled: boolean;
            triggerProbability: number;
            uiTransitionTimelineVisible: boolean;

            destination?: TransitionDestination;
            transitionTimeline?: TransitionTimeline;
            triggerConditions?: ParameterCondition[];
        }

        class TransitionRegion 
        extends Marker 
        implements TransitionTimelineOwner, Triggerable, Quantizable {
            addParameterCondition(parameter: string | Timeline | GameParameter, 
                min: number, max?: number): ParameterCondition;
            length: number;
            triggerProbabilityEnabled: boolean;
            triggerProbability: number;
            uiTransitionTimelineVisible: boolean;
            /** Enumeration */
            quantizationInterval: number;
            transitionOffset: number;

            destination?: TransitionDestination;
            transitionTimeline?: TransitionTimeline;
            triggerConditions?: ParameterCondition[];
        }

        class TransitionSourceFadeOutCurve
        extends TransitionFadeCurve {}

        class TransitionSourceSound
        extends Module {}

        class TransitionTimeline 
        extends Timeline {
            length: number;
        }

        interface TransitionTimelineOwner 
        extends ManagedObject {
            uiTransitionTimelineVisible: boolean;
            transitionTimeline?: TransitionTimeline;
            destination?: TransitionDestination;
        }

        class TremoloEffect
        extends MixerEffect {
            /** default: 5 */
            frequency: number;
            /** default: 1 */
            depth: number;
            /** default: 0 */
            shape: number;
            /** default: 0 */
            skew: number;
            /** default: 0.5 */
            duty: number;
            /** default: 0 */
            square: number;
            /** default: 0 */
            phase: number;
            /** default: 0 */
            spread: number;
        }

        interface Triggerable extends ManagedObject {
            /**
             * Adds a parameter condition for a given parameter to a triggerable 
             * object. The parameter argument can either be a ParameterPreset or 
             * a GameParameter. The range of the parameter condition is 
             * specified using the min and max. If max is undefined, the maximum 
             * of the parameter condition will be set to min. For a labeled 
             * parameter, the max argument will be ignored. 
             * @example
             * var continuousCondition = loopRegion.addParameterCondition(studio.project.lookup("parameter:/Distance Parameter"), 0, 1000);
             * var labeledCondition = singleSound.addParameterCondition(studio.project.lookup("parameter:/Current Country"), "Australia");
             * labeledCondition = transitionMarker.addParameterCondition(studio.project.lookup("parameter:/Current Country"), "Australia");
             * labeledCondition = transitionRegion.addParameterCondition(studio.project.lookup("parameter:/Current Country"), "Australia");
             */
            addParameterCondition(parameter: string | Timeline | GameParameter, 
                min: number, max?: number): ParameterCondition
            
            // Properties
            triggerProbabilityEnabled: boolean;
            triggerProbability: number;

            // Relationship
            triggerConditions?: ParameterCondition[];
        }

        
        class UiMixerView
        extends ManagedObject {
            name: string;
            assignedStrips?: MixerStrip[];
            mixer: Mixer;
        }

        class UserProperty
        extends ManagedObject {
            key: string;
            value: string;
        }

        class Workspace 
        extends ManagedObject {
            isSourceControlForAssetsEnabled: boolean;
            isSourceControlForBuiltBanksEnabled: boolean;
            builtBanksOutputDirectory: string;
            builtBanksSeparateAssets: boolean;
            builtBanksSeparateStreams: boolean;
            builtBanksSeparateBankPerAsset: boolean;
            builtBanksIncludeFileNames: boolean;
            builtBanksIncludeReferencedEvents: boolean;
            builtBanksIncludeHash: boolean;
            builtBanksEncryptionKey: string;
            builtBanksMirrorBrowserFolderHierarchy: boolean;
            projectSettings?: ProjectSettings;
            masterEventFolder: MasterEventFolder;
            masterTagFolder: MasterTagFolder;
            masterEffectPresetFolder: MasterEffectPresetFolder;
            masterParameterPresetFolder: MasterParameterPresetFolder;
            masterBankFolder: MasterBankFolder;
            masterAssetFolder: MasterAssetFolder;
            sourceControlProvider?: SourceControlProvider;
            changelist?: WorkspaceChangeList;
            mixer: Mixer;
            profilerSessionFolder: ProfilerSessionFolder;
            platforms?: Platform[];
            locales: Locale[];
            customBindings: ControlSurfaceCustomBindings;
        }

        abstract class WorkspaceBasedSourceControlProvider
        extends SourceControlProvider {
            repositoryLocation: string;
            workspaceRoot: string;
        }

        class WorkspaceChangeList
        extends ManagedObject {
            filesOnHold: string[];
            filesExplicitylyLocked: string[];
            workspace: Workspace;
        }

        abstract class WorkspaceItem extends ManagedObject {
            // properties
            name: string;

            // relationships
            folder: Folder;
        }

    } // end project module

} // end studio
