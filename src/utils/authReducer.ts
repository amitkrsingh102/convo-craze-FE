export type MessageType = {
	text: string;
	sender?: UserType;
	receiver?: UserType;
	sendAt: string;
};
export type UserType = {
	id?: string;
	email: string;
	userName: string;
	avatarImage: number;
	onlineStatus: boolean;
	createdAt?: string;
	sentMessages?: MessageType[];
	receivedMessages?: MessageType[];
};
export type StateType = {
	user: UserType | null;
};

export type ActionType =
	| { type: "LOGIN"; payload: { user: UserType } }
	| { type: "LOGOUT" };

export const authReducer = (state: StateType, action: ActionType) => {
	switch (action.type) {
		case "LOGIN":
			return { user: action.payload.user };
		case "LOGOUT":
			return { user: null };
		default:
			return state;
	}
};
