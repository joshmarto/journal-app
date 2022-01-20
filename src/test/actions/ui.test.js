import { finishLoading, removeError, setError, startLoading } from "../../actions/ui"
import { types } from "../../types/types";

describe('Tests in ui actions', () => {
    test('All actions should work', () => {
        const setErrorAction = setError('Error found');

        expect( setErrorAction ).toEqual({
            type: types.uiSetError,
            payload: 'Error found',
        });

        const removeErrorAction = removeError();
        expect( removeErrorAction ).toEqual({
            type: types.uiRemoveError,
        });

        const startLoadingAction = startLoading();
        expect( startLoadingAction ).toEqual({
            type: types.uiStartLoading,
        });
        
        const finishLoadingAction = finishLoading();
        expect( finishLoadingAction ).toEqual({
            type: types.uiFinishLoading,
        });
    })
    
})
