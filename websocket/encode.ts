import { type ctsPacketData, ctsPacketIds, type stcPacketData, stcPacketIds } from "./packets.ts";

export const encode = <T extends ctsPacketIds | stcPacketIds>(
	packetType: T,
	data: (ctsPacketData & stcPacketData)[T],
) => {
	return {
		[ctsPacketIds.name]: (data: ctsPacketData[ctsPacketIds.name]) => {
			const chars = data.name.slice(0, 16);
			const buffer = new ArrayBuffer(1 + chars.length * 2);
			const view = new DataView(buffer);
			view.setUint8(0, ctsPacketIds.name);

			let i = 1;
			while (i < chars.length) {
				const char = chars.charCodeAt(i);
				if (typeof char === "number") {
					view.setUint16(1 + i * 2, char);
				}
				i++;
			}
			return buffer;
		},
		[ctsPacketIds.move]: (data: ctsPacketData[ctsPacketIds.move]) => {
			const buffer = new ArrayBuffer(9);
			const view = new DataView(buffer);
			view.setUint8(0, ctsPacketIds.move);
			view.setFloat32(1, data.x);
			view.setFloat32(5, data.y);
			return buffer;
		},
		[ctsPacketIds.boost]: (data: ctsPacketData[ctsPacketIds.boost]) => {
			const n = Math.min(10000, Math.max(0, data.duration));
			const buffer = new ArrayBuffer(3);
			const view = new DataView(buffer);
			view.setUint8(0, ctsPacketIds.boost);
			view.setUint16(1, n);
			return buffer;
		},

		[stcPacketIds.update]: (data: stcPacketData[stcPacketIds.update]) => {},
	}[packetType](data as never);
};
