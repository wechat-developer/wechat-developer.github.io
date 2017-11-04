import $http from 'vanilla.js/axios/http';
import routers from './routers';
import thread from './thread';


function fetchPage(pageId) {
  return $http.get(`${head.API_PATH}/pages/${pageId}.json`);
}


function logger(pass) {
  routers.log();
  thread.log();
  return Promise.resolve(pass);
}


export default function next(threadId, command) {
  return routers.init()
    .then(() => {
      if (command) {
        return thread.submit(threadId, command).then((nextPageId) => {
          return routers.next().then((router) => {
            thread.append(router);
            return Promise.resolve(nextPageId);
          });
        });
      } else {
        // 1st page
        return routers.next().then((router) => {
          thread.append(router);
          return Promise.resolve(router.pageId);
        });
      }
    })
    .then(fetchPage)
    // .then(logger) // debug log
    .catch(err => console.error(err));
}
