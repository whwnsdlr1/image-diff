export default {
  install: function (Vue) {
    let mPopover = document.createElement('DIV')
    mPopover.style.position = 'absolute'
    mPopover.style.display = 'none'
    mPopover.style.top = '0px'
    mPopover.style.left = '0px'
    mPopover.style.background = '#FFFFFF'
    mPopover.style.border = '1px solid rgb(80, 80, 80)'
    mPopover.style.borderRadius = '5px'
    mPopover.style.zIndex = '100000'
    document.body.appendChild(mPopover)
    let mPopoverRow0 = document.createElement('DIV')
    mPopoverRow0.style.fontSize = '12px'
    mPopoverRow0.style.fontWeight = 'bold'
    mPopoverRow0.style.borderBottom = '1px solid rgb(80, 80, 80)'
    mPopoverRow0.style.background = 'rgb(240, 240, 255)'
    mPopoverRow0.style.padding = '3px 10px'
    mPopoverRow0.style.borderTopLeftRadius = '5px'
    mPopoverRow0.style.borderTopRightRadius = '5px'
    mPopover.appendChild(mPopoverRow0)
    let mPopoverRow1 = document.createElement('DIV')
    mPopoverRow1.style.fontSize = '12px'
    mPopoverRow1.style.padding = '3px 10px'
    mPopover.appendChild(mPopoverRow1)

    function onmouseenter (el, value) {
      if (value.show == true) {
        const rect = el.getBoundingClientRect()
        mPopoverRow0.textContent = el.getAttribute('data-title')
        mPopoverRow1.innerHTML = value.string.replace(/\n/ig, '<br />')
        mPopover.style.display = 'block'
        const left = rect.left
        const top = rect.top + rect.height + 10
        mPopover.style.left = `${left}px`
        mPopover.style.top = `${top}px`
      }
    }

    Vue.directive('m-popover', {
      inserted: function (el, param) {
        el.onmouseenter = function () {
          onmouseenter(el, param.value)
        }
        el.onmouseleave = function () {
          mPopover.style.display = 'none'
        }
      }
    })
  }
}
