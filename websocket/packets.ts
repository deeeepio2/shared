export enum packetIds {
	name = 1,
	move = 2,
	boost = 3,
}

export interface packetData {
	[packetIds.name]: {
		name: string;
	};

	[packetIds.move]: {
		x: number;
		y: number;
	};

	[packetIds.boost]: {
		duration: number;
	};
}
