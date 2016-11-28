import Hammer from "hammerjs";
import "./Gallery.less";
// import "./assets/spinner.css";

import FullScreenIcon from "./assets/fullscreen.png";
import BackNavIcon from "./assets/back-nav.png";
import ForwardNavIcon from "./assets/forward-nav.png";
import ItemBuilder from "./items/ItemBuilder.js";
import ItemFactory from "./items/ItemFactory.js";

export default class GalleryJS {
    constructor (itemStubs) {
        this._navigationStatus = null;
        this._gallery = null;
        this._galleryContentContainer = null;
        this._itemTitle = null;
        // this._content = content;
        this._index = 0;
        this._isFullscreen = false;
        this._onKeyUp = this._onKeyUp.bind(this);
        // this._images = [];
        this._items = [];

        window.addEventListener('resize', (e) => {
            this._resetItems();
        });

        this._build(itemStubs);
    }

    get element () {
        return this._gallery;
    }

    next () {
        if (this._index < this._items.length - 1) {
            this._index += 1;
            this._onNavigation(this._items[this._index], this._items[this._index - 1]);
        }
    }

    previous () {
        if (this._index > 0) {
            this._index -= 1;
            this._onNavigation(this._items[this._index], this._items[this._index + 1]);
        }
    }

    toggleFullscreen () {
        this._gallery.classList.toggle("fullscreen");
        this._isFullscreen = !this._isFullscreen;
        if (this._isFullscreen) {
            document.body.addEventListener('keyup', this._onKeyUp);
        } else {
            document.body.removeEventListener('keyup', this._onKeyUp);
        }

        this._resetItems();
    }

