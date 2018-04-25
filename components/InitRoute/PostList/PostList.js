import { Component } from '../../../core/Component';
import { globalStore } from '../../../core/DataStore';
import { USER_SOURCE } from '../../../core/constants';

import { PostGroup } from './PostGroup/PostGroup';

const renderNode = groupNodes =>
  $(`
    <div class="col-md-9">
      <div class="tab-content"></div>
    </div>
  `)
    .find('.tab-content')
    .append(groupNodes);

export class PostList extends Component {
  async init() {
    const users = await globalStore.getStore(USER_SOURCE).getData();

    const itemNodes = await Promise.all(
      users.map(async user => await new PostGroup().getNode(user.id))
    );

    return renderNode(itemNodes);
  }
}
