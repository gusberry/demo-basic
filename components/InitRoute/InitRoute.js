import { Component } from '../../core/Component';

import { UserList } from './UsersList/UsersList';
import { PostList } from './PostList/PostList';

const renderNode = (userListNode, postListNode) => {
  const node = $(`
    <div class="row mb-3" id="users">
      <div class="col-md-3 mb-3 mb-md-0"></div>
      <div class="col-md-9"></div>
    </div>
  `);

  node.find('.col-md-3.mb-3.mb-md-0').append(userListNode);

  node.find('.col-md-9').append(postListNode);

  return node;
};

export class InitRoute extends Component {
  async init() {
    return renderNode(
      await new UserList().getNode(),
      await new PostList().getNode()
    );
  }
}
