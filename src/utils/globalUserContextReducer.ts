import { MessageType, UserType } from "./authReducer";

export type StateType = {
	selectedUser: UserType | null;
};
export type ActionTypes =
	| { type: "SELECT_USER"; payload: { user: UserType } }
	| { type: "REMOVE_USER" }
	| { type: "UPDATE_MESSAGE"; payload: { receivedMessage: MessageType } };

export const globalUserContextReducer = (
	state: StateType,
	action: ActionTypes
) => {
	switch (action.type) {
		case "SELECT_USER":
			return { selectedUser: action.payload.user };
		case "REMOVE_USER":
			return { selectedUser: null };
		case "UPDATE_MESSAGE":
			return {
				...state,
				receivedMessages: [action.payload.receivedMessage],
			};
		default:
			return state;
	}
};
