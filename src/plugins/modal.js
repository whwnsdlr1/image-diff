import Modal from './Modal.vue'

export default {
  install: function (Vue, options) {
    const ModalConstructor = Vue.extend(Modal)
    Vue.prototype.$mModal = {
      show: function (type, data) {
        if (type === 'dialog') {
          const modalInstance = new ModalConstructor({ el: document.createElement('DIV'), data: function () { return { dDom: data.dom, dButtons: data.buttons } } })
          document.body.appendChild(modalInstance.$el)
        }
      }
    }
  }
}
