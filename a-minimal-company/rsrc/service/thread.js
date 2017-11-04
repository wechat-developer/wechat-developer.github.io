function Thread() {
  this.thread = [];
}


Thread.prototype.append = function (router) {
  this.thread.push({ router });
}

Thread.prototype.submit = function (threadId, command) {
  const current = this.thread.pop();
  current.command = command;

  const { router } = current;
  if (router.nextPageId) {
    this.thread.push(current);
    return Promise.resolve(router.nextPageId);
  } else {
    throw new Error('NotImplementedException');
  }
}

Thread.prototype.log = function () {
  console.log('thread:', JSON.stringify(this.thread));
}

const thread = new Thread();
export default thread;
