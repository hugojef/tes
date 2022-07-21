'use babel';

import TesView from './tes-view';
import { CompositeDisposable } from 'atom';

export default {

  tesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tesView = new TesView(state.tesViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tesView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tes:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tesView.destroy();
  },

  serialize() {
    return {
      tesViewState: this.tesView.serialize()
    };
  },

  toggle() {
    console.log('Tes was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
