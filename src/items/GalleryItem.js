/**
 * Created by Kyle on 2016-11-28.
 */
export default class GalleryItem {
    constructor (type, title) {
        this._type = type;
        this._title = title;
        this._element = null;
    }

    get title () {
        return this._title;
    }

    get type () {
        return this._type;
    }

    get element () {
        return this._element;
    }

    resize (w, h, focusPoint, startX, startY, offset) {
        let x;
        let y;

        //Constrain size
        let displayAR = this.element.parentNode.offsetWidth / this.element.parentNode.offsetHeight;
        let elementAR = this.element.offsetWidth / this.element.offsetHeight;

        if (displayAR > elementAR && h < this.element.parentNode.offsetHeight) {
            h = this.element.parentNode.offsetHeight;
            w = this.element.offsetWidth;
        } else if (displayAR < elementAR && w < this.element.parentNode.offsetWidth) {
            h = this.element.offsetHeight;
            w = this.element.parentNode.offsetWidth;
        }

        //Make sure it doesn't exceed original dimensions x2
        if (h > this.element.parentNode.offsetHeight * 2 || w > this.element.parentNode.offsetWidth * 2) {
            h = this.element.offsetHeight;
            w = this.element.offsetWidth;
        }
        // console.log(focusPoint);
        let scale;
        if (displayAR > elementAR) {
            scale = (this.element.offsetHeight / this.element.parentNode.offsetHeight) - 1;
        } else {
            scale = (this.element.offsetWidth / this.element.parentNode.offsetWidth) - 1;
        }

        //TODO: Redo focus point calculations to be more accurate
        //Recenter image with new dimensions against focus point based on zoom level
        let destination = {x: startX - ( focusPoint.x * 2), y: startY - (focusPoint.y * 2)};

        x = (startX + (destination.x)) * scale;
        y = (startY + (destination.y)) * scale;

        x += offset.x;
        y += offset.y;


        //Boundry Enforcement
        if (h < this.element.parentNode.offsetHeight) {
            y = (this.element.parentNode.offsetHeight - h) / 2;
        }  else if (h > this.element.parentNode.offsetHeight && y > 0) {
            y = 0;
        } else if (h > this.element.parentNode.offsetHeight && y < 0-((h - this.element.parentNode.offsetHeight))) {
            y = 0-((h - this.element.parentNode.offsetHeight));
        } else if (h === this.element.parentNode.offsetHeight) {
            y = 0;
        }

        if (w < this.element.parentNode.offsetWidth) {
            x = (this.element.parentNode.offsetWidth - w) / 2;
        } else if (w > this.element.parentNode.offsetWidth && x > 0) {
            x = 0;
        } else if (w > this.element.parentNode.offsetWidth && x < 0-((w - this.element.parentNode.offsetWidth))) {
            x = 0-((w - this.element.parentNode.offsetWidth));
        } else if (w === this.element.parentNode.offsetWidth) {
            x = 0;
        }

        this.element.style.display = "none";
        this.element.style.top = Math.floor(y) + "px";
        this.element.style.left = Math.floor(x) + "px";
        this.element.style.width = Math.floor(w) + "px";
        this.element.style.height = Math.floor(h) + "px";
        this.element.style.display = "block";
    }

    move (x, y) {
        //Constrain movement...
        if (this.element.offsetWidth > this.element.parentNode.offsetWidth) {
            if (x > 0) {
                x = 0;
            } else if (x < this.element.parentNode.offsetWidth - this.element.offsetWidth) {
                x = this.element.parentNode.offsetWidth - this.element.offsetWidth;
            }
        } else {
            //Don't allow it to move
            x = this.element.offsetLeft;
        }

        if (this.element.offsetHeight > this.element.parentNode.offsetHeight) {
            if (y > 0) {
                y = 0;
            } else if (y < this.element.parentNode.offsetHeight - this.element.offsetHeight) {
                y = this.element.parentNode.offsetHeight - this.element.offsetHeight;
            }
        } else {
            y = this.element.offsetTop;
        }

        //Set finalized coordinates
        this.element.style.left = x + "px";
        this.element.style.top = y + "px";
    }

    reset () {
        //Remove all dimensions styling to insure a fresh slate
        this.element.style.removeProperty("height");
        this.element.style.removeProperty("width");

        //Compare Aspect Ratios and set the size of the element
        let displayAR = this.element.parentNode.offsetWidth / this.element.parentNode.offsetHeight;
        let imageAR = this.element.offsetWidth / this.element.offsetHeight;

        if (displayAR > imageAR) {
            this.element.style.top = "0px";
            this.element.style.height = this.element.parentNode.offsetHeight + "px";
            this.element.style.left = ((this.element.parentNode.offsetWidth - this.element.offsetWidth) / 2) + "px";
        } else if (displayAR < imageAR) {
            this.element.style.left = "0px";
            this.element.style.width = this.element.parentNode.offsetWidth + "px";
            this.element.style.top = ((this.element.parentNode.offsetHeight - this.element.offsetHeight) /2) + "px";
        } else {
            this.element.style.top = "0px";
            this.element.style.left = "0px";
            this.element.style.height = this.element.parentNode.offsetHeight + "px";
            this.element.style.width = this.element.parentNode.offsetWidth + "px";
        }
    }

    onShown () {
        //Abstract Method for when Item is shown in gallery
    }

    onHidden () {
        //Abstract Method for when Item is Hidden in Gallery
    }
}