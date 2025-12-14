var _glMain;
window.onload = function () {
  "use strict";
  (_glMain = new GL_Main()).init(), (window.unload = function () {});
};
var GL_Main = (function () {
    "use strict";
    function t() {
      (this.isSoundReady = !1),
        (this.isWorldReady = !1),
        (this._resizeList = []),
        (this._resizeTimer = null),
        (this._world = null),
        (this._enterFrameList = []);
    }
    return (
      (t.prototype.init = function () {
        this.setUA();
      }),
      (t.prototype.setUAComp = function () {
        $(window).on("resize", function () {
          _glMain.onResize();
        }),
          (this._conf = new GL_Config()),
          (this._pageMng = new GL_PageMng()),
          (this._loading = new GL_Loading()),
          (this._transitionCover = new GL_TransitionCover()),
          (this._menu = new GL_Menu()),
          (this._scrollMng = new GL_ScrollMng()),
          (this._humbMenu = new GL_HumbMenu()),
          (this.isTransition = !1),
          (this._transitionOp = null),
          this.animationStart(),
          (this._parts = new GL_PartsMng()),
          this._parts.firstLoad();
      }),
      (t.prototype.partsLoadComp = function () {
        (this._world = new GL_World()), this._world.init();
      }),
      (t.prototype.setupWorld = function () {
        this._pageMng.initPage(), this._menu.init();
      }),
      (t.prototype.GLStart = function () {
        this._world.GLStart(),
          this._scrollMng.GLStart(),
          this._pageMng.GLStart();
      }),
      (t.prototype.pageMngSetComp = function () {
        this._pageMng.contentsStart(),
          this._scrollMng.contentsStart(),
          this._humbMenu.contentsStart(),
          this._transitionCover.hide(),
          this._loading.hide(),
          this._world._display.showPage();
        var t = this;
        document
          .getElementById("head-logo")
          .addEventListener("click", function () {
            t._pageMng.isTop || t.changeURL("/");
          });
      }),
      (t.prototype.mDown = function (t) {
        this._world._display.mDown(t), this._pageMng._top.mDown(t);
      }),
      (t.prototype.changeURL = function (t) {
        this._pageMng.changeURL(t, !0), this._humbMenu.closeMenu();
      }),
      (t.prototype.transitionStart = function (t) {
        for (
          var e = null, i = 0;
          i < this._pageMng._worksInfo._dataList.length;
          i++
        )
          if (t === this._pageMng._worksInfo._dataList[i]._op.path) {
            e = this._pageMng._worksInfo._dataList[i];
            break;
          }
        (this.isTransition = !0),
          (this._transitionOp = e),
          this._scrollMng.transitionStart(),
          this._world.transitionStart(),
          this._pageMng.isTop ||
            (this._pageMng._top.transitionStart(),
            this._transitionCover.transitionStart(e)),
          this._pageMng._detail.isShow &&
            this._pageMng._detail.transitionStart();
      }),
      (t.prototype.transitionEnd = function () {
        this._pageMng.loadNewPage();
      }),
      (t.prototype.addEnterFrame = function (t, e) {
        e = { _target: t, _function: e };
        this._enterFrameList.push(e);
      }),
      (t.prototype.removeEnterFrame = function (t) {
        this.isFrameLock = !0;
        for (var e = this._enterFrameList.length, i = -1, s = 0; s < e; s++)
          if (this._enterFrameList[s]._target === t) {
            i = s;
            break;
          }
        -1 !== i && this._enterFrameList.splice(i, 1), (this.isFrameLock = !1);
      }),
      (t.prototype.animationStart = function () {
        void 0 !== window.requestAnimationFrame
          ? _glMain.animationType1()
          : _glMain.animationType2();
      }),
      (t.prototype.animationType1 = function () {
        this.animationLoop(),
          (this._anim = requestAnimationFrame(function () {
            _glMain.animationType1();
          }));
      }),
      (t.prototype.animationType2 = function () {
        this.animationLoop(),
          (this._anim = setTimeout(function () {
            _glMain.animationType2b();
          }, 20));
      }),
      (t.prototype.animationType2b = function () {
        _glMain.animationType2();
      }),
      (t.prototype.animationLoop = function () {
        if (!this.isFrameLock)
          for (var t = this._enterFrameList.length, e = 0; e < t; e++)
            void 0 !== this._enterFrameList[e] &&
              this._enterFrameList[e]._target[
                this._enterFrameList[e]._function
              ]();
      }),
      (t.prototype.setUA = function () {
        this._device = "PC";
        Useragnt;
        Useragnt.pc
          ? (this._device = "PC")
          : Useragnt.tablet
          ? (this._device = "TB")
          : Useragnt.mobile && (this._device = "SP");
        var t = document
          .createElement("canvas")
          .getContext("experimental-webgl");
        (this._webGL = !!window.WebGLRenderingContext && !!t),
          (this._ua = {}),
          Useragnt.ios
            ? ((this._ua.OS = "iOS"),
              (this._ua.Ver = Useragnt.ios.version),
              this._ua.Ver.major < 10 && (this._webGL = !1))
            : Useragnt.android
            ? ((this._ua.OS = "Android"),
              (this._ua.Ver = Useragnt.android.version),
              this._ua.Ver.major < 6 && (this._webGL = !1))
            : !Useragnt.windows && Useragnt.mac
            ? (this._ua.OS = "Mac")
            : (this._ua.OS = "Windows"),
          this._webGL || alert("no gl"),
          _glMain.setUAComp();
      }),
      (t.prototype.addResize = function (t) {
        this._resizeList.push(t);
      }),
      (t.prototype.removeResize = function (t) {
        for (var e = [], i = 0; i < this._resizeList.length; i++)
          this._resizeList[i] !== t && e.push(this._resizeList[i]);
        for (this._resizeList = [], i = 0; i < e.length; i++)
          this._resizeList.push(e[i]);
      }),
      (t.prototype.onResize = function () {
        this.onResizeFunc(),
          this._resizeTimer &&
            (clearTimeout(this._resizeTimer), (this._resizeTimer = null));
        var t = this;
        this._resizeTimer = setTimeout(function () {
          t.onResizeFunc();
        }, 1e3);
      }),
      (t.prototype.onResizeFunc = function () {
        for (var t = 0; t < this._resizeList.length; t++)
          this._resizeList[t].onResize();
      }),
      t
    );
  })(),
  GL_Menu = (function () {
    "use strict";
    function t() {
      this._wrapper = document.getElementById("menu");
    }
    return (
      (t.prototype.init = function () {
        for (
          var t = this._wrapper.getElementsByClassName("menu-in"), e = 0;
          e < t.length;
          e++
        )
          t[e].addEventListener("click", function (t) {
            t.preventDefault(),
              _glMain._pageMng.changeURL($(this).attr("href"));
          });
      }),
      t
    );
  })(),
  GL_MfObj = (function () {
    "use strict";
    function t(t) {
      (this._parent = t),
        (this._count = 0),
        (this._g = new THREE.PlaneGeometry(64, 64, 1, 1)),
        (this._mx = -1e3),
        (this._my = -1e3),
        (this._max = 50),
        (this._ringNum = 0),
        (this._list = []);
      for (var e = 0; e < this._max; e++) {
        var i = new GL_RingObj(this, this._g);
        this._list.push(i);
      }
    }
    return (
      (t.prototype.setPos = function (t, e) {
        var i = Math.abs(this._mx - t),
          s = Math.abs(this._my - e);
        (this._mx = t),
          (this._my = e),
          this._count++,
          (i < 4 && s < 4) ||
            ((s = 1 / _glMain._world._display._mesh.scale.x),
            (t = (t - 0.5 * window.innerWidth) * s * 0.5),
            (s = 0.5 * -e * s),
            4 <= this._count &&
              ((this._count = 0),
              this._ringNum < this._max &&
                (this._list[this._ringNum].setPos(t, s),
                this._ringNum++,
                this._ringNum >= this._max && (this._ringNum = 0))));
      }),
      t
    );
  })(),
  GL_RingObj = (function () {
    "use strict";
    function t(t, e) {
      (this._parent = t),
        (this._m = new THREE.MeshBasicMaterial({
          transparent: !0,
          map: _glMain._parts.getTex("assets/image/texture/burash01.png"),
        })),
        (this._mesh = new THREE.Mesh(e, this._m)),
        (this._mesh.rotation.z = (360 * Math.random() * Math.PI) / 180),
        (this._mesh.scale.x = this._mesh.scale.y = 0.25),
        (this._mesh.visible = !1),
        _glMain._world._mouseEffect._scene.add(this._mesh);
    }
    return (
      (t.prototype.setPos = function (t, e) {
        (this._mesh.scale.x = this._mesh.scale.y = 0.2),
          (this._mesh.position.x = t),
          (this._mesh.position.y = e),
          (this._mesh.visible = !0),
          _glMain._scrollMng.isDown
            ? (this._m.opacity = 0.55)
            : (this._m.opacity = 0.9),
          _glMain.removeEnterFrame(this),
          _glMain.addEnterFrame(this, "enterFrame");
      }),
      (t.prototype.enterFrame = function () {
        (this._mesh.rotation.z += 0.02),
          (this._m.opacity = 0.98 * this._m.opacity + 0),
          (this._mesh.scale.x = 0.982 * this._mesh.scale.x + 6 * 0.018),
          (this._mesh.scale.y = this._mesh.scale.x),
          this._m.opacity <= 0.002 &&
            (_glMain.removeEnterFrame(this), (this._mesh.visible = !1));
      }),
      t
    );
  })(),
  GL_MouseEffect = (function () {
    "use strict";
    function t() {
      (this._width = 0),
        (this._height = 0),
        (this._render = null),
        (this._scene = null),
        (this._cam = null),
        (this._renderFlg = 0),
        (this._mx = 0.5 * window.innerWidth),
        (this._my = 0.5 * window.innerHeight);
    }
    return (
      (t.prototype.init = function () {
        (this._width = 0.5 * _glMain._world._renderW),
          (this._height = 0.5 * _glMain._world._renderH),
          this.setViewPort(),
          (this._cam = new THREE.OrthographicCamera(
            this._viewPort.left,
            this._viewPort.right,
            this._viewPort.top,
            this._viewPort.bottom,
            this._viewPort.near,
            this._viewPort.far
          )),
          this._cam.position.set(0, -0.5 * this._height, 100),
          (this._scene = new THREE.Scene()),
          (this._render = new THREE.WebGLRenderTarget(
            this._width,
            this._height,
            {
              magFilter: THREE.LinearFilter,
              minFilter: THREE.LinearFilter,
              wrapS: THREE.ClampToEdgeWrapping,
              wrapT: THREE.ClampToEdgeWrapping,
            }
          )),
          (this._mObj = new GL_MfObj(this));
      }),
      (t.prototype.GLStart = function () {
        "PC" == _glMain._device &&
          (_glMain.removeEnterFrame(this),
          _glMain.addEnterFrame(this, "enterFrame"));
      }),
      (t.prototype.enterFrame = function () {
        _glMain._world._render.render(this._scene, this._cam, this._render),
          this._mObj.setPos(_glMain._scrollMng._mx, _glMain._scrollMng._my);
      }),
      (t.prototype.setViewPort = function () {
        this._viewPort = {};
        var t = this._width,
          e = this._height,
          t = t / e;
        this._viewPort = {
          viewSize: e,
          aspectRatio: t,
          left: (-t * e) / 2,
          right: (t * e) / 2,
          top: e / 2,
          bottom: -e / 2,
          near: 0,
          far: 1e4,
        };
      }),
      t
    );
  })(),
  GL_NoiseSet = (function () {
    "use strict";
    function t() {}
    return (
      (t.prototype.init = function () {
        (this.isRender = !0),
          (this._width = 256),
          (this._height = 256),
          (this._nSpeed = 0),
          (this._speedBC = new GL_Beacon()),
          (this._sepR = 7),
          (this._sepG = 5),
          (this._sepRtrg = 0),
          (this._sepBC = new GL_Beacon()),
          this.setViewPort(),
          (this._cam = new THREE.OrthographicCamera(
            this._viewPort.left,
            this._viewPort.right,
            this._viewPort.top,
            this._viewPort.bottom,
            this._viewPort.near,
            this._viewPort.far
          )),
          this._cam.position.set(0, 0, 100),
          (this._scene = new THREE.Scene()),
          (this._render = new THREE.WebGLRenderTarget(
            this._width,
            this._height,
            {
              magFilter: THREE.LinearFilter,
              minFilter: THREE.LinearFilter,
              wrapS: THREE.ClampToEdgeWrapping,
              wrapT: THREE.ClampToEdgeWrapping,
            }
          )),
          (this._count = 0);
        var t = new THREE.PlaneGeometry(this._width, this._height);
        this._shader = {
          vertexShader: _glMain._parts.getShader("shader/noise_vtx.js"),
          fragmentShader: _glMain._parts.getShader("shader/noise_frg.js"),
          uniforms: {
            texture: { value: null },
            cr: { value: this._sepR },
            cg: { value: this._sepG },
            cb: { value: 0 },
          },
        };
        var e = new THREE.ShaderMaterial(this._shader);
        (this._mesh = new THREE.Mesh(t, e)),
          this._scene.add(this._mesh),
          this.contentsStart();
      }),
      (t.prototype.contentsStart = function () {
        _glMain.addEnterFrame(this, "enterFrame");
      }),
      (t.prototype.enterFrame = function () {
        this.isRender
          ? (_glMain._world._render.render(
              this._scene,
              this._cam,
              this._render
            ),
            (this._count += 0.01),
            (this._shader.uniforms.cb.value = this._count),
            (this.isRender = !1))
          : (this.isRender = !0);
      }),
      (t.prototype.setViewPort = function () {
        this._viewPort = {};
        var t = this._width,
          e = this._height,
          t = t / e;
        this._viewPort = {
          viewSize: e,
          aspectRatio: t,
          left: (-t * e) / 2,
          right: (t * e) / 2,
          top: e / 2,
          bottom: -e / 2,
          near: 0,
          far: 1e4,
        };
      }),
      t
    );
  })(),
  GL_PageDetail = (function () {
    "use strict";
    function t(t) {
      (this._parent = t),
        (this._pageH = 3e3),
        (this.isShow = !1),
        (this._pointBC = new GL_Beacon()),
        (this._pointY = 0),
        (this._pointYR = 0);
    }
    return (
      (t.prototype.init = function () {
        "SP" != _glMain._device
          ? (this._stage = document.getElementById("info-in"))
          : ((this._stage = document.getElementById("sp-info")),
            (this._stage.style.display = "block")),
          (this._group = new THREE.Object3D()),
          (this._group.position.z = 100),
          (this._mv = new GL_DetailMV(this)),
          this._mv.init(),
          (this._title = new GL_DetailTitle(this)),
          this._title.init(),
          (this._description = new GL_DetailDescription(this)),
          this._description.init(),
          (this._footer = new GL_DetailFooter(this)),
          this._footer.init(),
          (this._box = new GL_DetailBgBox(this)),
          this._box.init(),
          (this._casetList = []),
          _glMain.addResize(this),
          (this._player = new GL_MoviePlayer(this)),
          this._player.init();
      }),
      (t.prototype.setPageData = function (t) {
        this._stage.innerHTML = "";
        var e = {};
        if (
          ((t = (
            null == t
              ? document.getElementsByClassName("dt-wrapper")
              : t.filter(".dt-wrapper")
          )[0]).getElementsByClassName("dt-w-title-ja") &&
            (e.title_ja =
              t.getElementsByClassName("dt-w-title-ja")[0].innerHTML),
          t.getElementsByClassName("dt-w-title-en") &&
            (e.title_en =
              t.getElementsByClassName("dt-w-title-en")[0].innerHTML),
          t.getElementsByClassName("dt-w-path") &&
            (e.path = t.getElementsByClassName("dt-w-path")[0].innerHTML),
          t.getElementsByClassName("dt-w-url") &&
            (e.link = t.getElementsByClassName("dt-w-url")[0].innerHTML),
          t.getElementsByClassName("dt-mv") &&
            (e.mv = t.getElementsByClassName("dt-mv")[0].innerHTML),
          t.getElementsByClassName("dt-description") &&
            (e.description =
              t.getElementsByClassName("dt-description")[0].innerHTML),
          t.getElementsByClassName("dt-credit") &&
            (e.credit = t.getElementsByClassName("dt-credit")[0].innerHTML),
          t.getElementsByClassName("dt-w-imglist"))
        ) {
          for (
            var i = [], s = t.getElementsByClassName("dt-w-img"), n = 0;
            n < s.length;
            n++
          ) {
            var a = {},
              h = s[n].attributes;
            (a.img = s[n].textContent), (a.movie = "");
            for (var o = 0; o < h.length; o++)
              "data-movie" == h[o].name && (a.movie = h[o].value);
            i.push(a);
          }
          e.imgList = i;
        }
        (this._info = e),
          this._title.setInfo(this._info),
          this._description.setInfo(this._info);
        for (n = 0; n < this._info.imgList.length; n++) {
          var r = new GL_DetailImg(this, n, this._info.imgList[n]);
          this._casetList.push(r);
        }
        this._mv.loadTexture(this._info.mv),
          this._footer.setData(this._info.path);
      }),
      (t.prototype.loadTextureComp = function () {
        (this._imgLoadCount = 0),
          (this._imgLoadSetCount = 0),
          this.imgLoadStart();
      }),
      (t.prototype.imgLoadStart = function () {
        this._casetList[this._imgLoadCount].loadImg(),
          this._imgLoadCount + 1 < this._casetList.length &&
            this._casetList[this._imgLoadCount + 1].loadImg(),
          this._imgLoadCount + 2 < this._casetList.length &&
            this._casetList[this._imgLoadCount + 2].loadImg(),
          this._imgLoadCount + 3 < this._casetList.length &&
            this._casetList[this._imgLoadCount + 3].loadImg();
      }),
      (t.prototype.imgLoadEnd = function () {
        this._imgLoadCount++,
          4 <= this._imgLoadCount &&
            (this._parent.setPageDataComp(), this.imgLoadNext());
      }),
      (t.prototype.imgLoadNext = function () {
        this.isShow &&
          (this.onResize(),
          this._imgLoadCount < this._casetList.length
            ? this._casetList[this._imgLoadCount].loadImgNext()
            : this._footer.show(),
          this._imgLoadCount++);
      }),
      (t.prototype.contentsStart = function () {
        (this.isShow = !0),
          _glMain._world._dummy._scene.add(this._group),
          this._mv.contentsStart(),
          this._title.contentsStart(),
          this._box.contentsStart(),
          this._footer.contentsStart(),
          this.onResize(),
          (this._pointY = 0),
          (this._pointYR = 0),
          this._pointBC.clear(),
          this._pointBC.set(this, "pointFrame"),
          _glMain.removeEnterFrame(this),
          _glMain.addEnterFrame(this, "enterFrame");
      }),
      (t.prototype.transitionStart = function () {
        this._mv.transitionStart(),
          this._title.transitionStart(),
          this._description.transitionStart(),
          this._box.transitionStart(),
          this._footer.transitionStart();
        for (var t = 0; t < this._casetList.length; t++)
          this._casetList[t].transitionStart();
      }),
      (t.prototype.enterFrame = function () {
        "SP" != _glMain._device &&
          TweenMax.set(this._stage, { y: Math.round(this._pointY) }),
          (this._group.position.y = -this._pointYR);
      }),
      (t.prototype.pointFrame = function () {
        var t = _glMain._scrollMng._scrollY,
          e = _glMain._scrollMng._scrollYR;
        "PC" == _glMain._device
          ? ((this._pointY =
              this._pointY * _glMain._conf.s085a + -t * _glMain._conf.s085b),
            (this._pointYR =
              this._pointYR * _glMain._conf.s085a + -e * _glMain._conf.s085b))
          : ((this._pointY = -t), (this._pointYR = -e));
      }),
      (t.prototype.contentsStop = function () {
        this.isShow = !1;
        for (var t = 0; t < this._casetList.length; t++)
          this._casetList[t].contentsStop();
        (this._casetList = []),
          TweenMax.set(this._stage, { y: 0 }),
          _glMain.removeEnterFrame(this),
          this._mv.contentsStop(),
          this._title.contentsStop(),
          this._description.contentsStop(),
          this._box.contentsStop(),
          this._footer.contentsStop(),
          _glMain._world._dummy._scene.remove(this._group),
          this._pointBC.clear(),
          (this._stage.innerHTML = ""),
          _glMain._scrollMng.setPageH(0);
      }),
      (t.prototype.getImageY = function (t) {
        return 0 == t ? 0 : this._casetList[t - 1]._bottom;
      }),
      (t.prototype.onResize = function () {
        this._title && this._title.onResize(),
          this._description && this._description.onResize();
        for (var t = 0; t < this._casetList.length; t++)
          this._casetList[t].onResize(t);
        this._footer.onResize(),
          (this._pageH = this._footer._bottom * _glMain._world._screenScale),
          this.isShow && _glMain._scrollMng.setPageH(this._pageH),
          this._box.onResize();
      }),
      t
    );
  })(),
  GL_MoviePlayer = (function () {
    "use strict";
    function t(t) {
      this._parent = t;
    }
    return (
      (t.prototype.init = function () {
        (this._wrapper = document.createElement("div")),
          this._wrapper.classList.add("movie-player"),
          document.body.appendChild(this._wrapper),
          (this._bg = document.createElement("div")),
          this._bg.classList.add("movie-player-bg"),
          this._wrapper.appendChild(this._bg),
          (this._frame = document.createElement("div")),
          this._frame.classList.add("movie-frame"),
          this._wrapper.appendChild(this._frame),
          (this._modalBack = document.createElement("div")),
          (this._modalBack.style.display = "none"),
          this._modalBack.classList.add("movie-close"),
          this._wrapper.appendChild(this._modalBack);
        var t = this;
        this._modalBack.addEventListener("click", function () {
          t.closeMovie();
        }),
          _glMain.addResize(this),
          this.onResize();
      }),
      (t.prototype.openMovie = function (t) {
        TweenMax.set(this._bg, { x: "-100%" }), (this._frame.style.opacity = 0);
        var e = "";
        (e += "<iframe width='100%' height='100%'"),
          (e += "frameborder='0' allowfullscreen "),
          (e += "src='" + t + "?autoplay=1&muted=1'>"),
          (e += "</iframe>"),
          (this._frame.innerHTML = e),
          (this._wrapper.style.display = "block");
        var i = this;
        TweenMax.to(this._bg, 0.7, {
          x: "0%",
          ease: Power3.easeInOut,
          onComplete: function () {
            i._modalBack.style.display = "block";
          },
        }),
          TweenMax.to(this._frame, 0.6, {
            delay: 0.8,
            opacity: 1,
            ease: Power3.easeOut,
          });
      }),
      (t.prototype.closeMovie = function () {
        var t = this;
        (this._modalBack.style.display = "none"),
          TweenMax.killTweensOf(this._frame),
          (this._frame.style.opacity = 0),
          (this._frame.innerHTML = ""),
          TweenMax.killTweensOf(this._bg),
          TweenMax.to(this._bg, 0.4, {
            x: "-100%",
            ease: Power3.easeIn,
            onComplete: function () {
              t._wrapper.style.display = "none";
            },
          });
      }),
      (t.prototype.onResize = function () {
        var t, e;
        (window.innerWidth / 16) * 9 > window.innerHeight
          ? ((t = 0.8 * window.innerHeight),
            (this._frame.style.height = Math.round(t) + "px"),
            (e = (t / 9) * 16),
            (this._frame.style.width = Math.round(e) + "px"))
          : ((t = 0.9 * window.innerWidth),
            window.innerWidth <= 700 && (t = window.innerWidth),
            (this._frame.style.width = Math.round(t) + "px"),
            (e = (t / 16) * 9),
            (this._frame.style.height = Math.round(e) + "px"));
      }),
      t
    );
  })(),
  GL_PageMng = (function () {
    "use strict";
    function t() {
      (this.isLock = !1),
        (this._trgURL = location.pathname),
        (this._pageData = null),
        (this._pathName = ""),
        (this._hash = ""),
        (this._search = ""),
        (this._top = new GL_PageTop(this)),
        (this._detail = new GL_PageDetail(this)),
        (this._currentPage = null),
        (this._worksInfo = new GL_WorksInfo(this)),
        (this.isTop = !1),
        (this._homeBtn = document.getElementById("head-logo")),
        (this._waitObj = { count: 0 });
    }
    return (
      (t.prototype.initPage = function () {
        var e = this;
        (window.onpopstate = function (t) {
          e.popStateAction(t);
        }),
          this.checkURL(),
          this._directory.length <= 0
            ? this.loadTopComp(null)
            : $.ajax({
                url: "/?n=" + Math.ceil(1e4 * Math.random()),
                type: "get",
                dataType: "html",
              })
                .done(function (t) {
                  e.loadTopComp(t);
                })
                .fail(function (t) {});
      }),
      (t.prototype.loadTopComp = function (t) {
        (t =
          null != t
            ? $($.parseHTML(t)).filter(".dt-wrapper")[0]
            : (document.body,
              document.getElementsByClassName("dt-wrapper")[0])),
          (t = t.getElementsByClassName("dt-work"));
        this._worksInfo.setData(t);
      }),
      (t.prototype.firstImgLoadComp = function () {
        this._top.init(),
          this._detail.init(),
          _glMain.GLStart(),
          this.setPageData();
      }),
      (t.prototype.GLStart = function () {
        this._top.GLStart();
      }),
      (t.prototype.popStateAction = function (t) {
        this.changeURL(location.pathname, !1);
      }),
      (t.prototype.changeURL = function (t, e) {
        window.history &&
          window.history.pushState &&
          (this.isLock ||
            ((this.isLock = !0),
            (this._trgURL = t),
            (this._pageData = null),
            gtag("config", "G-B8VJMW4CGR", { page_path: "this._trgURL" }),
            e && history.pushState(null, null, t),
            this.checkURL(),
            _glMain.transitionStart(this._pathName)));
      }),
      (t.prototype.loadNewPage = function () {
        null != this._currentPage && this._currentPage.contentsStop(),
          (this._pageData = null);
        var e = this;
        $.ajax({
          url: this._pathName + "?n=" + Math.ceil(1e4 * Math.random()),
          type: "get",
          dataType: "html",
        })
          .done(function (t) {
            e.loadNewPageComp(t);
          })
          .fail(function (t) {});
      }),
      (t.prototype.loadNewPageComp = function (t) {
        (this._pageData = $($.parseHTML(t))), this.setNewPageReady();
      }),
      (t.prototype.setNewPageReady = function () {
        var t = this._pageData.filter("title")[0].innerHTML;
        document.getElementsByTagName("title")[0].innerHTML = t;
        for (
          var e = this._pageData.filter("meta"),
            i = "",
            s = "",
            n = "",
            a = "",
            h = "",
            o = "",
            r = "",
            _ = "",
            l = "",
            p = 0;
          p < e.length;
          p++
        ) {
          var c = e[p];
          "description" === c.getAttribute("name")
            ? (i = c.getAttribute("content"))
            : "keywords" === c.getAttribute("name")
            ? (s = c.getAttribute("content"))
            : "og:title" === c.getAttribute("property")
            ? (n = c.getAttribute("content"))
            : "og:description" === c.getAttribute("property")
            ? (a = c.getAttribute("content"))
            : "og:url" === c.getAttribute("property")
            ? (h = c.getAttribute("content"))
            : "og:image" === c.getAttribute("property")
            ? (o = c.getAttribute("content"))
            : "twitter:title" === c.getAttribute("property") ||
              "twitter:title" === c.getAttribute("property")
            ? (r = c.getAttribute("content"))
            : "twitter:description" === c.getAttribute("property")
            ? (_ = c.getAttribute("content"))
            : "twitter:image" === c.getAttribute("property") &&
              (l = c.getAttribute("content"));
        }
        for (
          var d = document.getElementsByTagName("meta"), p = 0;
          p < d.length;
          p++
        ) {
          var m = d[p];
          "description" === m.getAttribute("name")
            ? m.setAttribute("content", i)
            : "keywords" === m.getAttribute("name")
            ? m.setAttribute("content", s)
            : "og:title" === m.getAttribute("property")
            ? m.setAttribute("content", n)
            : "og:description" === m.getAttribute("property")
            ? m.setAttribute("content", a)
            : "og:url" === m.getAttribute("property")
            ? m.setAttribute("content", h)
            : "og:image" === m.getAttribute("property")
            ? m.setAttribute("content", o)
            : "twitter:title" === m.getAttribute("property") ||
              "twitter:title" === m.getAttribute("property")
            ? m.setAttribute("content", r)
            : "twitter:description" === m.getAttribute("property")
            ? m.setAttribute("content", _)
            : "twitter:image" === m.getAttribute("property") &&
              m.setAttribute("content", l);
        }
        this.setPageData();
      }),
      (t.prototype.setPageData = function () {
        this._directory.length <= 0
          ? ((this._currentPage = this._top), this._top.setPageData())
          : "works" === this._directory[0] &&
            (1 === this._directory.length ||
              ((this._currentPage = this._detail),
              this._detail.setPageData(this._pageData)));
      }),
      (t.prototype.setPageDataComp = function () {
        TweenMax.killTweensOf(this._waitObj),
          TweenMax.set(this._waitObj, { count: 0 }),
          _glMain._device,
          _glMain.pageMngSetComp();
      }),
      (t.prototype.contentsStart = function () {
        this._currentPage.contentsStart();
        var t = this;
        setTimeout(function () {
          t.unlock();
        }, 2e3);
      }),
      (t.prototype.unlock = function () {
        (this.isLock = !1),
          this.checkURL(),
          this._pathName !== this._trgURL && this.changeURL(this._pathName);
      }),
      (t.prototype.checkURL = function () {
        (this._pathName = location.pathname),
          (this._hash = location.hash),
          (this._search = location.search),
          this.checkDirectory(this._pathName);
      }),
      (t.prototype.checkDirectory = function (t) {
        var e;
        (this._directory = []),
          "/" === t
            ? ((this.isTop = !0),
              (this._directory = []),
              (this._homeBtn.style.cursor = "default"))
            : ((this.isTop = !1), (this._homeBtn.style.cursor = "pointer")),
          this.isTop ||
            ("/" === (e = t).charAt(0) && (e = t.slice(1)),
            "/" === (t = e).charAt(e.length - 1) && (t = e.slice(0, -1)),
            (this._directory = t.split("/")));
      }),
      (t.prototype.setHref = function () {
        for (
          var t = document.getElementsByClassName("inner-a"), e = this, i = 0;
          i < t.length;
          i++
        )
          t[i].addEventListener("click", function (t) {
            t.preventDefault(), e.changeURL($(this).attr("href"));
          });
      }),
      t
    );
  })(),
  GL_PageTop = (function () {
    "use strict";
    function t(t) {
      (this._pageH = 0),
        (this._parent = t),
        (this.isShow = !1),
        (this._pointBC = new GL_Beacon()),
        (this._pointY = 0);
    }
    return (
      (t.prototype.init = function () {
        var t = this._parent._worksInfo._dataList;
        (this._thumList = []), (this._rndList = []);
        var e = t.length;
        18 <= e && (e = 18);
        for (var i = 0; i < e; i++) {
          var s = new GL_TopPlane(this, t[i]);
          s.init(), this._thumList.push(s), this._rndList.push(s);
        }
        (this._paper = new GL_PaperSet()),
          this._paper.init(),
          (this._topTitle = new GL_TopTitle()),
          this._topTitle.init(),
          (this._topState = new GL_TopStateSet(this)),
          this._topState.init(),
          (this._topFooter = new GL_TopFooter(this)),
          this._topFooter.init(),
          (this._midashi = document.createElement("div")),
          this._midashi.classList.add("page-midashi"),
          (this._midashi.style.display = "none"),
          (this._midashiIn = document.createElement("div")),
          this._midashiIn.classList.add("en"),
          this._midashiIn.classList.add("page-midashi-in"),
          (this._midashiIn.innerHTML = "PROJECTS"),
          this._midashi.appendChild(this._midashiIn),
          (this._midashiIn.style.opacity = 0),
          _glMain.addResize(this);
      }),
      (t.prototype.GLStart = function () {
        this._topState.GLStart();
        for (var t = 0; t < this._thumList.length; t++)
          this._thumList[t].GLStart();
        this.onResize();
      }),
      (t.prototype.setPageData = function (t) {
        (this._stage = document.getElementById("info-in")),
          this._stage.appendChild(this._midashi),
          this._parent.setPageDataComp();
      }),
      (t.prototype.contentsStart = function () {
        (this.isShow = !0),
          this._topTitle.contentsStart(),
          this._topTitle.mDown(!1);
        for (var t = 0; t < this._thumList.length; t++)
          this._thumList[t].contentsStart();
        this.onResize(),
          _glMain._pageMng.isTop
            ? (this._paper.visible(!0),
              _glMain.removeEnterFrame(this),
              _glMain.addEnterFrame(this, "mainUpFrame"),
              this._pointBC.clear(),
              this._pointBC.set(this, "pointFrame"))
            : this._paper.visible(!1),
          _glMain._scrollMng.spScrollBar(!0);
      }),
      (t.prototype.mDown = function (t) {
        for (var e = this, i = 0; i < this._thumList.length; i++)
          this._thumList[i].mDown(t);
        _glMain.removeEnterFrame(this),
          t
            ? (this._paper.visible(!1),
              _glMain.addEnterFrame(this, "mainDownFrame"),
              TweenMax.killTweensOf(this._midashiIn),
              TweenMax.set(this._midashi, { display: "block" }),
              TweenMax.to(this._midashiIn, 0.8, {
                delay: 1,
                opacity: 1,
                ease: Power4.easeOut,
              }),
              this._topState.show(),
              this._topFooter.show(),
              _glMain._scrollMng.spScrollBar(!1))
            : (this._paper.visible(!0),
              _glMain.addEnterFrame(this, "mainUpFrame"),
              TweenMax.killTweensOf(this._midashiIn),
              TweenMax.to(this._midashiIn, 0.3, {
                opacity: 0,
                onComplete: function () {
                  e._midashi.style.display = "none";
                },
              }),
              this._topState.hide(),
              this._topFooter.hide(),
              _glMain._scrollMng.spScrollBar(!0)),
          this._topTitle.mDown(t);
      }),
      (t.prototype.mainUpFrame = function () {
        for (var t = 0; t < this._thumList.length; t++)
          this._thumList[t].mainUpFrame();
      }),
      (t.prototype.mainDownFrame = function () {
        for (var t = 0; t < this._thumList.length; t++)
          this._thumList[t].mainDownFrame();
      }),
      (t.prototype.transitionStart = function () {
        var t = this;
        this._pointBC.clear(),
          _glMain.removeEnterFrame(this),
          this._topState.hide(),
          this._topFooter.hide(),
          this._topTitle.transitionStart(),
          TweenMax.killTweensOf(this._midashiIn),
          TweenMax.to(this._midashiIn, 0.3, {
            opacity: 0,
            onComplete: function () {
              t._midashi.style.display = "none";
            },
          });
        for (var e = 0; e < this._thumList.length; e++)
          this._thumList[e].transitionStart();
        _glMain._scrollMng.spScrollBar(!1);
      }),
      (t.prototype.contentsStop = function () {
        (this.isShow = !1),
          this._paper.visible(!1),
          TweenMax.set(this._stage, { y: 0 }),
          _glMain.removeEnterFrame(this),
          this._pointBC.clear();
        for (var t = 0; t < this._thumList.length; t++)
          this._thumList[t].contentsStop();
        this._topTitle.contentsStop(),
          this._topState.allClear(),
          this._topFooter.contentsStop(),
          (this._stage.innerHTML = ""),
          _glMain._scrollMng.setPageH(0);
      }),
      (t.prototype.pointFrame = function () {
        var t;
        (t =
          !_glMain._scrollMng.isTopFix ||
          _glMain._scrollMng._scrollYR <= _glMain._scrollMng._topLimitH
            ? 0
            : _glMain._scrollMng._scrollYR - _glMain._scrollMng._topLimitH),
          "PC" == _glMain._device
            ? (this._pointY =
                this._pointY * _glMain._conf.s085a + -t * _glMain._conf.s085b)
            : (this._pointY = -t),
          (this._pointY = Math.round(this._pointY)),
          TweenMax.set(this._midashi, { y: this._pointY });
      }),
      (t.prototype.setPageH = function (t) {
        (this._pageH = t),
          this.isShow && _glMain._scrollMng.setPageH(this._pageH);
      }),
      (t.prototype.onResize = function () {
        for (var t = 0; t < this._thumList.length; t++)
          this._thumList[t].onResize();
        this._topState.onResize(), this._topFooter.onResize();
      }),
      t
    );
  })(),
  GL_PaperSet = (function () {
    "use strict";
    function t() {
      (this._width = 1120), (this._height = 560);
    }
    return (
      (t.prototype.init = function () {
        this._g = new THREE.PlaneGeometry(this._width, this._height, 1, 1);
        var t = _glMain._parts.getTex("assets/image/texture/paper.png");
        (this._m = new THREE.MeshBasicMaterial({
          transparent: !0,
          map: t,
          opacity: 0,
        })),
          (this._mesh = new THREE.Mesh(this._g, this._m)),
          (this._mesh.position.z = 10),
          (this._mesh.visible = !1),
          _glMain._world._scene.add(this._mesh),
          _glMain.addResize(this),
          this.onResize();
      }),
      (t.prototype.visible = function (t) {
        _glMain.removeEnterFrame(this),
          t
            ? _glMain._pageMng.isTop &&
              ((this._mesh.visible = !0),
              _glMain.addEnterFrame(this, "showFrame"))
            : _glMain.addEnterFrame(this, "hideFrame");
      }),
      (t.prototype.showFrame = function () {
        (this._m.opacity += 0.002),
          0.1 <= this._m.opacity &&
            ((this._m.opacity = 0.1), _glMain.removeEnterFrame(this));
      }),
      (t.prototype.hideFrame = function () {
        (this._m.opacity -= 0.005),
          this._m.opacity <= 0 &&
            ((this._m.opacity = 0),
            (this._mesh.visible = !1),
            _glMain.removeEnterFrame(this));
      }),
      (t.prototype.onResize = function () {
        var t = window.innerWidth / this._width,
          e = window.innerHeight / this._height;
        e < t
          ? ((this._mesh.scale.x = t),
            (this._mesh.scale.y = t),
            "PC" != _glMain._device &&
              ((this._mesh.scale.x = 1.4 * t), (this._mesh.scale.y = 1.4 * t)))
          : ((this._mesh.scale.x = e),
            (this._mesh.scale.y = e),
            "PC" != _glMain._device &&
              ((this._mesh.scale.x = 1.4 * e), (this._mesh.scale.y = 1.4 * e))),
          (this._mesh.position.y = -0.5 * window.innerHeight);
      }),
      t
    );
  })(),
  GL_PartsMng = (function () {
    "use strict";
    function t() {
      (this._itemCount = 0),
        (this._listCount = 0),
        (this._imgNum = 0),
        (this._imgLoadedNum = 0),
        (this._pipeline = 4),
        (this._imgMap = {}),
        (this._texMap = {}),
        (this._modelMap = {}),
        (this._shaderMap = {}),
        this.init();
    }
    return (
      (t.prototype.init = function () {
        (this._firstItem = []),
          _glMain._webGL &&
            ((this._trgTex = [
              "/manage/wp-content/themes/nishan/assets/image/texture/main_title.png",
              "/manage/wp-content/themes/nishan/assets/image/texture/main_title_sp.png",
              "/manage/wp-content/themes/nishan/assets/image/texture/burash01.png",
              "/manage/wp-content/themes/nishan/assets/image/texture/paper.png",
              "/manage/wp-content/themes/nishan/assets/image/texture/detailMV_g.png",
              "/manage/wp-content/themes/nishan/assets/image/texture/detailMV_g2.png",
              "/manage/wp-content/themes/nishan/assets/image/texture/mv_mask.png",
              "/manage/wp-content/themes/nishan/assets/image/texture/suna.png",
              "/manage/wp-content/themes/nishan/assets/image/texture/footer_mask.png",
              "/manage/wp-content/themes/nishan/assets/image/texture/footer_mask2.png",
              "/manage/wp-content/themes/nishan/assets/image/texture/statement0_n.png",
              "/manage/wp-content/themes/nishan/assets/image/texture/statement0_b.png",
              "/manage/wp-content/themes/nishan/assets/image/texture/statement1_n.png",
              "/manage/wp-content/themes/nishan/assets/image/texture/statement1_b.png",
              "/manage/wp-content/themes/nishan/assets/image/texture/statement2_n.png",
              "/manage/wp-content/themes/nishan/assets/image/texture/statement2_b.png",
            ]),
            (this._firstItem = [
              { _type: "texture", _list: this._trgTex },
              {
                _type: "shader",
                _list: [
                  "/manage/wp-content/themes/nishan/assets/shader/display_vtx.js",
                  "/manage/wp-content/themes/nishan/assets/shader/display_frg.js",
                  "/manage/wp-content/themes/nishan/assets/shader/detailMV_vtx.js",
                  "/manage/wp-content/themes/nishan/assets/shader/detailMV_frg.js",
                  "/manage/wp-content/themes/nishan/assets/shader/detailMV2_frg.js",
                  "/manage/wp-content/themes/nishan/assets/shader/detailImg_vtx.js",
                  "/manage/wp-content/themes/nishan/assets/shader/detailImg_frg.js",
                  "/manage/wp-content/themes/nishan/assets/shader/detailFooter_vtx.js",
                  "/manage/wp-content/themes/nishan/assets/shader/detailFooter_frg.js",
                  "/manage/wp-content/themes/nishan/assets/shader/noise_vtx.js",
                  "/manage/wp-content/themes/nishan/assets/shader/noise_frg.js",
                  "/manage/wp-content/themes/nishan/assets/shader/title_vtx.js",
                  "/manage/wp-content/themes/nishan/assets/shader/title_frg.js",
                  "/manage/wp-content/themes/nishan/assets/shader/state_vtx.js",
                  "/manage/wp-content/themes/nishan/assets/shader/state_frg.js",
                ],
              },
            ]));
      }),
      (t.prototype.addTexPath = function (t) {
        for (var e = 0; e < t.length; e++) this._trgTex.push(t[e]);
      }),
      (t.prototype.firstLoad = function () {
        for (var t = 0; t < this._pipeline; t++) this.pipelineLoad();
      }),
      (t.prototype.pipelineLoad = function () {
        var t,
          i,
          e,
          s,
          n,
          a = this;
        this._itemCount >= this._firstItem.length ||
          ((e = (i = this._firstItem[this._itemCount])._list[this._listCount]),
          (s = this._listCount),
          "texture" === i._type
            ? (t = new THREE.TextureLoader()).load(e, function (t) {
                a.loadTextureEnd(t, i, s);
              })
            : "image" === i._type
            ? (((n = new Image()).onload = function () {
                a.loadImageEnd(this, i, s);
              }),
              (n.src = e))
            : "model" === i._type
            ? (t = new THREE.JSONLoader()).load(e, function (t, e) {
                a.loadModelEnd(t, e, i, s);
              })
            : "shader" === i._type &&
              ((t = new XMLHttpRequest()).open(
                "GET",
                e + "?v=" + Math.ceil(1e3 * Math.random()),
                !0
              ),
              (t.onreadystatechange = function () {
                4 == t.readyState &&
                  200 == t.status &&
                  a.loadShsderEnd(t.responseText, i, s);
              }),
              t.send(null)),
          this._imgNum++,
          this._listCount++,
          this._listCount >= i._list.length &&
            ((this._listCount = 0), this._itemCount++));
      }),
      (t.prototype.loadTextureEnd = function (t, e, i) {
        (t.needsUpdate = !0),
          (t.minFilter = THREE.LinearFilter),
          (t.magFilter = THREE.LinearFilter);
        i = e._list[i];
        (this._texMap[i] = t), this.fLoadCompCheck();
      }),
      (t.prototype.loadImageEnd = function (t, e, i) {
        i = e._list[i];
        (this._imgMap[i] = t), this.fLoadCompCheck();
      }),
      (t.prototype.loadModelEnd = function (t, e, i, s) {
        e &&
          0 < e.length &&
          (e[0].dispose(),
          null != e[0].map && null != e[0].map && e[0].map.dispose(),
          (e = []));
        s = i._list[s];
        (this._modelMap[s] = t), this.fLoadCompCheck();
      }),
      (t.prototype.loadShsderEnd = function (t, e, i) {
        i = e._list[i];
        (this._shaderMap[i] = t), this.fLoadCompCheck();
      }),
      (t.prototype.fLoadCompCheck = function () {
        this.pipelineLoad(),
          this._imgLoadedNum++,
          this._imgLoadedNum >= this._imgNum && _glMain.partsLoadComp();
      }),
      (t.prototype.getTex = function (t) {
        var e,
          i = null;
        for (e in this._texMap) e.match(t) && (i = this._texMap[e]);
        return i;
      }),
      (t.prototype.getModel = function (t) {
        var e,
          i = null;
        for (e in this._modelMap) e.match(t) && (i = this._modelMap[e]);
        return i;
      }),
      (t.prototype.getImage = function (t) {
        var e,
          i = null;
        for (e in this._imgMap) e.match(t) && (i = this._imgMap[e]);
        return i;
      }),
      (t.prototype.getShader = function (t) {
        var e,
          i = null;
        for (e in this._shaderMap) e.match(t) && (i = this._shaderMap[e]);
        return i;
      }),
      t
    );
  })(),
  GL_ScrollMng = (function () {
    "use strict";
    function t() {
      (this._trg = document.getElementById("scroll-wrapp")),
        (this._scrollY = 0),
        (this._scrollYR = 0),
        (this._mx = 0),
        (this._my = 0),
        (this.isDown = !1),
        (this.isScrBarVis = !0),
        (this._startH = 1),
        (this._targetH = 1),
        (this._pageH = 3e3),
        (this._pageBC = new GL_Beacon()),
        (this._pageWait = 0),
        (this._buff = 50),
        (this._scrollBuff = 600),
        (this.isTopFix = !1),
        (this._topLimitH = 0.5 * window.innerHeight),
        "PC" !== _glMain._device && (this._scrollBuff = 400),
        (this._trg.style.height = this._targetH + "px"),
        (this.isScroll = !0),
        document.addEventListener("wheel", this.scrollCheck, { passive: !1 });
      var t = document.getElementById("header-set");
      "SP" != _glMain._device
        ? ((this._scrLine = document.createElement("div")),
          this._scrLine.classList.add("top-scroll-line"),
          t.appendChild(this._scrLine),
          (this._pageTop = document.createElement("div")),
          this._pageTop.classList.add("top-page-top"),
          t.appendChild(this._pageTop),
          (this._pageTopIn = document.createElement("div")),
          this._pageTopIn.classList.add("top-page-top-in"),
          this._pageTop.appendChild(this._pageTopIn),
          TweenMax.set(this._pageTopIn, { scale: 0.01 }),
          (this._pageTopBtn = document.createElement("div")),
          this._pageTopBtn.classList.add("top-page-top-btn"),
          this._pageTopIn.appendChild(this._pageTopBtn),
          this._pageTopBtn.addEventListener("click", function () {
            $(window).scrollTop(0);
          }))
        : ((this._scrLine = document.createElement("div")),
          this._scrLine.classList.add("top-scroll-line-sp"),
          t.appendChild(this._scrLine)),
        (this._scrLineIn = document.createElement("div")),
        this._scrLineIn.classList.add("top-scroll-line-in"),
        this._scrLine.appendChild(this._scrLineIn),
        (this._scrTxt = document.createElement("div")),
        this._scrTxt.classList.add("top-scroll-txt"),
        this._scrTxt.classList.add("en"),
        (this._scrTxt.innerHTML =
          "<span class='top-scroll-txtIn'>scroll</span>"),
        t.appendChild(this._scrTxt),
        TweenMax.killTweensOf(this._scrLineIn),
        TweenMax.set(this._scrLineIn, { y: -160 }),
        TweenMax.to(this._scrLineIn, 2.5, {
          y: 0,
          ease: Power2.easeInOut,
          repeat: -1,
        });
    }
    return (
      (t.prototype.GLStart = function () {
        var e = this;
        "PC" === _glMain._device &&
          (window.onmousemove = function (t) {
            (e._mx = t.clientX), (e._my = t.clientY);
          }),
          _glMain.addResize(this),
          this.onResize();
      }),
      (t.prototype.contentsStart = function () {
        (this.isScroll = !0),
          $(window).scrollTop(0),
          (this._scrollY = this._scrollYR = 0),
          _glMain._pageMng.isTop
            ? (this.onResize(),
              (this.isTopFix = !1),
              (this._targetH = this._startH),
              (this._trg.style.height = this._startH + "px"),
              _glMain.removeEnterFrame(this),
              _glMain.addEnterFrame(this, "scrollFrameTop"))
            : (_glMain.removeEnterFrame(this),
              _glMain.addEnterFrame(this, "scrollFrame"));
      }),
      (t.prototype.spScrollBar = function (t) {
        var e;
        "SP" == _glMain._device &&
          (TweenMax.killTweensOf(this._scrLine),
          t
            ? ((this._scrLine.style.display = "block"),
              TweenMax.to(this._scrLine, 0.5, { opacity: 1 }))
            : ((e = this),
              TweenMax.to(this._scrLine, 0.3, {
                opacity: 0,
                onComplete: function () {
                  e._scrLine.style.display = "none";
                },
              })));
      }),
      (t.prototype.pcScrollChange = function () {
        var t, e;
        "SP" != _glMain._device &&
          ((t = this)._scrollY <= 50
            ? this.isScrBarVis ||
              ((this.isScrBarVis = !0),
              _glMain.onResize(),
              (e = this._scrTxt.getElementsByTagName("span")[0]),
              TweenMax.killTweensOf(e),
              TweenMax.to(e, 0.3, { delay: 0.2, opacity: 1 }),
              TweenMax.killTweensOf(this._scrLine),
              TweenMax.to(this._scrLine, 0.3, { delay: 0.2, opacity: 1 }),
              TweenMax.killTweensOf(this._pageTopIn),
              TweenMax.to(this._pageTopIn, 0.2, {
                scale: 0.01,
                onComplete: function () {
                  t._pageTopIn.style.display = "none";
                },
              }))
            : this.isScrBarVis &&
              ((this.isScrBarVis = !1),
              _glMain.onResize(),
              (e = this._scrTxt.getElementsByTagName("span")[0]),
              TweenMax.killTweensOf(e),
              TweenMax.to(e, 0.3, { opacity: 0 }),
              TweenMax.killTweensOf(this._scrLine),
              TweenMax.to(this._scrLine, 0.3, { opacity: 0 }),
              TweenMax.killTweensOf(this._pageTopIn),
              TweenMax.set(this._pageTopIn, { display: "block" }),
              TweenMax.to(this._pageTopIn, 0.3, { delay: 0.2, scale: 1 })));
      }),
      (t.prototype.transitionStart = function () {
        _glMain.removeEnterFrame(this);
      }),
      (t.prototype.scrollFrameTop = function () {
        var t = $(window).scrollTop();
        "PC" == _glMain._device
          ? (this._scrollY = Math.floor(0.85 * this._scrollY + 0.15 * t))
          : (this._scrollY = t),
          (this._scrollYR = this._scrollY * _glMain._world._screenScaleRe),
          this._scrollY >= this._buff
            ? this.isDown ||
              (this.scrollEnable(!1),
              (this.isDown = !0),
              _glMain.mDown(!0),
              (this._pageWait = 0),
              this._pageBC.clear(),
              this._pageBC.set(this, "pageWaitFrame"))
            : this.isDown &&
              (this.scrollEnable(!1),
              (this.isDown = !1),
              (this.isTopFix = !1),
              _glMain.mDown(!1),
              (this._pageWait = 0),
              this._pageBC.clear(),
              this._pageBC.set(this, "pageWaitFrameRe")),
          this.pcScrollChange();
      }),
      (t.prototype.pageWaitFrame = function () {
        this._pageWait++,
          60 < this._pageWait &&
            (this.scrollEnable(!0),
            (this._pageWait = 0),
            this._pageBC.clear(),
            (this._targetH = this._pageH),
            (this._trg.style.height = this._targetH + "px"),
            this.scrollEnable(!0),
            (this.isTopFix = !0),
            (this._topLimitH = this._scrollYR));
      }),
      (t.prototype.pageWaitFrameRe = function () {
        this._pageWait++,
          60 < this._pageWait &&
            (this.scrollEnable(!0),
            (this._pageWait = 0),
            this._pageBC.clear(),
            (this._targetH = this._startH),
            (this._trg.style.height = this._targetH + "px")),
          this.pcScrollChange();
      }),
      (t.prototype.scrollFrame = function () {
        var t = $(window).scrollTop();
        "PC" == _glMain._device
          ? (this._scrollY = Math.round(
              this._scrollY * _glMain._conf.s086a + t * _glMain._conf.s086b
            ))
          : (this._scrollY = t),
          (this._scrollYR = this._scrollY * _glMain._world._screenScaleRe),
          this.pcScrollChange();
      }),
      (t.prototype.scrollCheck = function (t) {
        _glMain._scrollMng.isScroll || t.preventDefault();
      }),
      (t.prototype.scrollEnable = function (t) {
        _glMain._scrollMng.isScroll = !!t;
      }),
      (t.prototype.setPageH = function (t) {
        (this._pageH = Math.floor(t)),
          this._targetH != this._pageH &&
            (_glMain._pageMng.isTop
              ? ((this._targetH = this._pageH),
                this.isDown && (this._trg.style.height = this._targetH + "px"))
              : ((this._targetH = this._pageH),
                (this._trg.style.height = this._targetH + "px")));
      }),
      (t.prototype.onResize = function () {
        _glMain._device,
          (this._startH = window.innerHeight + this._scrollBuff),
          "SP" != _glMain._device
            ? (TweenMax.set(this._scrLine, {
                top: window.innerHeight - 100 + "px",
              }),
              TweenMax.set(this._scrTxt, {
                top: window.innerHeight - 100 - 80 + "px",
              }),
              TweenMax.set(this._pageTop, {
                top: window.innerHeight - 40 + "px",
              }))
            : TweenMax.set(this._scrLine, {
                top: window.innerHeight - 60 + "px",
              });
      }),
      t
    );
  })(),
  GL_TopFooter = (function () {
    "use strict";
    function t(t) {
      this._parent = t;
    }
    return (
      (t.prototype.init = function () {
        (this._wrapper = document.createElement("div")),
          this._wrapper.classList.add("top-footer"),
          (this._contact = document.createElement("div")),
          this._contact.classList.add("top-contact"),
          this._wrapper.appendChild(this._contact),
          (this._bg = document.createElement("div")),
          this._bg.classList.add("top-contact-bg"),
          this._contact.appendChild(this._bg),
          (this._over = document.createElement("div")),
          this._over.classList.add("top-contact-over"),
          this._contact.appendChild(this._over),
          TweenMax.set(this._over, { x: "-101%" }),
          (this._txt = document.createElement("div")),
          this._txt.classList.add("top-contact-t"),
          this._txt.classList.add("en-b2"),
          (this._txt.innerHTML = "CONTACT"),
          this._contact.appendChild(this._txt),
          (this._btn = document.createElement("div")),
          this._btn.classList.add("top-contact-btn"),
          this._contact.appendChild(this._btn),
          (this._address = document.createElement("div")),
          this._address.classList.add("top-address"),
          this._address.classList.add("ja");
        (this._address.innerHTML =
          "<br><div class='social-icons'><a href='https://www.facebook.com/nishandhunganand' target='_blank'><img src='/manage/wp-content/themes/nishan/assets/image/social/fb-w.png' alt='Facebook'></a><a href='https://www.instagram.com/_nishan_dhungana_/' target='_blank'><img src='/manage/wp-content/themes/nishan/assets/image/social/ig-w.png' alt='Instagram'></a><a href='https://github.com/NishanDhungana' target='_blank'><img src='/manage/wp-content/themes/nishan/assets/image/social/github-w.png' alt='Github'></a><a href='http://www.linkedin.com/in/nishandhungana' target='_blank'><img src='/manage/wp-content/themes/nishan/assets/image/social/in-w.png' alt='LinkedIn'></a><a href='https://www.tiktok.com/@nishan_dhungana' target='_blank'><img src='/manage/wp-content/themes/nishan/assets/image/social/tk-w.png' alt='TikTok'></a></div><br>2022 © Nishan Dhungana. Design by Nd Developers<br>");
          this._wrapper.appendChild(this._address),
          (this._modal = document.createElement("div")),
          this._modal.classList.add("contact-base"),
          document.body.appendChild(this._modal),
          (this._modalBg = document.createElement("div")),
          this._modalBg.classList.add("contact-bg"),
          this._modal.appendChild(this._modalBg),
          (this._modalTxt = document.createElement("div")),
          this._modalTxt.classList.add("contact-txt"),
          this._modalTxt.classList.add("ja");
        (this._modalTxt.innerHTML =
          "<div class='c-comm'>Contact Me</div><div class='c-info en'><a href='mailto:info@nishandhungana.com'>info@nishandhungana.com</a></div><div class='social-icons'><a href='https://www.facebook.com/nishandhunganand' target='_blank'><img src='/manage/wp-content/themes/nishan/assets/image/social/fb.png' alt='Facebook'></a><a href='https://www.instagram.com/_nishan_dhungana_/' target='_blank'><img src='/manage/wp-content/themes/nishan/assets/image/social/ig.png' alt='Instagram'></a><a href='https://github.com/NishanDhungana' target='_blank'><img src='/manage/wp-content/themes/nishan/assets/image/social/github.png' alt='Github'></a><a href='http://www.linkedin.com/in/nishandhungana' target='_blank'><img src='/manage/wp-content/themes/nishan/assets/image/social/in.png' alt='LinkedIn'></a><a href='https://www.tiktok.com/@nishan_dhungana' target='_blank'><img src='/manage/wp-content/themes/nishan/assets/image/social/tk.png' alt='TikTok'></a></div><br>2022 © Nishan Dhungana. <br>");
          this._modal.appendChild(this._modalTxt),
          (this._modalBack = document.createElement("div")),
          this._modalBack.classList.add("c-close"),
          this._modalBg.appendChild(this._modalBack),
          TweenMax.set(this._modalBg, { x: "-100%" }),
          TweenMax.set(this._wrapper, { y: 1e4 }),
          (this._stage = document.getElementById("info-in")),
          (this._marginTop = 540),
          (this._scrollCount = 0),
          (this._showBC = new GL_Beacon());
        var t = this;
        this._btn.addEventListener("click", function () {
          t.contactOpen();
        }),
          "PC" == _glMain._device &&
            (this._btn.addEventListener("mouseenter", function () {
              t.contactOver();
            }),
            this._btn.addEventListener("mouseleave", function () {
              t.contactOut();
            })),
          this._modalBack.addEventListener("click", function () {
            t.contactClose();
          }),
          (this._menuContact = document.getElementsByClassName("menu-con")[0]),
          this._menuContact.addEventListener("click", function () {
            t.contactOpen();
          });
      }),
      (t.prototype.contactOpen = function () {
        (this._modal.style.display = "block"),
          TweenMax.killTweensOf(this._modalBg),
          TweenMax.set(this._modalBg, { x: "-100%" }),
          TweenMax.to(this._modalBg, 0.6, { x: "0%", ease: Power3.easeIn }),
          TweenMax.killTweensOf(this._modalTxt),
          TweenMax.set(this._modalTxt, { opacity: 0, x: "-70%" }),
          TweenMax.to(this._modalTxt, 0.6, {
            delay: 0.7,
            x: "-50%",
            opacity: 1,
            ease: Power3.easeOut,
          }),
          this._modal.addEventListener(
            "mousewheel",
            _glMain._pageMng._top._topFooter.scrollCheck,
            { passive: !1 }
          ),
          this._modal.addEventListener(
            "touchmove",
            _glMain._pageMng._top._topFooter.scrollCheck,
            { passive: !1 }
          );
      }),
      (t.prototype.contactClose = function () {
        var t = this;
        TweenMax.killTweensOf(this._modalBg),
          TweenMax.to(this._modalBg, 0.4, {
            x: "-100%",
            ease: Power3.easeIn,
            onComplete: function () {
              t._modal.style.display = "none";
            },
          }),
          TweenMax.killTweensOf(this._modalTxt),
          TweenMax.to(this._modalTxt, 0.2, {
            opacity: 0,
            ease: Power3.easeOut,
          }),
          this._modal.removeEventListener(
            "mousewheel",
            _glMain._pageMng._top._topFooter.scrollCheck,
            { passive: !1 }
          ),
          this._modal.removeEventListener(
            "touchmove",
            _glMain._pageMng._top._topFooter.scrollCheck,
            { passive: !1 }
          );
      }),
      (t.prototype.scrollCheck = function (t) {
        t.preventDefault();
      }),
      (t.prototype.contactOver = function () {
        TweenMax.killTweensOf(this._over),
          TweenMax.set(this._over, { x: "-101%" }),
          TweenMax.to(this._over, 0.6, { x: "0%", ease: Power3.easeInOut }),
          TweenMax.killTweensOf(this._txt),
          TweenMax.to(this._txt, 0.6, {
            color: "#000",
            ease: Power3.easeInOut,
          });
      }),
      (t.prototype.contactOut = function () {
        var t = this;
        TweenMax.killTweensOf(this._over),
          TweenMax.to(this._over, 0.6, {
            x: "101%",
            ease: Power3.easeInOut,
            onComplete: function () {
              TweenMax.set(t._over, { x: "-101%" });
            },
          }),
          TweenMax.killTweensOf(this._txt),
          TweenMax.to(this._txt, 0.6, {
            color: "#fff",
            ease: Power3.easeInOut,
          });
      }),
      (t.prototype.show = function () {
        (null != this._wrapper.parentNode &&
          null != this._wrapper.parentNode) ||
          this._stage.appendChild(this._wrapper);
        var t = this._parent._topState._list;
        (this._trgObj = t[t.length - 1]),
          TweenMax.killTweensOf(this._wrapper),
          TweenMax.set(this._wrapper, { opacity: 1 }),
          this.onResize(),
          this._showBC.clear(),
          this._showBC.set(this, "showFrame");
      }),
      (t.prototype.showFrame = function () {
        var t = this._trgObj._domY + this._marginTop;
        TweenMax.set(this._wrapper, { y: t }),
          this._scrollCount++,
          60 < this._scrollCount &&
            ((this._scrollCount = 0),
            this._parent.setPageH(
              Math.floor(t + _glMain._scrollMng._scrollY + this._marginTop)
            ));
      }),
      (t.prototype.hide = function () {
        this._showBC.clear(),
          TweenMax.killTweensOf(this._wrapper),
          TweenMax.to(this._wrapper, 0.3, { opacity: 0 });
      }),
      (t.prototype.contentsStop = function () {
        this._showBC.clear(), TweenMax.killTweensOf(this._wrapper);
      }),
      (t.prototype.onResize = function () {
        800 < window.innerWidth
          ? (this._marginTop = 540)
          : (this._marginTop = 300);
      }),
      t
    );
  })(),
  GL_TopPlane = (function () {
    "use strict";
    function t(t, e) {
      (this._parent = t), (this._info = e);
    }
    return (
      (t.prototype.init = function () {
        (this._listX = 0),
          (this._listY = 0),
          (this._trgListY = 0),
          (this._listScale = 1),
          (this._effectX = 0),
          (this._effectY = 0),
          (this._effectR = 0),
          (this._effectScale = 0.63),
          "SP" == _glMain._device && (this._effectScale = 0.43),
          (this._mouseBC = new GL_Beacon()),
          (this._mouseScale = 1),
          (this._hh2 = -0.5 * _glMain._world._renderH),
          (this._backSpeed = 1),
          (this._group = new THREE.Object3D()),
          _glMain._world._dummy._scene.add(this._group),
          (this._g = new THREE.PlaneGeometry(
            _glMain._conf._tWidth,
            _glMain._conf._tHeight,
            1,
            1
          )),
          (this._m = new THREE.MeshBasicMaterial({
            transparent: !0,
            map: this._info._thumTex,
            opacity: 0,
          })),
          (this._mesh = new THREE.Mesh(this._g, this._m)),
          (this._rndY = Math.ceil(48 * Math.random() - 24)),
          (this._marginTop = 0),
          this._group.add(this._mesh),
          (this._nameSet = new GL_TopName(this, this._info));
        var t = [
            [_glMain._conf.s080a, _glMain._conf.s080b],
            [_glMain._conf.s083a, _glMain._conf.s083b],
            [_glMain._conf.s086a, _glMain._conf.s086b],
          ],
          e = Math.floor(Math.random() * t.length);
        (this._scrollSpeedA = t[e][0]),
          (this._scrollSpeedB = t[e][1]),
          (this._group.position.x = 200 * Math.random() - 100),
          (this._group.position.y = 30 * Math.random() - 150 - 500),
          (this._group.scale.x = 0.02);
      }),
      (t.prototype.GLStart = function () {
        this.onResize(),
          this.setEffectPos(),
          (this._group.position.x = this._effectX),
          (this._group.position.y =
            this._effectY - _glMain._scrollMng._topLimitH),
          (this._mesh.rotation.z = this._effectR);
      }),
      (t.prototype.contentsStart = function () {
        (this._group.position.x = this._listX),
          (this._group.position.y = this._listY),
          _glMain._world._dummy._scene.add(this._group);
        var t = [0.3, 0.6, 0.9, 1.2, 1.5],
          t = t[this._info._op.id % t.length];
        TweenMax.killTweensOf(this._m),
          TweenMax.to(this._m, 1, {
            delay: t,
            opacity: 1,
            ease: Power3.easeOut,
          }),
          this._nameSet.contentsStart();
      }),
      (t.prototype.mDown = function (t) {
        t
          ? (this._nameSet.visible(!0),
            (this._backSpeed = 1),
            this.setEffectPos())
          : this._nameSet.visible(!1);
      }),
      (t.prototype.mainUpFrame = function () {
        this._group.visible || (this._group.visible = !0),
          (this._group.rotation.z += this._rotateSpeed),
          0 < this._effectR
            ? this._group.rotation.z >= 2 * Math.PI &&
              (this._group.rotation.z = 0)
            : this._group.rotation.z <= 0 &&
              (this._group.rotation.z = 2 * Math.PI),
          (this._backSpeed *= 0.9985),
          this._backSpeed <= 0.95 && (this._backSpeed = 0.95);
        var t = 1 - this._backSpeed;
        (this._group.position.x =
          this._group.position.x * this._backSpeed + this._effectX * t),
          (this._group.position.y =
            this._group.position.y * this._backSpeed +
            (this._effectY + this._hh2) * t),
          (this._group.scale.x =
            this._group.scale.x * this._backSpeed + this._effectScale * t),
          (this._group.scale.y = this._group.scale.x),
          (this._mesh.rotation.z =
            this._mesh.rotation.z * this._backSpeed + this._effectR * t);
      }),
      (t.prototype.mainDownFrame = function () {
        var t;
        !_glMain._scrollMng.isTopFix ||
        _glMain._scrollMng._scrollYR <= _glMain._scrollMng._topLimitH
          ? (this._trgListY = this._listY)
          : ((t =
              this._listY +
              _glMain._scrollMng._scrollYR -
              _glMain._scrollMng._topLimitH),
            (this._trgListY = t)),
          (this._group.position.y =
            this._group.position.y * this._scrollSpeedA +
            this._trgListY * this._scrollSpeedB),
          (this._group.position.x =
            this._group.position.x * this._scrollSpeedA +
            this._listX * this._scrollSpeedB),
          (this._group.rotation.z =
            this._group.rotation.z * this._scrollSpeedA +
            0 * this._scrollSpeedB),
          (this._group.scale.x =
            this._group.scale.x * this._scrollSpeedA +
            this._listScale * this._scrollSpeedB),
          (this._group.scale.y = this._group.scale.x),
          (this._mesh.rotation.z =
            this._mesh.rotation.z * this._scrollSpeedA +
            0 * this._scrollSpeedB),
          this._group.position.y < _glMain._conf._tHeight &&
          this._group.position.y >
            -(window.innerHeight * _glMain._world._screenScaleRe) -
              _glMain._conf._tHeight
            ? this._group.visible ||
              ((this._group.visible = !0),
              (this._nameSet._wrapper.style.display = "block"))
            : this._group.visible &&
              ((this._group.visible = !1),
              (this._nameSet._wrapper.style.display = "none")),
          this._nameSet.mainFrame();
      }),
      (t.prototype.setEffectPos = function () {
        var t = this._info._op.id;
        "SP" != _glMain._device
          ? t % 2 == 0
            ? ((this._effectX =
                0.395 * _glMain._world._renderW +
                (50 * Math.random() - 25) -
                10),
              (this._effectY =
                0.4 * -_glMain._world._renderH + (20 * Math.random() - 10)))
            : ((this._effectX =
                0.178 * _glMain._world._renderW +
                (140 * Math.random() - 70) -
                10),
              (this._effectY =
                0.398 * -_glMain._world._renderH + (20 * Math.random() - 10)))
          : t % 2 == 0
          ? ((this._effectX =
              0.395 * _glMain._world._renderW +
              (50 * Math.random() - 25) -
              10 -
              50),
            (this._effectY =
              0.4 * -_glMain._world._renderH + (20 * Math.random() - 10)))
          : ((this._effectX =
              0.178 * _glMain._world._renderW +
              (140 * Math.random() - 70) -
              10),
            (this._effectY =
              0.398 * -_glMain._world._renderH + (20 * Math.random() - 10))),
          0 < this._info._op.topEffect
            ? ((this._effectScale = 0.63),
              "SP" == _glMain._device && (this._effectScale = 0.43))
            : (this._effectScale = 0.001),
          (this._effectR = ((90 * Math.random() - 45) * Math.PI) / 180),
          0 < this._effectR
            ? (this._rotateSpeed = 0.002)
            : (this._rotateSpeed = -0.002),
          (this._group.position.z = Math.ceil(-100 * Math.random()));
      }),
      (t.prototype.mOver = function (t) {
        this._mouseBC.clear(),
          (this._mouseScale = t ? 1.1 : 1),
          this._mouseBC.set(this, "mouseFrame");
      }),
      (t.prototype.mouseFrame = function () {
        (this._mesh.scale.x =
          this._mesh.scale.x * _glMain._conf.s090a +
          this._mouseScale * _glMain._conf.s090b),
          (this._mesh.scale.y = this._mesh.scale.x),
          Math.abs(this._mesh.scale.x - this._mouseScale) < 0.002 &&
            ((this._mesh.scale.x = this._mesh.scale.y = this._mouseScale),
            this._mouseBC.clear());
      }),
      (t.prototype.transitionStart = function () {
        TweenMax.killTweensOf(this._m),
          this._mouseBC.clear(),
          this._nameSet.visible(!1);
      }),
      (t.prototype.contentsStop = function () {
        (this._group.scale.x = 0.02),
          TweenMax.killTweensOf(this._m),
          (this._m.opacity = 0),
          _glMain._world._dummy._scene.remove(this._group);
      }),
      (t.prototype.onResize = function () {
        var t,
          e,
          i = _glMain._pageMng._worksInfo._imgNum,
          s = this._info._op.id % i;
        "SP" !== _glMain._device
          ? 1200 < _glMain._world._windowWidth
            ? ((this._marginTop = 420),
              (this._listScale = 1),
              (this._listX = (s % 3) * 388 - 388),
              (this._listY =
                360 * -Math.floor(s / 3) - this._marginTop + this._rndY))
            : _glMain._world._windowWidth <= 1200 &&
              400 < _glMain._world._windowWidth
            ? ((t =
                Math.ceil(_glMain._world._windowWidth / 2.8) /
                _glMain._conf._tWidth),
              (i =
                0.6 * Math.ceil((_glMain._conf._tWidth * t) / 3) +
                Math.ceil(_glMain._conf._tWidth * t)),
              (e =
                Math.ceil(_glMain._conf._tHeight * t * 2) +
                Math.ceil(0.2 * this._rndY)),
              (this._marginTop = Math.ceil(_glMain._conf._tHeight * t * 2.5)),
              (this._listScale = t),
              (this._listX = (s % 2) * i - 0.5 * i),
              (this._listY = -Math.floor(s / 2) * e - this._marginTop))
            : ((t =
                Math.ceil(0.8 * _glMain._world._windowWidth) /
                _glMain._conf._tWidth),
              (e = Math.ceil(_glMain._conf._tHeight * t * 1.8)),
              (this._marginTop = Math.ceil(_glMain._conf._tHeight * t * 2.2)),
              (this._listScale = t),
              (this._listX = 0),
              (this._listY = -s * e - this._marginTop))
          : ((t =
              Math.ceil(0.8 * _glMain._world._windowWidth) /
              _glMain._conf._tWidth),
            (e = Math.ceil(_glMain._conf._tHeight * t * 1.8)),
            (this._marginTop = Math.ceil(_glMain._conf._tHeight * t * 2.2)),
            (this._listScale = t),
            (this._listX = 0),
            (this._listY = -s * e - this._marginTop)),
          this._nameSet.onResize();
      }),
      t
    );
  })(),
  GL_TopName = (function () {
    "use strict";
    function t(t, e) {
      (this._parent = t),
        (this._op = e),
        (this._stage = document.getElementById("info-in")),
        (this._wrapper = document.createElement("div")),
        this._wrapper.classList.add("top-name-set"),
        this._stage.appendChild(this._wrapper),
        (this._wrapper.style.opacity = 0),
        (this._wrapper.style.display = "none"),
        (this._box = document.createElement("div")),
        this._box.classList.add("top-name-in"),
        this._wrapper.appendChild(this._box),
        (this._title = document.createElement("div")),
        this._title.classList.add("top-title"),
        this._title.classList.add("en"),
        (this._title.innerHTML = this._op._op.title_en),
        this._box.appendChild(this._title),
        (this._numTxt = document.createElement("div")),
        this._numTxt.classList.add("top-title-num"),
        this._numTxt.classList.add("en-num");
      e = _glMain._pageMng._worksInfo._dataList.length - e._op.id;
      (this._numTxt.innerHTML =
        e < 10 ? "<span>#</span>0" + e : "<span>#</span>" + e),
        this._box.appendChild(this._numTxt),
        (this._scrollY = 0);
      var i = this;
      "PC" == _glMain._device &&
        (this._box.addEventListener("mouseenter", function () {
          i.mOver();
        }),
        this._box.addEventListener("mouseleave", function () {
          i.mOut();
        })),
        this._box.addEventListener("click", function () {
          i.mClick();
        }),
        (this._boxW = 0),
        (this._boxH = 0);
    }
    return (
      (t.prototype.contentsStart = function () {
        this._wrapper.parentNode || this._stage.appendChild(this._wrapper);
      }),
      (t.prototype.mainFrame = function () {
        var t = Math.floor(
          -this._parent._group.position.y * _glMain._world._screenScale
        );
        this._scrollY = t;
        var e = Math.round(
          this._parent._group.position.x * _glMain._world._screenScale
        );
        TweenMax.set(this._wrapper, { x: e, y: t });
      }),
      (t.prototype.visible = function (t) {
        var e = this;
        TweenMax.killTweensOf(this._wrapper),
          t
            ? ((t = 7 * Math.random() * 0.1 + 1.2),
              (this._wrapper.style.display = "block"),
              TweenMax.to(this._wrapper, 1.5, {
                delay: t,
                opacity: 1,
                ease: Power4.easeOut,
              }))
            : TweenMax.to(this._wrapper, 0.3, {
                opacity: 0,
                ease: Power3.easeOut,
                onComplete: function () {
                  e._wrapper.style.display = "none";
                },
              });
      }),
      (t.prototype.mClick = function () {
         return;
        _glMain.changeURL(this._op._op.path);
      }),
      (t.prototype.mOver = function () {
        this._parent.mOver(!0);
      }),
      (t.prototype.mOut = function () {
        this._parent.mOver(!1);
      }),
      (t.prototype.onResize = function () {
        var t = this._parent._group.position.x * _glMain._world._screenScale,
          e = -this._parent._group.position.y * _glMain._world._screenScale;
        TweenMax.set(this._wrapper, { x: t, y: e });
        var i = Math.ceil(
            _glMain._conf._tWidth *
              this._parent._listScale *
              _glMain._world._screenScale
          ),
          t = Math.ceil(
            _glMain._conf._tHeight *
              this._parent._listScale *
              _glMain._world._screenScale
          );
        TweenMax.set(this._box, {
          width: i + "px",
          height: t + "px",
          x: 0.5 * -i,
          y: 0.5 * -t,
        });
        e = 8;
        1800 < window.innerWidth && (e = 10),
          TweenMax.set(this._title, { top: t + e + "px" }),
          (this._boxW = i),
          (this._boxH = t);
      }),
      t
    );
  })(),
  GL_TopStateSet = (function () {
    "use strict";
    function t(t) {
      this._parent = t;
    }
    return (
      (t.prototype.init = function () {
        this._list = [];
        for (var t = 0; t < 3; t++) {
          var e = new GL_TopStateObj(this, t);
          this._list.push(e);
        }
      }),
      (t.prototype.GLStart = function () {
        for (var t = 0; t < this._list.length; t++) this._list[t].GLStart();
      }),
      (t.prototype.show = function () {
        for (var t = 0; t < this._list.length; t++) this._list[t].show();
        _glMain.removeEnterFrame(this),
          _glMain.addEnterFrame(this, "enterFrame");
      }),
      (t.prototype.enterFrame = function () {
        for (var t = 0; t < this._list.length; t++) this._list[t].enterFrame();
      }),
      (t.prototype.hide = function () {
        _glMain.removeEnterFrame(this);
        for (var t = 0; t < this._list.length; t++) this._list[t].hide();
      }),
      (t.prototype.allClear = function () {
        _glMain.removeEnterFrame(this);
        for (var t = 0; t < this._list.length; t++) this._list[t].allClear();
      }),
      (t.prototype.onResize = function () {
        for (var t = 0; t < this._list.length; t++) this._list[t].onResize();
      }),
      t
    );
  })(),
  GL_TopStateObj = (function () {
    "use strict";
    function t(t, e) {
      (this._parent = t),
        (this._id = e),
        (this._trgObj = null),
        (this._baseY = 600),
        (this._posList = [
          { x: 700, y: 0 },
          { x: 500, y: 740 },
          { x: 200, y: 1480 },
        ]),
        (this._tex_n = _glMain._parts.getTex(
          "assets/image/texture/statement" + this._id + "_n.png"
        )),
        (this._tex_b = _glMain._parts.getTex(
          "assets/image/texture/statement" + this._id + "_b.png"
        )),
        (this._w = this._tex_n.image.width),
        (this._h = this._tex_n.image.height),
        (this._g = new THREE.PlaneGeometry(this._w, this._h, 1, 1)),
        (this._time = 0),
        (this._alpha = 0),
        (this._strength = 0.008),
        (this._shader = {
          vertexShader: _glMain._parts.getShader("shader/state_vtx.js"),
          fragmentShader: _glMain._parts.getShader("shader/state_frg.js"),
          uniforms: {
            texture_n: { value: this._tex_n },
            texture_b: { value: this._tex_b },
            noise: { value: _glMain._world._noise._render.texture },
            time: { value: this._time },
            alpha: { value: this._alpha },
            strength: { value: this._strength },
          },
          transparent: !0,
        }),
        (this._m = new THREE.ShaderMaterial(this._shader)),
        (this._mesh = new THREE.Mesh(this._g, this._m)),
        (this._mesh.position.y = -600),
        (this._mesh.visible = !0),
        _glMain._world._dummy._scene.add(this._mesh),
        (this._showBC = new GL_Beacon()),
        (this._stage = document.getElementById("info-in")),
        (this._dom = document.createElement("div")),
        this._dom.classList.add("top-state-ja"),
        this._dom.classList.add("ja-b");
      var i,
        e = "";
      0 == this._id
        ? (this._dom.classList.add("top-state-1"),
          (e += "<b>Hello!</b> I'M Nishan Dhungana.<br>"),
          (e += "Developer | Designer | Photographer"))
        : 1 == this._id
        ? (this._dom.classList.add("top-state-2"),
          (e += "<b>🎓 2024 - 2026</b><br>"),
          (e += "Bachelor's In Computer Science<br>"),
          (e += "Ongoing Course from University of Wolverhampton <br class='sp-br'>"),
          (e += "Soon to be completed..."))
        : 2 == this._id &&
          (this._dom.classList.add("top-state-3"),
          (e += "<b>2023-2024</b><br>"),
          (e += "Cyber Security<br>"),
          (e += "Completed from Google (Coursera)<br>"),
          (e += "")),
        (this._dom.innerHTML = e),
        (this._sCount = 0),
        (this._sin = 0),
        1 != this._id ? (this._sCountP = 0.1) : (this._sCountP = -0.1),
        (this._haba = 140),
        0 == this._id && (this._haba = 100),
        (this._allP = null),
        0 == this._id &&
          ((this._allP = document.createElement("div")),
          this._allP.classList.add("top-all-p"),
          this._allP.classList.add("en"),
          (this._allP.innerHTML = "All Projects"),
          (this._allArrow = document.createElement("div")),
          this._allArrow.classList.add("top-all-arrow"),
          this._allP.appendChild(this._allArrow),
          (this._allBtn = document.createElement("div")),
          this._allBtn.classList.add("top-all-btn"),
          this._allP.appendChild(this._allBtn),
          this._allBtn.addEventListener("click", function () {
            _glMain._humbMenu.openMenu();
          }),
          "PC" == _glMain._device &&
            ((i = this)._allBtn.addEventListener("mouseenter", function () {
              TweenMax.killTweensOf(i._allArrow),
                TweenMax.to(i._allArrow, 0.3, { x: 12 });
            }),
            this._allBtn.addEventListener("mouseleave", function () {
              TweenMax.killTweensOf(i._allArrow),
                TweenMax.to(i._allArrow, 0.2, { x: 0 });
            })),
          (this._allPMargin = 0));
    }
    return (
      (t.prototype.GLStart = function () {
        this._mesh.visible = !1;
        var t = this;
        setTimeout(function () {
          (t._mesh.position.y = -1e4),
            (t._domY = 1e4),
            TweenMax.set(t._dom, { y: 1e4 }),
            _glMain._world._dummy._scene.remove(t._mesh);
        }, 100);
      }),
      (t.prototype.show = function () {
        _glMain._world._dummy._scene.add(this._mesh),
          (this._trgObj =
            this._parent._parent._thumList[
              this._parent._parent._thumList.length - 1
            ]._group),
          (this._trgY = this._trgObj.position.y),
          (this._mesh.scale.x = this._mesh.scale.y = 1),
          (this._mesh.visible = !0),
          (null != this._dom.parentNode && null != this._dom.parentNode) ||
            this._stage.appendChild(this._dom),
          this._allP &&
            ((null != this._allP.parentNode && null != this._allP.parentNode) ||
              ((this._allP.style.opacity = 0),
              this._stage.appendChild(this._allP),
              TweenMax.killTweensOf(this._allP),
              TweenMax.to(this._allP, 0.5, { delay: 0.5, opacity: 1 }))),
          this.onResize();
      }),
      (t.prototype.enterFrame = function () {
        var t, e;
        (this._time += 0.01),
          (this._shader.uniforms.time.value = this._time),
          (this._trgY =
            this._trgObj.position.y -
            this._baseY -
            this._posList[this._id].y * _glMain._world._screenScaleRe),
          (this._mesh.position.y = this._trgY),
          this._mesh.position.y < this._h &&
          this._mesh.position.y >
            -(window.innerHeight * _glMain._world._screenScaleRe) - this._h
            ? this._mesh.visible ||
              ((this._mesh.visible = !0),
              (this._dom.style.display = "block"),
              this._showBC.clear(),
              this._showBC.set(this, "showFrame"))
            : this._mesh.visible &&
              ((this._mesh.visible = !1), (this._dom.style.display = "none")),
          (e =
            800 < window.innerWidth
              ? -this._mesh.position.y * _glMain._world._screenScale +
                0.5 * this._h +
                60
              : -this._mesh.position.y * _glMain._world._screenScale +
                0.25 * this._h +
                50),
          (this._domY = e),
          1920 < window.innerWidth
            ? (window.innerWidth, TweenMax.set(this._dom, { y: e + 40 }))
            : TweenMax.set(this._dom, { y: e }),
          (this._sCount += this._sCountP),
          (this._sin = Math.sin((this._sCount * Math.PI) / 180) * this._haba),
          (this._mesh.position.x =
            this._posList[this._id].x * _glMain._world._screenScaleRe +
            this._sin),
          this._allP &&
            ((e =
              (t =
                this._parent._parent._thumList[
                  this._parent._parent._thumList.length - 1
                ]._nameSet)._scrollY +
              t._boxH +
              this._allPMargin),
            TweenMax.set(this._allP, { y: e }));
      }),
      (t.prototype.hide = function () {
        null != this._dom.parentNode &&
          null != this._dom.parentNode &&
          this._stage.removeChild(this._dom),
          null != this._allP &&
            ((null == this._allP.parentNode && null == this._allP.parentNode) ||
              this._stage.removeChild(this._allP));
      }),
      (t.prototype.showFrame = function () {
        (this._alpha += 0.01),
          (this._shader.uniforms.alpha.value = this._alpha),
          0.8 <= this._alpha &&
            (this._showBC.clear(),
            (this._alpha = 0.8),
            (this._shader.uniforms.alpha.value = this._alpha));
      }),
      (t.prototype.allClear = function () {
        this._showBC.clear(),
          (this._dom.style.display = "none"),
          _glMain._world._dummy._scene.remove(this._mesh);
      }),
      (t.prototype.onResize = function () {
        var t, e;
        window.innerWidth <= 800
          ? ((this._baseY = 400),
            (this._mesh.scale.x = this._mesh.scale.y = 0.5),
            (this._posList = [
              { x: 50, y: 0 },
              { x: 100, y: 400 },
              { x: 50, y: 830 },
            ]))
          : ((this._baseY = 600),
            (this._mesh.scale.x = this._mesh.scale.y = 1),
            1920 < window.innerWidth
              ? ((t = window.innerWidth / 1920),
                (this._posList = [
                  { x: 0, y: 0 },
                  { x: 300, y: 740 * t },
                  { x: 200, y: 1480 * t },
                ]))
              : (this._posList = [
                  { x: 0, y: 0 },
                  { x: 300, y: 740 },
                  { x: 200, y: 1480 },
                ])),
          (0 !== this._id && 1 !== this._id && 2 !== this._id) ||
            ((e = this._posList[this._id].x),
            (this._mesh.position.x =
              e * _glMain._world._screenScaleRe + this._sin)),
          this._allP &&
            (window.innerrWidth < 700
              ? (this._allPMargin = 50)
              : (this._allPMargin = 20),
            (e =
              (e =
                this._parent._parent._thumList[
                  this._parent._parent._thumList.length - 1
                ]._nameSet)._scrollY +
              e._boxH +
              this._allPMargin),
            TweenMax.set(this._allP, { y: e }));
      }),
      t
    );
  })(),
  GL_TopTitle = (function () {
    "use strict";
    function t() {}
    return (
      (t.prototype.init = function () {
        var t;
        (this._duration = 0.9),
          (this._centerY = -0.5 * window.innerHeight - 15),
          (this._bc = new GL_Beacon()),
          (this._group = new THREE.Object3D()),
          (this._group.position.z = 100),
          (this._timer = { value: 0 }),
          (this._g = new THREE.PlaneGeometry(516, 320, 1, 1)),
          (this._time = 0),
          (this._alpha = 0),
          (this._strength = 0.1),
          (this._size = 4),
          "PC" === _glMain._device || "TB" === _glMain._device
            ? (t = _glMain._parts.getTex("assets/image/texture/main_title.png"))
            : "SP" === _glMain._device &&
              (t = _glMain._parts.getTex(
                "assets/image/texture/main_title_sp.png"
              )),
          (this._shader = {
            vertexShader: _glMain._parts.getShader("shader/title_vtx.js"),
            fragmentShader: _glMain._parts.getShader("shader/title_frg.js"),
            uniforms: {
              texture: { value: t },
              time: { value: this._time },
              alpha: { value: this._alpha },
              strength: { value: this._strength },
              size: { value: this._size },
            },
            transparent: !0,
          }),
          (this._m = new THREE.ShaderMaterial(this._shader)),
          (this._mesh = new THREE.Mesh(this._g, this._m)),
          (this._mesh.position.y = this._centerY + 100),
          (this._mesh.scale.x = this._mesh.scale.y = 1.2 * this._baseScale),
          (this._mesh.visible = !1),
          this._group.add(this._mesh),
          (this._copy = new GL_TopCopy(this)),
          _glMain.addResize(this),
          this.onResize(),
          this._copy.onResize();
      }),
      (t.prototype.contentsStart = function () {
        this._copy.contentsStart(),
          (this._mesh.position.y = this._centerY + 100),
          (this._mesh.scale.x = this._mesh.scale.y = 1.2 * this._baseScale),
          (this.isFirstResize = !1),
          (this._width = window.innerWidth),
          _glMain._world._scene.add(this._group);
      }),
      (t.prototype.enterFrame = function () {
        (this._time += 0.04), (this._shader.uniforms.time.value = this._time);
      }),
      (t.prototype.mDown = function (t) {
        var e = this;
        this._bc.clear(),
          TweenMax.killTweensOf(this._timer),
          (this._timer.value = 0),
          t
            ? (this._bc.set(this, "hideFrame"), this._copy.visible(!1))
            : TweenMax.to(this._timer, this._duration, {
                value: 1,
                onComplete: function () {
                  (e._duration = 0.3),
                    (e._mesh.visible = !0),
                    e._bc.set(e, "showFrame"),
                    e._copy.visible(!0);
                },
              });
      }),
      (t.prototype.hideFrame = function () {
        (this._alpha =
          this._alpha * _glMain._conf.s091a + 0 * _glMain._conf.s091b),
          (this._shader.uniforms.alpha.value = this._alpha),
          (this._strength =
            this._strength * _glMain._conf.s093a + 0.1 * _glMain._conf.s093b),
          (this._shader.uniforms.strength.value = this._strength),
          (this._time += 0.04),
          (this._shader.uniforms.time.value = this._time),
          (this._mesh.scale.x =
            this._mesh.scale.x * _glMain._conf.s092a +
            1.2 * this._baseScale * _glMain._conf.s092b),
          (this._mesh.scale.y = this._mesh.scale.y),
          (this._mesh.position.y =
            this._mesh.position.y * _glMain._conf.s092a +
            (this._centerY + 100) * _glMain._conf.s092b),
          this._alpha <= 0.015 &&
            ((this._alpha = 0),
            (this._shader.uniforms.alpha.value = this._alpha),
            (this._mesh.visible = !1),
            this._bc.clear());
      }),
      (t.prototype.showFrame = function () {
        (this._alpha =
          this._alpha * _glMain._conf.s094a + +_glMain._conf.s094b),
          (this._shader.uniforms.alpha.value = this._alpha),
          (this._strength =
            this._strength * _glMain._conf.s094a + 0 * _glMain._conf.s094b),
          (this._shader.uniforms.strength.value = this._strength),
          (this._time += 0.04),
          (this._shader.uniforms.time.value = this._time),
          (this._mesh.scale.x =
            this._mesh.scale.x * _glMain._conf.s094a +
            this._baseScale * _glMain._conf.s094b),
          (this._mesh.scale.y = this._mesh.scale.x),
          (this._mesh.position.y =
            this._mesh.position.y * _glMain._conf.s094a +
            this._centerY * _glMain._conf.s094b),
          Math.abs(this._alpha - 1) < 0.01 &&
            Math.abs(this._mesh.scale.x - this._baseScale) < 0.01 &&
            ((this._alpha = 1),
            (this._shader.uniforms.alpha.value = this._alpha),
            (this._mesh.scale.x = this._mesh.scale.y = this._baseScale),
            (this._mesh.position.y = this._centerY),
            this._bc.clear());
      }),
      (t.prototype.transitionStart = function () {
        this._mesh.visible &&
          (this._bc.clear(),
          this._bc.set(this, "hideFrame"),
          this._copy.visible(!1));
      }),
      (t.prototype.contentsStop = function () {
        this._bc.clear(), _glMain._world._scene.remove(this._group);
      }),
      (t.prototype.onResize = function () {
        if ("PC" != _glMain._device) {
          if (!this.isFirstResize && this._width == window.innerWidth) return;
          this.isFirstResize = !1;
        }
        (this._width = window.innerWidth),
          this._copy.onResize(),
          "PC" == _glMain._device
            ? (this._centerY = -0.5 * window.innerHeight - 10)
            : (this._centerY = -0.5 * window.innerHeight),
          (this._mesh.position.y = this._centerY),
          800 <= window.innerWidth
            ? 1950 < window.innerWidth
              ? (this._baseScale = (window.innerWidth / 1920) * 1.05)
              : window.innerWidth < 1600
              ? (this._baseScale = 0.9)
              : (this._baseScale = 1.05)
            : window.innerWidth < 800 && 500 <= window.innerWidth
            ? (this._baseScale = 0.8)
            : (this._baseScale = 0.54),
          (this._mesh.scale.x = this._mesh.scale.y = this._baseScale);
      }),
      t
    );
  })(),
  GL_TopRing = (function () {
    "use strict";
    function t(t) {
      this._parent = t;
      this._ringG = new THREE.Geometry();
      for (var e = (6 * Math.PI) / 180, i = 0; i < 61; i++) {
        var s = 420 * Math.cos(e * i),
          n = 420 * Math.sin(e * i);
        this._ringG.vertices.push(new THREE.Vector3(s, n, 0));
      }
      (this._ringM = new THREE.LineBasicMaterial({
        color: 16777215,
        transparent: !0,
        opacity: 0,
      })),
        (this._mesh = new THREE.Line(this._ringG, this._ringM)),
        (this._mesh.position.z = 20),
        (this._mesh.visible = !1);
    }
    return (
      (t.prototype.contentsStart = function () {
        _glMain._world._scene.add(this._mesh);
      }),
      (t.prototype.visible = function (t) {
        var e;
        TweenMax.killTweensOf(this._ringM),
          t
            ? ((this._mesh.visible = !0),
              TweenMax.to(this._ringM, 3, {
                delay: 0.5,
                opacity: 0.5,
                ease: Power3.easeInOut,
              }))
            : ((e = this),
              TweenMax.to(this._ringM, 1, {
                opacity: 0,
                ease: Power3.easeOut,
                onComplete: function () {
                  e._mesh.visible = !1;
                },
              }));
      }),
      (t.prototype.onResize = function () {
        var t = Math.ceil(0.88 * window.innerHeight) / 840;
        (this._mesh.scale.x = this._mesh.scale.y = t),
          (this._mesh.position.y = 0.5 * -window.innerHeight);
      }),
      t
    );
  })(),
  GL_TopCopy = (function () {
    "use strict";
    function t(t) {
      (this._parent = t),
        (this._wrapper = document.querySelector("#info-in")),
        (this._copy = document.createElement("div")),
        this._copy.classList.add("top-sab-copy"),
        this._copy.classList.add("en"),
        (this._copy.innerHTML =
          "Professional <br>Developer, Designer, <br>and Photographer.");
    }
    return (
      (t.prototype.contentsStart = function () {
        this._wrapper.appendChild(this._copy), (this._copy.style.opacity = 0);
      }),
      (t.prototype.visible = function (t) {
        var e;
        TweenMax.killTweensOf(this._copy),
          t
            ? ((this._copy.style.display = "block"),
              TweenMax.to(this._copy, 2, {
                delay: 0.7,
                opacity: 1,
                ease: Power3.easeOut,
              }))
            : ((e = this),
              TweenMax.to(this._copy, 1, {
                opacity: 0,
                ease: Power3.easeOut,
                onComplete: function () {
                  e._copy.style.display = "none";
                },
              }));
      }),
      (t.prototype.onResize = function () {
        var t = Math.round(0.83 * window.innerHeight);
        TweenMax.set(this._copy, { y: t });
      }),
      t
    );
  })(),
  GL_TransitionCover = (function () {
    "use strict";
    function t() {
      (this._wrapper = document.getElementById("transition-cover")),
        (this._txt = document.getElementById("t-cov-txt")),
        (this._numTxt = document.getElementById("t-cov-num")),
        (this._title = document.getElementById("t-cov-title")),
        TweenMax.set(this._txt, { opacity: 0, y: 140 }),
        (this._bar = document.getElementById("t-cov-barIn"));
    }
    return (
      (t.prototype.transitionStart = function (t) {
        if (((this._wrapper.style.display = "block"), null != t)) {
          for (
            var e, i = _glMain._pageMng._worksInfo._dataList, s = 0;
            s < i.length;
            s++
          )
            i[s]._op.path === t._op.path &&
              ((e = i.length - t._op.id),
              (this._numTxt.innerHTML =
                e < 10 ? "<span>#</span>0" + e : "<span>#</span>" + e));
          this._title.innerHTML = t._op.title_en;
          var n = 0.8;
          "PC" != _glMain._device && (n = 1.7),
            TweenMax.killTweensOf(this._txt),
            TweenMax.set(this._txt, { opacity: 0, y: 140 }),
            TweenMax.to(this._txt, 1.2, {
              delay: n,
              opacity: 1,
              y: 0,
              ease: Power3.easeOut,
            }),
            TweenMax.killTweensOf(this._bar),
            TweenMax.set(this._bar, { x: "-100%" }),
            TweenMax.to(this._bar, 1.2, { x: "100%", repeat: -1 });
        }
      }),
      (t.prototype.hide = function () {
        var t = this;
        TweenMax.killTweensOf(this._txt),
          TweenMax.to(this._txt, 1, {
            opacity: 0,
            y: -100,
            ease: Power3.easeIn,
            onComplete: function () {
              t._wrapper.style.display = "none";
            },
          });
      }),
      t
    );
  })();
