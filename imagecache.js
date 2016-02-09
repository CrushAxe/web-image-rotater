/*************************************************************************
 * ImageCache is a webpage image rotater.
 * 
 * Copyright (C) 2012 by Michael J. Huber <hubermj@verizon.net>
 * 
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation, either version 3 of the License, or (at 
 * your option) any later version.
 *   
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *  
 * A copy of the GNU General Public License can be found at
 * <http://www.gnu.org/licenses/>. 
 * 
 * ImageCache preloads images into imgCache.  Image indexes must be
 * sequential.  Images must be the same type (e.g. png, jpg, gif).
 * Multiple instances of ImageCache may be run on a single webpage by 
 * specifing a unique imgId (e.g. id="unique").
 * 
 * Version 0.9.1 - Images are now loaded as needed vs. when Object is
 * created.
 * 
 * Version 0.9.0 - Initial Release
 * 
 * Example:
 * <img src="/img/foo/image1.jpg" width="460" height="230" id="slide" alt="Desc"/>
 * <script type="text/javascript">
 * <!--
 *   var imgCache = new ImageCache('/img/foo/image', 1, 11, 'slide');
 *   imgCache.startRotation(8);
 * //-->
 * </script>
 * 
 * @author CrushAxe
 * @version 1.0.0
 * @param baseURL		Base URL for images (e.g. /img/foo/image)
 * @param firstIndex	Beginning image index (e.g. /img/foo/image1.jpg)
 * @param lastIndex		Ending image index (e.g. /img/foo/image10.jpg)
 * @param imgId			HTML ID for img tag
 * @parma imgType		File extension for cached images (e.g. png, jpg)
 * @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+> 
 ************************************************************************/
function ImageCache(baseURL, firstIndex, lastIndex, imgId, imgType) {
    this.imgCache      = [];
    // reference to HTML IMG tag containing image to be changed.
    this.imgTag        = document.getElementById(imgId);
    // index of currently selected image in the cache.
    this.index         = 0;
    this.numImg        = lastIndex - firstIndex + 1;
    this.globalURL	   = baseURL;
    this.globalIndex   = firstIndex;
    this.globalType    = imgType;
}


/*************************************************************************
 * Set displayed image, load image if necessary.
 ************************************************************************/
ImageCache.prototype.setImage = function() {
	if (this.imgCache[this.index] == null) {
		var img, i;
		img = new Image();
		i = this.index + this.globalIndex;
        img.src = this.globalURL + i + '.' + this.globalType;
        this.imgCache[this.index] = img;
	}
	this.imgTag.src = this.imgCache[this.index].src;
};


/*************************************************************************
 * Choose a random index and display the image cached at that index.
 ************************************************************************/
ImageCache.prototype.randomImage = function() {
	this.index = Math.floor( (Math.random() * this.numImg) + 1);
	this.setImage();
};


/*************************************************************************
 * Increment current index and display image cached at that index.
 ************************************************************************/
ImageCache.prototype.nextImage = function() {
	this.index = this.index + 1 ;
	if ( this.index >= this.numImg ) {
		this.index = 0;
	}
	this.setImage();
};


/*************************************************************************
 * Change the displayed image on a recurring basis.
 * 
 * @param secs			Seconds to wait between rotations
 ************************************************************************/
ImageCache.prototype.rotateImage = function(secs) {
	if ( secs > 10 || secs < 0 ) {
		secs = 1;
	}
	var interval = secs * 1000;
	var t = this;
	setInterval( function(){t.nextImage();}, interval);
};


/*************************************************************************
 * Display a random image and them begin rotating images.
 * 
 * @param secs			Seconds to wait between rotations
 ************************************************************************/
ImageCache.prototype.startRotation = function(secs) {
	this.randomImage();
	this.rotateImage(secs);
};
