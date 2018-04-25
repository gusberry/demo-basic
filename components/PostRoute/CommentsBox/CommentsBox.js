import { Component } from '../../../core/Component';

import {
  COMMENTS_SOURCE,
  POST_SOURCE,
  USER_SOURCE
} from '../../../core/constants';
import { globalStore } from '../../../core/DataStore';

const renderComment = comment =>
  $(`
    <div class="comment">
      <p class="text-right mb-0 text-dark">${comment.name}</p>
      <p class="text-right font-italic font-weight-light text-muted">- ${
        comment.email
      }</p>
    </div>
  `);

const renderNode = (comments, onInputChange, onButtonClick) => {
  const node = $(`
    <div>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="..." aria-label="Comment" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">Comment</button>
        </div>
      </div>
    </div>
  `);

  node.append(comments.map(renderComment));

  const input = node.find('input');

  input.change(e => onInputChange(e.target.value));
  node.find('button').click(e =>
    onButtonClick(comment => {
      renderComment(comment).insertAfter(node.find('.input-group.mb-3'));
      input.val('');
    })
  );

  return node;
};

export class CommentsBox extends Component {
  async init(postId) {
    const postsComments = await globalStore
      .getStore(COMMENTS_SOURCE)
      .getFilteredData({
        postId: parseInt(postId)
      });
    const [{ userId }] = await globalStore
      .getStore(POST_SOURCE)
      .getFilteredData({ id: parseInt(postId) });

    const [user] = await globalStore
      .getStore(USER_SOURCE)
      .getFilteredData({ id: parseInt(userId) });

    this.postUser = user;
    this.postId = postId;

    return renderNode(
      postsComments,
      this.onCommentTextChange.bind(this),
      this.onSubmitComment.bind(this)
    );
  }

  onCommentTextChange(text) {
    this.commentText = text;
  }

  async onSubmitComment(onSubmit) {
    const newComment = await globalStore.getStore(COMMENTS_SOURCE).addItem({
      name: this.commentText,
      postId: this.postId,
      email: this.postUser.email
    });

    onSubmit(newComment);
  }
}