!(function (t, e) {
  function i(t) {
    return -1 != a.indexOf(t);
  }
  function s(t) {
    var e = t.split("."),
      i = {};
    return (
      (i.str = t),
      (i.float = parseFloat(t) || 0),
      (i.major = (0 < e.length && parseInt(e[0])) || 0),
      (i.minor = (1 < e.length && parseInt(e[1])) || 0),
      (i.build = (2 < e.length && parseInt(e[2])) || 0),
      (i.revision = (3 < e.length && parseInt(e[3])) || 0),
      i
    );
  }
  var n = {
      _detects: [
        "mobile",
        "tablet",
        "pc",
        "windows",
        "mac",
        "linux",
        "ios",
        "android",
        "edge",
        "ie",
        "safari",
        "webkit",
        "chrome",
        "firefox",
        "opera",
        "webview",
      ],
    },
    a = (n.userAgent = t.navigator.userAgent.toLowerCase());
  try {
    n.mobile =
      i("iphone") ||
      i("ipod") ||
      (i("android") && i("mobile")) ||
      (i("windows") && i("phone")) ||
      (i("firefox") && i("mobile")) ||
      i("blackberry");
  } catch (t) {}
  try {
    n.tablet =
      i("ipad") ||
      (i("android") && !i("mobile")) ||
      (i("windows") && i("touch") && !i("tablet pc")) ||
      (i("firefox") && i("tablet")) ||
      i("kindle") ||
      i("silk") ||
      i("playbook");
  } catch (t) {}
  try {
    n.pc =
      !i("iphone") &&
      !i("ipod") &&
      !i("ipad") &&
      !i("android") &&
      (!i("windows") || (!i("phone") && (!i("touch") || i("tablet pc")))) &&
      (!i("firefox") || (!i("mobile") && !i("tablet"))) &&
      !i("blackberry") &&
      !i("kindle") &&
      !i("silk") &&
      !i("playbook");
  } catch (t) {}
  try {
    (n.windows = i("windows")),
      n.windows &&
        ((n.windows = new Boolean(!0)),
        a.match(/nt ([\d.]+)/g) && (n.windows.version = s(RegExp.$1)));
  } catch (t) {}
  try {
    (n.mac = i("mac os x") && !i("iphone") && !i("ipad") && !i("ipod")),
      n.mac &&
        ((n.mac = new Boolean(!0)),
        a.match(/ mac os x ([\d_\.]+)/g) &&
          (n.mac.version = s(RegExp.$1.replace(/_/g, "."))));
  } catch (t) {}
  try {
    n.linux = i("linux") && !i("android");
  } catch (t) {}
  try {
    (n.ios = i("iphone") || i("ipad") || i("ipod")),
      n.ios &&
        ((n.ios = new Boolean(!0)),
        a.match(/ os ([\d_]+)/g) &&
          (n.ios.version = s(RegExp.$1.replace(/_/g, "."))));
  } catch (t) {}
  try {
    (n.android = i("android")),
      n.android &&
        ((n.android = new Boolean(!0)),
        a.match(/android ([\d\.]+)/g) && (n.android.version = s(RegExp.$1)));
  } catch (t) {}
  try {
    (n.edge = i("edge")),
      n.edge &&
        ((n.edge = new Boolean(!0)),
        a.match(/edge\/([\d.]+)/g) && (n.edge.version = s(RegExp.$1)));
  } catch (t) {}
  try {
    (n.ie = i("trident") || i("msie")),
      n.ie &&
        ((n.ie = new Boolean(!0)),
        a.match(/(msie|rv:?)\s?([\d.]+)/g) && (n.ie.version = s(RegExp.$2)));
  } catch (t) {}
  try {
    (n.safari =
      i("safari") &&
      !i("android") &&
      !i("edge") &&
      !i("opera") &&
      !i("opr") &&
      !i("chrome")),
      n.safari &&
        ((n.safari = new Boolean(!0)),
        a.match(/version\/([\d.]+)/g) && (n.safari.version = s(RegExp.$1)));
  } catch (t) {}
  try {
    n.webkit =
      i("applewebkit") &&
      !i("safari") &&
      !i("android") &&
      !i("edge") &&
      !i("opera") &&
      !i("opr") &&
      !i("chrome");
  } catch (t) {}
  try {
    (n.chrome = i("chrome") && !i("edge") && !i("opera") && !i("opr")),
      n.chrome &&
        ((n.chrome = new Boolean(!0)),
        a.match(/chrome\/([\d.]+)/g) && (n.chrome.version = s(RegExp.$1)));
  } catch (t) {}
  try {
    (n.firefox = i("firefox") && !i("edge")),
      n.firefox &&
        ((n.firefox = new Boolean(!0)),
        a.match(/firefox\/([\d.]+)/g) && (n.firefox.version = s(RegExp.$1)));
  } catch (t) {}
  try {
    (n.opera = i("opera") || i("opr")),
      n.opera &&
        ((n.opera = new Boolean(!0)),
        a.match(/(opera|opr)\/([\d.]+)/g) && (n.opera.version = s(RegExp.$2)));
  } catch (t) {}
  try {
    n.webview =
      (i("iphone") || i("ipad") || i("ipod")) &&
      (!i("safari") ||
        i("crios") ||
        i("fxios") ||
        i("opios") ||
        i("twitter") ||
        i("fbav") ||
        i("line"));
  } catch (t) {}
  n._classPrefix = "";
  for (
    var h, o = (e = e.documentElement).className, r = n._detects.length, _ = 0;
    _ < r;
    _++
  )
    o += n[(h = n._detects[_])] ? " " + h : " no-" + h;
  (e.className = o), (t.Useragnt = n);
})(window, document);
var GL_WorksInfo = (function () {
    "use strict";
    function t(t) {
      (this._parent = t), (this._dataList = []);
    }
    return (
      (t.prototype.setData = function (t) {
        for (var e = (this._firstLoadCheck = 0); e < t.length; e++) {
          var i = {};
          (i.id = e),
            (i.title_en =
              t[e].getElementsByClassName("dt-w-title-en")[0].innerHTML),
            (i.path = t[e].getElementsByClassName("dt-w-path")[0].innerHTML),
            (i.thum = t[e].getElementsByClassName("dt-w-thum")[0].innerHTML),
            (i.mv = t[e].getElementsByClassName("dt-mv")[0].innerHTML),
            (i.topEffect = parseInt(
              t[e].getElementsByClassName("dt-topeffect")[0].innerHTML
            ));
          i = new GL_Work(this, i);
          this._dataList.push(i);
        }
        for (this._imgNum = 18, e = 0; e < this._dataList.length; e++)
          this._dataList[e].loadThumStart();
      }),
      (t.prototype.firstLoadCheck = function () {
        var t = Math.min(this._imgNum, this._dataList.length);
        this._firstLoadCheck++,
          this._firstLoadCheck >= t && this._parent.firstImgLoadComp();
      }),
      (t.prototype.getNext = function (t) {
        for (var e, i = 0; i < this._dataList.length; i++)
          if (this._dataList[i]._op.path == t) {
            if (i == this._dataList.length - 1) {
              e = this._dataList[0]._op;
              break;
            }
            e = this._dataList[i + 1]._op;
            break;
          }
        return e;
      }),
      t
    );
  })(),
  GL_Work = (function () {
    "use strict";
    function t(t, e) {
      (this._parent = t), (this._op = e), (this._thumTex = null);
    }
    return (
      (t.prototype.loadThumStart = function () {
        var t = Math.ceil(this._parent._dataList.length / 6),
          e = this;
        setTimeout(function () {
          e.loadThum();
        }, (this._op.id % t) * 80);
      }),
      (t.prototype.loadThum = function () {
        var e = this;
        new THREE.TextureLoader().load(this._op.thum, function (t) {
          e.loadThumComp(t);
        });
      }),
      (t.prototype.loadThumComp = function (t) {
        (t.minFilter = THREE.LinearFilter),
          (t.magFilter = THREE.LinearFilter),
          (t.needsUpdate = !0),
          (this._thumTex = t),
          this._parent.firstLoadCheck();
      }),
      t
    );
  })(),
  GL_World = (function () {
    "use strict";
    function t() {
      (this._id = "world"),
        (this._width = 0),
        (this._height = 0),
        (this._render = null),
        (this._scene = null),
        (this._root = null),
        (this._cam = null),
        (this._fov = 45),
        (this._far = 3e3),
        (this._near = 0.1),
        (this._screenScale = 1),
        (this._screenScaleRe = 1),
        (this._screenWidth = 0),
        (this._screenHeight = 0),
        (this._windowWidth = 0),
        (this._windowHeight = 0),
        (this.isFirstResize = !0);
    }
    return (
      (t.prototype.init = function () {
        (this._canvas = document.getElementById("world")),
          (this._width = window.innerWidth),
          (this._height = window.innerHeight),
          "SP" !== _glMain._device
            ? (this._renderW = 1400)
            : (this._renderW = 900),
          (this._renderH = 788),
          this.setViewPort(),
          (this._cam = new THREE.OrthographicCamera(
            this._viewPort.left,
            this._viewPort.right,
            this._viewPort.top,
            this._viewPort.bottom,
            this._viewPort.near,
            this._viewPort.far
          )),
          this._cam.position.set(0, 0, 1e3),
          (this._scene = new THREE.Scene()),
          (this._render = new THREE.WebGLRenderer({
            canvas: this._canvas,
            antialias: !1,
            alpha: !1,
          })),
          this._render.setClearColor(986895, 1),
          this._render.setPixelRatio(0.98),
          this._render.setSize(this._width, this._height),
          (this._noise = new GL_NoiseSet()),
          this._noise.init(),
          (this._mouseEffect = new GL_MouseEffect()),
          this._mouseEffect.init(),
          (this._dummy = new GL_DummyScene()),
          this._dummy.init(),
          (this._display = new GL_Display()),
          this._display.init(),
          this.playAnimation(),
          _glMain.setupWorld();
      }),
      (t.prototype.GLStart = function () {
        this._mouseEffect.GLStart(),
          this._dummy.GLStart(),
          this._display.GLStart();
      }),
      (t.prototype.transitionStart = function () {
        this._display.tranitionStart();
      }),
      (t.prototype.playAnimation = function () {
        _glMain.addResize(this),
          this.onResize(),
          this.onEnterFrame(),
          _glMain.addEnterFrame(this, "onEnterFrame");
      }),
      (t.prototype.onEnterFrame = function () {
        this._render.render(this._scene, this._cam);
      }),
      (t.prototype.setViewPort = function () {
        this._viewPort = {};
        var t = this._width,
          e = this._height,
          t = t / e;
        this._viewPort = {
          viewSize: e,
          aspectRatio: t,
          left: (-t * e) / 2,
          right: (t * e) / 2,
          top: e / 2,
          bottom: -e / 2,
          near: 0,
          far: 1e4,
        };
      }),
      (t.prototype.setScreenScale = function (t) {
        (this._screenScale = t),
          (this._screenScaleRe = 1 / t),
          (this._screenWidth = this._renderW * this._screenScale),
          (this._screenHeight = this._renderH * this._screenScale),
          (this._windowWidth = window.innerWidth * this._screenScaleRe),
          (this._windowHeight = window.innerHeight * this._screenScaleRe);
      }),
      (t.prototype.onResize = function () {
        if ("PC" != _glMain._device) {
          if (!this.isFirstResize && this._width == window.innerWidth) return;
          this.isFirstResize = !1;
        }
        800 < window.innerWidth
          ? ((this._width = window.innerWidth),
            (this._height = window.innerHeight))
          : ((this._width = window.innerWidth),
            (this._height = Math.ceil(1.35 * window.innerHeight))),
          this.setViewPort(),
          (this._cam.left = this._viewPort.left),
          (this._cam.right = this._viewPort.right),
          (this._cam.top = this._viewPort.top),
          (this._cam.bottom = this._viewPort.bottom),
          (this._cam.position.y = 0.5 * -this._height),
          this._cam.updateProjectionMatrix(),
          this._render.setSize(this._width, this._height);
      }),
      t
    );
  })(),
  GL_Beacon = (function () {
    function t() {
      this._trg, (this._funcName = "");
    }
    return (
      (t.prototype.set = function (t, e) {
        (null != this._trg && null != this._trg) ||
          ((this._trg = t),
          (this._funcName = e),
          _glMain.addEnterFrame(this, "onEnterFrame"));
      }),
      (t.prototype.onEnterFrame = function () {
        this._trg[this._funcName]();
      }),
      (t.prototype.clear = function () {
        null != this._trg &&
          null != this._trg &&
          (_glMain.removeEnterFrame(this),
          (this._trg = null),
          (this._funcName = ""));
      }),
      t
    );
  })(),
  GL_Config = (function () {
    "use strict";
    function t() {
      (this._count = 0),
        (this._oldTIme = 0),
        (this._d = 1),
        (this._tWidth = 330),
        (this._tHeight = 173),
        (this._oldTime = Date.now()),
        _glMain.addEnterFrame(this, "enterFrame");
    }
    return (
      (t.prototype.enterFrame = function () {
        var t = Date.now(),
          e = (t - this._oldTime) / 1e3 / 0.016;
        3 <= e && (e = 3),
          (this._nd = e),
          (this._d = 0.5 * this._d + 0.5 * e),
          (this.s1 = +this._d),
          (this.s005 = 0.05 * this._d),
          (this.s03 = 0.3 * this._d),
          (this.s14 = 1.4 * this._d),
          (this.s098a = 1 - 0.02 * this._d),
          (this.s098b = 1 - this.s098a),
          (this.s096a = 1 - 0.04 * this._d),
          (this.s096b = 1 - this.s096a),
          (this.s095a = 1 - 0.05 * this._d),
          (this.s095b = 1 - this.s095a),
          (this.s094a = 1 - 0.06 * this._d),
          (this.s094b = 1 - this.s094a),
          (this.s093a = 1 - 0.07 * this._d),
          (this.s093b = 1 - this.s093a),
          (this.s092a = 1 - 0.08 * this._d),
          (this.s092b = 1 - this.s092a),
          (this.s091a = 1 - 0.09 * this._d),
          (this.s091b = 1 - this.s091a),
          (this.s090a = 1 - 0.1 * this._d),
          (this.s090b = 1 - this.s090a),
          (this.s088a = 1 - 0.12 * this._d),
          (this.s088b = 1 - this.s088a),
          (this.s086a = 1 - 0.14 * this._d),
          (this.s086b = 1 - this.s086a),
          (this.s085a = 1 - 0.15 * this._d),
          (this.s085b = 1 - this.s085a),
          (this.s083a = 1 - 0.17 * this._d),
          (this.s083b = 1 - this.s083a),
          (this.s080a = 1 - 0.2 * this._d),
          (this.s080b = 1 - this.s080a),
          (this.s060a = 1 - 0.4 * this._d),
          (this.s060b = 1 - this.s060a),
          (this._oldTime = t);
      }),
      t
    );
  })(),
  GL_DetailBgBox = (function () {
    "use strict";
    function t(t) {
      this._parent = t;
    }
    return (
      (t.prototype.init = function () {}),
      (t.prototype.contentsStart = function () {}),
      (t.prototype.enterFrame = function () {}),
      (t.prototype.transitionStart = function () {}),
      (t.prototype.contentsStop = function () {}),
      (t.prototype.onResize = function () {}),
      t
    );
  })(),
  GL_DetailBB = (function () {
    "use strict";
    function t(t, e) {
      (this._parent = t),
        (this._id = e),
        (this._g = new THREE.PlaneGeometry(100, 600, 1, 1));
      for (var i = 0; i < this._g.vertices.length; i++)
        (this._g.vertices[i].x += 50), (this._g.vertices[i].y -= 200);
      (this._g.verticesNeedUpdate = !0),
        (this._alpha = 0),
        (this._nShiftX = 0.5 * Math.random()),
        (this._nShiftY = 0.5 * Math.random()),
        (this._tex = _glMain._parts.getTex("suna.png")),
        (this._tex.wrapS = this._tex.wrapT = THREE.RepeatWrapping),
        (this._shader = {
          vertexShader: _glMain._parts.getShader("shader/detailImg_vtx.js"),
          fragmentShader: _glMain._parts.getShader("shader/detailImg_frg.js"),
          uniforms: {
            texture: { value: this._tex },
            noise: { value: _glMain._world._noise._render.texture },
            alpha: { value: this._alpha },
            shiftX: { value: this._nShiftX },
            shiftY: { value: this._nShiftY },
          },
          transparent: !0,
        }),
        (this._m = new THREE.ShaderMaterial(this._shader)),
        (this._mesh = new THREE.Mesh(this._g, this._m)),
        (this._mesh.position.z = -100);
    }
    return (
      (t.prototype.contentsStart = function () {
        this._pointYR = 0;
        var t = 300 * Math.random() - 200;
        (this._mesh.position.y = this._startY =
          -(2e3 * Math.floor(this._id / 5) + (this._id % 5) * 350 + t) - 1200),
          (this._mesh.scale.y = 1.5),
          _glMain._world._dummy._scene.add(this._mesh),
          TweenMax.killTweensOf(this._m.uniforms.alpha),
          TweenMax.to(this._m.uniforms.alpha, 0.6, {
            value: 0.5,
            ease: Power3.easeOut,
          }),
          (this._scrollScale = 1.3);
      }),
      (t.prototype.transitionStart = function () {
        TweenMax.killTweensOf(this._m);
      }),
      (t.prototype.enterFrame = function () {
        var t = _glMain._scrollMng._scrollYR * this._scrollScale;
        (this._pointYR =
          this._pointYR * _glMain._conf.s092a + t * _glMain._conf.s092b),
          (this._mesh.position.y = this._pointYR + this._startY);
      }),
      (t.prototype.contentsStop = function () {
        TweenMax.killTweensOf(this._m.uniforms.alpha),
          _glMain._world._dummy._scene.remove(this._mesh);
      }),
      (t.prototype.onResize = function () {
        var t;
        1e3 < window.innerWidth
          ? ((this._mesh.visible = !0),
            (t = 0.2 * window.innerWidth),
            this._id <= 4
              ? (this._mesh.position.x =
                  ((this._id % 5) * t - 2 * t) * _glMain._world._screenScaleRe)
              : (this._mesh.position.x =
                  ((this._id % 5) * t - 3 * t) * _glMain._world._screenScaleRe),
            (this._mesh.scale.x = (t / 100) * _glMain._world._screenScaleRe))
          : (this._mesh.visible = !1);
      }),
      t
    );
  })(),
  GL_DetailDescription = (function () {
    "use strict";
    function t(t) {
      (this._parent = t), (this._bottom = 0);
    }
    return (
      (t.prototype.init = function () {
        (this._des = document.createElement("div")),
          this._des.classList.add("detail-description"),
          this._des.classList.add("ja-b"),
          (this._cre = document.createElement("div")),
          this._cre.classList.add("detail-credit"),
          this._cre.classList.add("ja-b"),
          TweenMax.set(this._des, { opacity: 0 }),
          TweenMax.set(this._cre, { opacity: 0 });
      }),
      (t.prototype.setInfo = function (t) {
        TweenMax.killTweensOf(this._des),
          TweenMax.killTweensOf(this._cre),
          TweenMax.set(this._des, { opacity: 0 }),
          TweenMax.set(this._cre, { opacity: 0 }),
          (this._des.innerHTML =
            "<p class='en-b'>DESCRIPTION</p>" + t.description),
          this._parent._stage.appendChild(this._des),
          (this._cre.innerHTML = "<p class='en-b'>CREDIT</p>" + t.credit),
          this._parent._stage.appendChild(this._cre),
          this.onResize(),
          TweenMax.to(this._des, 0.5, {
            delay: 0.3,
            opacity: 1,
            ease: Power3.easeOut,
          }),
          TweenMax.to(this._cre, 0.5, {
            delay: 0.4,
            opacity: 1,
            ease: Power3.easeOut,
          });
      }),
      (t.prototype.transitionStart = function () {
        TweenMax.killTweensOf(this._des),
          TweenMax.killTweensOf(this._cre),
          TweenMax.to(this._des, 0.6, { opacity: 0, ease: Power3.easeOut }),
          TweenMax.to(this._cre, 0.6, { opacity: 0, ease: Power3.easeOut });
      }),
      (t.prototype.contentsStop = function () {
        TweenMax.killTweensOf(this._des),
          TweenMax.killTweensOf(this._cre),
          (this._des.innerHTML = ""),
          (this._cre.innerHTML = ""),
          this._des.parentNode &&
            (this._parent._stage.removeChild(this._des),
            this._parent._stage.removeChild(this._cre));
      }),
      (t.prototype.onResize = function () {
        var t, e, i, s;
        1200 < window.innerWidth
          ? ((n =
              (this._parent._mv._height + (this._parent._mv._height - 470)) *
                _glMain._world._screenScale +
              200),
            (a =
              (this._parent._mv._height + (this._parent._mv._height - 470)) *
                _glMain._world._screenScale +
              200),
            (i = "490px"),
            (t = "-440px"),
            (s = "430px"),
            (e = "180px"),
            TweenMax.set(this._des, { y: n, marginLeft: t, width: i }))
          : window.innerWidth <= 1200 && 1e3 < window.innerWidth
          ? ((n =
              (this._parent._mv._height +
                (this._parent._mv._height + this._parent._mv._trgY)) *
                _glMain._world._screenScale +
              200),
            (a =
              (this._parent._mv._height +
                (this._parent._mv._height + this._parent._mv._trgY)) *
                _glMain._world._screenScale +
              200),
            (i = "470px"),
            (t = "-470px"),
            (s = "400px"),
            (e = "100px"),
            TweenMax.set(this._des, { y: n, marginLeft: t, width: i }))
          : (a =
              ((e = t =
                window.innerWidth <= 1e3 && 800 < window.innerWidth
                  ? ((n =
                      this._parent._title._bottom < 10
                        ? 1e3
                        : this._parent._title._bottom + 130),
                    (s = i = "60%"),
                    "-30%")
                  : ((n =
                      this._parent._title._bottom < 10
                        ? 1e3
                        : this._parent._title._bottom + 150),
                    (s = i = "84%"),
                    "-42%")),
              TweenMax.set(this._des, { y: n, marginLeft: t, width: i }),
              n + $(this._des).height() + 50)),
          TweenMax.set(this._cre, { y: a, marginLeft: e, width: s });
        var n = n + $(this._des).height(),
          a = a + $(this._cre).height();
        this._bottom = Math.max(n, a);
      }),
      t
    );
  })(),
  GL_DetailFooter = (function () {
    "use strict";
    function t(t) {
      (this._parent = t),
        (this._bottom = 0),
        (this._tex = null),
        (this._trgPage = null),
        (this.isShow = !1);
    }
    return (
      (t.prototype.init = function () {
        (this._width = 1600),
          (this._height = 900),
          (this._g = new THREE.PlaneGeometry(this._width, this._height, 1, 1));
        for (var t = 0; t < this._g.vertices.length; t++)
          this._g.vertices[t].y -= 0.5 * this._height;
        this._g.verticesNeedUpdate = !0;
        (this._shader = {
          vertexShader: _glMain._parts.getShader("shader/detailFooter_vtx.js"),
          fragmentShader: _glMain._parts.getShader(
            "shader/detailFooter_frg.js"
          ),
          uniforms: {
            texture: { value: null },
            mask: {
              value: _glMain._parts.getTex(
                "assets/image/texture/footer_mask.png"
              ),
            },
            alpha: { value: 1 },
            mixNum: { value: 1 },
            dark: { value: 0.6 },
            noise: { value: _glMain._world._noise._render.texture },
          },
          transparent: !0,
        }),
          (this._m = new THREE.ShaderMaterial(this._shader)),
          (this._mesh = new THREE.Mesh(this._g, this._m)),
          (this._txtWrapp = document.createElement("div")),
          this._txtWrapp.classList.add("detail-footer-txt"),
          (this._line1 = document.createElement("div")),
          this._line1.classList.add("detail-footer-line-l"),
          this._txtWrapp.appendChild(this._line1),
          (this._line2 = document.createElement("div")),
          this._line2.classList.add("detail-footer-line-r"),
          this._txtWrapp.appendChild(this._line2),
          (this._nextT = document.createElement("div")),
          this._nextT.classList.add("detail-next-t"),
          this._nextT.classList.add("en"),
          (this._nextT.innerHTML = "NEXT"),
          this._txtWrapp.appendChild(this._nextT),
          (this._txt = document.createElement("div")),
          this._txt.classList.add("t-cov-txt"),
          this._txtWrapp.appendChild(this._txt),
          (this._num = document.createElement("div")),
          this._num.classList.add("t-foot-num"),
          this._num.classList.add("en-num"),
          this._txt.appendChild(this._num),
          (this._title = document.createElement("div")),
          this._title.classList.add("t-foot-title"),
          this._title.classList.add("en"),
          this._txt.appendChild(this._title),
          (this._next = document.createElement("div")),
          this._next.classList.add("detail-next"),
          this._txtWrapp.appendChild(this._next),
          (this._backBtn = document.createElement("div")),
          this._backBtn.classList.add("detail-back"),
          this._txtWrapp.appendChild(this._backBtn),
          (this._backBg = document.createElement("div")),
          this._backBg.classList.add("detail-back-bg"),
          this._backBtn.appendChild(this._backBg),
          (this._backTxt = document.createElement("div")),
          this._backTxt.classList.add("detail-back-t"),
          this._backTxt.classList.add("en"),
          (this._backTxt.innerHTML = "INDEX"),
          this._backBtn.appendChild(this._backTxt),
          this._backBtn.addEventListener("click", function () {
            _glMain.changeURL("/");
          });
        var e = this;
        "PC" == _glMain._device &&
          (this._next.addEventListener("mouseenter", function () {
            e.mouseOver();
          }),
          this._next.addEventListener("mouseleave", function () {
            e.mouseOut();
          }),
          this._backBtn.addEventListener("mouseenter", function () {
            e.backOver();
          }),
          this._backBtn.addEventListener("mouseleave", function () {
            e.backOut();
          })),
          this._next.addEventListener("click", function () {
            e.mouseClick();
          });
      }),
      (t.prototype.setData = function (t) {
        this._trgPage = _glMain._pageMng._worksInfo.getNext(t);
        t = _glMain._pageMng._worksInfo._dataList.length - this._trgPage.id;
        (this._num.innerHTML =
          t < 10 ? "<span>#</span>0" + t : "<span>#</span>" + t),
          (this._title.innerHTML = this._trgPage.title_en);
        t = this._trgPage.title_en.split("<br").length - 1;
        0 == t
          ? TweenMax.set(this._txt, { y: "0%" })
          : 1 == t
          ? TweenMax.set(this._txt, { y: "-10%" })
          : 2 == t && TweenMax.set(this._txt, { y: "-20%" }),
          null != this._tex && (this._tex.dispose(), (this._tex = null));
        var e = this;
        new THREE.TextureLoader().load(this._trgPage.mv, function (t) {
          e.loadTextureEnd(t);
        });
      }),
      (t.prototype.loadTextureEnd = function (t) {
        (t.needsUpdate = !0),
          (t.minFilter = THREE.LinearFilter),
          (t.magFilter = THREE.LinearFilter),
          (this._tex = t),
          (this._shader.uniforms.texture.value = this._tex);
      }),
      (t.prototype.contentsStart = function () {
        (this._mesh.position.y = -5e3),
          TweenMax.set(this._txtWrapp, { opacity: 1 }),
          "PC" == _glMain._device &&
            (TweenMax.set(this._m.uniforms.mixNum, { value: 1 }),
            TweenMax.killTweensOf(this._backBg),
            TweenMax.set(this._backBg, {
              scale: 1,
              backgroundColor: "rgba(255, 255, 255, 0)",
            }),
            TweenMax.killTweensOf(this._backTxt),
            TweenMax.set(this._backTxt, { color: "rgba(255,255,255,1)" })),
          (this.isShow = !0);
      }),
      (t.prototype.transitionStart = function () {
        (this.isShow = !1),
          TweenMax.killTweensOf(this._txtWrapp),
          TweenMax.to(this._txtWrapp, 0.3, {
            opacity: 0,
            ease: Power3.easeOut,
          });
      }),
      (t.prototype.contentsStop = function () {
        (this._trgPage = null) != this._tex &&
          (this._tex.dispose(), (this._tex = null)),
          this._parent._group.remove(this._mesh),
          TweenMax.killTweensOf(this._txtWrapp),
          null != this._txtWrapp.parentNode &&
            this._parent._stage.removeChild(this._txtWrapp),
          TweenMax.killTweensOf(this._m.uniforms.mixNum);
      }),
      (t.prototype.show = function () {
        this.isShow &&
          (this._parent._group.add(this._mesh),
          null == this._txtWrapp.parentNode &&
            this._parent._stage.appendChild(this._txtWrapp));
      }),
      (t.prototype.mouseOver = function () {
        this.isShow &&
          (TweenMax.killTweensOf(this._m.uniforms.mixNum),
          TweenMax.to(this._m.uniforms.mixNum, 1, {
            value: 0,
            ease: Power3.easeOut,
          }));
      }),
      (t.prototype.mouseOut = function () {
        this.isShow &&
          (TweenMax.killTweensOf(this._m.uniforms.mixNum),
          TweenMax.to(this._m.uniforms.mixNum, 0.6, {
            value: 1,
            ease: Power3.easeOut,
          }));
      }),
      (t.prototype.mouseClick = function () {
        this.isShow && _glMain.changeURL(this._trgPage.path);
      }),
      (t.prototype.backOver = function () {
        this.isShow &&
          (TweenMax.killTweensOf(this._backBg),
          TweenMax.to(this._backBg, 0.3, {
            scale: 1.3,
            backgroundColor: "rgba(255, 255, 255, 1)",
            ease: Power3.easeOut,
          }),
          TweenMax.killTweensOf(this._backTxt),
          TweenMax.to(this._backTxt, 0.25, {
            color: "rgba(0,0,0,1)",
            ease: Power3.easeOut,
          }));
      }),
      (t.prototype.backOut = function () {
        this.isShow &&
          (TweenMax.killTweensOf(this._backBg),
          TweenMax.to(this._backBg, 0.3, {
            scale: 1,
            backgroundColor: "rgba(255, 255, 255, 0)",
            ease: Power3.easeOut,
          }),
          TweenMax.killTweensOf(this._backTxt),
          TweenMax.to(this._backTxt, 0.25, {
            color: "rgba(255,255,255,1)",
            ease: Power3.easeOut,
          }));
      }),
      (t.prototype.onResize = function () {
        var t, e;
        this._parent.isShow &&
          ((t =
            (window.innerWidth * _glMain._world._screenScaleRe) / this._height),
          (e =
            (window.innerHeight * _glMain._world._screenScaleRe) /
            this._height),
          (this._mesh.scale.x = this._mesh.scale.y = t < e ? t : e),
          (e =
            this._parent._casetList[this._parent._casetList.length - 1]
              ._bottom * _glMain._world._screenScaleRe),
          (this._mesh.position.y = -e - 200),
          window.innerWidth <= 700
            ? ((this._mesh.scale.x *= 0.8),
              (this._mesh.scale.y *= 0.8),
              (this._mesh.position.y *= 0.96),
              (this._shader.uniforms.mask.value = _glMain._parts.getTex(
                "assets/image/texture/footer_mask2.png"
              )),
              (this._shader.uniforms.dark.value = 0.5))
            : 700 < window.innerWidth && window.innerWidth <= 800
            ? ((this._mesh.scale.x *= 0.8),
              (this._mesh.scale.y *= 0.8),
              (this._mesh.position.y *= 0.96),
              (this._shader.uniforms.mask.value = _glMain._parts.getTex(
                "assets/image/texture/footer_mask.png"
              )),
              (this._shader.uniforms.dark.value = 0.5))
            : ((this._shader.uniforms.mask.value = _glMain._parts.getTex(
                "assets/image/texture/footer_mask.png"
              )),
              (this._shader.uniforms.dark.value = 0.6)),
          (this._txtWrapp.style.top =
            String(-this._mesh.position.y * _glMain._world._screenScale) +
            "px"),
          (this._txtWrapp.style.height =
            String(
              this._height * this._mesh.scale.y * _glMain._world._screenScale
            ) + "px"),
          (this._bottom =
            -1 * this._mesh.position.y + this._height * this._mesh.scale.y),
          window.innerHeight < 800 && (this._bottom += 50));
      }),
      t
    );
  })(),
  GL_DetailImg = (function () {
    "use strict";
    function t(t, e, i) {
      (this._parent = t),
        (this._id = e),
        (this._op = i),
        (this._tex = null),
        (this._baseW = 1600),
        (this._baseH = 900),
        (this._width = 1600),
        (this._height = 900),
        (this._bottom = 0),
        (this._wrapp = document.createElement("div")),
        this._wrapp.classList.add("detail-img"),
        this._parent._stage.appendChild(this._wrapp),
        (this._wrappIn = document.createElement("div")),
        this._wrappIn.classList.add("detail-img-in"),
        this._wrapp.appendChild(this._wrappIn),
        (this._movie = null),
        "" != this._op.movie &&
          ((this._movie = document.createElement("div")),
          this._movie.classList.add("detail-movie-wrapp"),
          this._wrappIn.appendChild(this._movie),
          (this._play = document.createElement("div")),
          this._play.classList.add("detail-movie-play"),
          this._play.classList.add("en"),
          (this._play.innerHTML = "play"),
          this._movie.appendChild(this._play),
          (this._movieBtn = document.createElement("div")),
          this._movieBtn.classList.add("detail-movie-btn"),
          this._movieBtn.setAttribute("data-movie", this._op.movie),
          this._movie.appendChild(this._movieBtn),
          "PC" == _glMain._device &&
            (this._movieBtn.addEventListener("mouseenter", detailMovieOver),
            this._movieBtn.addEventListener("mouseleave", detailMovieOut)),
          this._movieBtn.addEventListener("click", detailMovieClick)),
        this.onResize();
    }
    return (
      (t.prototype.loadImg = function () {
        null != this._tex && (delete this._tex, (this._tex = null));
        var t = this;
        (this._tex = new Image()),
          (this._tex.onload = function () {
            t.loadTextureEnd();
          }),
          (this._tex.src = this._op.img);
      }),
      (t.prototype.loadTextureEnd = function () {
        (this._width = this._tex.width),
          (this._height = this._tex.height),
          (this._wrapp.style.width = this._width + "px"),
          (this._wrapp.style.height = this._height + "px"),
          (this._wrappIn.style.backgroundImage = "url(" + this._op.img + ")"),
          this._parent.imgLoadEnd(),
          this.onResize();
      }),
      (t.prototype.loadImgNext = function () {
        null != this._tex && (delete this._tex, (this._tex = null));
        var t = this;
        (this._tex = new Image()),
          (this._tex.onload = function () {
            t.loadTextureNextEnd();
          }),
          (this._tex.src = this._op.img);
      }),
      (t.prototype.loadTextureNextEnd = function () {
        (this._width = this._tex.width),
          (this._height = this._tex.height),
          (this._wrapp.style.width = this._width + "px"),
          (this._wrapp.style.height = this._height + "px"),
          (this._wrappIn.style.backgroundImage = "url(" + this._op.img + ")"),
          this._parent.imgLoadNext(),
          this.onResize();
      }),
      (t.prototype.onResize = function (t) {
        var e,
          i,
          s = this._parent._description._bottom;
        (s =
          800 < window.innerWidth
            ? ((e = (0.75 * window.innerWidth) / this._width),
              (i = 0.1 * window.innerWidth),
              (i =
                this._id % 2 == 0
                  ? -this._width * e * 0.5 - i + 40
                  : -this._width * e * 0.5 + i - 40),
              0 == this._id ? s + 250 : this._parent.getImageY(this._id) + 320)
            : ((e = (0.94 * window.innerWidth) / this._width),
              (i = -this._width * e * 0.5),
              0 == this._id
                ? s + 140
                : this._parent.getImageY(this._id) + 100)),
          TweenMax.set(this._wrapp, { scale: e, x: i, y: s }),
          (this._bottom = s + this._height * e);
      }),
      (t.prototype.transitionStart = function () {
        TweenMax.killTweensOf(this._wrapp),
          TweenMax.to(this._wrapp, 0.6, { opacity: 0, ease: Power2.easeIn }),
          TweenMax.killTweensOf(this._wrappIn),
          TweenMax.to(this._wrappIn, 0.8, { y: "-100%", ease: Power2.easeIn });
      }),
      (t.prototype.contentsStop = function () {
        null != this._tex && (delete this._tex, (this._tex = null)),
          null != this._wrapp &&
            (TweenMax.killTweensOf(this._wrapp),
            TweenMax.killTweensOf(this._wrappIn),
            this._wrapp.parentNode &&
              this._parent._stage.removeChild(this._wrapp),
            (this._wrapp = null)),
          null != this._movie &&
            ("PC" == _glMain._device &&
              (this._movieBtn.removeEventListener(
                "mouseenter",
                detailMovieOver
              ),
              this._movieBtn.removeEventListener("mouseleave", detailMovieOut)),
            this._movieBtn.removeEventListener("click", detailMovieClick));
      }),
      t
    );
  })();
