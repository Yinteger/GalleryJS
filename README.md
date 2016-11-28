# GalleryJS
GalleryJS is a simple and easy to use Gallery Widget for JavaScript.  It's responsive and works great on Desktop and Mobile alike, with extremely intuitive touch control support.  It can be used with images of any size as well as YouTube videos.  GalleryJS has no dependencies and can be used standalone.

# How to use
To use GalleryJS, simply import the js file like so
```html
<script src="../dist/easy-gallery.js"></script>
```
This will load the widget into your global namespace, and you can instantiate as many instances as you want like so:
```javascript
document.getElementById('gallery-container').appendChild(new GalleryJS([{type: "image", "url": "assets/1080p.jpg", title: "This is a test title"}, {"type": "image", "url": "assets/phone.jpg"}).element);
```

Alternatively, you can import GalleryJS into your Node Project by installing it through NPM like so:
```sh
npm install galleryjs --save
```
To compile it into your project however, your compile will need to be able to compile images and less files.

Currently, GalleryJS supports Images and YouTube videos, and you can tell GalleryJS which to render using basic JavaScript objects with a type attribute.

```json
{"type": "image", "title": "Test Title", "url": "http://pathtoimage"}
```
```json
{"type": "youtube", "title": "Test YouTube", "video_id": "f2k234", "player_vars": {"controls": 1}}
```
