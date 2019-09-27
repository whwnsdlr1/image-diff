<template>
<div class="body" @mouseup="listen__body__onmouseup" @mousemove="listen__block__onmousemove">
  <transition-group name="block" tag="div" class="container" ref="container">
    <div class="block" v-for="(block, index) in paddedArray" :key="block.id"
      :class="{hover: block.hover}"
      :style="{visibility: block.show? 'visible' : 'hidden', margin: getBlockMargin(index)}"
      :title="block.name"
      @mouseenter="listen__block__onmouseenter(block)"
      @mouseleave="listen__block__onmouseleave(block)"
      @mousedown="listen__block__onmousedown($event, block, index)">
      <span :class="{changed: block.index != block.index0}">{{ `${block.index + 1}. ${block.name}` }}</span>
    </div>
  </transition-group>
  <div v-show="drag != undefined" class="block fake" :key="'fake'"><span></span></div>
  <div class="container-grid">
    <div class="grid" :class="{'hover': i - 1 == gridHoverIndex}" v-for="i in (rows * cols)" :key="`grid-${i}`">
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable no-console */
import elementResizeEvent from 'element-resize-event'
import MISC from '@/js/miscellaneous.js'

const marginWidth = 40
const marginHeight = 30

export default {
  props: ['data-array2D'],
  data: function () {
    const array2D = this.dataArray2D == undefined ? [
      [{id: 1, name: 'abbbb'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}],
      [{id: 4, name: 'd'}, {id: 5, name: 'e'}, {id: 6, name: 'f'}],
      [{id: 7, name: 'g'}, {id: 8, name: 'h'}, {id: 9, name: 'i'}],
      [{id: 10, name: 'j'}, {id: 11, name: 'k'}, {id: 12, name: 'l'}],
      [{id: 13, name: 'm'}]
    ] : this.dataArray2D
    const rows = array2D.length
    const cols = array2D[0].length
    let blockCount = 0
    let paddedArray = []
    let index = 0
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (array2D[row] != undefined && array2D[row][col] != undefined) {
          paddedArray.push({...array2D[row][col], index, index0: index, hover: false, show: true})
          blockCount++
        }
        else paddedArray.push({id: MISC.getUuid4(), show: false})
        index++
      }
    }
    return {
      rows,
      cols,
      array2D,
      paddedArray,
      paddedArray0: undefined,
      drag: undefined,
      fakeElement: undefined,
      fakeBlockText: undefined,
      containerElement: undefined,
      blockSize: undefined,
      blockCount,
      gridsRect: undefined,
      gridHoverIndex: undefined
    }
  },
  methods: {
    listen__temp__onclick: function () {
      let paddedArray = []
      for (let i = 0; i < this.paddedArray.length; i++) paddedArray.push(this.paddedArray[i])
      const temp = paddedArray[3]
      paddedArray[3] = paddedArray[0]
      paddedArray[0] = temp
      this.paddedArray = paddedArray
    },
    listen__block__onmouseenter: function (block) {
      if (this.drag == undefined) {
        block.hover = true
      }
    },
    listen__block__onmouseleave: function (block) {
      if (this.drag == undefined) {
        block.hover = false
      }
    },
    listen__block__onmousedown: function (e, block, index) {
      const element = e.target
      block.hover = false
      block.show = false
      let parentPaddingLeft = parseInt(getComputedStyle(element.parentElement).paddingLeft)
      if (isNaN(parentPaddingLeft)) parentPaddingLeft = 0
      let parentPaddingTop = parseInt(getComputedStyle(element.parentElement).paddingTop)
      if (isNaN(parentPaddingTop)) parentPaddingTop = 0
      const x0 = e.pageX - (element.offsetLeft - parentPaddingLeft + this.containerElement.offsetLeft)
      const y0 = e.pageY - (element.offsetTop - parentPaddingTop + this.containerElement.offsetTop)
      this.fakeElement.querySelector('span').textContent = element.querySelector('span').textContent
      this.drag = {
        element,
        block,
        index,
        x0,
        y0
      }
      this.fakeElement.style.left = `${e.pageX - x0}px`
      this.fakeElement.style.top = `${e.pageY - y0}px`
    },
    listen__block__onmousemove: function (e) {
      if (this.drag != undefined) {
        this.fakeElement.style.left = `${e.pageX - this.drag.x0}px`
        this.fakeElement.style.top = `${e.pageY - this.drag.y0}px`

        const r1 = {
          x0: this.fakeElement.offsetLeft,
          x1: this.fakeElement.offsetLeft +  this.fakeElement.offsetWidth,
          y0: this.fakeElement.offsetTop,
          y1: this.fakeElement.offsetTop +  this.fakeElement.offsetHeight
        }

        const gridsRect = this.gridsRect
        let maxIndex = -1
        let maxArea = -1
        for (let i = 0; i < gridsRect.length; i++) {
          const area = this.getIntersectionArea(r1, gridsRect[i])
          if (area > maxArea) {
            maxIndex = i
            maxArea = area
          }
        }
        if (maxIndex != this.drag.index && maxArea > this.blockSize * 0.5) {
          this.gridHoverIndex = maxIndex
        } else {
          this.gridHoverIndex = undefined
        }
      }
    },
    listen__body__onmouseup: function () {
      if (this.drag != undefined) {
        this.drag.block.show = true
        this.drag = undefined
        if (this.paddedArray0 != undefined) {
          this.paddedArray0 = undefined
          let paddedArray = this.paddedArray
          for (let i = 0; i < paddedArray.length; i++) {
            paddedArray[i].index = i
          }
        }
        this.gridHoverIndex = undefined
      }
    },
    listen__x__onresize: function () {
      const elContainerWidth = parseInt(getComputedStyle(this.containerElement).width) 
      const elContainerHeight = parseInt(getComputedStyle(this.containerElement).height)
      const blockWidth = parseInt(elContainerWidth / this.cols - marginWidth)
      const blockHeight = parseInt(elContainerHeight / this.rows - marginHeight)
      const gridWidth = parseInt(elContainerWidth / this.cols)
      const gridHeight = parseInt(elContainerHeight / this.rows)
      let blocks = this.$el.querySelectorAll('.container .block')
      let grids = this.$el.querySelectorAll('.container-grid .grid')
      for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.width = `${blockWidth}px`
        blocks[i].style.height = `${blockHeight}px`
        grids[i].style.width = `${gridWidth}px`
        grids[i].style.height = `${gridHeight}px`
        if (i % this.cols != 0) {
          blocks[i].style.marginLeft = `${marginWidth}px`
          grids[i].style.borderLeft = '1px solid rgba(50, 50, 50, 0.5)'
        } else {
          blocks[i].style.marginLeft = `${marginWidth / 2}px`
        }
        if (i >= this.cols) {
          grids[i].style.borderTop = '1px solid rgba(50, 50, 50, 0.5)'
        }
      }
      let fakeBlock = this.$el.querySelector('.body > .block.fake')
      fakeBlock.style.width = `${blockWidth}px`
      fakeBlock.style.height = `${blockHeight}px`

      for (let i = 0; i < grids.length; i++) {
        const grid = grids[i]
        this.gridsRect[i] = {
          x0: grid.offsetLeft,
          x1: grid.offsetLeft + grid.offsetWidth,
          y0: grid.offsetTop,
          y1: grid.offsetTop + grid.offsetHeight
        }
      }

      this.blockSize = blockWidth * blockHeight
    },
    getIntersectionArea: function (r1, r2) {
      const interX =  Math.min(r1.x1, r2.x1) - Math.max(r1.x0, r2.x0)
      const interY =  Math.min(r1.y1, r2.y1) - Math.max(r1.y0, r2.y0)
      return (interX < 0 && interY < 0) ? -1 : interX * interY
    },
    getBlockMargin: function (index) {
      const marginTop = index < this.cols ? marginHeight / 2 : marginHeight
      const marginBottom = (index >= this.cols * (this.rows - 1)) ? marginHeight / 2 : 0
      const marginLeft = index % this.cols != 0 ? marginWidth : marginWidth / 2
      return `${marginTop}px 0px ${marginBottom}px ${marginLeft}px`
    },
  },
  watch: {
    gridHoverIndex: function (gridHoverIndex) {
      if (gridHoverIndex != undefined) {
        if (this.paddedArray0 == undefined) this.paddedArray0 = this.paddedArray
        const paddedArray0 = this.paddedArray0
        const index = this.drag.index
        let paddedArray = new Array(paddedArray0.length)
        for (let i = 0; i < paddedArray0.length; i++) paddedArray[i] = paddedArray0[i]
        if (gridHoverIndex < this.blockCount) {
          paddedArray.splice(index, 1)
          paddedArray.splice(gridHoverIndex, 0, paddedArray0[index])
        } 
        else if (gridHoverIndex < paddedArray0.length) {
          paddedArray.splice(index, 1)
          paddedArray.splice(this.blockCount - 1, 0, paddedArray0[index])
        }
        else {
          paddedArray.splice(index, 1)
          paddedArray.push(paddedArray0[index])
        }
        
        this.paddedArray = paddedArray
      } else {
        if (this.paddedArray0 != undefined) {
          this.paddedArray = this.paddedArray0
          this.paddedArray0 = undefined
          const blocks = this.$el.querySelectorAll('.container .block')
          for (let i = 0; i < blocks.length; i ++) blocks[i].style.pointerEvents = 'none'
          setTimeout(() => {
            for (let i = 0; i < blocks.length; i ++) blocks[i].style.pointerEvents = ''
          }, 1100)
        }
      }
    }
  },
  mounted () {
    // console.log('rearrange mounted')
    this.containerElement = this.$refs['container'].$el
    this.fakeElement = this.$el.querySelector('.block.fake')

    this.gridsRect = new Array(this.rows * this.cols)
    this.listen__x__onresize()
    elementResizeEvent(this.$el, this._.debounce(this.listen__x__onresize, 10))
  },
  updated () {
    // console.log('rearrange updated')
  },
  beforeDestroy () {
    elementResizeEvent.unbind(this.$el)
  }
}
</script>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.body * {
  box-sizing: border-box;
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                              supported by Chrome and Opera */
}
.body .row {
  display: flex;
  flex-direction: row;
  flex: 1 0 0;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
}
.body .row:last-child {
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}
.body .row .col {
  flex: 1 0 0;
  border-left: 1px solid rgba(0, 0, 0, 0.25);
  padding: 10px;
}
.body .row .col:last-child {
  border-right: 1px solid rgba(0, 0, 0, 0.25);
}

.container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}
.body .block {
  display: flex;
  width: 30px;
  height: 30px;
  border:1px solid rgba(0, 0, 0, 0.2);
  border-radius: 9px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
  background: rgb(210, 210, 210);
}
.body .block span {
  display: inline-block;
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.container .block.hover {
  border:1px solid rgba(0, 0, 0, 1);
  background: rgb(240, 240, 240);
}
.container .block * {
  pointer-events: none;
}
.container .block span.changed {
  color: rgb(200, 50, 50);
}
.body .block.fake {
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgb(255, 255, 255);
}
.block-move {
  transition: transform 1s;
}
.block-enter, .block-leave-to {
  opacity: 0;
  transform: translateY(30px);
}


.container-grid {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.container-grid .grid.hover {
  background: #57a957;
}

</style>