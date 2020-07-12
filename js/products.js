const apiPath = 'https://course-ec-api.hexschool.io/api/';

//分頁元件
Vue.component('Pagination', {
  template: '#pagination',
  props: ['pages'],
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    },
  },
});

Vue.component('Navbar', {
  template: '#navbar',
  methods: {
    signout() {
      document.cookie = `hexToken=; expires=; path=/`;
      window.location = 'index.html';
    },
  },
});

Vue.component('Sidebar', {
  template: '#sidebar',
});

Vue.component('Spinner', {
  template: '#spinner',
});

new Vue({
  el: '#app',
  data() {
    return {
      user: {
        token: '',
        uuid: '28c229ba-c1c4-47f6-9be0-210c99409aa6',
      },
      products: [],
      tempProduct: {
        imageUrl: [],
      },
      pagination: {},
      isNew: true,
      state: {
        fileUpLoading: false,
      },
      isLoading: true,
    };
  },
  created() {
    this.user.token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    if (this.user.token === '') {
      window.location = 'index.html';
    } else {
      this.getProducts();
    }
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const url = `${apiPath}${vm.user.uuid}/admin/ec/products?page=${page}`;
      axios.defaults.headers['Authorization'] = `Bearer ${vm.user.token}`;
      axios
        .get(url)
        .then((res) => {
          vm.isLoading = false;
          vm.products = res.data.data;
          vm.pagination = res.data.meta.pagination;
        })
        .catch((err) => {
          console.log(err);
          vm.isLoading = false;
        });
    },
    openModal(type, item) {
      const vm = this;
      if (type === 'new') {
        vm.tempProduct = {
          imageUrl: [],
        };
        $('#productModal').modal('show');
        this.isNew = true;
      } else if (type === 'edit') {
        vm.tempProduct = Object.assign({}, item);
        vm.getPorduct(vm.tempProduct.id);
        $('#productModal').modal('show');
        this.isNew = false;
      } else if (type === 'del') {
        vm.tempProduct = Object.assign({}, item);
        $('#delProductModal').modal('show');
      }
    },
    getPorduct(id) {
      const vm = this;
      const url = `${apiPath}${vm.user.uuid}/admin/ec/product/${id}`;
      axios.defaults.headers['Authorization'] = `Bearer ${vm.user.token}`;
      axios.get(url).then((res) => {
        console.log(res);
        vm.tempProduct = res.data.data;
      });
    },
    updateProduct() {
      const vm = this;
      let url = `${apiPath}${this.user.uuid}/admin/ec/product`;
      axios.defaults.headers['Authorization'] = `Bearer ${vm.user.token}`;
      let httpMethod = 'post';
      if (!vm.isNew) {
        url = `${apiPath}${this.user.uuid}/admin/ec/product/${vm.tempProduct.id}`;
        httpMethod = 'patch';
      }

      axios[httpMethod](url, vm.tempProduct)
        .then((res) => {
          Swal.fire({
            toast: true,
            text: '編輯成功',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            padding: '2em',
          });
          vm.getProducts();
        })
        .catch((err) => {
          Swal.fire({
            toast: true,
            text: '編輯失敗',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
            padding: '2em',
          });
        });
      $('#productModal').modal('hide');
    },
    uploadFile() {
      // 選取 DOM 中的檔案資訊
      const vm = this;
      const uploadedfile = document.querySelector('#customFile').files[0];

      // 轉成 Form Data
      const formData = new FormData();
      formData.append('file', uploadedfile);
      vm.state.fileUpLoading = true;
      const url = `${apiPath}${this.user.uuid}/admin/storage`;
      axios.defaults.headers['Authorization'] = `Bearer ${this.user.token}`;
      axios
        .post(url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          if (res.status === 200) {
            vm.state.fileUpLoading = false;
            this.tempProduct.imageUrl.push(res.data.data.path);
          }
        })
        .catch((err) => {
          Swal.fire({
            toast: true,
            text: '檔案格式不符',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
            padding: '2em',
          });
        });
    },
    delProduct() {
      const vm = this;
      const url = `${apiPath}${this.user.uuid}/admin/ec/product/${vm.tempProduct.id}`;
      axios.defaults.headers['Authorization'] = `Bearer ${vm.user.token}`;
      axios
        .delete(url)
        .then((res) => {
          Swal.fire({
            toast: true,
            text: '刪除成功',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            padding: '2em',
          });
          vm.getProducts();
        })
        .catch((err) => {
          Swal.fire({
            toast: true,
            text: '刪除失敗',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
            padding: '2em',
          });
        });
      $('#delProductModal').modal('hide');
    },
  },
});
