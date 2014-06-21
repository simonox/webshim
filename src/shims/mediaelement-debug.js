(function(webshim, $){
	"use strict";
	if(!window.console){return;}
	var mediaelement = webshim.mediaelement;
	var hasFlash = swfmini.hasFlashPlayerVersion('10.0.3');
	var url = location.protocol+'//'+location.hostname;
	var tests = {
		urlInValid: {
			level: 1,
			test: (function(){
				var reg = /^[a-z0-9\,\.\:\/\-_\;\?#\+\*\!\(\)\$\;\&\=]+$/i;
				return function(src){
					return (src.src && !reg.test(src.src));
				};
			})(),
			srcTest: {poster: 1, srces: 1},
			message: "URL has invalid characters. Remove any special characters and mutated vowels."
		},
		noHeaderTest: {
			level: 5,
			test: function(src){
				return src.computedContainer != 'video/youtube' && !src.ajax;
			},
			srcTest: {srces: 1},
			message: "Could not run HTTP network tests (cross-domain) for all sources. Check manually."
		},
		hasNoTypeAttribute: {
			level: 4,
			test: function(src){
				return !src.declaredType && !src.typeNotRequired;
			},
			srcTest: {srces: 1},
			message: "The source element has no type attribute specified. Browser needs to download file before testing compatibility. Add a proper type attribute."
		},
		couldNotComputeTypeDeclaredTypeAbsent: {
			level: 1,
			test: function(src){
				return (!src.computedContainer && !src.declaredType);
			},
			srcTest: {srces: 1},
			message: "The source element has no type attribute specified and the extensions seems unknown. Add a proper type attribute."
		},
		httpError: {
			level: 2.5,
			test: function(src){

				if(!src.ajax){
					return 'not testable';
				} else {
					return !!(src.httpError && !src.httpErrorText);
				}
			},
			srcTest: {srces: 1},
			message: "There was an unknown http error. Check source/URL."
		},
		fileEncoding: {
			test: function(){
				return 'This test does not test file encoding, framerate compatibility, moov index, encoding profiles. So there is room to fail!';
			},
			srcTest: {srces: 1}
		},
		explicitHttpError: {
			level: 1,
			test: function(src){
				if(!src.ajax){
					return 'not testable';
				} else {
					return !!(src.httpErrorText);
				}
			},
			srcTest: {srces: 1},
			message: "There was a http error. Check source/URL."
		},
		charsetInContentType: {
			level: 2.5,
			test: function(src){
				if(!src.ajax){
					return 'not testable';
				} else {
					return src.headerType && (/charset=/i).test(src.headerType);
				}
			},
			srcTest: {srces: 1},
			message: "Content-Type header of media file sends charset. Remove charset information."
		},
		explicitTypeMix: {
			level: 3,
			test: function(src){
				if(src.declaredContainer && src.headerType){
					return src.headerType != src.declaredType;
				} else {
					return 'not testable';
				}
			},
			srcTest: {srces: 1},
			message: "Content-Type header and attribute type do not match. Set same and proper type value."
		},
		noContentType: {
			level: 2.5,
			test: function(src){
				if(src.ajax){
					return !(src.headerType);
				} else {
					return 'not testable';
				}
			},
			srcTest: {srces: 1},
			message: "Content-Type header for media file is either empty or application/octet-stream."
		},
		noContentLength: {
			level: 3,
			test: function(src){
				if(src.ajax){
					return !(src.headers['Content-Length']);
				} else {
					return 'not testable';
				}
			},
			srcTest: {srces: 1},
			message: "Content-Length header for media file does not send value."
		},
		noRange: {
			level: 3,
			test: function(src){
				if(src.ajax){
					return !(src.headers['Accept-Ranges']);
				} else {
					return 'not testable';
				}
			},
			srcTest: {srces: 1},
			message: "Accept-Ranges header for media file does not send value. Make sure server supports Range requests in bytes"
		},
		explicitNoRange: {
			level: 2.5,
			test: function(src){
				if(src.ajax){
					return (src.headers['Accept-Ranges'] == 'none');
				} else {
					return 'not testable';
				}
			},
			srcTest: {srces: 1},
			message: "Server does not support Range requests. Make sure server supports Range requests in bytes"
		},
		doubleEncoded: {
			level: 1,
			test: function(src){
				if(src.ajax){
					return ((/[defalte|gzip]/i).test(src.headers['Content-Encoding']));
				} else {
					return 'not testable';
				}
			},
			srcTest: {srces: 1},
			message: "Content of media file is encoded with gzip/defalte. Make sure to not encode it. It's already encoded."
		},
		mediaAttachment: {
			level: 1,
			test: function(src){
				if(src.ajax){
					return (/attach/i.test(src.headers['Content-Disposition']));
				} else {
					return 'not testable';
				}
			},
			srcTest: {srces: 1},
			message: "Content-Disposition header wants media file to be downloaded, but not to be played."
		},
		badTypeMix: {
			level: 1,
			test: function(src, infos){
				var ret = false;

				var isPlayableHtml, isPlayableHeader;
				var htmlContainer = src.declaredContainer || src.computedContainer;
				var headerContainer = src.headerContainer;
				if(headerContainer && htmlContainer){
					if(headerContainer != htmlContainer){
						isPlayableHtml = mediaelement.swfMimeTypes.indexOf(htmlContainer) != -1;
						isPlayableHeader = mediaelement.swfMimeTypes.indexOf(headerContainer) != -1;
						if(isPlayableHtml != isPlayableHeader){
							ret = true;
						}

						if(!ret && infos.element.canPlayType){

							isPlayableHtml = !!infos.element.canPlayType(htmlContainer);
							isPlayableHeader = !!infos.element.canPlayType(headerContainer);
							if(isPlayableHtml != isPlayableHeader){
								ret = true;
							}
						}
					}
				} else {
					ret = 'not testable';
				}

				return ret;
			},
			srcTest: {srces: 1},
			message: "Content-Type header and attribute type do not match and are quite different. Set same and proper type value."
		},
		typeMix: {
			level: 2.5,
			test: function(src, infos){
				var ret = false;

				var isPlayableComputed, isPlayableDeclared;
				if(!src.headerContainer && src.declaredContainer && src.computedContainer && src.computedContainer != src.declaredContainer){
					isPlayableComputed = mediaelement.swfMimeTypes.indexOf(src.computedContainer) != -1;
					isPlayableDeclared = mediaelement.swfMimeTypes.indexOf(src.declaredContainer) != -1;
					if(isPlayableComputed != isPlayableDeclared){
						ret = true;
					}

					if(!ret && infos.element.canPlayType){

						isPlayableComputed = !!infos.element.canPlayType(src.computedContainer);
						isPlayableDeclared = !!infos.element.canPlayType(src.declaredContainer);
						if(isPlayableComputed != isPlayableDeclared){
							ret = true;
						}
					}
				}

				return ret;
			},
			srcTest: {srces: 1},
			message: "Computed type and declared type are different. Needs manual check."
		},
		hasNoPlayableSrc: {
			level: 1,
			test: function(infos){
				var hasPlayable = false;

				$.each(infos.srces, function(i, src){
					var pluginContainer = src.declaredContainer || src.computedContainer;
					var nativeContainer = src.headerContainer || pluginContainer;

					if(mediaelement.swfMimeTypes.indexOf(pluginContainer) != -1){
						hasPlayable = true;
						return false;
					}

					if(infos.element.canPlayType && infos.element.canPlayType(pluginContainer) && infos.element.canPlayType(nativeContainer)){
						hasPlayable = true;
						return false;
					}
				});

				return !hasPlayable;
			},
			message: "Mediaelement has no source to be played in browser or by plugin. Use at least a video/mp4 source."
		},
		needsFlashInstalled: {
			level: 1,
			test: function(infos){
				var flashCanPlay = false;
				var nativeCanPlay = false;
				if(!hasFlash){
					$.each(infos.srces, function(i, src){
						var pluginContainer = src.declaredContainer || src.computedContainer;
						var nativeContainer = src.headerContainer || pluginContainer;

						if(mediaelement.swfMimeTypes.indexOf(pluginContainer) != -1){
							flashCanPlay = true;
						}

						if(infos.element.canPlayType && (pluginContainer == 'video/youtube' || (infos.element.canPlayType(pluginContainer) && infos.element.canPlayType(nativeContainer)))){
							nativeCanPlay = true;
							return false;
						}
					});
				}

				return flashCanPlay && !nativeCanPlay;
			},
			message: "While media file could be played by flash plugin, Browser has no flash installed. Use at least a video/mp4 source and install flash. Or add additionally a video/webm file."
		},
		hasNoSwfPlayableSrc: {
			level: 1,
			test: function(infos){
				var hasPlayable = false;

				$.each(infos.srces, function(i, src){
					var pluginContainer = src.declaredContainer || src.computedContainer;

					if(mediaelement.swfMimeTypes.indexOf(pluginContainer) != -1){
						hasPlayable = true;
						return false;
					}

				});

				return !hasPlayable;
			},
			message: "Mediaelement has no source to be played by fallback plugin. Use at least a video/mp4 source."
		},
		hasNoNativePlayableSrc: {
			level: 4,
			test: function(infos){
				var hasPlayable = false;

				if(infos.element.canPlayType){
					$.each(infos.srces, function(i, src){
						var pluginContainer = src.declaredContainer || src.computedContainer;
						var nativeContainer = src.headerContainer || pluginContainer;

						if(pluginContainer == 'video/youtube' || (infos.element.canPlayType(pluginContainer) && infos.element.canPlayType(nativeContainer))){
							hasPlayable = true;
							return false;
						}

					});
				}

				return !hasPlayable;
			},
			message: "Mediaelement has no source to be played native. Use at least a video/mp4 and a video/webm source."
		},
		misLeadingAttrMode: {
			level: 2,
			test: function(infos){
				return (infos.srces.length > 1 && infos.srces[0].attrMode);
			},
			message: "Mediaelement has a src attribute and some source child elements. Only src attribute is used."
		},
		emptySrc: {
			level: 2,
			test: function(src){
				return src.src && !src.attrSrc;
			},
			srcTest: {poster: 1, srces: 1},
			message: "The src or poster attribute is an empty string, which is not allowed."
		}
	};

	function getSrcInfo(elem, nodeName){
		var ajax;
		var src = {
			src: $.prop(elem, 'src'),
			attrSrc: $.trim($.attr(elem, 'src')),
			declaredType: $.attr(elem, 'type') || $(elem).attr('data-type') || '',
			errors: {}
		};
		src.declaredContainer = src.declaredType.split(';')[0].trim();
		try {
			src.computedContainer = mediaelement.getTypeForSrc( src.src, nodeName);
		} catch(e){
			src.computedContainer = '';
		}

		if(!src.src.indexOf(url)){

			try {
				src.headerType = '';
				src.headers = {};
				ajax = $.ajax({
					url: src.src,
					type: 'head',

					success: function(){
						src.headerType = ajax.getResponseHeader('Content-Type') || '';
						if((/^\s*application\/octet\-stream\s*$/i).test(src.headerType)){
							src.headerType = '';
							src.errors.octetStream = 'octetStream';
						}
						src.headerContainer = $.trim(src.headerType.split(';')[0]);
						['Location', 'Content-Type', 'Content-Length', 'Accept-Ranges', 'Content-Disposition', 'Content-Encoding'].forEach(function(name){
							src.headers[name] = ajax.getResponseHeader(name) || '';
						});

					},
					error: function(xhr, status, statusText){
						src.httpError = status;
						src.httpErrorText = statusText;
					}
				});
				src.ajax = ajax;
			} catch(e){}
		} else {
			src.cors = true;
		}

		return src;
	}

	function resolveSrces(elem, infos){
		var src;
		var srces = [];
		var ajaxes = [];
		var nodeName = elem.nodeName.toLowerCase();
		var $sources = $('source', elem);


		if($.prop(elem, 'src')){
			src = getSrcInfo(elem, nodeName);
			src.attrMode = true;
			src.typeNotRequired = true;
			srces.push(src);
		}

		$sources.each(function(i){
			var src = getSrcInfo(this, nodeName);
			src.typeNotRequired = !!(i && i >= $sources.length - 1);

			srces.push(src);

			if(src.ajax){
				ajaxes.push(src.ajax);
			}
		});

		infos.srces = srces;


		return $.when.apply($, ajaxes);
	}



	function runTests(infos){

		$.each(tests, function(name, obj){
			var localMessage;
			var failed = false;
			var message = obj.message || name;
			if(obj.srcTest){
				if(obj.srcTest.poster){
					localMessage = obj.test(infos.poster, infos);
					if(localMessage){
						if(typeof localMessage == 'string'){
							infos.poster.errors[name] = localMessage;
						} else {
							infos.poster.errors[name] = message;
							failed = true;
						}
					}
				}

				if(obj.srcTest.srces){
					infos.srces.forEach(function(src){
						localMessage = obj.test(src, infos);
						if(localMessage){
							if(typeof localMessage == 'string'){
								src.errors[name] = localMessage;
							} else {
								src.errors[name] = message;
								failed = true;
							}
						}
					});

				}
			} else {
				failed = obj.test(infos);
			}

			if(failed){
				infos.errors.push({
					message: message,
					level: obj.level,
					name: name
				});
			}
		});

		infos.errors.sort(function(a, b){
			return a.level > b.level;
		});
		console.log('---- Media Test Start ----');
		console.log('Testing results for mediaelement network + markup debugger. For detailed information expand the following object:', infos);
		if(infos.errors.length){
			if(infos.errors[0].level < 3){
				console.log('Found '+ infos.errors.length + ' errors/warnings with at least 1 critical issue.');
			} else if(infos.errors[0].level < 4) {
				console.log('Found '+ infos.errors.length + 'errors/warnings.');
			} else {
				console.log('Found '+ infos.errors.length + 'warnings but no critical issue.');
			}
			infos.errors.forEach(function(error){
				var type = 'log';
				if(console.error && console.warn){
					if(error.level < 3){
						type = 'error';
					} else if(error.level < 4){
						type = 'warn';
					}
				}
				console[type](error.message, 'priority level: '+ error.level, error.name);
			});
		} else {
			console.log('Congratulations: No errors found for video.');
		}
		console.log('---- Media Test End ----');
	}

	function getMediaInfo(elem){
		var infos = {
			element: elem,
			errors: [],
			poster: {
				src: $.prop(elem, 'poster'),
				attrSrc: $.trim($.attr(elem, 'poster')),
				errors: {}
			},
			mediaError: $.prop(elem, 'error'),
			wsError: $(elem).data('mediaerror')
		};
		var promise = resolveSrces(elem, infos);
		var initTests = function(){
			runTests(infos);
		};

		promise
			.fail(function(){
				setTimeout(initTests, 399);
			})
			.done(initTests)
		;
	}

	var timedMediaInfo = function(){
		var elem = this;
		setTimeout(function(){
			getMediaInfo(elem);
		});
	};

	console.log('Running mediaelement debugger. Only run these tests in development never in production. set webshim.setOptions("debug", false); to remove. Debugger only tests media on same domain and does not test file encoding issues.');

	if(webshim.cfg.extendNative){
		console.log('mediaelement debugger does not detect all problems with extendNative set to true. Please set webshim.setOptions("extendNative", false);');
	}
	webshim.addReady(function(context, $insertedElement){
		$('video, audio', context)
			.add($insertedElement.filter('video, audio'))
			.each(timedMediaInfo)
		;
	});
})(webshim, webshim.$);