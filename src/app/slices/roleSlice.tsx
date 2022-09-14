import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import Role from "../interfaces/Role";

interface IState {
    selectedRole: Role | null;
}

const initialState: IState = {
    selectedRole: null,
};

export const roleSlice: Slice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setSelectedRole(state, action: PayloadAction<Role>) {
            state.selectedRole = action.payload;
        },
        resetSelectedRole(state) {
            state.selectedRole = null;
        },
    },
});

export const { setSelectedRole, resetSelectedRole } = roleSlice.actions;

export default roleSlice.reducer;
