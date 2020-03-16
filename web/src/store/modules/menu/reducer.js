import produce from 'immer';

const INITIAL_STATE = [
  {
    name: 'ENCOMENDAS',
    path: '/orders',
    selected: true,
  },
  {
    name: 'ENTREGADORES',
    path: '/deliverymen',
    selected: false,
  },
  {
    name: 'DESTINATÁRIOS',
    path: '/recipients',
    selected: false,
  },
  {
    name: 'PROBLEMAS',
    path: '/problems',
    selected: false,
  },
];

export default function menu(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    console.tron.log(action.type);
    switch (action.type) {
      case '@menu/ENTER_ITEM': {
        draft.map(item => {
          if (item.name === action.payload.name) {
            item.selected = true;
          } else {
            item.selected = false;
          }
          return item;
        });
        break;
      }
      default:
    }
  });
}
