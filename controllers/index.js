// Lấy danh sách product
function layDanhSachProduct() {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetAll",
    method: "GET",
    // responseType: "json",
  });

  promise.then(function (result) {
    console.log(result.data);
    renderTableProduct(result.data);
  });

  promise.catch(function (err) {
    console.log(err);
  });
}

// load browser
window.onload = function () {
  layDanhSachProduct();
};

layDanhSachProduct();

// renderTable
function renderTableProduct(arrProduct) {
  var html = "";

  for (var i = 0; i < arrProduct.length; i++) {
    var p = arrProduct[i];
    html += `
        <tr>
            <td>${p.id}</td>
            <td><image style="width: 50px" src="${p.img}" alt="${p.name}"></td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.description}</td>
            <td>${p.type}</td>
            <td><button class="btn btn-danger" id = "btnXoa" onclick="xoaProduct(${p.id})">
            <i class="fas fa-trash"></i></button>
            <button class="btn btn-primary" id = "btnXoa" onclick="chinhSuaProduct(${p.id})">
            <i class="fas fa-edit"></i></button>
            
            </td>
        </tr>
    `;
  }

  document.querySelector("#tbProduct").innerHTML = html;
}

// thêm sản phẩm
document.querySelector("#btnCreate").onclick = function () {
  var p = new Product();
  p.id = document.querySelector("#id").value;
  p.img = document.querySelector("#image").value;
  p.name = document.querySelector("#productName").value;
  p.price = document.querySelector("#price").value;
  p.type = document.querySelector("#slProductType").value;
  p.description = document.querySelector("#productDesc").value;

  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/CreateProduct",
    method: "POST",
    data: p,
  });

  promise.then(function (result) {
    console.log("Thêm sản phẩm: ", result.data);
    layDanhSachProduct();
  });

  promise.catch(function (err) {
    console.log(err);
  });
};

// Hàm xóa
function xoaProduct(maProduct) {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/DeleteProduct/" + maProduct,
    method: "DELETE",
  });

  promise.then(function (result) {
    layDanhSachProduct();
  });

  promise.catch(function (err) {
    console.log(err);
  });
}

// Hàm sửa
function chinhSuaProduct(maProduct) {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetById/" + maProduct,
    method: "GET",
  });

  promise.then(function (result) {
    console.log(result.data);
    document.querySelector("#id").value = result.data.id;
    document.querySelector("#image").value = result.data.img;
    document.querySelector("#productName").value = result.data.name;
    document.querySelector("#price").value = result.data.price;
    document.querySelector("#slProductType").value = result.data.type;
    document.querySelector("#productDesc").value = result.data.description;
  });

  promise.catch(function (err) {
    console.log(err);
  });
}

document.querySelector("#btnUpdate").onclick = function () {
  var pUpdate = new Product();
  pUpdate.id = document.querySelector("#id").value;
  pUpdate.img = document.querySelector("#image").value;
  pUpdate.name = document.querySelector("#productName").value;
  pUpdate.price = document.querySelector("#price").value;
  pUpdate.type = document.querySelector("#slProductType").value;
  pUpdate.description = document.querySelector("#productDesc").value;

  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/UpdateProduct/" + pUpdate.id,
    method: "PUT",
    data: pUpdate,
  });

  promise.then(function (result) {
    layDanhSachProduct();
  });

  promise.catch(function (err) {
    console.log(err);
  });
};

// Search
document.querySelector("#btnSearch").onclick = function (e) {
  e.preventDefault();
  var search = document.querySelector("#txtSearch").value;
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/SearchByName?name=" + search,
    method: "GET",
  });
  if (search === "") {
    layDanhSachProduct();
  } else {
    promise.then(function (result) {
      var productSearch = result.data;

      // console.log(productSearch);
      // console.log("search", renderTableProduct(productSearch));
      // layDanhSachProduct();
      renderTableProduct(productSearch);
    });

    promise.catch(function (err) {
      var html = `
        <tr class="text-danger text-uppercase font-weight-bold">
            <td>
            Không tìm thấy sản phẩm tên: ${search}
            </td>
        
        </tr>`;
      document.querySelector("#tbProduct").innerHTML = html;
      console.log(err);
    });
  }
};
