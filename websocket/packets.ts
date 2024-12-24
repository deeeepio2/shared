export enum ctsPacketIds {
	name = 1,
	move = 2,
	boost = 3,
}
export interface ctsPacketData {
	[ctsPacketIds.name]: {
		name: string;
	};

	[ctsPacketIds.move]: {
		x: number;
		y: number;
	};

	[ctsPacketIds.boost]: {
		duration: number;
	};
}

export enum stcPacketIds {
	update = 1 | 0b1000000,
}
export interface stcPacketData {
	[stcPacketIds.update]: {
		animals: {
			updateLength: number;
			updateList: {
				id: number;
				name: string;
				health: number;
				fishLevel: number;
				x: number;
				y: number;
				rotation: number;
			}[];
			removeLength: number;
			removeList: number[];
		};
		foods: {
			addLength: number;
			addList: {
				id: number;
				type: number;
				x: number;
				y: number;
			}[];
			removeLength: number;
			removeList: number[];
		};
	};
}
