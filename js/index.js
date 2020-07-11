new Vue({
  el: '#app',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      isProcessing: false,
    };
  },
  methods: {
    signin() {
      const apiPath = 'https://course-ec-api.hexschool.io/api/';
      const url = `${apiPath}auth/login`;
      this.isProcessing = true;
      axios
        .post(url, this.user)
        .then((res) => {
          this.isProcessing = false;
          const token = res.data.token;
          const expired = res.data.expired;
          document.cookie = `hexToken=${token}; expires=${new Date(
            expired * 1000
          )}; path=/`;
          window.location = 'products.html';
        })
        .catch((err) => {
          console.log(err);
          this.isProcessing = false;
          Swal.fire({
            toast: true,
            text: '帳號、密碼不符',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
            padding: '2em',
          });
        });
    },
  },
});
