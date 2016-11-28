# GalleryJS
GalleryJS is a simple and easy to use Gallery Widget for JavaScript.  It's responsive and works great on Desktop and Mobile alike, with extremely intuitive touch control support.  It can be used with images of any size as well as YouTube videos.  GalleryJS has no dependencies and can be used standalone.

# How to use
To use GalleryJS, download the js file <a target="_blank" href="https://raw.githubusercontent.com/YuniYasha/GalleryJS/master/dist/gallery.js">Here</a> and import it on your page:
```html
<script src="yourwebsite.com/gallery.js"></script>
```
This will load the widget into your global namespace, and you can instantiate as many instances as you want like so:
```javascript
            var items = [
                {"type": "image", "url": "assets/1080p.jpg", "title": "This is a test title"},
                {"type": "image", "url": "assets/phone.jpg"},
                {"type": "youtube", "video_id": "_8puyxscRBs", "player_vars":{"controls": 0}},
                {"type": "image", "url": "assets/banner.png"},
                {"type": "image", "url": "assets/icon.png"}
            ];

            document.getElementById('gallery-container').appendChild(new GalleryJS(items).element);
```

Alternatively, you can import GalleryJS into your Node Project by installing it through NPM like so:
```sh
npm install galleryjs --save
```
If you decide to compile galleryjs into your project, you will need loaders for es6 (Ex: Babel), less, and images, inside your compiler options.

Currently, GalleryJS supports Images and YouTube videos, and you can tell GalleryJS which to render using basic JavaScript objects with a type attribute.

```json
{"type": "image", "title": "Test Title", "url": "http://pathtoimage"}
```
```json
{"type": "youtube", "title": "Test YouTube", "video_id": "f2k234", "player_vars": {"controls": 1}}
```
