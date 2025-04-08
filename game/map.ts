export enum Habitats {
	cold = 1,
	warm = 2,
	shallow = 4,
	deep = 8,
	fresh = 16,
	salt = 32,
	reef = 64,
}
export interface ScreenObject {
	id: number;
	type: "Cu" | "C" | "Ter" | "P" | "H" | "Air" | "Bg" | "Wat" | "Sky";
	layerId:
		| "currents"
		| "ceilings"
		| "terrains"
		| "islands"
		| "props"
		| "platforms"
		| "hide-spaces"
		| "air-pockets"
		| "background-terrains"
		| "water"
		| "sky";
	points: {
		x: number;
		y: number;
	}[];
	x: number;
	y: number;
	position: {
		x: number;
		y: number;
	};
	size: {
		width: number;
		height: number;
	};
	settings: {
		collidable: boolean;
		angle: number;
		strength: number;
		foodIds: number[];
		count: number;
		firstSpawnMs: string | number | null;
		reSpawnMs: string | number | null;
		area: number;
		onlyOnWater: boolean;
		fishLevels: number[];
		animalCount: number;
		npcType: number;
		restrictMovement: boolean;
	};
	triggers: {
		actions: {
			type: number;
			data: {
				pos: {
					x: number;
					y: number;
				};
			};
		}[];
		delay: number;
		when: number;
	}[];
	texture: number;
	foodSpawnSettings: {
		foodIds: number[];
		count: number;
		firstSpawnMs: number | null;
		reSpawnMs: number | null;
		area: number;
	};
	rotation: number;
	pType: number;
	params: {
		text: string;
	};
	hSType: number;
	opacity: number;
	borderColor: number;
	colors: number[];
	hasBorder: boolean;
}
export interface RawGameMap {
	screenObjects: ScreenObject[];
	settings: {
		gravity: number;
	};
	worldSize: {
		width: string;
		height: string;
	};
}
export interface GameMap {
	screenObjects: {
		[K in ScreenObject["layerId"]]?: ScreenObject[];
	};
	settings: {
		gravity: number;
	};
	worldSize: {
		width: string;
		height: string;
	};
}

export function loadMap(rawData: RawGameMap): GameMap {
	rawData.screenObjects = rawData.screenObjects.filter(
		(l) => !["animals", "npc-spawns", "triggers", "currents"].includes(l.layerId),
	);
	const tempObj: Partial<{
		[K in ScreenObject["layerId"]]: ScreenObject[];
	}> = {};
	for (const l of rawData.screenObjects) {
		if (!tempObj[l.layerId]) tempObj[l.layerId] = [];
		(tempObj[l.layerId] as ScreenObject[]).push(l);
	}

	const data: GameMap = { ...rawData, screenObjects: tempObj };
	if (!data.settings) {
		data.settings = { gravity: 9.8 };
	}
	if (!data.settings.gravity) {
		data.settings.gravity = 9.8;
	}
	// ["sky", "water", "air-pockets", "background-terrains", "platforms", "islands", "terrains", "ceilings"].forEach((l) => {
	// 	var newShapesList = [];
	// 	if (!data.screenObjects[l]) return;
	// 	data.screenObjects[l]?.forEach((shape) => {
	// 		const poly = {
	// 			type: "Feature",
	// 			geometry: {
	// 				type: "Polygon",
	// 				coordinates: [shape.points.map((p) => [p.x, p.y])]
	// 			}
	// 		};
	// 		const splitPoly = simplepolygon(poly);
	// 		splitPoly.features.forEach((feature) => {
	// 			newShapesList.push({
	// 				...shape,
	// 				points: feature.geometry.coordinates[0].map((p) => ({ x: p[0], y: p[1] }))
	// 			});
	// 		});
	// 	});
	// 	data.screenObjects[l] = newShapesList;
	// });
	return data;
}
