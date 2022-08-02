import {Header} from "../components/Header";

const Home = () => {
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <div className="layout-page">
            <Header />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive text-nowrap">
                      <table className="table table-sm">
                        <thead>
                        <tr>
                          <th>Nama</th>
                          <th>SKU</th>
                          <th>Harga</th>
                          <th>QTY</th>
                          <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">

                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;