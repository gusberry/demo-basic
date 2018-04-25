import { Component } from '../../../../core/Component';

const renderNode = user =>
  $(`
<a href="#user-${
    user.id
  }" data-toggle="list" class="list-group-item list-group-item-action">${
    user.name
  }</a>
`);

export class UserListItem extends Component {
  async init(user) {
    return renderNode(user);
  }
}
