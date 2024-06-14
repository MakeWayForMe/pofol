(function() {
	"use strict";

	window.HttpUtil = {

		xhr: null,
		msg: null,

		requestData: function(url, param, option,noContext) {
			var _self = this;

			if (_self.defined(param) == false) {
				param = {};
			}
			if (_self.defined(option) == false) {
				option = {};
			}
			if (_self.defined(noContext) == false) {
				noContext = true
			}
			if(option.parameterType == "json"){
				$.each(param, function(key, val){
					if(val == null){
						delete param[key];
					}
				});
			}
			if (_self.defined(option.showloading) == false) {
				option.showloading = true;
			}

			if (_self.defined(option.method) == false) {
				option.method = "POST";
			}
			if (_self.defined(option.contentType) == false) {
				option.contentType = "application/x-www-form-urlencoded; charset=UTF-8";
			}
			if (_self.defined(option.msg) == false) {
				this.msg = "  data loading... wait  ";
			}else{
				this.msg = "  "+option.msg+"  ";
			}

			if (_self.startsWith(url, "http://")) {
				url = CONTEXT_PATH + url;
				if(url.substr(0,2) == '//'){
					url = url.replace('//','/');
				}
			}

			if (option.showloading == true) {
				this.showLoading(true);
			}

			if (option.contentType == "json") {
				option.contentType = "application/json; charset=UTF-8";
				param = JSON.stringify(param);
			}

			var deferred = $.Deferred();

			this.xhr = $.ajax({
				url : url,
				type: option.method,
				data : param,
				dataType : option.dataType,
				contentType : option.contentType,
			}).done(function(result) {
				if (option.showloading == true) {
					this.showLoading(false);
				}
				if (typeof result === "string") {
					try {
						result = JSON.parse(result);
					} catch (e) {
						// TODO: handle exception
						console.log("error");
					}
				}
				deferred.resolve(result);
			}.bind(this)).fail(function(result) {
				if (option.showloading == true) {
					this.showLoading(false);
				}
				console.error("[Http.requestData] err.", url, param, result);
				deferred.reject(result);
			}.bind(this));

			return deferred.promise();

		},


		requestDataLoading: function(url, param, option,noContext) {
			var _self = this;

			if (_self.defined(param) == false) {
				param = {};
			}
			if (_self.defined(option) == false) {
				option = {};
			}
			if (_self.defined(noContext) == false) {
				noContext = true
			}
			if(option.parameterType == "json"){
				$.each(param, function(key, val){
					if(val == null){
						delete param[key];
					}
				});
			}
			if (_self.defined(option.showloading) == false) {
				option.showloading = true;
			}

			if (_self.defined(option.method) == false) {
				option.method = "POST";
			}
			if (_self.defined(option.contentType) == false) {
				option.contentType = "application/x-www-form-urlencoded; charset=UTF-8";
			}
			if (_self.defined(option.msg) == false) {
				this.msg = "  data loading... wait  ";
			}else{
				this.msg = "  "+option.msg+"  ";
			}

			if (_self.startsWith(url, "http://")) {
				url = CONTEXT_PATH + url;
				if(url.substr(0,2) == '//'){
					url = url.replace('//','/');
				}
			}

			this.showLoading(true);

			if (option.contentType == "json") {
				option.contentType = "application/json; charset=UTF-8";
				param = JSON.stringify(param);
			}

			var deferred = $.Deferred();

			this.xhr = $.ajax({
				url : url,
				type: option.method,
				data : param,
				dataType : option.dataType,
				contentType : option.contentType,
			}).done(function(result) {
				if (typeof result === "string") {
					try {
						result = JSON.parse(result);
					} catch (e) {
						// TODO: handle exception
						console.log("error");
					}
				}
				deferred.resolve(result);
			}.bind(this)).fail(function(result) {

				console.error("[Http.requestData] err.", url, param, result);
				deferred.reject(result);
			}.bind(this));

			return deferred.promise();

		},

		showLoading: function(show) {
			var _self = this;

			var loader = $(".loading");

			if (loader.length == 0) {
				var html = "";
				html += '<div class="loading">';
				html += '	<div class="cir">';
				html += '		<span></span><span></span><span></span>';
				html += '	</div>';
				html += '</div>';
				loader = $(html).appendTo(document.body);
			}

			if (show) {
				var height = loader.height();
				var width = loader.width();
				var popupY= (window.screen.height / 2) - (height / 2);
				popupY = popupY-240;
				var popupX = (document.body.offsetWidth / 2) - (width / 2);
				loader.css("top",popupY+"px").css("left",popupX+"px");
				loader.show();
			} else {
				loader.hide();
			}
		},

		initMsg : function(){
			this.msg = "  data loading... wait  ";
		},

		defined : function(value){
			return value !== undefined && value !== null;
		},

		startsWith : function(str, suffix) {
			return str.indexOf(suffix) == 0;
		}
	}

	// policeMain.common.utils = $.extend(policeMain.common.utils || {}, {
	// 	Http: util
	// })

})();