function detailMovieOver(t) {
  t = t.target.parentNode.childNodes[0];
  TweenMax.to(t, 0.2, {
    width: "220px",
    height: "220px",
    lineHeight: "220px",
    backgroundColor: "rgba(255,255,255,1)",
    color: "#000",
  });
}
function detailMovieOut(t) {
  t = t.target.parentNode.childNodes[0];
  TweenMax.to(t, 0.2, {
    width: "160px",
    height: "160px",
    lineHeight: "160px",
    backgroundColor: "rgba(0,0,0,0.8)",
    color: "#fff",
  });
}
function detailMovieClick(t) {
  for (var e = t.target.attributes, i = 0; i < e.length; i++)
    "data-movie" == e[i].name &&
      _glMain._pageMng._detail._player.openMovie(e[i].value);
}
var GL_DetailMV = (function () {
    "use strict";
    function t(t) {
      this._parent = t;
    }
    return (
      (t.prototype.init = function () {
        (this._tex = null), (this._width = 1152), (this._height = 648);
        var t = new THREE.PlaneGeometry(this._width, this._height, 6, 1);
        new THREE.ExplodeModifier().modify(t),
          (this._g = new THREE.BufferGeometry().fromGeometry(t)),
          (this._g.verticesNeedUpdate = !0),
          (this._numFaces = t.faces.length),
          (this._displacement = new Float32Array(3 * this._numFaces * 3)),
          (this._limitD = -9e3),
          (this._shiftList = [
            -600,
            -600,
            -1e3,
            -1e3,
            -5500,
            -5500,
            -7e3,
            -7e3,
            this._limitD,
            this._limitD,
            -6500,
            -6500,
          ]),
          (this._speedList = []);
        for (
          var e = [
              0.946, 0.946, 0.9465, 0.9465, 0.947, 0.947, 0.9475, 0.9475, 0.948,
              0.948, 0.9475, 0.9475,
            ],
            i = 0;
          i < this._numFaces;
          i++
        )
          for (var s = 9 * i, n = 0; n < 3; n++)
            (this._displacement[s + 3 * n + 1] = this._shiftList[i]),
              (this._speedList[s + 3 * n + 1] = e[i]);
        this._g.addAttribute(
          "displacement",
          new THREE.BufferAttribute(this._displacement, 3)
        ),
          (this._alpha = 1),
          (this._shader = {
            vertexShader: _glMain._parts.getShader("shader/detailMV_vtx.js"),
            fragmentShader: _glMain._parts.getShader("shader/detailMV_frg.js"),
            uniforms: {
              texture: { value: null },
              noise: { value: _glMain._world._noise._render.texture },
              grade: {
                value: _glMain._parts.getTex(
                  "assets/image/texture/detailMV_g.png"
                ),
              },
              mask: {
                value: _glMain._parts.getTex(
                  "assets/image/texture/mv_mask.png"
                ),
              },
              alpha: { value: this._alpha },
              shiftX: { value: 1 },
              darkPow: { value: 0.3 },
            },
            transparent: !0,
          }),
          (this._m = new THREE.ShaderMaterial(this._shader)),
          "SP" == _glMain._device &&
            (this._shader.uniforms.darkPow.value = 0.5),
          (this._mesh = new THREE.Mesh(this._g, this._m)),
          (this._mesh.position.y = this._trgY = -470),
          (this._mesh.position.x = this._trgX = 150),
          "PC" == _glMain._device
            ? ((this._shader2 = {
                vertexShader: _glMain._parts.getShader(
                  "shader/detailMV_vtx.js"
                ),
                fragmentShader: _glMain._parts.getShader(
                  "shader/detailMV2_frg.js"
                ),
                uniforms: {
                  texture: { value: null },
                  grade: {
                    value: _glMain._parts.getTex(
                      "assets/image/texture/detailMV_g.png"
                    ),
                  },
                  mask: {
                    value: _glMain._parts.getTex(
                      "assets/image/texture/mv_mask.png"
                    ),
                  },
                  alpha: { value: this._alpha },
                  shiftX: { value: 1 },
                },
                transparent: !0,
              }),
              (this._m2 = new THREE.ShaderMaterial(this._shader2)),
              (this._mesh2 = new THREE.Mesh(this._g, this._m2)),
              (this._mesh2.position.z = -1))
            : (this._mesh2 = null),
          (this._showBC = new GL_Beacon()),
          (this.isResize = !0),
          _glMain.addResize(this),
          this.onResize();
      }),
      (t.prototype.loadTexture = function (t) {
        null != this._tex && (this._tex.dispose(), (this._tex = null));
        var e = this;
        new THREE.TextureLoader().load(t, function (t) {
          e.loadTextureEnd(t);
        });
      }),
      (t.prototype.loadTextureEnd = function (t) {
        (t.needsUpdate = !0),
          (t.minFilter = THREE.LinearFilter),
          (t.magFilter = THREE.LinearFilter),
          (this._tex = t),
          (this._shader.uniforms.texture.value = this._tex),
          null != this._mesh2 &&
            (this._shader2.uniforms.texture.value = this._tex),
          this._parent.loadTextureComp();
      }),
      (t.prototype.contentsStart = function () {
        (this.isResize = !0),
          this._parent._group.add(this._mesh),
          null != this._mesh2 && this._parent._group.add(this._mesh2),
          this.onResize();
        for (var t = (this._trgIdx = 0); t < this._numFaces; t++)
          for (var e = 9 * t, i = 0; i < 3; i++)
            (this._displacement[e + 3 * i + 1] = this._shiftList[t]),
              this._displacement[e + 3 * i + 1] === this._limitD &&
                (this._trgIdx = e + 3 * i + 1);
        (this._g.attributes.displacement.array = this._displacement),
          (this._g.attributes.displacement.needsUpdate = !0);
        var s = this;
        (this.isResize = !1),
          (this._mesh.scale.x = this._mesh.scale.y = 0.01),
          TweenMax.killTweensOf(this._mesh.scale),
          TweenMax.to(this._mesh.scale, 2, {
            delay: 0,
            x: 1,
            y: 1,
            ease: Power3.easeOut,
          }),
          (this._mesh.rotation.z = (-160 * Math.PI) / 180),
          TweenMax.killTweensOf(this._mesh.rotation),
          TweenMax.to(this._mesh.rotation, 2.3, {
            delay: 0,
            z: 0,
            ease: Power2.easeOut,
          }),
          (this._mesh.position.y = -2800),
          (this._mesh.position.x = -1e3),
          TweenMax.killTweensOf(this._mesh.position),
          TweenMax.to(this._mesh.position, 2.2, {
            delay: 0,
            x: this._trgX,
            y: this._trgY,
            ease: Power2.easeOut,
          }),
          (this._m.uniforms.alpha.value = 0),
          TweenMax.killTweensOf(this._m.uniforms.alpha),
          TweenMax.to(this._m.uniforms.alpha, 1.8, {
            delay: 0,
            value: 0.9,
            ease: Power3.easeOut,
            onComplete: function () {
              s.isResize = !0;
            },
          }),
          (this._m.uniforms.shiftX.value = 1),
          TweenMax.killTweensOf(this._m.uniforms.shiftX),
          TweenMax.to(this._m.uniforms.shiftX, 4, {
            delay: 0.1,
            value: 0,
            ease: Power3.easeOut,
          }),
          null != this._mesh2 &&
            ((this._mesh2.scale.x = this._mesh2.scale.y = 0.01),
            TweenMax.killTweensOf(this._mesh2.scale),
            TweenMax.to(this._mesh2.scale, 1.7, {
              delay: 0,
              x: 1,
              y: 1,
              ease: Power3.easeOut,
            }),
            (this._mesh2.rotation.z = (-160 * Math.PI) / 180),
            TweenMax.killTweensOf(this._mesh2.rotation),
            TweenMax.to(this._mesh2.rotation, 1.75, {
              delay: 0,
              z: 0,
              ease: Power2.easeOut,
            }),
            (this._mesh2.position.y = -2e3),
            (this._mesh2.position.x = -1e3),
            TweenMax.killTweensOf(this._mesh2.position),
            TweenMax.to(this._mesh2.position, 1.7, {
              delay: 0,
              x: this._trgX,
              y: this._trgY,
              ease: Power2.easeOut,
            }),
            (this._m2.uniforms.alpha.value = 0),
            TweenMax.killTweensOf(this._m2.uniforms.alpha),
            TweenMax.to(this._m2.uniforms.alpha, 1.5, {
              delay: 0,
              value: 0.2,
              ease: Power3.easeOut,
            }),
            (this._m2.uniforms.shiftX.value = 1),
            TweenMax.killTweensOf(this._m2.uniforms.shiftX),
            TweenMax.to(this._m2.uniforms.shiftX, 3.2, {
              delay: 0,
              value: 0,
              ease: Power3.easeOut,
            })),
          this._showBC.clear(),
          this._showBC.set(this, "showFrame");
      }),
      (t.prototype.showFrame = function () {
        for (var t = 0; t < this._displacement.length; t++)
          this._displacement[t] = this._displacement[t] * this._speedList[t];
        if (
          ((this._g.attributes.displacement.array = this._displacement),
          (this._g.attributes.displacement.needsUpdate = !0),
          -0.01 <= this._g.attributes.displacement.array[this._trgIdx])
        ) {
          this._showBC.clear();
          for (t = 0; t < this._displacement.length; t++)
            this._displacement[t] = 0;
          (this._g.attributes.displacement.array = this._displacement),
            (this._g.attributes.displacement.needsUpdate = !0);
        }
      }),
      (t.prototype.transitionStart = function () {
        TweenMax.killTweensOf(this._mesh.scale),
          TweenMax.killTweensOf(this._mesh.rotation),
          TweenMax.killTweensOf(this._mesh.position),
          TweenMax.killTweensOf(this._m.uniforms.alpha),
          TweenMax.killTweensOf(this._m.uniforms.shiftX),
          null != this._mesh2 &&
            (TweenMax.killTweensOf(this._mesh2.scale),
            TweenMax.killTweensOf(this._mesh2.rotation),
            TweenMax.killTweensOf(this._mesh2.position),
            TweenMax.killTweensOf(this._m2.uniforms.alpha),
            TweenMax.killTweensOf(this._m2.uniforms.shiftX)),
          this._showBC.clear(),
          TweenMax.killTweensOf(this._m.uniforms.alpha),
          TweenMax.to(this._m.uniforms.alpha, 2, {
            value: 0,
            ease: Power3.easeOut,
          });
      }),
      (t.prototype.enterFrame = function () {}),
      (t.prototype.contentsStop = function () {
        this._showBC.clear(),
          this._parent._group.remove(this._mesh),
          null != this._mesh2 && this._parent._group.remove(this._mesh2),
          null != this._tex && (this._tex.dispose(), (this._tex = null));
      }),
      (t.prototype.onResize = function () {
        this.isResize &&
          (1e3 < window.innerWidth
            ? ((this._mesh.position.x = this._trgX = 180),
              TweenMax.killTweensOf(this._mesh.position),
              (this._mesh.position.y = this._trgY = -470))
            : (window.innerWidth <= 1e3 && window.innerWidth,
              (this._mesh.position.x = this._trgX = 0),
              TweenMax.killTweensOf(this._mesh.position),
              (this._mesh.position.y = this._trgY = -310)),
          1e3 < window.innerWidth
            ? (this._shader.uniforms.grade.value = _glMain._parts.getTex(
                "assets/image/texture/detailMV_g.png"
              ))
            : (this._shader.uniforms.grade.value = _glMain._parts.getTex(
                "assets/image/texture/detailMV_g2.png"
              )),
          null != this._mesh2 &&
            ((this._mesh2.position.x = this._mesh.position.x),
            (this._mesh2.position.y = this._mesh.position.y),
            1e3 < window.innerWidth
              ? (this._shader2.uniforms.grade.value = _glMain._parts.getTex(
                  "assets/image/texture/detailMV_g.png"
                ))
              : (this._shader2.uniforms.grade.value = _glMain._parts.getTex(
                  "assets/image/texture/detailMV_g2.png"
                ))));
      }),
      t
    );
  })(),
  GL_DetailTitle = (function () {
    "use strict";
    function t(t) {
      this._parent = t;
    }
    return (
      (t.prototype.init = function () {
        (this._root = this._parent._stage),
          (this._wrapper = document.createElement("div")),
          this._wrapper.classList.add("detail-title-set"),
          (this._numTxt = document.createElement("div")),
          this._numTxt.classList.add("detail-title-num"),
          this._numTxt.classList.add("en-num"),
          this._wrapper.appendChild(this._numTxt),
          (this._title_en = document.createElement("div")),
          this._title_en.classList.add("detail-title-en"),
          this._title_en.classList.add("en-b"),
          this._wrapper.appendChild(this._title_en),
          (this._title_ja = document.createElement("div")),
          this._title_ja.classList.add("detail-title-ja"),
          this._title_ja.classList.add("ja-b"),
          this._wrapper.appendChild(this._title_ja),
          (this._line = document.createElement("div")),
          this._line.classList.add("detail-title-line"),
          this._wrapper.appendChild(this._line),
          (this._link = document.createElement("div")),
          this._link.classList.add("detail-title-link"),
          this._wrapper.appendChild(this._link),
          (this._linkBg = document.createElement("div")),
          this._linkBg.classList.add("detail-title-linkBg"),
          this._link.appendChild(this._linkBg),
          (this._linkIn = document.createElement("div")),
          this._linkIn.classList.add("detail-title-linkIn"),
          this._linkIn.classList.add("en"),
          (this._linkIn.innerHTML = "VISIT"),
          this._link.appendChild(this._linkIn),
          (this._trgURL = "");
        var t = this;
        this._linkIn.addEventListener("click", function () {
          t.openWin();
        }),
          (this.isLinkEnable = !0),
          "PC" == _glMain._device &&
            (this._linkIn.addEventListener("mouseenter", function () {
              t.isLinkEnable && t.visitOver();
            }),
            this._linkIn.addEventListener("mouseleave", function () {
              t.isLinkEnable && t.visitOut();
            })),
          (this._bottom = 0);
      }),
      (t.prototype.setInfo = function (t) {
        for (
          var e = _glMain._pageMng._worksInfo._dataList, i = 0;
          i < e.length;
          i++
        )
          if (e[i]._op.path === t.path) {
            var s = e.length - e[i]._op.id;
            this._numTxt.innerHTML =
              s < 10 ? "<span>#</span>0" + s : "<span>#</span>" + s;
            break;
          }
        "" == t.link
          ? ((this.isLinkEnable = !1),
            (this._trgURL = ""),
            this._linkBg.classList.add("no-link"),
            this._linkIn.classList.add("no-link"),
            this._linkIn.classList.remove("active-link"),
            (this._linkIn.innerHTML = "CLOSED"))
          : ((this.isLinkEnable = !0),
            (this._trgURL = t.link),
            this._linkBg.classList.remove("no-link"),
            this._linkIn.classList.add("active-link"),
            this._linkIn.classList.remove("no-link"),
            (this._linkIn.innerHTML = "VISIT")),
          (this._title_en.innerHTML = t.title_en),
          (this._title_ja.innerHTML = t.title_ja);
      }),
      (t.prototype.openWin = function () {
        "" != this._trgURL && window.open(this._trgURL);
      }),
      (t.prototype.contentsStart = function () {
        TweenMax.killTweensOf(this._wrapper),
          TweenMax.set(this._wrapper, { opacity: 0, y: 100 }),
          this._root.appendChild(this._wrapper),
          TweenMax.to(this._wrapper, 1.8, {
            delay: 1.1,
            opacity: 1,
            y: 0,
            ease: Power2.easeOut,
          });
      }),
      (t.prototype.transitionStart = function () {
        TweenMax.killTweensOf(this._wrapper),
          TweenMax.to(this._wrapper, 0.3, { opacity: 0 });
      }),
      (t.prototype.contentsStop = function () {
        this._root.removeChild(this._wrapper);
      }),
      (t.prototype.visitOver = function () {
        TweenMax.killTweensOf(this._linkBg),
          TweenMax.to(this._linkBg, 0.3, {
            scale: 1.3,
            backgroundColor: "rgba(255, 255, 255, 1)",
            ease: Power3.easeOut,
          }),
          TweenMax.killTweensOf(this._linkIn),
          TweenMax.to(this._linkIn, 0.25, {
            color: "rgba(0,0,0,1)",
            ease: Power3.easeOut,
          });
      }),
      (t.prototype.visitOut = function () {
        TweenMax.killTweensOf(this._linkBg),
          TweenMax.to(this._linkBg, 0.3, {
            scale: 1,
            backgroundColor: "rgba(255, 255, 255, 0)",
            ease: Power3.easeOut,
          }),
          TweenMax.killTweensOf(this._linkIn),
          TweenMax.to(this._linkIn, 0.25, {
            color: "rgba(255,255,255,1)",
            ease: Power3.easeOut,
          });
      }),
      (t.prototype.onResize = function () {
        var t = $(this._wrapper).position();
        this._bottom = t.top + $(this._wrapper).height();
      }),
      t
    );
  })(),
  GL_Display = (function () {
    "use strict";
    function t() {}
    return (
      (t.prototype.init = function () {
        (this._width = _glMain._world._renderW),
          (this._height = _glMain._world._renderH),
          (this._time = Math.ceil(50 * Math.random())),
          (this._ease = 0),
          (this._easeSpeed = 1),
          (this._meEase = 0.075),
          (this._alpha = 0),
          (this._minAlpha = 0.65),
          (this._maxAlpha = 1),
          (this._trgAlpha = this._minAlpha),
          (this._sMinNormal = 0.923),
          (this._sMinSlow = 0.9992),
          (this._trgMinSpeed = this._sMinNormal),
          (this._g = new THREE.PlaneGeometry(this._width, this._height, 1, 1));
        var t = _glMain._world._dummy._render.texture;
        (this._shader = {
          vertexShader: _glMain._parts.getShader("shader/display_vtx.js"),
          fragmentShader: _glMain._parts.getShader("shader/display_frg.js"),
          uniforms: {
            texture: { value: t },
            noise: { value: _glMain._world._noise._render.texture },
            mouseEffect: { value: _glMain._world._mouseEffect._render.texture },
            meEase: { value: this._meEase },
            time: { value: this._time },
            ease: { value: this._ease },
            alpha: { value: this._alpha },
            distA: { value: 0.64 },
            distB: { value: 2.5 },
            mfBlack: { value: 0.3 },
          },
          transparent: !0,
          side: THREE.DoubleSide,
        }),
          (this._m = new THREE.ShaderMaterial(this._shader));
        new THREE.MeshBasicMaterial({ color: 16711680 });
        (this._mesh = new THREE.Mesh(this._g, this._m)),
          _glMain._world._scene.add(this._mesh),
          (this._timeBC = new GL_Beacon()),
          (this._alphaBC = new GL_Beacon());
      }),
      (t.prototype.GLStart = function () {
        _glMain.addResize(this),
          this.onResize(),
          _glMain._pageMng.isTop ? (this._ease = 0.7) : (this._ease = 0),
          (this._shader.uniforms.ease.value = this._ease),
          this.mDown(!1),
          this._timeBC.set(this, "timeFrame");
      }),
      (t.prototype.timeFrame = function () {
        (this._time += 0.004 * _glMain._conf.s1),
          (this._shader.uniforms.time.value = this._time);
      }),
      (t.prototype.mDown = function (t) {
        _glMain.removeEnterFrame(this),
          this._alphaBC.clear(),
          (this._easeSpeed = 1),
          (this._trgMinSpeed = this._sMinNormal),
          this.changeWave(!0),
          t
            ? (_glMain.addEnterFrame(this, "downFrame"),
              (this._trgAlpha = this._maxAlpha))
            : (_glMain.addEnterFrame(this, "upFrame"),
              (this._trgAlpha = this._minAlpha)),
          this._alphaBC.set(this, "alphaFrame");
      }),
      (t.prototype.downFrame = function () {
        _glMain._pageMng.isTop
          ? (this._easeSpeed *= 0.9984)
          : (this._easeSpeed *= 0.99925),
          this._easeSpeed <= this._trgMinSpeed &&
            (this._easeSpeed = this._trgMinSpeed),
          (this._easeSpeedB = 1 - this._easeSpeed),
          (this._ease = this._ease * this._easeSpeed + +this._easeSpeedB),
          (this._shader.uniforms.ease.value = this._ease);
        (this._meEase =
          this._meEase * _glMain._conf.s095a + 0.032 * _glMain._conf.s095b),
          (this._shader.uniforms.meEase.value = this._meEase),
          Math.abs(this._ease - 1) < 5e-4 &&
            ((this._meEase = 0.032),
            (this._shader.uniforms.meEase.value = this._meEase),
            (this._ease = 1),
            (this._shader.uniforms.ease.value = this._ease),
            _glMain.removeEnterFrame(this));
      }),
      (t.prototype.upFrame = function () {
        (this._easeSpeed *= 0.9985),
          this._easeSpeed <= 0.97 && (this._easeSpeed = 0.97),
          (this._easeSpeedB = 1 - this._easeSpeed),
          (this._ease = this._ease * this._easeSpeed + 0.06 * this._easeSpeedB),
          (this._shader.uniforms.ease.value = this._ease),
          (this._meEase =
            this._meEase * _glMain._conf.s095a + 0.075 * _glMain._conf.s095b),
          (this._shader.uniforms.meEase.value = this._meEase),
          Math.abs(this._ease - 0.06) < 5e-4 &&
            ((this._ease = 0.06),
            (this._shader.uniforms.ease.value = this._ease),
            (this._meEase = 0.075),
            (this._shader.uniforms.meEase.value = this._meEase),
            _glMain.removeEnterFrame(this));
      }),
      (t.prototype.tranitionStart = function () {
        (this._easeSpeed = 1),
          _glMain.removeEnterFrame(this),
          _glMain.addEnterFrame(this, "upFrame"),
          this.changeWave(!0),
          this._alphaBC.clear(),
          (this._trgAlpha = 0),
          this._alphaBC.set(this, "transitionFrame");
      }),
      (t.prototype.showPage = function () {
        (this._easeSpeed = 1),
          _glMain.removeEnterFrame(this),
          _glMain._pageMng.isTop
            ? ((this._trgMinSpeed = this._sMinNormal),
              (this._trgAlpha = this._minAlpha),
              _glMain.addEnterFrame(this, "upFrame"),
              TweenMax.killTweensOf(this._shader.uniforms.mfBlack),
              TweenMax.to(this._shader.uniforms.mfBlack, 0.5, { value: 0.3 }))
            : ((this._trgMinSpeed = this._sMiSlow),
              (this._trgAlpha = this._maxAlpha),
              _glMain.addEnterFrame(this, "downFrame"),
              TweenMax.killTweensOf(this._shader.uniforms.mfBlack),
              TweenMax.to(this._shader.uniforms.mfBlack, 0.5, { value: 0.15 })),
          this._alphaBC.clear(),
          this._alphaBC.set(this, "transitionFrame");
      }),
      (t.prototype.alphaFrame = function () {
        (this._alpha =
          this._alpha * _glMain._conf.s094a +
          this._trgAlpha * _glMain._conf.s094b),
          (this._shader.uniforms.alpha.value = this._alpha),
          Math.abs(this._alpha - this._trgAlpha) < 0.01 &&
            (this._alphaBC.clear(),
            (this._alpha = this._trgAlpha),
            (this._shader.uniforms.alpha.value = this._alpha));
      }),
      (t.prototype.transitionFrame = function () {
        (this._alpha =
          this._alpha * _glMain._conf.s095a +
          this._trgAlpha * _glMain._conf.s095b),
          (this._shader.uniforms.alpha.value = this._alpha),
          Math.abs(this._alpha - this._trgAlpha) < 0.01 &&
            (this._alphaBC.clear(),
            (this._alpha = this._trgAlpha),
            (this._shader.uniforms.alpha.value = this._alpha),
            this._trgAlpha <= 0 && _glMain.transitionEnd());
      }),
      (t.prototype.changeWave = function (t) {
        TweenMax.killTweensOf(this._shader.uniforms.distA),
          TweenMax.killTweensOf(this._shader.uniforms.distB),
          t
            ? (TweenMax.to(this._shader.uniforms.distA, 1.5, {
                value: 0.6,
                ease: Power3.easeOut,
              }),
              TweenMax.to(this._shader.uniforms.distB, 1.5, {
                value: 2.5,
                ease: Power3.easeOut,
              }))
            : (TweenMax.to(this._shader.uniforms.distA, 3.5, {
                value: 1,
                ease: Power3.easeInOut,
              }),
              TweenMax.to(this._shader.uniforms.distB, 3.5, {
                value: 20,
                ease: Power3.easeInOut,
              }));
      }),
      (t.prototype.onResize = function () {
        var t = _glMain._world._width / this._width,
          e = _glMain._world._height / this._height;
        e < t
          ? ((this._mesh.scale.x = t), (this._mesh.scale.y = t))
          : ((this._mesh.scale.x = e), (this._mesh.scale.y = e));
        e = this._height * this._mesh.scale.y * 0.5;
        (this._mesh.position.y = -e),
          _glMain._world.setScreenScale(this._mesh.scale.x);
      }),
      t
    );
  })(),
  GL_DummyScene = (function () {
    function t() {
      (this._width = 0),
        (this._height = 0),
        (this._render = null),
        (this._scene = null),
        (this._cam = null),
        (this._bg = null);
    }
    return (
      (t.prototype.init = function () {
        (this._width = _glMain._world._renderW),
          (this._height = _glMain._world._renderH),
          this.setViewPort(),
          (this._cam = new THREE.OrthographicCamera(
            this._viewPort.left,
            this._viewPort.right,
            this._viewPort.top,
            this._viewPort.bottom,
            this._viewPort.near,
            this._viewPort.far
          )),
          this._cam.position.set(0, -0.5 * this._height, 1e3),
          (this._scene = new THREE.Scene()),
          (this._render = new THREE.WebGLRenderTarget(
            _glMain._world._renderW,
            _glMain._world._renderH,
            {
              magFilter: THREE.LinearFilter,
              minFilter: THREE.LinearFilter,
              wrapS: THREE.ClampToEdgeWrapping,
              wrapT: THREE.ClampToEdgeWrapping,
            }
          ));
      }),
      (t.prototype.GLStart = function () {
        _glMain.removeEnterFrame(this),
          _glMain.addEnterFrame(this, "enterFrame");
      }),
      (t.prototype.enterFrame = function () {
        _glMain._world._render.render(this._scene, this._cam, this._render);
      }),
      (t.prototype.setViewPort = function () {
        this._viewPort = {};
        var t = this._width,
          e = this._height,
          t = t / e;
        this._viewPort = {
          viewSize: e,
          aspectRatio: t,
          left: (-t * e) / 2,
          right: (t * e) / 2,
          top: e / 2,
          bottom: -e / 2,
          near: 0,
          far: 1e4,
        };
      }),
      t
    );
  })(),
  GL_HumbMenu = (function () {
    "use strict";
    function t() {
      (this.isSet = !1),
        (this.isOpen = !1),
        (this._btn = document.querySelector(".header-humb")),
        TweenMax.set(this._btn, { y: "-10px" });
      var t = this;
      this._btn.addEventListener("click", function () {
        t.openMenu();
      }),
        "PC" == _glMain._device &&
          ((this._over = new GL_HumbMenu_over(this)), this._over.init()),
        (this._modal = document.querySelector("#project-list")),
        (this._modalBg = document.querySelector(".project-list-bg")),
        (this._modalT = document.querySelector(".project-list-t")),
        (this._modalIn = document.querySelector(".project-list-in")),
        (this._modalIn.style.opacity = 0),
        (this._modalClose = document.querySelector(".project-list-close")),
        (this._modalClose.style.display = "none"),
        this._modalClose.addEventListener("click", function () {
          t.closeMenu();
        }),
        _glMain.addResize(this),
        this.onResize();
    }
    return (
      (t.prototype.contentsStart = function () {
        if (!this.isSet) {
          this.isSet = !0;
          var t = _glMain._pageMng._worksInfo._dataList,
            e = document.createElement("div");
          e.classList.add("project-list-menu"),
            (e.innerHTML =
              '<span class="menu-h-con">CONTACT</span>/<span class="menu-fb"><a href="https://www.facebook.com/nishan.jp/" target="_blank">FB</a></span>/<span class="menu-fb"><a href="https://twitter.com/homuculu" target="_blank">TW</a></span>'),
            this._modalIn.appendChild(e);
          e = document.createElement("p");
          (e.innerHTML = "All Projects"),
            e.classList.add("project-title"),
            this._modalIn.appendChild(e),
            (this._itemList = []);
          for (var i = 0; i < t.length; i++) {
            var s = document.createElement("div");
            (s.innerHTML = t[i]._op.title_en),
              s.classList.add("project-item"),
              s.setAttribute("data-path", t[i]._op.path),
              s.setAttribute("data-thum", t[i]._op.thum),
              s.setAttribute("data-active", 1);
            var n = t.length - i,
              a = n < 10 ? "#0" + n : "#" + n,
              n = document.createElement("div");
            n.classList.add("project-item-num"),
              (n.innerHTML = a),
              s.appendChild(n),
              this._modalIn.appendChild(s);
            n = document.createElement("div");
            n.classList.add("project-item-border"),
              this._modalIn.appendChild(n);
            var h = this;
            s.addEventListener("click", function (t) {
              0 != t.target.dataset.active &&
                ((null != t.target.parentNode.dataset.active &&
                  0 == t.target.parentNode.dataset.active) ||
                  h.menuClick(t));
            }),
              "PC" == _glMain._device &&
                (s.addEventListener("mouseenter", function (t) {
                  0 != t.target.dataset.active &&
                    (TweenMax.killTweensOf(t.target),
                    TweenMax.to(t.target, 0.3, {
                      paddingLeft: "30px",
                      opacity: 0.5,
                    }),
                    h._over.over(t));
                }),
                s.addEventListener("mouseleave", function (t) {
                  0 != t.target.dataset.active &&
                    (TweenMax.killTweensOf(t.target),
                    TweenMax.to(t.target, 0.4, {
                      paddingLeft: "0px",
                      opacity: 1,
                      ease: Power3.easeOut,
                    }),
                    h._over.out());
                })),
              this._itemList.push(s);
          }
          document
            .querySelector(".menu-h-con")
            .addEventListener("click", function () {
              h.contactOpen();
            });
        }
      }),
      (t.prototype.contactOpen = function () {
        this.closeMenu(), _glMain._pageMng._top._topFooter.contactOpen();
      }),
      (t.prototype.openMenu = function () {
        this.isOpen = !0;
        for (var t = location.href, e = 0; e < this._itemList.length; e++)
          -1 != t.indexOf(this._itemList[e].dataset.path)
            ? (this._itemList[e].setAttribute("data-active", 0),
              (this._itemList[e].style.opacity = 0.3),
              (this._itemList[e].style.cursor = "default"))
            : (this._itemList[e].setAttribute("data-active", 1),
              (this._itemList[e].style.opacity = 1),
              (this._itemList[e].style.cursor = "pointer"));
        TweenMax.set(this._modalBg, { x: "-100%" }),
          (this._modal.style.display = "block");
        var i = this;
        TweenMax.to(this._modalBg, 0.5, {
          x: "0%",
          ease: Power3.easeInOut,
          onComplete: function () {
            var t = i;
            TweenMax.killTweensOf(i._modalT),
              TweenMax.set(i._modalT, { display: "block" }),
              TweenMax.to(i._modalT, 0.3, {
                opacity: 1,
                ease: Power3.easeOut,
                onComplete: function () {
                  TweenMax.set(t._modalIn, {
                    display: "block",
                    opacity: 0,
                    x: -50,
                  }),
                    TweenMax.to(t._modalIn, 0.6, {
                      opacity: 1,
                      x: 0,
                      ease: Power3.easeOut,
                    }),
                    (t._modalClose.style.display = "block"),
                    "PC" == _glMain._device && t._over.start();
                },
              });
          },
        }),
          (document.body.style.overflowY = "hidden");
      }),
      (t.prototype.closeMenu = function () {
        var t;
        this.isOpen &&
          ("PC" == _glMain._device && this._over.stop(),
          (this.isOpen = !1),
          (this._modalIn.style.display = "none"),
          (this._modalClose.style.display = "none"),
          TweenMax.killTweensOf(this._modalT),
          (this._modalT.style.display = "none"),
          (this._modalT.style.opacity = 0),
          (t = this),
          TweenMax.killTweensOf(this._bg),
          TweenMax.to(this._modalBg, 0.4, {
            x: "-100%",
            ease: Power3.easeIn,
            onComplete: function () {
              t._modal.style.display = "none";
            },
          }),
          (document.body.style.overflowY = "scroll"));
      }),
      (t.prototype.menuClick = function (t) {
        var e = t.target.dataset.path;
        if (null == e) {
          if (null == t.target.parentNode.dataset.path) return;
          e = t.target.parentNode.dataset.path;
        }
        _glMain.changeURL(e);
      }),
      (t.prototype.onResize = function () {
        700 < window.innerWidth
          ? ((this._btn.style.top = Math.ceil(0.5 * window.innerHeight) + "px"),
            (this._btn.style.right = "28px"))
          : ((this._btn.style.top = "32px"), (this._btn.style.right = "20px"));
      }),
      t
    );
  })(),
  GL_HumbMenu_over = (function () {
    "use strict";
    function t(t) {
      (this._parent = t),
        (this._wrapp = document.querySelector("#project-list")),
        (this._x = 0),
        (this._y = 0),
        (this._count = 0),
        (this._hitList = []);
    }
    return (
      (t.prototype.init = function () {
        (this._root = document.createElement("div")),
          this._root.classList.add("project-over-root"),
          this._wrapp.appendChild(this._root),
          (this._list = []);
        for (var t = 0; t < 5; t++) {
          var e = document.createElement("div");
          e.classList.add("project-over"),
            TweenMax.set(e, { scale: 0.2 }),
            this._root.appendChild(e),
            this._list.push(e),
            this._hitList.push("");
        }
      }),
      (t.prototype.start = function () {
        _glMain.removeEnterFrame(this),
          _glMain.addEnterFrame(this, "enterFrame");
      }),
      (t.prototype.enterFrame = function () {
        (this._x = 0.9 * this._x + 0.1 * _glMain._scrollMng._mx),
          (this._y = 0.9 * this._y + 0.1 * _glMain._scrollMng._my),
          TweenMax.set(this._root, { x: this._x + 150, y: this._y });
      }),
      (t.prototype.over = function (t) {
        this._hitList[this._count] = t.target.dataset.thum;
        var e = this._list[this._count];
        (e.style.backgroundImage = "url(" + t.target.dataset.thum + ")"),
          TweenMax.killTweensOf(e),
          (e.style.display = "block"),
          TweenMax.to(e, 0.5, { opacity: 1, scale: 1, ease: Power3.easeOut });
      }),
      (t.prototype.out = function () {
        var t = this._list[this._count];
        TweenMax.killTweensOf(t),
          TweenMax.to(t, 0.3, {
            opacity: 0,
            scale: 0.2,
            onComplete: function () {
              t.style.display = "none";
            },
          }),
          this._count++,
          this._count >= this._list.length && (this._count = 0);
      }),
      (t.prototype.stop = function () {
        _glMain.removeEnterFrame(this);
      }),
      t
    );
  })(),
  GL_Loading = (function () {
    "use strict";
    function t() {
      this._cover = document.getElementById("loading");
    }
    return (
      (t.prototype.hide = function () {
        var t = this;
        TweenMax.to(this._cover, 0.8, {
          delay: 0.4,
          opacity: 0,
          onComplete: function () {
            t._cover.style.display = "none";
          },
        });
      }),
      t
    );
  })();
