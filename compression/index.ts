/**
 * https://gist.github.com/Explosion-Scratch/357c2eebd8254f8ea5548b0e6ac7a61b?permalink_comment_id=4598581#gistcomment-4598581
 */

export const compress = async (
	str: string,
	encoding = "gzip" as CompressionFormat,
): Promise<ArrayBuffer> => {
	const byteArray = new TextEncoder().encode(str);
	const cs = new CompressionStream(encoding);
	const writer = cs.writable.getWriter();
	writer.write(byteArray);
	writer.close();
	return new Response(cs.readable).arrayBuffer();
};

export const decompress = async (
	byteArray: ArrayBuffer,
	encoding = "gzip" as CompressionFormat,
): Promise<string> => {
	const ds = new DecompressionStream(encoding);
	const writer = ds.writable.getWriter();
	writer.write(byteArray);
	writer.close();
	const arrayBuffer = await new Response(ds.readable).arrayBuffer();
	return new TextDecoder().decode(arrayBuffer);
};
