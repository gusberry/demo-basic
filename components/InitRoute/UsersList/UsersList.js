import { Component } from '../../../core/Component';
import { globalStore } from '../../../core/DataStore';
import { USER_SOURCE } from '../../../core/constants';

import { UserListItem } from './UserListItem/UserListItem';

const renderNode = itemNodes =>
  $(`
  <div class="list-group" role="tablist">
    <div class="list-group-item list-group-item-primary text-bold">Users</div>
  </div>
  `).append(itemNodes);

export class UserList extends Component {
  async init() {
    const users = await globalStore.getStore(USER_SOURCE).getData();

    const itemNodes = await Promise.all(
      users.map(async user => await new UserListItem().getNode(user))
    );

    return renderNode(itemNodes);
  }
}
