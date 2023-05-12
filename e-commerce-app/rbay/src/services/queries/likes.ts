import { client } from '$services/redis';
import { userLikesKey } from '$services/keys';

export const userLikesItem = async (itemId: string, userId: string) => {
	return client.sIsMember(userLikesKey(userId), itemId);
};

export const likedItems = async (userId: string) => {};

export const likeItem = async (itemId: string, userId: string) => {
	await client.sAdd(userLikesKey(userId), itemId);
};

export const unlikeItem = async (itemId: string, userId: string) => {
	await client.sRem(userLikesKey(userId), itemId);
};

export const commonLikedItems = async (userOneId: string, userTwoId: string) => {};
