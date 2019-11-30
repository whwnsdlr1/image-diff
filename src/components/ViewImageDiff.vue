<template>
<div class="body">
  <title-bar :phase="phase" :state="state"
    @cp-onclick="listen__cp__onclick"
    @state-toreset="listen__reset_state__onclick"
    @state-tochange="listen__state__tochange"
    @tohome="listen__x__tohome"
    @frame-rearrange="listen__x__onrearrangeframe"
  />
  <drop-view v-show="phase == 'drop'" @vue-input-files="listen__drop_view__oninput" />
  <vue-image-diff v-show="phase == 'view'"
    ref="vue-image-diff"
    :data="componentVueImageDiff.data"
    :options="componentVueImageDiff.options"
    :options-tool-bar="componentVueImageDiff.optionsToolbar"
    @onstatechange="listen__x__onstatechange" />
</div>
</template>

<script>
/* eslint-disable no-console */
import DropView from '@/components/DropView'
import VueImageDiff from 'vue-image-diff'
import TitleBar from '@/components/TitleBar'
import ReArrange2D from '@/components/ReArrange2D'

import VueVue from 'vue'
import path from 'path'
import MISC from '@/js/miscellaneous.js'

export default {
  components: {
    'drop-view': DropView,
    'vue-image-diff': VueImageDiff,
    'title-bar': TitleBar
  },
  data: function () {
    const coord = {x: 0, y: 0}
    const diffTolerance = 1
    return {
      phase: 'drop',
      state: {
        coord: {
          x: coord.x,
          y: coord.y
        },
        zoom: undefined,
        diff: {
          activate: true,
          reference: undefined,
          tolerance: diffTolerance
        }
      },
      componentVueImageDiff: {
        data: [],
        options: {coord, diff: {activate: true, tolerance: diffTolerance}},
        optionsToolbar: {show: false}
      }
    }
  },
  methods: {
    listen__cp__onclick: function () {
      this.$refs['vue-image-diff'].openControlPanel()
    },
    listen__reset_state__onclick: function () {
      this.$refs['vue-image-diff'].resetState()
    },
    listen__drop_view__oninput: function (files) {
      const Vue = this
      let data0 = []
      let cnt = 0
      for (const file of files) {
        let {name, params, index} = Vue.parseName(file.name)
        data0.push({id: `id-${cnt++}`, blob: file, name, params, ext: path.extname(file.name), index})
      }
      Vue.phase = 'view'
      Vue.doubleRaf(function () {
        Vue.componentVueImageDiff.data.push(...data0)
      })
    },
    listen__state__tochange: function (data) {
      this.$refs['vue-image-diff'].setState(data, true)
    },
    listen__x__onstatechange: function (data) {
      const Vue = this
      if (data != undefined) {
        if (data.coord != undefined) {
          Vue.state.coord = {x: data.coord.x, y: data.coord.y}
        }

        if (data.zoom != undefined)
          Vue.state.zoom = data.zoom

        if (data.diff != undefined) {
          if (data.diff.activate != undefined)
            Vue.state.diff.activate = data.diff.activate
          if (data.diff.reference != undefined && data.diff.reference.id != undefined)
            Vue.state.diff.reference = {id: data.diff.reference.id}
          if (data.diff.tolerance != undefined)
            Vue.state.diff.tolerance = data.diff.tolerance
        }
      }
    },
    listen__x__tohome: function () {
      this.state.coord = {x: 0, y: 0}
      this.state.zoom = undefined
      this.state.diff.reference.id = undefined
      this.componentVueImageDiff.data = []
      this.phase = 'drop'
    },
    listen__x__onrearrangeframe: function () {
      const Vue = this
      if (Vue.phase != 'view') {
        Vue.$toasted.show(`open images first.`, {type: 'error', duration: 2500, position: 'bottom-center'})
      } else if (Vue.componentVueImageDiff.data.length < 2) {
        Vue.$toasted.show(`need more than two image.`, {type: 'error', duration: 2500, position: 'bottom-center'})
      } else {
        let dom = MISC.createElement('DIV', {}, {})
        MISC.createElement('H2', {marginTop: '0px', fontSize: '16px'}, {parent: dom, text: `You Can Drag & Drop below block to rearrange frame's position`})
        MISC.createElement('hr', {marginTop: '0px', fontSize: '16px'}, {parent: dom})
        const ComponentClass = VueVue.extend(ReArrange2D)

        const frameRowCount = Vue.$refs['vue-image-diff'].getState().style.frameRowCount

        let array2D = []
        let idx = 0
        const cols = Math.ceil(Vue.componentVueImageDiff.data.length / frameRowCount)
        for (const datum of Vue.componentVueImageDiff.data) {
          if (idx % cols == 0) array2D.push([])
          array2D[array2D.length - 1].push({id: datum.id, name: datum.name})
          idx++
        }
        const instance = new ComponentClass({el: MISC.createElement('DIV', {}, {}), propsData: {'dataArray2D': array2D}})
        const domComponent = instance.$el
        dom.appendChild(domComponent)
        Vue.$mModal.show('dialog', {
          dom: dom,
          onafterdomattached: function () {
            domComponent.style.width = `${window.innerWidth * 0.7}px`
            domComponent.style.height = `${window.innerHeight * 0.6}px`
          },
          buttons: [
            {
              title: 'cancel',
              onclick: () => {}
            },
            {
              title: 'confirm',
              class: ['green'],
              onclick: () => {
                console.log(instance.paddedArray)
                let data = []
                for (let datum of instance.paddedArray) {
                  const idx = Vue.componentVueImageDiff.data.map(v => v.id).indexOf(datum.id)
                  if (idx != -1)
                    data.push(Vue.componentVueImageDiff.data[idx])
                }
                Vue.componentVueImageDiff.data = data
              }
            }
          ]
        })
      }
    },
    parseName: function (str) {
      const ext = path.extname(str)
      str = str.substr(0, str.length - ext.length)
      let tokens = str.split('__')
      const name = tokens[0]
      tokens = tokens.slice(1)
      tokens = tokens.slice(0, Math.floor(tokens.length / 2) * 2)
      let params = {}
      let index = 9999
      for (let i = 0; i < tokens.length; i += 2) {
        const key = tokens[i]
        const value = tokens[i + 1]
        if (key == 'index') {
          const valInt = parseInt(value)
          if (isNaN(valInt) == false)
            index = value
        }
        else params[key] = value
      }
      return {name, params, index}
    },
    getUuid4: function () {
      return MISC.getUuid4()
    },
    doubleRaf: function (callback) {
      requestAnimationFrame(() => {
        requestAnimationFrame(callback)
      })
    },
  },
  created () {
  },
  updated () {
    // console.log('main updated')
  },
  mounted () {
  }
}
</script>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: rgb(230, 230, 230);
  min-height: 0;
}
div.wait-input {
  display: flex;
  width: 100%;
  flex: 1 0 0;
  align-items: center;
  justify-content: center;
}
.w-spinner {
  position:relative;
  display:inline-block;
  top: 7px;
  width:20px;
  height:20px;
  margin-right: 8px;
}
div.opened {
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
div.row-frame {
  display: flex;
  flex-direction: row;
  flex: 1 0 0;
  min-width: 0;
  min-height: 0;
}
div.col-frame {
  flex: 1 0 0;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
</style>