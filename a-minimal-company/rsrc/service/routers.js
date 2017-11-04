import $http from 'vanilla.js/axios/http';


function Routers() {
  this.routers = null;
}

Routers.prototype.init = function () {
  if (this.routers) {
    return Promise.resolve(this.routers);
  } else {
    return $http.get(`${head.API_PATH}/routers.json`).then((data) => {
      // console.log(JSON.stringify(data));
      this.routers = data;
      return Promise.resolve(this.routers);
    });
  }
}

Routers.prototype.next = function () {
  return this.init().then(() => {
    const router = this.routers.shift();
    return Promise.resolve(router);
  })
}

Routers.prototype.log = function () {
  console.log('routers:', JSON.stringify(this.routers));
}

const routers = new Routers();
export default routers;
