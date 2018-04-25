import { Component } from '../../../../core/Component';
import { globalStore } from '../../../../core/DataStore';
import { POST_SOURCE } from '../../../../core/constants';

import { PostGroupItem } from './PostGroupItem/PostGroupItem';

const renderNode = (userId, userPostsNodes) =>
  $(`
    <div class="tab-pane fade" id="user-${userId}"/>
    </div>
  `).append(userPostsNodes);

export class PostGroup extends Component {
  async init(userId) {
    const userPosts = await globalStore
      .getStore(POST_SOURCE)
      .getFilteredData({ userId: parseInt(userId) });

    const userPostsNodes = await Promise.all(
      userPosts.map(async post => await new PostGroupItem().getNode(post))
    );

    return renderNode(userId, userPostsNodes);
  }
}
