# web-image-rotater

Displays a sequence of images on webpage.

ImageCache preloads images into imgCache.  Image indexes must be sequential.  Images must be the same type (e.g. png, jpg, gif).  Multiple instances of ImageCache may be run on a single webpage by specifing a unique imgId (e.g. id="unique").

Version 0.9.1 - Images are now loaded as needed vs. when Object is created.

Version 0.9.0 - Initial Release

Example:
<img src="/img/foo/image1.jpg" width="460" height="230" id="slide" alt="Desc"/>
<script type="text/javascript">
<!--
	var imgCache = new ImageCache('/img/foo/image', 1, 11, 'slide');
	imgCache.startRotation(8);
//-->
</script>
