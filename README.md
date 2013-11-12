Fullscreen-rotate-slider
========================

A fullscreen slider plugin with indicator control

How to use:

1. First, put the slider content as a list in a div with id key_visual, like
<pre>
&lt;div id="key_visual">
  	&lt;ul class="clearfix">
		  &lt;li id="key_visual_slider01">&lt;/li>
		  &lt;li id="key_visual_slider02">&lt;/li>
		  &lt;li id="key_visual_slider03">&lt;/li>
  	&lt;/ul>
&lt;/div>
</pre>
2. Second, put the indicator as a list in a div, like
<pre>
&lt;ul id="main_slider" class="clearfix">
	&lt;li>
		&lt;div>
		 &lt;ul id="slider_dot_indicator" class="clearfix">
				&lt;li data-id="#key_visual_slider01" class="active fast_transition">&lt;/li>
				&lt;li data-id="#key_visual_slider02" class="fast_transition">&lt;/li>
				&lt;li data-id="#key_visual_slider03" class="fast_transition">&lt;/li>
			&lt;/ul>
		&lt;/div>
	&lt;/li>
&lt;/ul>
</pre>

3. And then called rotateSlider()
<pre>$('#key_visual').rotateSlider();</pre>

(4.) Adjust the plugin
slideshowTimer - The time on slide goes to another slide while slideshow is true
slideshow  - If using automatic slideshow or not
indicatorListId - id of the indicator container
duration - Transition of slides after click on the indicator

Ex.
<pre>$('#key_visual').rotateSlider({slideshow: false});</pre>
