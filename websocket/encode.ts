import { type packetData, packetIds } from "./packets.ts";

export const encode = <T extends packetIds>(
	packetType: T,
	data: packetData[T],
) => {
	return {
		[packetIds.name]: (data: packetData[packetIds.name]) => {
			const chars = data.name.slice(0, 16);
			const buffer = new ArrayBuffer(1 + chars.length * 2);
			const view = new DataView(buffer);
			view.setUint8(0, packetIds.name);

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
		[packetIds.move]: (data: packetData[packetIds.move]) => {},
		[packetIds.boost]: (data: packetData[packetIds.boost]) => {},
	}[packetType](data as never);
};
