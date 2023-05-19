import { SchemaFieldTypes } from 'redis';
import { client } from './client';
import { itemsIndexKey, itemsKey } from '$services/keys';

export const createIndexes = async () => {
	const indexes = await client.ft._list();

	const exists = indexes.includes(itemsIndexKey);

	if (exists) {
		return;
	}

	return client.ft.create(
		itemsIndexKey,
		{
			name: {
				type: SchemaFieldTypes.TEXT
			},
			description: {
				type: SchemaFieldTypes.TEXT
			}
		},
		{
			ON: 'HASH',
			PREFIX: itemsKey('')
		}
	);
};
