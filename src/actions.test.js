import * as actions from './actions';
import * as types from './constants';

describe('actions', () => {
    it('opens app', () => {
        const text = 'Finish docs'
        const expectedAction = {
            type: types.OPEN_APP,
            text
        }
        expect(actions.addTodo(text)).toEqual(expectedAction)
    })
})