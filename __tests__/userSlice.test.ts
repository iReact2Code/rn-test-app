import { UserState } from '../src/store/slices/userSlice';
import userReducer, {
  addAddress,
  removeAddress,
  updateProfile,
} from '../src/store/slices/userSlice';

describe('userSlice', () => {
  const initialState: UserState = {
    isAuthenticated: false,
    token: null,
    profile: null,
    addresses: [],
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle addAddress', () => {
    const state = userReducer(
      initialState,
      addAddress({ id: '1', line1: 'A', city: 'B', country: 'C' }),
    );
    expect(state.addresses.length).toBe(1);
    expect(state.addresses[0].line1).toBe('A');
  });

  it('should handle removeAddress', () => {
    const stateWithAddress = {
      ...initialState,
      addresses: [{ id: '1', line1: 'A', city: 'B', country: 'C' }],
    };
    const state = userReducer(stateWithAddress, removeAddress('1'));
    expect(state.addresses.length).toBe(0);
  });

  it('should handle updateProfile', () => {
    const stateWithProfile = {
      ...initialState,
      profile: { id: 'u1', name: 'N', email: 'e@e.com' },
    };
    const state = userReducer(
      stateWithProfile,
      updateProfile({ name: 'New', phone: '123' }),
    );
    expect(state.profile?.name).toBe('New');
    expect(state.profile?.phone).toBe('123');
  });
});
