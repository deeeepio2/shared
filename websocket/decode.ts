import { type packetData, packetIds } from "./packets.ts";

export const parse = <T extends packetIds>(
	packetType: T,
	data: packetData[T],
) => {
	return {
		[packetIds.name]: (packet: ArrayBuffer) => {
			let name = "";
			let i = 0;
			const view = new DataView(packet);
			while (i < view.byteLength) {
				name += String.fromCodePoint(view.getUint16(i));
				i += 2;
			}
			return name;
		},
		[packetIds.move]: (data: packetData[packetIds.move]) => {},
		[packetIds.boost]: (data: packetData[packetIds.boost]) => {},
	}[packetType](data as never);
};

export const decode = (buffer: ArrayBuffer) => {
	const view = new DataView(buffer);
	const packetType = view.getUint8(0);
	const packetData = buffer.slice(1);
	return parse(packetType, packetData);
};
