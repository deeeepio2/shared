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
	addEntities = 1 | 0b1000000,
	updateTransforms = 2 | 0b1000000,
	updateFishLevels = 3 | 0b1000000,
	updateHealth = 4 | 0b1000000,
	updateXp = 5 | 0b1000000,
	updateFoods = 6 | 0b1000000,
}
export interface stcPacketData {
	[stcPacketIds.addEntities]: {
		length: number;
		list: {
			id: number;
			fishLevel: number;
			name: string;
			health: number;
			x: number;
			y: number;
			rotation: number;
		}[];
	};
	[stcPacketIds.updateTransforms]: {
		updateLength: number;
		updateList: {
			id: number;
			x: number;
			y: number;
			rotation: number;
		}[];
		removeLength: number;
		removeList: number[];
	};
	[stcPacketIds.updateFishLevels]: {
		updateLength: number;
		updateList: {
			id: number;
			fishLevel: number;
		}[];
	};
	[stcPacketIds.updateHealth]: {
		updateLength: number;
		updateList: {
			id: number;
			count: number;
			hpChanges: number[];
		}[];
	};
	[stcPacketIds.updateXp]: {
		updateLength: number;
		updateList: {
			id: number;
			xp: number;
		}[];
	};
	[stcPacketIds.updateFoods]: {
		addLength: number;
		addList: {
			id: number;
			x: number;
			y: number;
		}[];
		updateLength: number;
		updateList: {
			id: number;
			x: number;
			y: number;
		}[];
		removeLength: number;
		removeList: number[];
	};
}
