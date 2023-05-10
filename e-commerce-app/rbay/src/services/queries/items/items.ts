import type { CreateItemAttrs } from '$services/types';
import { client } from '$services/redis';
import { serialize } from './serialize';
import { genId } from '$services/utils';
import { itemsKey } from '$services/keys';

export const getItem = async (id: string) => {};

export const getItems = async (ids: string[]) => {};

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
	const id = genId();

	console.log(attrs);

	const serialized = serialize(attrs);

	await client.hSet(itemsKey(id), serialized);

	return id;
};
