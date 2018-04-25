import { COMMENTS_SOURCE } from '../../core/constants';
import { Component } from '../../core/Component';
import { globalStore } from '../../core/DataStore';

import { PostEditor } from './PostEditor/PostEditor';
import { CommentsBox } from './CommentsBox/CommentsBox';

const renderNode = (postEditorNode, commentBoxNode) => {
  const node = $(`
    <div class="row" id="posts">
      <div class="col">
        <div class="row">
          <div class="col"></div>
        </div>

        <div class="row justify-content-center">
          <div class="col-lg-6"></div>
        </div>
      </div>
    </div>
  `);

  node.find('.col .row .col').append(postEditorNode);
  node.find('.col-lg-6').append(commentBoxNode);

  return node;
};

export class PostRoute extends Component {
  async init(postId) {
    return renderNode(
      await new PostEditor().getNode(postId),
      await new CommentsBox().getNode(postId)
    );
  }
}