    _build (itemStubs) {
        let gallery = document.createElement('div');
        this._gallery = gallery;
        gallery.className = "gallery";

        //Container for the Content (Images/Videos)
        let galleryContentContainer = document.createElement('div');
        this._galleryContentContainer = galleryContentContainer;
        galleryContentContainer.className = "gallery-content";
        gallery.appendChild(galleryContentContainer);

        var mc = new Hammer.Manager(gallery);
        var Swipe = new Hammer.Swipe();
        var Pan = new Hammer.Pan();
        mc.add(Swipe);
        mc.add(Pan);
        let startX = 0;
        let containerStartX = 0;
        var panLeftEnabled = false;
        var panRightEnabled = false;

        mc.on('panstart', (e) => {
            e.preventDefault();
            startX = e.pointers[0].clientX;
            containerStartX = galleryContentContainer.offsetLeft;
            galleryContentContainer.classList.add('no-transition');

            if (this._items[this._index].element.offsetLeft >= 0) {
                panRightEnabled = true;
            } else {
                panRightEnabled = false;
            }

            // console.log(this._items[this._index].element.offsetLeft + this._items[this._index].element.offsetWidth, this._items[this._index].element.parentNode.offsetWidth);
            if (this._items[this._index].element.offsetLeft + this._items[this._index].element.offsetWidth <= this._items[this._index].element.parentNode.offsetWidth)  {
                panLeftEnabled = true;
            } else {
                panLeftEnabled = false;
            }
            // console.log("Left", panLeftEnabled, "Right", panRightEnabled);
        });
        mc.on('panleft', (e) => {
            e.preventDefault();
            if (panLeftEnabled || panRightEnabled) {
                galleryContentContainer.style.left = containerStartX - (startX - e.pointers[0].clientX) + "px";
            }

            if (panRightEnabled && !panLeftEnabled && galleryContentContainer.offsetLeft <= containerStartX) {
                // console.log("Disabled Pan Right");
                galleryContentContainer.style.left = containerStartX + "px";
                panRightEnabled = false;
            }
        });

        mc.on('panright', (e) => {
            e.preventDefault();
            if (panRightEnabled || panLeftEnabled) {
                galleryContentContainer.style.left = containerStartX - (startX - e.pointers[0].clientX) + "px";
            }

            if (panLeftEnabled && !panRightEnabled && galleryContentContainer.offsetLeft >= containerStartX) {
                // console.log("Disabled Pan Left")
                galleryContentContainer.style.left = containerStartX + "px";
                panLeftEnabled = false;
            }
        });

        mc.on('panend', (e) => {
           //Scroll to nearest item
            galleryContentContainer.classList.remove('no-transition');
            var index = Math.round((galleryContentContainer.offsetLeft * -1) / galleryContentContainer.offsetWidth);
            // console.log((galleryContentContainer.offsetLeft * -1) / galleryContentContainer.offsetWidth);
            // console.log(index);
            if (index < 0) {
                index = 0;
            } else if (index > this._items.length - 1) {
                index = this._items.length - 1;
            }

            var oldIndex = this._index;
            this._index = index;
            if (oldIndex != this._index) {
                this._onNavigation(this._items[this._index], this._items[oldIndex]);
            } else {
                //Reset Container
                //TODO: Clean out this duplicate code
                this._galleryContentContainer.style.left = (((this._index) * 100) * -1) + "%";
            }

            //They swiped
            if (oldIndex === this._index) {
                if (e.velocityX <= -.5) {
                    this.next();
                } else if (e.velocityX >= .5) {
                    this.previous();
                }
            }
        });


        //Add Content
        for (var i in itemStubs) {
            var item = ItemFactory.build(itemStubs[i]);
            this._items.push(item);
            galleryContentContainer.appendChild(ItemBuilder.build(item));
        }

        //Navigation Icons
        let backNavIcon = document.createElement('img');
        backNavIcon.className = "back-nav-icon";
        backNavIcon.src = BackNavIcon;
        gallery.appendChild(backNavIcon);

        let mc1 = new Hammer.Manager(backNavIcon);
        let Tap1 = new Hammer.Tap();
        mc1.add(Tap1);
        mc1.on('tap', (e) => {
            this.previous();
        });

        let forwardNavIcon = document.createElement('img');
        forwardNavIcon.className = "forward-nav-icon";
        forwardNavIcon.src = ForwardNavIcon;
        gallery.appendChild(forwardNavIcon);

        let mc2 = new Hammer.Manager(forwardNavIcon);
        let Tap2 = new Hammer.Tap();
        mc2.add(Tap2);
        mc2.on('tap', (e) => {
            this.next();
        });

        //Status bar for status of _gallery navigation and icons for fullscreen, etc
        let statusBar = document.createElement('div');
        statusBar.className = "status-bar";
        gallery.appendChild(statusBar);

        //Navigation status
        let navigationStatus = document.createElement('div');
        navigationStatus.className = "navigation-status";
        this._navigationStatus = navigationStatus;
        statusBar.appendChild(navigationStatus);

        //Full screen icon
        let fullScreenIcon = document.createElement('img');
        fullScreenIcon.className = "fullscreen-icon";
        fullScreenIcon.src = FullScreenIcon;
        statusBar.appendChild(fullScreenIcon);

        //Item Title
        let itemTitle = document.createElement('span');
        this._itemTitle = itemTitle;
        statusBar.appendChild(itemTitle);

        let mc3 = new Hammer.Manager(fullScreenIcon);
        let Tap3 = new Hammer.Tap();
        mc3.add(Tap3);
        mc3.on("tap", (e) => {
            //Toggle FullScreen
            this.toggleFullscreen();
        });

        this._onNavigation(this._items[this._index]);

        return gallery;
    }

    //Sets all the _images to initial proportions, to be called when fullscreen toggled or size of container changes
    _resetItems() {
        for (var i in this._items) {
            this._items[i].reset();
        }
    }

    _onNavigation (newItem, oldItem) {
        if (oldItem) {
            oldItem.onHidden();
        }
        newItem.onShown();

        //Update Navigation Status Text to x/x
        this._navigationStatus.innerHTML = (this._index + 1) + "/" + this._items.length;
        //Move Container to appropriate item
        this._galleryContentContainer.style.left = (((this._index) * 100) * -1) + "%";
        //Show new items title in status bar
        this._itemTitle.innerHTML = this._items[this._index].title || "";
    }

    _onKeyUp (e) {
        switch (e.which) {
            case 37:
                //Left
                this.previous();
                break;
            case 39:
                //Right
                this.next();
                break;
            case 27:
                //Esp
                this.toggleFullscreen();
                break;
        }
    }
}

window.GalleryJS = GalleryJS;
module.exports = GalleryJS;