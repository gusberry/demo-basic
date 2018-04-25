import { Component } from '../../../../../core/Component';

const renderNode = post =>
  $(
    `<a class="list-group-item list-group-item-action" href="#/posts/${
      post.id
    }">${post.title}</a>`
  );

export class PostGroupItem extends Component {
  async init(post) {
    return renderNode(post);
  }
}
