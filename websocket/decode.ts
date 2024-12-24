import { type ctsPacketData, ctsPacketIds, type stcPacketData, stcPacketIds } from "./packets.ts";

export const parse = <T extends ctsPacketIds | stcPacketIds>(
	packetType: T,
	data: (ctsPacketData & stcPacketData)[T],
) => {
	return {
		[ctsPacketIds.name]: (packet: ArrayBuffer) => {
			let name = "";
			let i = 0;
			const view = new DataView(packet);
			while (i < view.byteLength) {
				name += String.fromCodePoint(view.getUint16(i));
				i += 2;
			}
			return { name };
		},
		[ctsPacketIds.move]: (packet: ArrayBuffer) => {
			const view = new DataView(packet);
			return { x: view.getFloat32(0), y: view.getFloat32(4) };
		},
		[ctsPacketIds.boost]: (packet: ArrayBuffer) => {
			const view = new DataView(packet);
			return { duration: view.getUint16(0) };
		},

		[stcPacketIds.update]: (packet: ArrayBuffer) => {},
	}[packetType](data as never);
};

export const decode = (buffer: ArrayBuffer) => {
	const view = new DataView(buffer);
	const packetType = view.getUint8(0);
	const packetData = buffer.slice(1);
	return parse(packetType, packetData);
};
