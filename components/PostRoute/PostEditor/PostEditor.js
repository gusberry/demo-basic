import { Component } from '../../../core/Component';
import { globalStore } from '../../../core/DataStore';
import { POST_SOURCE, USER_SOURCE } from '../../../core/constants';

const renderNode = (
  post,
  onTextEdit,
  onEditClick,
  onDeleteClick,
  onSaveClick
) => {
  const node = $(`
    <div class="card mb-3 bg-info">
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${post.author}</h6>
        <p>${post.body}</p>
        <button type="button" class="btn btn-sm btn-outline-light">
          <i class="material-icons text-warning">mode_edit</i>
        </button>
        <a href="#/" class="card-link text-white btn btn-outline-light btn-sm">
          <i class="material-icons text-danger">delete</i>
        </a>
        <button type="button" class="btn btn-outline-light invisible">
          Save
        </button>
      </div>
    </div>
  `);

  const textNode = node.find('p');
  const editButton = node.find('.btn-sm');
  const deleteButton = node.find('a');
  const saveButton = node.find('.invisible');

  const toggleEditable = () => {
    editButton.toggleClass('active');
    deleteButton.toggleClass('invisible');
    saveButton.toggleClass('invisible');
    textNode.attr('contenteditable', (_, attr) => attr !== 'true');
    textNode.focus();
  };

  const setText = text => textNode.text(text);
  const handleKeyboard = e =>
    onTextEdit(textNode.text(), e.which, e.preventDefault.bind(e));

  textNode.keydown(handleKeyboard);
  textNode.keyup(handleKeyboard);
  editButton.click(() => onEditClick(toggleEditable, setText));
  deleteButton.click(onDeleteClick);
  saveButton.click(() => onSaveClick(toggleEditable));

  return node;
};

export class PostEditor extends Component {
  async init(postId) {
    const [post] = await globalStore
      .getStore(POST_SOURCE)
      .getFilteredData({ id: parseInt(postId) });
    const [author] = await globalStore
      .getStore(USER_SOURCE)
      .getFilteredData({ id: parseInt(post.userId) });

    this.originalText = this.editedText = post.body;

    const node = renderNode(
      { ...post, author: author.name },
      this.onTextEdit.bind(this),
      this.onEditClick.bind(this),
      this.getOnDeleteClick(postId),
      this.getOnSaveClick(postId)
    );

    return node;
  }

  onEditClick(toggleEdit, setText) {
    toggleEdit();
    setText(this.originalText);
  }

  getOnDeleteClick(postId) {
    return async () =>
      await globalStore.getStore(POST_SOURCE).deleteItem(postId);
  }

  getOnSaveClick(postId) {
    return async toggleEditable => {
      await globalStore
        .getStore(POST_SOURCE)
        .updateItem(postId, { body: this.editedText });

      this.originalText = this.editedText;

      toggleEditable();
    };
  }

  onTextEdit(text, keyCode, prevent) {
    if (keyCode === 13) {
      prevent();
    }

    this.editedText = text;
  }
}
