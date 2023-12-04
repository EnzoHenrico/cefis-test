function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-2">
        <div className="container-fluid collapse navbar-collapse">
          <a className="navbar-brand" href="/">
            Cursos.com
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/chat">
                  Chat
                </a>
              </li>
            </ul>
            <div className="d-flex">
              <a
                className="btn btn-outline-danger"
                aria-current="page"
                href="api/auth/signout"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
