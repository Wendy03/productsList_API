export default {
  template: ` <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
          <h6
            class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
          >
            <span class="mb-4">管理員</span>
            <a
              class="d-flex align-items-center text-muted"
              href="#"
               aria-label="Add a new report"
            >
            <span data-feather="plus-circle"></span>
            </a>
          </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item active">
                <a class="nav-link">
                  <i class="fas fa-box-open"></i>
                    產品列表
                  </a>
              </li>
              <li class="nav-item">
                <a class="nav-link">
                  <i class="far fa-list-alt"></i>
                    訂單列表
                  </a>
              </li>
              <li class="nav-item">
                <a class="nav-link">
                  <i class="fas fa-ticket-alt"></i>
                    優惠券
                  </a>
              </li>
            </ul>
          </div>
      </nav>`,
};
